import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { signOut, fetchUserAttributes } from "aws-amplify/auth";
import { getUITranslation, type Language } from "@/lib/translations";
import { User, SignOut } from "@phosphor-icons/react";

interface UserProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: Language;
  onSignOut?: () => void;
}

interface UserAttributes {
  email?: string;
  email_verified?: string;
  sub?: string;
}

export function UserProfileDialog({
  open,
  onOpenChange,
  language,
  onSignOut,
}: UserProfileDialogProps) {
  const [userAttributes, setUserAttributes] = useState<UserAttributes | null>(
    null
  );
  const [loading, setLoading] = useState(false);

  const t = (key: string) => getUITranslation(key, language);

  useEffect(() => {
    if (open) {
      loadUserAttributes();
    }
  }, [open]);

  const loadUserAttributes = async () => {
    try {
      const attributes = await fetchUserAttributes();
      setUserAttributes(attributes);
    } catch (error) {
      console.error("Error loading user attributes:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      onOpenChange(false);
      onSignOut?.();
    } catch (error) {
      console.error("Error signing out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User size={24} weight="bold" />
            {t("userProfile") || "User Profile"}
          </DialogTitle>
          <DialogDescription>
            {t("userProfileDescription") || "Manage your account settings"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {userAttributes ? (
            <>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  {t("email") || "Email"}
                </div>
                <div className="text-base">{userAttributes.email}</div>
                {userAttributes.email_verified === "true" && (
                  <div className="text-xs text-green-600">
                    ✓ {t("emailVerified") || "Email verified"}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  {t("userId") || "User ID"}
                </div>
                <div className="text-xs font-mono bg-muted p-2 rounded">
                  {userAttributes.sub}
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              {t("loading") || "Loading..."}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            {t("close") || "Close"}
          </Button>
          <Button
            variant="destructive"
            onClick={handleSignOut}
            disabled={loading}
            className="flex items-center gap-2"
          >
            <SignOut size={16} weight="bold" />
            {loading
              ? t("loading") || "Loading..."
              : t("signOut") || "Sign Out"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
