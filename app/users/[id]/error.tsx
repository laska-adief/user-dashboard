
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Error() {

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <Card className="w-full max-w-md border-destructive/20 shadow-xl shadow-destructive/5 bg-destructive/5 backdrop-blur-sm">
        <CardContent className="pt-10 pb-10 flex flex-col items-center gap-6">
          <div className="p-4 rounded-full bg-destructive/10 text-destructive animate-pulse">
            <AlertCircle className="w-16 h-16" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Failed to Fetch User Details
            </h2>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto">
              We encountered an issue while trying to load the user profile. Please check your connection or try again later.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full pt-4">
            <Button variant="outline" asChild className="flex-1 gap-2">
              <Link href="/users">
                <ArrowLeft className="w-4 h-4" />
                Back to Users
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
