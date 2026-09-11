import { Settings as SettingsIcon } from 'lucide-react';
import { PageHeader } from '../components/layout/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AppearanceSettings } from '../components/features/settings/appearance-settings';
import { DataSettings } from '../components/features/settings/data-settings';
import { NotificationSettings } from '../components/features/settings/notification-settings';
import { AboutSettings } from '../components/features/settings/about-settings';

export default function Settings() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Configure your application"
        icon={SettingsIcon}
      />

      <Tabs defaultValue="appearance" className="w-full">
        <TabsList>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="data">Data</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        <div className="mt-6 rounded-lg border bg-card p-6">
          <TabsContent value="appearance">
            <AppearanceSettings />
          </TabsContent>
          <TabsContent value="data">
            <DataSettings />
          </TabsContent>
          <TabsContent value="notifications">
            <NotificationSettings />
          </TabsContent>
          <TabsContent value="about">
            <AboutSettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
