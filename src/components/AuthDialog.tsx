import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signIn, signUp, signInWithRedirect } from "aws-amplify/auth";
import { getUITranslation, type Language } from "@/lib/translations";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: Language;
}

type AuthMode = "signin" | "signup";

export function AuthDialog({ open, onOpenChange, language }: AuthDialogProps) {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const t = (key: string) => getUITranslation(key, language);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "signup") {
        if (password !== confirmPassword) {
          setError(t("passwordsDontMatch") || "Passwords don't match");
          setLoading(false);
          return;
        }

        await signUp({
          username: email,
          password,
          options: {
            userAttributes: {
              email,
            },
          },
        });

        // After successful signup, show success message or switch to signin
        setMode("signin");
        setError(null);
        setPassword("");
        setConfirmPassword("");
      } else {
        await signIn({
          username: email,
          password,
        });

        // Close dialog on successful signin
        onOpenChange(false);
        setEmail("");
        setPassword("");
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (
    provider: "Google" | "Facebook" | "Amazon"
  ) => {
    try {
      setLoading(true);
      await signInWithRedirect({ provider });
    } catch (err: any) {
      console.error("Social sign-in error:", err);
      setError(err.message || "An error occurred");
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
    setMode("signin");
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        if (!isOpen) {
          resetForm();
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "signin"
              ? t("signIn") || "Sign In"
              : t("signUp") || "Sign Up"}
          </DialogTitle>
          <DialogDescription>
            {mode === "signin"
              ? t("signInDescription") ||
                "Sign in to your account to access your profile"
              : t("signUpDescription") || "Create a new account to get started"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t("email") || "Email"}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t("emailPlaceholder") || "your@email.com"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t("password") || "Password"}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t("passwordPlaceholder") || "••••••••"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={8}
            />
          </div>

          {mode === "signup" && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">
                {t("confirmPassword") || "Confirm Password"}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder={t("passwordPlaceholder") || "••••••••"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                minLength={8}
              />
            </div>
          )}

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading
              ? t("loading") || "Loading..."
              : mode === "signin"
                ? t("signIn") || "Sign In"
                : t("signUp") || "Sign Up"}
          </Button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t("orContinueWith") || "Or continue with"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialSignIn("Google")}
            disabled={loading}
          >
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialSignIn("Facebook")}
            disabled={loading}
          >
            Facebook
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleSocialSignIn("Amazon")}
            disabled={loading}
          >
            Amazon
          </Button>
        </div>

        <div className="text-center text-sm">
          {mode === "signin" ? (
            <>
              {t("dontHaveAccount") || "Don't have an account?"}{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                className="text-primary hover:underline font-medium"
                disabled={loading}
              >
                {t("signUp") || "Sign Up"}
              </button>
            </>
          ) : (
            <>
              {t("alreadyHaveAccount") || "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setMode("signin")}
                className="text-primary hover:underline font-medium"
                disabled={loading}
              >
                {t("signIn") || "Sign In"}
              </button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
