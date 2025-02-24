'use client';

import { useDashboardStat } from '@/hooks/api/useDashboardStat';
import { Card, Skeleton, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartData {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

const OffersSentChart = () => {
  const theme = useTheme();
  const { data, isLoading, error } = useDashboardStat('this-week');

  const [chartData, setChartData] = useState<ChartData>({
    series: [],
    categories: [],
  });

  useEffect(() => {
    if (data?.offers_sent) {
      const categories = Object.keys(data.offers_sent).map(
        (day) => day.charAt(0).toUpperCase() + day.slice(1),
      );

      const seriesData = Object.values(data.offers_sent);

      setChartData({
        series: [
          {
            name: 'Offers Sent',
            data: seriesData,
          },
        ],
        categories,
      });
    }
  }, [data]);

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    stroke: {
      curve: 'smooth',
      width: 4,
    },
    colors: [theme.palette.text.primary],
    markers: {
      size: 0,
      hover: {
        size: 6,
        sizeOffset: 3,
      },
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        style: {
          colors: theme.palette.grey[600],
        },
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      tickAmount: 5,
      labels: {
        style: {
          colors: theme.palette.grey[600],
        },
        formatter: (value: number) => `${value}`,
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: (value: number) => `${value} offers`,
      },
    },
  };

  if (isLoading)
    return (
      <Card sx={{ padding: 3 }}>
        <Skeleton variant="rectangular" width="100%" height={341} />
      </Card>
    );

  if (error) return <Card>Error loading data.</Card>;

  return <Chart options={options} series={chartData.series} type="line" height={350} />;
};

export default OffersSentChart;
