import { ChartLine } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

import { ProfileData } from '@/types/page/profile';

export const Analytic = (profileData: ProfileData) => {
  // Chart configuration for shadcn
  const chartConfig = {
    value: {
      label: 'Value',
    },
  };

  return (
    <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
          <ChartLine size={20} className="text-orange-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Analitik</h2>
      </div>

      {/* Shadcn Chart */}
      <div className="h-fit">
        <ChartContainer config={chartConfig}>
          <BarChart
            data={profileData.chartData}
            margin={{ top: 0, right: 20, left: -20, bottom: 0 }}
          >
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{ fill: 'rgba(0, 0, 0, 0.1)' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};
