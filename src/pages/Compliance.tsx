import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const complianceChecks = [
  { 
    id: 1,
    rule: 'Position Concentration Limit',
    description: 'No single position exceeds 10% of portfolio',
    status: 'passed',
    lastCheck: '2 minutes ago',
    nextCheck: 'Continuous'
  },
  {
    id: 2,
    rule: 'Sector Concentration Limit',
    description: 'No sector exceeds 35% allocation',
    status: 'warning',
    lastCheck: '5 minutes ago',
    nextCheck: 'Continuous'
  },
  {
    id: 3,
    rule: 'Liquidity Requirements',
    description: 'Minimum 15% in liquid assets',
    status: 'passed',
    lastCheck: '1 hour ago',
    nextCheck: 'Daily'
  },
  {
    id: 4,
    rule: 'VaR Limit Compliance',
    description: 'Daily VaR below $2M threshold',
    status: 'failed',
    lastCheck: '30 minutes ago',
    nextCheck: 'Continuous'
  },
  {
    id: 5,
    rule: 'Derivative Exposure',
    description: 'Derivative notional below 150% of NAV',
    status: 'passed',
    lastCheck: '15 minutes ago',
    nextCheck: 'Real-time'
  }
];

const regulatoryReports = [
  {
    report: 'Form PF',
    dueDate: '2024-02-15',
    status: 'pending',
    progress: 75
  },
  {
    report: 'AIFMD Reporting',
    dueDate: '2024-01-31',
    status: 'submitted',
    progress: 100
  },
  {
    report: 'MiFID II Transaction Reporting',
    dueDate: '2024-01-30',
    status: 'overdue',
    progress: 45
  },
  {
    report: 'EMIR Trade Reporting',
    dueDate: '2024-02-01',
    status: 'draft',
    progress: 30
  }
];

const Compliance = () => {
  const [isRunningCheck, setIsRunningCheck] = useState(false);
  const { toast } = useToast();

  console.log("Compliance page rendered");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default: return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'passed': return <Badge variant="default" className="bg-green-100 text-green-800">Passed</Badge>;
      case 'failed': return <Badge variant="destructive">Failed</Badge>;
      case 'warning': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'submitted': return <Badge variant="default" className="bg-blue-100 text-blue-800">Submitted</Badge>;
      case 'pending': return <Badge variant="secondary">Pending</Badge>;
      case 'overdue': return <Badge variant="destructive">Overdue</Badge>;
      case 'draft': return <Badge variant="outline">Draft</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const runComplianceCheck = async () => {
    setIsRunningCheck(true);
    console.log("Running comprehensive compliance check...");
    
    // Simulate compliance check
    setTimeout(() => {
      setIsRunningCheck(false);
      toast({
        title: "Compliance Check Complete",
        description: "All compliance rules have been re-evaluated. 1 new violation found.",
      });
      console.log("Compliance check completed");
    }, 3000);
  };

  const generateReport = (reportType: string) => {
    console.log("Generating report:", reportType);
    toast({
      title: "Report Generation Started",
      description: `${reportType} report is being generated and will be available shortly.`,
    });
  };

  return (
    <Layout 
      title="Compliance Management" 
      subtitle="Regulatory compliance monitoring and reporting"
    >
      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <Button onClick={runComplianceCheck} disabled={isRunningCheck}>
          {isRunningCheck ? 'Running Check...' : 'Run Compliance Check'}
        </Button>
        <Button variant="outline" onClick={() => generateReport('Compliance Summary')}>
          Generate Report
        </Button>
      </div>

      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rules</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Active compliance rules</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Passed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">3</div>
            <p className="text-xs text-muted-foreground">Rules passing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warnings</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">1</div>
            <p className="text-xs text-muted-foreground">Rules with warnings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Violations</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs text-muted-foreground">Active violations</p>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Rules */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Compliance Rules Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceChecks.map((check) => (
              <div key={check.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getStatusIcon(check.status)}
                  <div>
                    <h4 className="font-medium">{check.rule}</h4>
                    <p className="text-sm text-muted-foreground">{check.description}</p>
                    <p className="text-xs text-muted-foreground">
                      Last check: {check.lastCheck} | Next: {check.nextCheck}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getStatusBadge(check.status)}
                  <Button variant="outline" size="sm">
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Regulatory Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Regulatory Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {regulatoryReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{report.report}</h4>
                  <p className="text-sm text-muted-foreground">Due: {report.dueDate}</p>
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs">Progress:</span>
                      <span className="text-xs font-medium">{report.progress}%</span>
                    </div>
                    <Progress value={report.progress} className="h-2" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {getStatusBadge(report.status)}
                  <Button variant="outline" size="sm">
                    Open
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default Compliance;