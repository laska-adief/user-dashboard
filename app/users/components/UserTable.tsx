"use client";
import { getUsers, getUsersData } from "@/action/getUsers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User, UserData } from "@/types/user";
import { useQuery } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Eye } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

const UserTable = () => {
  const {
    data: queryResult,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users-data"],
    queryFn: () => getUsersData(),
  });

  const users: UserData[] = queryResult?.data;

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof UserData;
    direction: "asc" | "desc" | null;
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { paginatedData, totalPages } = useMemo(() => {
    if (!users) return { paginatedData: [], totalPages: 0 };

    let resultData: UserData[] = [...users];
    // Search
    if (searchQuery) {
      resultData = resultData.filter(
        (u: UserData) =>
          u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          u.username.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Sort
    if (sortConfig)
      resultData.sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];

        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });

    // Pagination
    const totalPages = Math.ceil(resultData.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = resultData.slice(startIndex, endIndex);

    return { paginatedData, totalPages };
  }, [users, searchQuery, sortConfig, currentPage, pageSize]);

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong while fetching users!", {
        id: "fetch-users-error",
      });
    }
  }, [isError]);

  const handleOnSortBy = (key: keyof UserData) => {
    setSortConfig((current) => {
      if (current?.key !== key) return { key, direction: "asc" };
      if (current.direction === "asc") return { key, direction: "desc" };
      if (current.direction === "desc") return null;
      return { key, direction: "asc" };
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center p-10">
        <LoadingSpinner size={48} />
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center p-10 text-lg text-destructive">
        Failed to load users. Please try again later.
      </div>
    );

  if (!users)
    return (
      <div className="flex justify-center items-center p-10 text-lg">
        No users found
      </div>
    );

  const sortIcon = (key: keyof UserData) => {
    if (sortConfig?.key === key) {
      if (sortConfig.direction === "asc")
        return <ArrowUp className="size-4 text-primary" />;
      if (sortConfig.direction === "desc")
        return <ArrowDown className="size-4 text-primary" />;
    }
    return null;
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-full max-w-sm">
          <Input
            placeholder="Search users by name, username, or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                onClick={() => handleOnSortBy("name")}
                className="cursor-pointer select-none hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-center gap-1 font-bold text-foreground">
                  <span>Name</span>
                  {sortIcon("name")}
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleOnSortBy("username")}
                className="cursor-pointer select-none hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-center gap-1 font-bold text-foreground">
                  <span>Username</span>
                  {sortIcon("username")}
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleOnSortBy("email")}
                className="cursor-pointer select-none hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-center gap-1 font-bold text-foreground">
                  <span>Email</span>
                  {sortIcon("email")}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-center gap-1 font-bold text-foreground">
                  <span>Posts</span>
                </div>
              </TableHead>
              <TableHead
                onClick={() => handleOnSortBy("completedTodoCounts")}
                className="cursor-pointer select-none hover:bg-muted/50 transition-colors text-center"
              >
                <div className="flex items-center justify-center gap-1 font-bold text-foreground text-center">
                  <span>Completed Todo</span>
                  {sortIcon("completedTodoCounts")}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center justify-center gap-1 font-bold text-foreground">
                  <span>Pending Todo</span>
                </div>
              </TableHead>
              <TableHead className="text-center font-bold text-foreground">
                <span>Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((user: UserData) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="text-center">{user.postCounts}</TableCell>
                <TableCell className="text-center">
                  {user.completedTodoCounts}
                </TableCell>
                <TableCell className="text-center">
                  {user.pendingTodoCounts}
                </TableCell>
                <TableCell className="flex justify-center items-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={`/users/${user.id}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="hover:text-primary"
                        >
                          <Eye className="size-5" />
                        </Button>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>View user details</TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            {paginatedData.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No users match your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center flex items-center gap-2"
              >
                <span className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </span>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>

                <div className="flex items-center gap-2">
                  <span>Size : </span>
                  <Select
                    value={pageSize.toString()}
                    onValueChange={(value) => setPageSize(Number(value))}
                  >
                    <SelectTrigger className="w-[80px]">
                      <SelectValue placeholder="Page Size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </>
  );
};

export default UserTable;
