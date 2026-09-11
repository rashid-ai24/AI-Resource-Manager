# Troubleshooting

## Common Issues

### Application Won't Start

**Symptoms:** Application crashes on startup or shows blank screen

**Solutions:**

1. **Check Node.js version**
   ```bash
   node --version
   ```
   Requires Node.js 18 or higher.

2. **Reinstall dependencies**
   ```bash
   rm -rf node_modules
   npm install
   ```

3. **Clear application data**
   - Windows: Delete `%APPDATA%/ai-resource-manager/`
   - macOS: Delete `~/Library/Application Support/ai-resource-manager/`
   - Linux: Delete `~/.config/ai-resource-manager/`

4. **Check console for errors**
   ```bash
   npm run dev
   ```
   Look for error messages in the console.

### Data Not Saving

**Symptoms:** Changes are not persisted after closing the application

**Solutions:**

1. **Check disk space**
   - Ensure sufficient disk space is available
   - Check the database location has write permissions

2. **Check database permissions**
   - Windows: Check `%APPDATA%/ai-resource-manager/` permissions
   - macOS: Check `~/Library/Application Support/ai-resource-manager/` permissions
   - Linux: Check `~/.config/ai-resource-manager/` permissions

3. **Restart the application**
   - Close the application completely
   - Reopen and try saving again

4. **Check database integrity**
   - Go to Settings > Advanced
   - Run database integrity check

### Performance Issues

**Symptoms:** Application is slow or unresponsive

**Solutions:**

1. **Close other applications**
   - Free up system resources
   - Close resource-heavy applications

2. **Check system resources**
   - Monitor CPU and memory usage
   - Ensure sufficient RAM is available

3. **Restart the application**
   - Close the application
   - Reopen to clear memory

4. **Check for updates**
   - Go to Settings > About
   - Check for application updates

### Search Not Working

**Symptoms:** Search returns no results or incorrect results

**Solutions:**

1. **Check search query**
   - Ensure search terms are spelled correctly
   - Try simpler search terms

2. **Rebuild search index**
   - Go to Settings > Advanced
   - Rebuild search index

3. **Check data exists**
   - Ensure you have created entities
   - Check if entities are visible in list views

### Import/Export Issues

**Symptoms:** Cannot import or export data

**Solutions:**

1. **Check file format**
   - Ensure file is in supported format (JSON, CSV)
   - Check file is not corrupted

2. **Check file permissions**
   - Ensure read/write permissions on file
   - Check file is not read-only

3. **Try smaller dataset**
   - Import/export smaller amounts of data
   - Check for memory issues

### Backup Issues

**Symptoms:** Cannot create or restore backups

**Solutions:**

1. **Check disk space**
   - Ensure sufficient disk space for backup
   - Check backup location has write permissions

2. **Check backup file**
   - Ensure backup file exists
   - Check file is not corrupted

3. **Try manual backup**
   - Copy database file manually
   - Store in safe location

## Error Messages

### "Database is locked"

**Cause:** Another process is using the database

**Solution:**
1. Close all instances of the application
2. Wait a few seconds
3. Reopen the application

### "Permission denied"

**Cause:** Insufficient permissions to access files

**Solution:**
1. Check file permissions
2. Run with appropriate permissions
3. Check antivirus software

### "Out of memory"

**Cause:** Application running out of memory

**Solution:**
1. Close other applications
2. Restart the application
3. Reduce dataset size

### "Network error"

**Cause:** Network connectivity issues

**Solution:**
1. Check internet connection
2. Check firewall settings
3. Try again later

## Getting Help

### Documentation

- [Getting Started](./getting-started.md)
- [Features Guide](./features.md)
- [Developer Guide](../developer/architecture.md)

### Support

- Check existing [issues](https://github.com/rashid-ai24/AI-Resource-Manager/issues)
- Create a new issue with:
  - Description of the problem
  - Steps to reproduce
  - Expected vs actual behavior
  - System information

### System Information

When reporting issues, include:

- Operating system and version
- Node.js version
- Application version
- Steps to reproduce
- Console errors (if any)
