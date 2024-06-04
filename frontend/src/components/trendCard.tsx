import React, { ReactNode, useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import { Card } from './card';



const DataKeys = ["jan", "feb", 'mar', "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"] as const;
export interface Series {
  label: string,
  data: {
    [key in typeof DataKeys[number]]?: number;
  },
}


export interface TrendChartProps {
  title: string;
  data: Series[];
  className?: string;
  type?: 'line' | 'bar';
}

export function TrendCard(props: TrendChartProps) {
  const { title, className, type } = props;
  const data = useMemo(() => props.data.map((series) => ({
    label: series.label,
    data: DataKeys.map((key) => ({
      month: key,
      leaves: series.data[key] ?? null,
    })),
  })), [props.data]);

  const primaryAxis = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.month || '',
      formatters: {
        scale: (value: string) => value?.toUpperCase(),
      }
    }),
    []
  );

  const secondaryAxes = React.useMemo<
    AxisOptions<typeof data[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.leaves,
        elementType: type || 'line',
      },
    ],
    []
  );

  return (
    <Card title={title} className={className}>
      <Chart
        options={{
          padding: { left: 0, right: 0, top: 0, bottom: 0 },
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </Card>
  );
}


