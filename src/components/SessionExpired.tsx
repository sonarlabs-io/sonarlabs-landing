// components/SessionExpired.tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { openFreshLoginWindow } from "@/utils/auth";

export function SessionExpired() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Session Expired</CardTitle>
          <CardDescription className="text-center">
            Your session has expired or been ended.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Click below to return to login.
          </p>
          <div className="flex flex-col gap-2">
            <Button onClick={openFreshLoginWindow}>
              Return to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}