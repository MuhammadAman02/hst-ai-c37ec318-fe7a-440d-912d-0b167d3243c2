import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MetricCard } from "@/components/MetricCard";
import { RiskChart } from "@/components/RiskChart";
import { AlertsPanel } from "@/components/AlertsPanel";
import { PortfolioTable } from "@/components/PortfolioTable";
import { 
  TrendingDown, 
  Shield, 
  DollarSign, 
  Activity,
  AlertTriangle 
} from "lucide-react";

// Mock data for the risk chart
const riskData = [
  { date: "Mon", var: 1250000, expectedShortfall: 1850000 },
  { date: "Tue", var: 1180000, expectedShortfall: 1720000 },
  { date: "Wed", var: 1320000, expectedShortfall: 1950000 },
  { date: "Thu", var: 1450000, expectedShortfall: 2100000 },
  { date: "Fri", var: 1380000, expectedShortfall: 2020000 },
  { date: "Sat", var: 1290000, expectedShortfall: 1890000 },
  { date: "Sun", var: 1350000, expectedShortfall: 1980000 },
];

const Index = () => {
  console.log("Index page rendered");
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="flex items-center gap-4 mb-6">
            <SidebarTrigger />
            <div>
              <h1 className="text-3xl font-bold">Risk Management Dashboard</h1>
              <p className="text-muted-foreground">
                Real-time portfolio risk monitoring and analysis
              </p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              title="Portfolio Value at Risk"
              value="$1.35M"
              change="+5.2% from yesterday"
              changeType="negative"
              icon={TrendingDown}
            />
            <MetricCard
              title="Total AUM"
              value="$2.8B"
              change="+2.1% this month"
              changeType="positive"
              icon={DollarSign}
            />
            <MetricCard
              title="Risk Score"
              value="7.2/10"
              change="Medium Risk"
              changeType="neutral"
              icon={Shield}
            />
            <MetricCard
              title="Active Alerts"
              value="3"
              change="2 high priority"
              changeType="negative"
              icon={AlertTriangle}
            />
          </div>

          {/* Charts and Tables */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <RiskChart data={riskData} title="7-Day Risk Trend" />
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <AlertsPanel />
            </div>
          </div>

          {/* Portfolio Table */}
          <div className="bg-card border border-border rounded-lg p-6">
            <PortfolioTable />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;