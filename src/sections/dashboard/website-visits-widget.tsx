'use client';

import { useDashboardStat } from '@/hooks/api/useDashboardStat';
import { WIDGET_TEXT } from '@/lib/constants';
import { Card, CardHeader, Grid2 as Grid, Skeleton, useTheme } from '@mui/material';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const WebsiteVisitsChart = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'this-week';
  const { data, isLoading, error } = useDashboardStat(filter);
  const theme = useTheme();

  const defaultData = {
    website_visits: {
      monday: { desktop: 0, mobile: 0 },
      tuesday: { desktop: 0, mobile: 0 },
      wednesday: { desktop: 0, mobile: 0 },
      thursday: { desktop: 0, mobile: 0 },
      friday: { desktop: 0, mobile: 0 },
      saturday: { desktop: 0, mobile: 0 },
      sunday: { desktop: 0, mobile: 0 },
    },
  };

  const summary = data?.website_visits || defaultData.website_visits;

  // Extract days
  const categories = Object.keys(summary).map((day) => day.charAt(0).toUpperCase() + day.slice(1));

  // Extract values for desktop & mobile
  const desktopData = Object.values(summary).map((day) => day.desktop);
  const mobileData = Object.values(summary).map((day) => day.mobile);

  const series = [
    {
      name: 'Desktop',
      data: desktopData,
    },
    {
      name: 'Mobile',
      data: mobileData,
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: false,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
      },
    },
    colors: [theme.palette.success.dark, theme.palette.warning.main],
    dataLabels: { enabled: false },
    xaxis: { categories },
    legend: { position: 'top', horizontalAlign: 'right' },
    tooltip: { y: { formatter: (val: number) => `${val} visits` } },
  };

  if (isLoading)
    return (
      <Card sx={{ padding: 3 }}>
        <Skeleton variant="rectangular" width="100%" height={341} />
      </Card>
    );
  if (error) return <Card sx={{ padding: 3 }}>Sorry! no data.</Card>;

  return <Chart options={options} series={series} type="bar" height={350} />;
};

export default WebsiteVisitsChart;
