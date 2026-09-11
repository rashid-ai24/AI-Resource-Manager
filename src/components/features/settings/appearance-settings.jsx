import { ThemeSwitcherDropdown } from '../../common/ThemeSwitcher';
import { useSettings } from '../../../hooks/use-settings';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${checked ? 'bg-primary' : 'bg-input'}`}
    >
      <span
        className={`pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`}
      />
    </button>
  );
}

export function AppearanceSettings() {
  const { settings, setSetting } = useSettings();

  const handleSidebarCollapsedChange = (checked) => {
    setSetting({ key: 'sidebar.collapsed', value: checked });
  };

  const handleFontSizeChange = (value) => {
    setSetting({ key: 'ui.fontSize', value });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium">Theme</h3>
        <p className="text-xs text-muted-foreground mb-3">Select your preferred theme</p>
        <ThemeSwitcherDropdown />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <Label className="text-sm font-medium">Collapsed Sidebar</Label>
          <p className="text-xs text-muted-foreground">Start with sidebar collapsed</p>
        </div>
        <ToggleSwitch
          checked={settings['sidebar.collapsed'] ?? false}
          onChange={handleSidebarCollapsedChange}
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Font Size</Label>
        <p className="text-xs text-muted-foreground mb-2">Adjust the base font size</p>
        <Select
          value={settings['ui.fontSize'] ?? '14'}
          onValueChange={handleFontSizeChange}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Font size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12">Small (12px)</SelectItem>
            <SelectItem value="14">Medium (14px)</SelectItem>
            <SelectItem value="16">Large (16px)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default AppearanceSettings;
