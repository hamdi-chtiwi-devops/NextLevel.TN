'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { subject: 'Web Dev', hours: 12, fill: 'var(--color-chart-1)' },
  { subject: 'UI/UX', hours: 8, fill: 'var(--color-chart-2)' },
  { subject: 'Data Sci', hours: 15, fill: 'var(--color-chart-1)' },
  { subject: 'Marketing', hours: 5, fill: 'var(--color-chart-2)' },
];

const chartConfig = {
  hours: {
    label: 'Hours',
  },
};

export function ProgressOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Activity</CardTitle>
        <CardDescription>Hours spent by subject this month</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0}}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="subject"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 6)}
            />
             <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `${value}h`}
            />
            <Tooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="hours" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
