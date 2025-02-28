'use client';

import CardWidget from '@/components/ui/card-widget';
import CardSkeleton from '@/components/ui/skeletons/card';
import { useDashboardSummary } from '@/hooks/api/useDashboardSummary';
import { WIDGET_TEXT } from '@/lib/constants';
import Grid from '@mui/material/Grid2';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const Summary = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter') || 'this-week';
  const { data, isLoading, error } = useDashboardSummary(filter);

  const current = data?.current || { active_users: 0, clicks: 0, appearance: 0 };
  const previous = data?.previous || { active_users: 0, clicks: 0, appearance: 0 };

  const getTrend = (curr: number, prev: number) => {
    if (prev === 0) return { trend: '0%', isPositive: true };
    const change = ((curr - prev) / prev) * 100;
    return {
      trend: `${change.toFixed(1)}% ${WIDGET_TEXT.TREND}`,
      isPositive: change > 0,
    };
  };

  const activeUsersTrend = getTrend(current.active_users, previous.active_users);
  const clicksTrend = getTrend(current.clicks, previous.clicks);
  const appearanceTrend = getTrend(current.appearance, previous.appearance);

  if (error) return <Grid container>Sorry, something is wrong.</Grid>;

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <CardWidget
            title={WIDGET_TEXT.TOTAL_USERS}
            value={current.active_users.toLocaleString()}
            {...activeUsersTrend}
          />
        )}
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <CardWidget
            title={WIDGET_TEXT.CLICKS}
            value={current.clicks.toLocaleString()}
            {...clicksTrend}
          />
        )}
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        {isLoading ? (
          <CardSkeleton />
        ) : (
          <CardWidget
            title={WIDGET_TEXT.APPEARANCE}
            value={current.appearance.toLocaleString()}
            {...appearanceTrend}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default Summary;
