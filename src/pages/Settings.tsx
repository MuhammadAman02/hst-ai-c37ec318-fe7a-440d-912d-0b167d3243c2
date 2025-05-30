import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [settings, setSettings] = useState({
    realTimeUpdates: true,
    emailAlerts: false,
    autoReports: true,
  });
  const { toast } = useToast();

  console.log("Settings page rendered");

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Setting Updated",
      description: `${key} has been ${value ? 'enabled' : 'disabled'}.`,
    });
    console.log("Setting updated:", key, value);
  };

  return (
    <Layout title="Settings" subtitle="Configure application preferences">
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Real-time Updates</h4>
              <p className="text-sm text-muted-foreground">Enable live data updates</p>
            </div>
            <Switch 
              checked={settings.realTimeUpdates}
              onCheckedChange={(checked) => updateSetting('realTimeUpdates', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Email Alerts</h4>
              <p className="text-sm text-muted-foreground">Receive email notifications for critical alerts</p>
            </div>
            <Switch 
              checked={settings.emailAlerts}
              onCheckedChange={(checked) => updateSetting('emailAlerts', checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Automatic Reports</h4>
              <p className="text-sm text-muted-foreground">Generate daily reports automatically</p>
            </div>
            <Switch 
              checked={settings.autoReports}
              onCheckedChange={(checked) => updateSetting('autoReports', checked)}
            />
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Settings;