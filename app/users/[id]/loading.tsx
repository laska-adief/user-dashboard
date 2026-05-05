import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="animate-pulse">
      {/* Profile Header Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 p-4">
        {/* Avatar Skeleton */}
        <Skeleton className="w-48 h-48 rounded-full" />

        <div className="flex flex-col gap-4 md:gap-2 w-full max-w-md text-center md:text-left">
          {/* Username Skeleton */}
          <Skeleton className="h-4 w-24 mx-auto md:mx-0" />

          {/* Name Skeleton (Large) */}
          <Skeleton className="h-12 md:h-20 w-3/4 mx-auto md:mx-0" />

          {/* Contacts Row */}
          <div className="flex flex-col md:flex-row items-center gap-6 mt-2">
            <div className="flex gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-28" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-5 w-5 rounded-full" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid Section */}
      <div className="mt-8 p-4 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
        {/* Address Card Skeleton */}
        <Card>
          <CardContent className="flex flex-col gap-6 pt-6">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-full" />
            </div>
            <div className="flex gap-6">
              <div className="space-y-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-6 w-24" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-6 w-20" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Card Skeleton */}
        <Card>
          <CardContent className="flex flex-col gap-4 pt-6">
            <div className="flex gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-28" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-12" />
              <Skeleton className="h-6 w-40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-52" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}