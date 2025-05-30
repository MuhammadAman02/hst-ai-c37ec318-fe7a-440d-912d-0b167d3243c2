import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, AlertTriangle, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const marketData = [
  { time: '09:00', sp500: 4200, volatility: 15.2, correlation: 0.85 },
  { time: '10:00', sp500: 4185, volatility: 16.1, correlation: 0.82 },
  { time: '11:00', sp500: 4220, volatility: 14.8, correlation: 0.88 },
  { time: '12:00', sp500: 4195, volatility: 17.3, correlation: 0.79 },
  { time: '13:00', sp500: 4210, volatility: 15.9, correlation: 0.84 },
  { time: '14:00', sp500: 4175, volatility: 18.2, correlation: 0.76 },
  { time: '15:00', sp500: 4190, volatility: 16.7, correlation: 0.81 },
];

const riskFactors = [
  { factor: 'Interest Rate Risk', exposure: 'High', impact: '+2.3%', status: 'warning' },
  { factor: 'Credit Spread Risk', exposure: 'Medium', impact: '+1.1%', status: 'normal' },
  { factor: 'Equity Risk', exposure: 'High', impact: '+3.8%', status: 'critical' },
  { factor: 'Currency Risk', exposure: 'Low', impact: '+0.5%', status: 'normal' },
  { factor: 'Commodity Risk', exposure: 'Medium', impact: '+1.7%', status: 'warning' },
];

const MarketRisk = () => {
  const [isLive, setIsLive] = useState(false);
  const [marketMetrics, setMarketMetrics] = useState({
    sp500: 4190,
    volatility: 16.7,
    correlation: 0.81
  });
  const { toast } = useToast();

  console.log("MarketRisk page rendered, live mode:", isLive);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isLive) {
      interval = setInterval(() => {
        setMarketMetrics(prev => ({
          sp500: prev.sp500 + (Math.random() - 0.5) * 20,
          volatility: Math.max(10, Math.min(25, prev.volatility + (Math.random() - 0.5) * 2)),
          correlation: Math.max(0.5, Math.min(1, prev.correlation + (Math.random() - 0.5) * 0.1))
        }));
        console.log("Market metrics updated in real-time");
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLive]);

  const toggleLiveMode = () => {
    setIsLive(!isLive);
    toast({
      title: isLive ? "Live Mode Disabled" : "Live Mode Enabled",
      description: isLive ? "Market data updates stopped" : "Real-time market data updates started",
    });
    console.log("Live mode toggled:", !isLive);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'critical': return <Badge variant="destructive">Critical</Badge>;
      case 'warning': return <Badge variant="secondary">Warning</Badge>;
      default: return <Badge variant="default">Normal</Badge>;
    }
  };

  return (
    <Layout 
      title="Market Risk Monitoring" 
      subtitle="Real-time market risk analysis and monitoring"
    >
      {/* Live Mode Toggle */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <Button 
            onClick={toggleLiveMode}
            variant={isLive ? "destructive" : "default"}
          >
            <Activity className={`h-4 w-4 mr-2 ${isLive ? 'animate-pulse' : ''}`} />
            {isLive ? 'Stop Live Mode' : 'Start Live Mode'}
          </Button>
          {isLive && (
            <Badge variant="outline" className="animate-pulse">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Live
            </Badge>
          )}
        </div>
      </div>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">S&P 500</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketMetrics.sp500.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">
              {isLive ? 'Live' : 'Last update: 15:00'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Volatility</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketMetrics.volatility.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              VIX equivalent
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Correlation</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{marketMetrics.correlation.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              To market index
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Market Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Market Index Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sp500" stroke="#3B82F6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Volatility Surface</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="volatility" stroke="#EF4444" fill="#EF4444" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Factors */}
      <Card>
        <CardHeader>
          <CardTitle>Market Risk Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {riskFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{factor.factor}</h4>
                  <p className="text-sm text-muted-foreground">Exposure: {factor.exposure}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">{factor.impact}</div>
                    <div className="text-xs text-muted-foreground">Impact on VaR</div>
                  </div>
                  {getStatusBadge(factor.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default MarketRisk;