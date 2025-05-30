import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const SystemHealth = () => {
  console.log("SystemHealth page rendered");

  const systemStatus = [
    { service: 'Risk Engine', status: 'healthy', uptime: '99.9%' },
    { service: 'Data Feed', status: 'healthy', uptime: '99.8%' },
    { service: 'Compliance Monitor', status: 'warning', uptime: '98.5%' },
    { service: 'Report Generator', status: 'healthy', uptime: '99.7%' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default: return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy': return <Badge variant="default" className="bg-green-100 text-green-800">Healthy</Badge>;
      case 'warning': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      default: return <Badge variant="destructive">Critical</Badge>;
    }
  };

  return (
    <Layout title="System Health" subtitle="Monitor system performance and status">
      <div className="space-y-6">
        {systemStatus.map((system, index) => (
          <Card key={index}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                {getStatusIcon(system.status)}
                <div>
                  <h4 className="font-medium">{system.service}</h4>
                  <p className="text-sm text-muted-foreground">Uptime: {system.uptime}</p>
                </div>
              </div>
              {getStatusBadge(system.status)}
            </CardContent>
          </Card>
        ))}
      </div>
    </Layout>
  );
};

export default SystemHealth;