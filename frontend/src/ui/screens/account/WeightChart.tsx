import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React from 'react';
import { useTheme } from 'styled-components';

type ProgressData = {
  timestamp: string;
  weight: number;
};

type WeightChartProps = {
  data: ProgressData[];
};

const WeightChart = ({ data }: WeightChartProps) => {
  const theme = useTheme();

  const options = {
    chart: {
      type: 'spline',
    },
    colors: [theme.palette.secondary],
    title: {
      text: 'Weight Progress',
    },
    xAxis: {
      labels: {
        enabled: false,
      },
      tickWidth: 0,
    },
    yAxis: {
      title: {
        text: 'Weight (kg)',
      },
    },
    legend: {
      enabled: false,
    },
    credits: {
      enabled: false,
    },
    tooltip: {
      formatter: function (): string {
        const currentPoint = this as unknown as Highcharts.Point & {
          customLabel: string;
        };
        const currentPointValue = currentPoint.y;
        console.log('currentPointValue', currentPoint);

        if (!currentPointValue) return '';

        const newestPoint = data[data.length - 1];
        const wasPreviousPointSmaller = newestPoint?.weight < currentPointValue;
        const percentageChange =
          (currentPointValue / newestPoint?.weight) * 100;

        const percentageValue = wasPreviousPointSmaller
          ? percentageChange - 100
          : 100 - percentageChange;

        const changeString =
          newestPoint && percentageValue !== 0
            ? `(${percentageValue.toFixed()}% ${wasPreviousPointSmaller ? 'More' : 'Less'} then the most recent weight).`
            : '(Same as the most recent weight)';

        const xAxisDatamax = (
          currentPoint.series.xAxis as unknown as {
            dataMax: number;
          }
        ).dataMax;

        const parsedChangeString =
          xAxisDatamax === currentPoint.x ? '' : changeString;

        return (
          `Your weight on <b>${currentPoint.customLabel}</b> was <b>${currentPointValue} kg</b><br/>` +
          parsedChangeString
        );
      },
    },
    series: [
      {
        marker: {
          enabled: true,
        },
        data: data?.map((progress) => ({
          y: progress.weight,
          customLabel: new Date(progress.timestamp).toLocaleDateString(),
        })),
      },
    ],
  };
  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  );
};

export default WeightChart;
