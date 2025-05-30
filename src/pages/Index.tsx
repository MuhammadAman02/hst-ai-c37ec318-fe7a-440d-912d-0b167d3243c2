import { Layout } from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";
import { RiskChart } from "@/components/RiskChart";
import { AlertsPanel } from "@/components/AlertsPanel";
import { PortfolioTable } from "@/components/PortfolioTable";
import { 
  TrendingDown, 
  Shield, 
  DollarSign, 
  AlertTriangle 
} from "lucide-react";
import { useState, useEffect } from "react";

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
  const [metrics, setMetrics] = useState({
    portfolioVar: 1350000,
    totalAum: 2800000000,
    riskScore: 7.2,
    activeAlerts: 3
  });

  console.log("Index page rendered with metrics:", metrics);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        portfolioVar: prev.portfolioVar + (Math.random() - 0.5) * 50000,
        riskScore: Math.max(1, Math.min(10, prev.riskScore + (Math.random() - 0.5) * 0.2))
      }));
      console.log("Metrics updated");
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, []);
  
  return (
    <Layout 
      title="Risk Management Dashboard" 
      subtitle="Real-time portfolio risk monitoring and analysis"
    >
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Portfolio Value at Risk"
          value={`$${(metrics.portfolioVar / 1000000).toFixed(2)}M`}
          change="+5.2% from yesterday"
          changeType="negative"
          icon={TrendingDown}
        />
        <MetricCard
          title="Total AUM"
          value={`$${(metrics.totalAum / 1000000000).toFixed(1)}B`}
          change="+2.1% this month"
          changeType="positive"
          icon={DollarSign}
        />
        <MetricCard
          title="Risk Score"
          value={`${metrics.riskScore.toFixed(1)}/10`}
          change="Medium Risk"
          changeType="neutral"
          icon={Shield}
        />
        <MetricCard
          title="Active Alerts"
          value={metrics.activeAlerts.toString()}
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
    </Layout>
  );
};

export default Index;