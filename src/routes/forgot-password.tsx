import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSent(true);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-[28px] border border-border bg-card p-6 shadow-sm md:p-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground">
            <Mail className="h-5 w-5" />
          </div>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight">Reset your password</h1>
          <p className="mt-2 text-sm text-muted-foreground">We'll send a secure reset link to your email.</p>
        </div>

        {sent ? (
          <div className="mt-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted text-foreground">
              <Mail className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">Check your email</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              If an account exists with <strong>{email}</strong>, you'll receive a password reset link shortly.
            </p>
            <Link to="/login" className="mt-6 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85">
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <label htmlFor="forgot-email" className="text-sm font-medium">Email address</label>
              <Input id="forgot-email" type="email" placeholder="you@sonicbase.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full">Send reset link</Button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-muted-foreground">
          Back to <Link to="/login" className="font-medium text-foreground underline-offset-4 hover:underline">Sign in</Link>
        </div>
      </div>
    </div>
  );
}
