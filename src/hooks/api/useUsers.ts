import { ENDPOINTS } from '@/lib/constants';
import apiClient from '@/services/api';
import { useQuery } from '@tanstack/react-query';

export type User = {
  id: number;
  name: string;
  email: string;
};

export type PaginationLinks = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

export type PaginationMeta = {
  current_page: number;
  from: number;
  last_page: number;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type UsersResponse = {
  data: User[];
  links: PaginationLinks;
  meta: PaginationMeta;
};

const fetchUsers = async (page: number, perPage: number): Promise<UsersResponse> => {
  try {
    const { data } = await apiClient.get<UsersResponse>(
      `${ENDPOINTS.users}?page=${page}&per_page=${perPage}`,
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch users');
  }
};

export const useUsers = (page = 1, perPage = 5) => {
  return useQuery<UsersResponse>({
    queryKey: ['users', page, perPage],
    queryFn: () => fetchUsers(page, perPage),
  });
};
