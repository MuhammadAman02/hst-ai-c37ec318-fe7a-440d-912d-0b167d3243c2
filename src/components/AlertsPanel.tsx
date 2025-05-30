import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, TrendingDown, Shield, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface RiskAlert {
  id: string;
  type: "high" | "medium" | "low";
  title: string;
  description: string;
  timestamp: string;
}

const mockAlerts: RiskAlert[] = [
  {
    id: "1",
    type: "high",
    title: "VaR Limit Breach",
    description: "Portfolio VaR exceeded 95% confidence limit by 2.3%",
    timestamp: "2 minutes ago"
  },
  {
    id: "2", 
    type: "medium",
    title: "Concentration Risk",
    description: "Technology sector exposure reached 35% of total portfolio",
    timestamp: "15 minutes ago"
  },
  {
    id: "3",
    type: "low",
    title: "Compliance Check",
    description: "Monthly stress test completed successfully",
    timestamp: "1 hour ago"
  }
];

export function AlertsPanel() {
  console.log("AlertsPanel rendered with alerts:", mockAlerts);
  
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "high": return AlertTriangle;
      case "medium": return TrendingDown;
      default: return Shield;
    }
  };

  const getAlertClass = (type: string) => {
    switch (type) {
      case "high": return "risk-high";
      case "medium": return "risk-medium";
      default: return "risk-low";
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Alerts</h3>
      {mockAlerts.map((alert) => {
        const Icon = getAlertIcon(alert.type);
        return (
          <Alert key={alert.id} className={cn("border", getAlertClass(alert.type))}>
            <Icon className="h-4 w-4" />
            <AlertDescription>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{alert.title}</p>
                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {alert.timestamp}
                </div>
              </div>
            </AlertDescription>
          </Alert>
        );
      })}
    </div>
  );
}