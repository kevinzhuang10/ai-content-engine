"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { user, signOut, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Middleware will redirect
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Welcome to your Dashboard</CardTitle>
            <CardDescription>
              You are successfully authenticated with Supabase
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  User Information
                </h3>
                <div className="mt-2 space-y-2">
                  <div>
                    <span className="font-medium">Email:</span> {user.email}
                  </div>
                  <div>
                    <span className="font-medium">User ID:</span> {user.id}
                  </div>
                  {user.user_metadata?.full_name && (
                    <div>
                      <span className="font-medium">Name:</span> {user.user_metadata.full_name}
                    </div>
                  )}
                  <div>
                    <span className="font-medium">Created:</span>{" "}
                    {new Date(user.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Authentication Status
                </h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Authenticated</span>
                  </div>
                  <div>
                    <span className="font-medium">Provider:</span> {user.app_metadata?.provider || 'email'}
                  </div>
                  {user.email_confirmed_at && (
                    <div>
                      <span className="font-medium">Email Verified:</span>{" "}
                      {new Date(user.email_confirmed_at).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              This is your protected dashboard. Only authenticated users can access this page.
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
            <CardDescription>
              Your authentication system is now fully functional
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>✅ Sign up and sign in functionality</div>
              <div>✅ Protected routes with middleware</div>
              <div>✅ Session management</div>
              <div>✅ User authentication context</div>
              <div>✅ Form validation and error handling</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}