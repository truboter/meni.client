# 🚀 Quick Start: Sentry Installation

## ⚠️ IMPORTANT: Install from Windows, NOT WSL!

Due to WSL permission issues with Windows filesystem, you must run the installation from Windows PowerShell or CMD.

---

## Option 1: Automatic Installation (Recommended)

### Using PowerShell:

```powershell
cd C:\GitHub\meni_client
.\scripts\install-sentry.ps1
```

### Using CMD:

```cmd
cd C:\GitHub\meni_client
scripts\install-sentry.bat
```

---

## Option 2: Manual Installation

```powershell
cd C:\GitHub\meni_client
npm install
```

This will install:
- `@sentry/react@^7.119.0`
- `@sentry/vite-plugin@^2.22.6`

(Already added to package.json)

---

## ✅ Verification

Check if packages are installed:

```powershell
npm list @sentry/react
npm list @sentry/vite-plugin
```

You should see both packages listed.

---

## 📝 Next Steps

1. **Create Sentry Account**
   - Go to https://sentry.io/signup/
   - Create organization
   - Create project (type: React)
   - Copy your DSN

2. **Configure Environment**
   ```powershell
   # Copy example file
   copy .env.sentry.example .env.local
   
   # Edit .env.local and add:
   # VITE_SENTRY_DSN=your-dsn-here
   ```

3. **Follow Full Setup Guide**
   - See `docs/SENTRY_SETUP.md` for complete instructions
   - Updates to `vite.config.ts`
   - Initialize in `src/main.tsx`
   - Configure EU data residency

---

## 🔧 Troubleshooting

### "npm install" fails with EACCES error

This happens when running from WSL. **Solution:**
- Open PowerShell or CMD in Windows
- Navigate to `C:\GitHub\meni_client`
- Run the installation script

### Packages not found after installation

Run:
```powershell
npm install --force
```

### Permission denied errors

Run PowerShell/CMD as Administrator:
- Right-click PowerShell/CMD
- Select "Run as Administrator"
- Navigate to project folder
- Run installation

---

## 📚 Documentation

- **Quick Start**: This file (you are here)
- **Full Setup**: `docs/SENTRY_SETUP.md`
- **Privacy Policy**: Already updated ✅
- **Configuration**: `src/lib/sentry.ts`
- **Error Boundary**: `src/components/ErrorBoundary.tsx`

---

## 💡 Status

- [x] Package.json updated with Sentry dependencies
- [x] Configuration files created
- [x] Privacy Policy updated
- [x] Installation scripts ready
- [ ] **Run installation script** ← YOU ARE HERE
- [ ] Create Sentry account
- [ ] Configure .env.local
- [ ] Follow full setup guide

---

**Ready to install?** Run the script above! 🚀

**Need help?** Check `docs/SENTRY_SETUP.md`
