import { ENDPOINTS } from '@/lib/constants';
import apiClient from '@/services/api';
import { useQuery } from '@tanstack/react-query';

type DashboardMetrics = {
  active_users: number;
  clicks: number;
  appearance: number;
};

export type DashboardSummary = {
  current: DashboardMetrics;
  previous: DashboardMetrics;
};

const fetchDashboardSummary = async (filter: string): Promise<DashboardSummary> => {
  try {
    const { data } = await apiClient.get<DashboardSummary>(`${ENDPOINTS.summary}?filter=${filter}`);

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error fetching dashboard');
  }
};

export const useDashboardSummary = (filter: string) => {
  return useQuery({
    queryKey: ['dashboardSummary'],
    queryFn: () => fetchDashboardSummary(filter),
  });
};
