"use client"
import { getUsers } from '@/action/getUsers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LoadingSpinner } from '@/components/ui/loading';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { User } from '@/types/user';
import { useQuery } from '@tanstack/react-query';
import { ArrowDown, ArrowUp, Eye } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const UserTable = () => {
  const { data: users, isLoading, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  })

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<({ key: keyof User, direction: 'asc' | 'desc' | null }) | null>(null);

  useEffect(() => {
    if (!users) return;

    let result = users.filter((user: User) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortConfig && sortConfig.direction) {
      const { key, direction } = sortConfig;
      result = [...result].sort((a, b) => {
        const aValue = String(a[key]).toLowerCase();
        const bValue = String(b[key]).toLowerCase();
        if (aValue < bValue) return direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    setFilteredUsers(result);
  }, [users, searchQuery, sortConfig]);

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong while fetching users!', {
        id: 'fetch-users-error',
      })
    }
  }, [isError])

  const handleOnSortBy = (key: keyof User) => {
    setSortConfig((current) => {
      if (current?.key !== key) return { key, direction: 'asc' };
      if (current.direction === 'asc') return { key, direction: 'desc' };
      if (current.direction === 'desc') return null;
      return { key, direction: 'asc' };
    });
  }

  if (isLoading) return <div className='flex justify-center items-center p-10'><LoadingSpinner size={48} /></div>

  if (isError) return <div className='flex justify-center items-center p-10 text-lg text-destructive'>Failed to load users. Please try again later.</div>

  if (!users) return <div className='flex justify-center items-center p-10 text-lg'>No users found</div>

  const sortIcon = (key: keyof User) => {
    if (sortConfig?.key === key) {
      if (sortConfig.direction === 'asc') return <ArrowUp className='size-4 text-primary' />;
      if (sortConfig.direction === 'desc') return <ArrowDown className='size-4 text-primary' />;
    }
    return null;
  }

  return (
    <>
      <div className='flex items-center gap-2 mb-6'>
        <div className='w-full max-w-sm'>
          <Input 
            placeholder='Search users by name, username, or email' 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableCaption>A list of users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead onClick={() => handleOnSortBy('name')} className='cursor-pointer select-none hover:bg-muted/50 transition-colors'>
                <span className='flex items-center gap-1 font-bold text-foreground'>
                  Name {sortIcon('name')}
                </span>
              </TableHead>
              <TableHead onClick={() => handleOnSortBy('username')} className='cursor-pointer select-none hover:bg-muted/50 transition-colors'>
                <span className='flex items-center gap-1 font-bold text-foreground'>
                  Username {sortIcon('username')}
                </span>
              </TableHead>
              <TableHead onClick={() => handleOnSortBy('email')} className='cursor-pointer select-none hover:bg-muted/50 transition-colors'>
                <span className='flex items-center gap-1 font-bold text-foreground'>
                  Email {sortIcon('email')}
                </span>
              </TableHead>
              <TableHead className="text-center font-bold text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className='flex justify-center items-center'>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/users/${user.id}`}>
                        <Button variant="ghost" size="icon" className="hover:text-primary">
                          <Eye className='size-5' />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      View user details
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  No users match your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  )
}

export default UserTable;