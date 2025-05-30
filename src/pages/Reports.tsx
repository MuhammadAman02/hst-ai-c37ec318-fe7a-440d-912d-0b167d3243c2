import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, Filter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
  const { toast } = useToast();
  console.log("Reports page rendered");

  const generateReport = (type: string) => {
    console.log("Generating report:", type);
    toast({
      title: "Report Generated",
      description: `${type} report has been generated successfully.`,
    });
  };

  return (
    <Layout title="Risk Reports" subtitle="Generate and manage risk reports">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Daily Risk Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Comprehensive daily risk metrics and analysis
            </p>
            <Button onClick={() => generateReport('Daily Risk Report')} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Portfolio Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Detailed portfolio composition and risk breakdown
            </p>
            <Button onClick={() => generateReport('Portfolio Analysis')} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Compliance Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Regulatory compliance status and violations
            </p>
            <Button onClick={() => generateReport('Compliance Report')} className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Reports;