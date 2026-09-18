import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground">
            <Mail className="h-5 w-5" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">Reset your password</h1>
          <p className="mt-2 text-sm text-muted-foreground">We’ll send a secure reset link to your email.</p>
        </div>

        <form className="mt-8 space-y-4">
          <div className="space-y-2">
            <label htmlFor="forgot-email" className="text-sm font-medium">Email address</label>
            <Input id="forgot-email" type="email" placeholder="you@sonicbase.com" />
          </div>

          <Button type="submit" className="w-full">Send reset link</Button>
        </form>

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Back to <Link to="/login" className="font-medium text-foreground underline-offset-4 hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
