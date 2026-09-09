$nodeVersion = node --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Node.js not found. Install from https://nodejs.org" -ForegroundColor Red
    exit 1
}
Write-Host "Node.js $nodeVersion detected" -ForegroundColor Green

Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host "Verifying better-sqlite3..." -ForegroundColor Cyan
node -e "require('better-sqlite3')" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "better-sqlite3 failed. Try: npm rebuild better-sqlite3" -ForegroundColor Red
    exit 1
}

Write-Host "Setup complete!" -ForegroundColor Green
