"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { DataKey } from "recharts/types/util/types";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ChartProps<T> {
  chartConfig: ChartConfig;
  chartData: T[];
  barKey: DataKey<keyof T>;
  dataKey: DataKey<keyof T>;
  title: string;
  description: string;
  footer?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Chart<T extends Record<string, any>>({
  chartConfig,
  chartData,
  dataKey,
  barKey,
  description,
  title,
  footer,
}: ChartProps<T>) {
  return (
    <Card className="bg-secondary">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={dataKey}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey={barKey} fill={`var(--color-${barKey})`} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
}
