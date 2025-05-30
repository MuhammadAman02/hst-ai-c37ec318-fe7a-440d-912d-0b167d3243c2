import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RiskChartProps {
  data: Array<{
    date: string;
    var: number;
    expectedShortfall: number;
  }>;
  title: string;
}

export function RiskChart({ data, title }: RiskChartProps) {
  console.log("RiskChart rendered with data:", data);
  
  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="date" 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <YAxis 
            stroke="#9CA3AF"
            fontSize={12}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '6px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="var" 
            stroke="#3B82F6" 
            strokeWidth={2}
            name="Value at Risk"
          />
          <Line 
            type="monotone" 
            dataKey="expectedShortfall" 
            stroke="#EF4444" 
            strokeWidth={2}
            name="Expected Shortfall"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}