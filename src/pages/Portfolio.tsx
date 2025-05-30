import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useState } from "react";
import { RefreshCw, Download, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sectorData = [
  { name: 'Technology', value: 35, color: '#3B82F6' },
  { name: 'Healthcare', value: 20, color: '#10B981' },
  { name: 'Financial', value: 18, color: '#F59E0B' },
  { name: 'Consumer', value: 15, color: '#EF4444' },
  { name: 'Energy', value: 12, color: '#8B5CF6' },
];

const riskMetrics = [
  { metric: 'Beta', value: 1.15, benchmark: 1.0 },
  { metric: 'Sharpe Ratio', value: 1.8, benchmark: 1.5 },
  { metric: 'Max Drawdown', value: -8.5, benchmark: -10.0 },
  { metric: 'Volatility', value: 12.3, benchmark: 15.0 },
];

const Portfolio = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  console.log("Portfolio page rendered");

  const handleRefresh = async () => {
    setIsRefreshing(true);
    console.log("Refreshing portfolio data...");
    
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Portfolio Updated",
        description: "Latest portfolio data has been loaded successfully.",
      });
      console.log("Portfolio data refreshed");
    }, 2000);
  };

  const handleExport = () => {
    console.log("Exporting portfolio report...");
    toast({
      title: "Export Started",
      description: "Portfolio report is being generated and will download shortly.",
    });
  };

  return (
    <Layout 
      title="Portfolio Risk Analysis" 
      subtitle="Comprehensive portfolio risk metrics and analysis"
    >
      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <Button onClick={handleRefresh} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
        <Button variant="outline" onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Sector Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Metrics vs Benchmark</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3B82F6" name="Portfolio" />
                  <Bar dataKey="benchmark" fill="#94A3B8" name="Benchmark" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio Risk Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">$2.8B</div>
              <div className="text-sm text-muted-foreground">Total AUM</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-red-600">$1.35M</div>
              <div className="text-sm text-muted-foreground">Daily VaR (95%)</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">1.15</div>
              <div className="text-sm text-muted-foreground">Portfolio Beta</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">1.8</div>
              <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Portfolio;