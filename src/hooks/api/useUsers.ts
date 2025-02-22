import apiClient from '@/services/api';
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async (page: number, perPage: number) => {
  try {
    const { data } = await apiClient.get(`/users?page=${page}&per_page=${perPage}`);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch users');
  }
};

export const useUsers = (page = 1, perPage = 5) => {
  return useQuery({
    queryKey: ['users', page],
    queryFn: () => fetchUsers(page, perPage),
  });
};
