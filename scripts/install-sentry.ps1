# Sentry Installation Script for Windows
# Run this in PowerShell from the project root

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Sentry Installation Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (!(Test-Path "package.json")) {
    Write-Host "ERROR: package.json not found!" -ForegroundColor Red
    Write-Host "Please run this script from the project root (C:\GitHub\meni_client)" -ForegroundColor Yellow
    exit 1
}

Write-Host "[1/4] Checking Node.js..." -ForegroundColor Green
node --version
npm --version

Write-Host ""
Write-Host "[2/4] Installing Sentry packages..." -ForegroundColor Green
Write-Host "This may take a few minutes..." -ForegroundColor Yellow
Write-Host ""

npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✅ Installation Successful!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    
    Write-Host "[3/4] Next Steps:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Create Sentry account: https://sentry.io/signup/" -ForegroundColor White
    Write-Host "2. Create new React project in Sentry" -ForegroundColor White
    Write-Host "3. Copy your DSN (looks like: https://xxxxx@xxxxx.ingest.sentry.io/xxxxx)" -ForegroundColor White
    Write-Host ""
    
    Write-Host "[4/4] Configure environment:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Copy .env.sentry.example to .env.local and add your DSN:" -ForegroundColor White
    Write-Host "  VITE_SENTRY_DSN=your-dsn-here" -ForegroundColor Yellow
    Write-Host ""
    
    Write-Host "📖 Full setup guide: docs/SENTRY_SETUP.md" -ForegroundColor Magenta
    Write-Host ""
    
    # Check if Sentry packages are installed
    $sentryReact = npm list @sentry/react 2>&1 | Select-String "@sentry/react@"
    $sentryVite = npm list @sentry/vite-plugin 2>&1 | Select-String "@sentry/vite-plugin@"
    
    if ($sentryReact -and $sentryVite) {
        Write-Host "✅ Verified: Sentry packages installed successfully" -ForegroundColor Green
        Write-Host "   $sentryReact" -ForegroundColor Gray
        Write-Host "   $sentryVite" -ForegroundColor Gray
    }
    
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ❌ Installation Failed" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please check the error messages above." -ForegroundColor Yellow
    Write-Host "Try running: npm install" -ForegroundColor Yellow
    Write-Host ""
}

Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
