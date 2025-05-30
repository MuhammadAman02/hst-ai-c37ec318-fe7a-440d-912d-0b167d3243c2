import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface PortfolioPosition {
  symbol: string;
  name: string;
  allocation: number;
  value: number;
  var: number;
  beta: number;
  riskLevel: "Low" | "Medium" | "High";
}

const mockPositions: PortfolioPosition[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    allocation: 15.2,
    value: 2450000,
    var: 125000,
    beta: 1.2,
    riskLevel: "Medium"
  },
  {
    symbol: "MSFT", 
    name: "Microsoft Corp.",
    allocation: 12.8,
    value: 2080000,
    var: 98000,
    beta: 0.9,
    riskLevel: "Low"
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    allocation: 8.5,
    value: 1375000,
    var: 185000,
    beta: 2.1,
    riskLevel: "High"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    allocation: 10.3,
    value: 1665000,
    var: 142000,
    beta: 1.1,
    riskLevel: "Medium"
  }
];

export function PortfolioTable() {
  console.log("PortfolioTable rendered with positions:", mockPositions);
  
  const getRiskBadgeVariant = (riskLevel: string) => {
    switch (riskLevel) {
      case "High": return "destructive";
      case "Medium": return "secondary";
      default: return "default";
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Portfolio Positions</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Allocation %</TableHead>
            <TableHead className="text-right">Market Value</TableHead>
            <TableHead className="text-right">VaR (1D)</TableHead>
            <TableHead className="text-right">Beta</TableHead>
            <TableHead>Risk Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockPositions.map((position) => (
            <TableRow key={position.symbol}>
              <TableCell className="font-medium">{position.symbol}</TableCell>
              <TableCell>{position.name}</TableCell>
              <TableCell className="text-right">{position.allocation}%</TableCell>
              <TableCell className="text-right">{formatCurrency(position.value)}</TableCell>
              <TableCell className="text-right text-red-400">{formatCurrency(position.var)}</TableCell>
              <TableCell className="text-right">{position.beta}</TableCell>
              <TableCell>
                <Badge variant={getRiskBadgeVariant(position.riskLevel)}>
                  {position.riskLevel}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}