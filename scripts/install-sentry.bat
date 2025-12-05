@echo off
REM Sentry Installation Script for Windows CMD
REM Run this from the project root

echo ========================================
echo   Sentry Installation Script
echo ========================================
echo.

if not exist package.json (
    echo ERROR: package.json not found!
    echo Please run this script from the project root
    pause
    exit /b 1
)

echo [1/4] Installing Sentry packages...
echo This may take a few minutes...
echo.

call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo   Installation Successful!
    echo ========================================
    echo.
    echo [2/4] Next Steps:
    echo.
    echo 1. Create Sentry account: https://sentry.io/signup/
    echo 2. Create new React project in Sentry
    echo 3. Copy your DSN
    echo.
    echo [3/4] Configure environment:
    echo.
    echo Copy .env.sentry.example to .env.local and add your DSN
    echo.
    echo [4/4] Full setup guide: docs\SENTRY_SETUP.md
    echo.
) else (
    echo.
    echo ========================================
    echo   Installation Failed
    echo ========================================
    echo.
    echo Please check the error messages above.
    echo.
)

echo.
pause
