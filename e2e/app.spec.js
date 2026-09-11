import { test, expect } from '@playwright/test';

test.describe('Application', () => {
  test('loads the dashboard', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the app to load
    await page.waitForLoadState('networkidle');
    
    // Check that the page title contains the app name
    await expect(page).toHaveTitle(/AI Resource Manager/);
  });

  test('has sidebar navigation', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the app to load
    await page.waitForLoadState('networkidle');
    
    // Check that sidebar exists
    const sidebar = page.locator('nav');
    await expect(sidebar).toBeVisible();
  });

  test('can navigate to agents page', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the app to load
    await page.waitForLoadState('networkidle');
    
    // Click on Agents link in sidebar
    const agentsLink = page.locator('a', { hasText: 'Agents' });
    await agentsLink.click();
    
    // Check that we're on the agents page
    await expect(page).toHaveURL(/.*agents/);
  });

  test('can open command palette', async ({ page }) => {
    await page.goto('/');
    
    // Wait for the app to load
    await page.waitForLoadState('networkidle');
    
    // Press Ctrl+K to open command palette
    await page.keyboard.press('Control+k');
    
    // Check that command palette is visible
    const commandPalette = page.locator('[role="dialog"]');
    await expect(commandPalette).toBeVisible();
  });
});
