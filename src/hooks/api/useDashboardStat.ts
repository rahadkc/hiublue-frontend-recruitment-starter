import { ENDPOINTS } from '@/lib/constants';
import apiClient from '@/services/api';
import { useQuery } from '@tanstack/react-query';

type Day = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

type WebsiteVisits = {
  desktop: number;
  mobile: number;
};

export type DashboardStat = {
  website_visits: Record<Day, WebsiteVisits>;
  offers_sent: Record<Day, number>;
};

export const fetchDashboardStat = async (filter: string): Promise<DashboardStat> => {
  try {
    const { data } = await apiClient.get<DashboardStat>(`${ENDPOINTS.stat}?filter=${filter}`);

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Error fetching dashboard');
  }
};

export const useDashboardStat = (filter: string) => {
  return useQuery({
    queryKey: ['dashboardStat'],
    queryFn: () => fetchDashboardStat(filter),
    refetchInterval: 15000,
    staleTime: 10000,
  });
};
