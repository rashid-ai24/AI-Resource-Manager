# Release Process

This document describes the release process for AI Resource Manager v2.

## Prerequisites

- Node.js 18+
- npm
- Git
- GitHub account with repository access

## Release Steps

### 1. Update Version

Update the version in `package.json`:

```bash
npm version patch  # For bug fixes (1.0.0 -> 1.0.1)
npm version minor  # For new features (1.0.0 -> 1.1.0)
npm version major  # For breaking changes (1.0.0 -> 2.0.0)
```

### 2. Update Changelog

Update `CHANGELOG.md` with the new version changes:

1. Add a new section for the version
2. List all changes under Added, Changed, Fixed, Removed
3. Update the comparison links at the bottom

### 3. Commit Changes

```bash
git add .
git commit -m "Release v2.0.0"
```

### 4. Create Git Tag

```bash
git tag -a v2.0.0 -m "Release v2.0.0"
```

### 5. Push to GitHub

```bash
git push origin main
git push origin v2.0.0
```

### 6. Automated Release

The GitHub Actions workflow will automatically:

1. Build the application for all platforms
2. Create installers (Windows, macOS, Linux)
3. Create a GitHub release with all artifacts

### 7. Verify Release

1. Go to GitHub Releases page
2. Verify all artifacts are uploaded
3. Download and test the installers
4. Verify auto-update works

## Release Checklist

### Before Release

- [ ] All tests pass (`npm run test`)
- [ ] Build succeeds (`npm run build`)
- [ ] Changelog updated
- [ ] Version updated in package.json
- [ ] No uncommitted changes

### During Release

- [ ] Git tag created
- [ ] Changes pushed to GitHub
- [ ] GitHub Actions workflow running

### After Release

- [ ] GitHub release created
- [ ] All artifacts uploaded
- [ ] Release notes published
- [ ] Auto-update working

## Manual Release (if needed)

If you need to create a release manually:

### Windows

```bash
npm run electron:build:win
```

Artifacts will be in the `release/` directory.

### macOS

```bash
npm run electron:build:mac
```

Artifacts will be in the `release/` directory.

### Linux

```bash
npm run electron:build:linux
```

Artifacts will be in the `release/` directory.

## Code Signing

### Windows

Code signing is configured in `electron-builder.yml`. You need:

- A code signing certificate
- Environment variables: `CSC_LINK`, `CSC_KEY_PASSWORD`

### macOS

Code signing and notarization are configured. You need:

- Apple Developer account
- Environment variables: `APPLE_ID`, `APPLE_ID_PASSWORD`, `APPLE_TEAM_ID`

## Auto-Update

Auto-update is configured using `electron-updater`. The application will:

1. Check for updates on startup
2. Download updates automatically
3. Prompt to install updates

## Troubleshooting

### Build Fails

1. Check Node.js version: `node --version`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Check for errors in build output

### Code Signing Fails

1. Verify environment variables are set
2. Check certificate validity
3. Verify Apple Developer account status

### Auto-Update Not Working

1. Check network connectivity
2. Verify GitHub release exists
3. Check application logs

## Support

For issues with the release process, check:

- [GitHub Actions logs](https://github.com/rashid-ai24/AI-Resource-Manager/actions)
- [Release notes](https://github.com/rashid-ai24/AI-Resource-Manager/releases)
- [Documentation](./docs/README.md)
