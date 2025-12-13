import type { VenueInfo } from "@/lib/types";
import type { Language } from "@/lib/translations";
import type { Currency } from "@/lib/currency";
import { SettingsMenu } from "@/components/SettingsMenu";
import type { GridColumns } from "@/components/GridViewToggle";
import { User } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { AuthDialog } from "@/components/AuthDialog";
import { UserProfileDialog } from "@/components/UserProfileDialog";
import { useState, useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";

interface VenueHeaderProps {
  venue?: VenueInfo;
  children?: React.ReactNode;
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  gridColumns: GridColumns;
  onGridColumnsChange: (columns: GridColumns) => void;
  currency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  convertPrices: boolean;
  onConvertPricesChange: (convert: boolean) => void;
  hideSettings?: boolean;
}

export function VenueHeader({
  venue,
  children,
  currentLanguage,
  onLanguageChange,
  gridColumns,
  onGridColumnsChange,
  currency,
  onCurrencyChange,
  convertPrices,
  onConvertPricesChange,
  hideSettings = false,
}: VenueHeaderProps) {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      await getCurrentUser();
    } catch {
      // User not authenticated
    }
  };

  const handleProfileClick = async () => {
    try {
      await getCurrentUser();
      // User is authenticated, show profile dialog
      setIsProfileDialogOpen(true);
    } catch {
      // User is not authenticated, show auth dialog
      setIsAuthDialogOpen(true);
    }
  };

  const handleSignOut = () => {
    setIsProfileDialogOpen(false);
  };

  if (!venue) {
    return null;
  }

  return (
    <div className="relative">
      {/* Banner Image */}
      <div
        className="h-48 md:h-64 bg-cover bg-gray-200 relative"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6)), url(${venue.bannerImage})`,
          backgroundPosition: "center calc(50% + 50%)",
        }}
      >
        {/* Settings Menu in top-left */}
        {!hideSettings && (
          <div className="absolute top-4 left-4 md:top-6 md:left-6 z-40">
            <SettingsMenu
              language={currentLanguage}
              onLanguageChange={onLanguageChange}
              gridColumns={gridColumns}
              onGridColumnsChange={onGridColumnsChange}
              currency={currency}
              onCurrencyChange={onCurrencyChange}
              convertPrices={convertPrices}
              onConvertPricesChange={onConvertPricesChange}
            />
          </div>
        )}

        {/* User Profile Button in top-right */}
        {!hideSettings && (
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-40">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full bg-white hover:bg-white/90 shadow-lg border-2 border-neutral-200"
              onClick={handleProfileClick}
            >
              <User size={24} weight="bold" className="text-neutral-800" />
            </Button>
          </div>
        )}

        {/* Logo positioned at bottom */}
        <div className="absolute bottom-0 left-4 md:left-6">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white shrink-0 -mb-14 md:-mb-18 relative z-20">
            <img
              src={venue.logoImage}
              alt={venue.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Venue Info below banner, next to logo */}
      <div className="relative px-4 md:px-6 pt-2 pb-2">
        <div className="flex items-start justify-between ml-32 md:ml-40">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              {venue.name}
            </h1>
          </div>

          {/* Action buttons area */}
          {children && (
            <div className="flex items-center gap-2">{children}</div>
          )}
        </div>
      </div>

      {/* Auth Dialog */}
      <AuthDialog
        open={isAuthDialogOpen}
        onOpenChange={(open) => {
          setIsAuthDialogOpen(open);
          if (!open) {
            // Check auth status after dialog closes in case user signed in
            checkAuthStatus();
          }
        }}
        language={currentLanguage}
      />

      {/* User Profile Dialog */}
      <UserProfileDialog
        open={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
        language={currentLanguage}
        onSignOut={handleSignOut}
      />
    </div>
  );
}
