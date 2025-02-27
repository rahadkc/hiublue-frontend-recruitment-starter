import { ENDPOINTS } from '@/lib/constants';
import apiClient from '@/services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type OfferType = {
  id: number;
  user_name: string;
  email: string;
  phone: string;
  company: string;
  jobTitle: string;
  status: 'accepted' | 'rejected' | 'pending';
  type: 'yearly' | 'monthly';
  price: number;
};

type Links = {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
};

type Meta = {
  current_page: number;
  from: number;
  last_page: number;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

type OffersResponse = {
  data: OfferType[];
  links: Links;
  meta: Meta;
};

export type PlanType = 'monthly' | 'yearly' | 'pay_as_you_go';
export type Addition = 'refundable' | 'on_demand' | 'negotiable';
export type StatusType = 'accepted' | 'rejected' | 'pending';

type OfferRequest = {
  plan_type: PlanType;
  additions: Addition[];
  user_id: number;
  expired: Date;
  price: number;
};

type OfferCreationResponse = {
  message: string;
  data: OfferRequest;
};

const fetchOffers = async (
  page: number,
  perPage: number,
  search: string,
  type?: PlanType | '',
  status?: StatusType | '',
) => {
  try {
    const effectivePage = search ? 1 : page;

    const { data } = await apiClient.get<OffersResponse>(
      `${ENDPOINTS.offer}?page=${effectivePage}&per_page=${perPage}&search=${search}&type=${type || ''}&status=${status || ''}`,
    );
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to fetch offers');
  }
};

const createOffer = async (offerData: OfferRequest): Promise<OfferCreationResponse> => {
  try {
    const { data } = await apiClient.post<OfferCreationResponse>(ENDPOINTS.offer, offerData);

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to create offer');
  }
};

// const useOffers = (page = 1, perPage = 5, search = '', type= '' , status = '') => {
//   return useQuery({
//     queryKey: ['offers', page],
//     queryFn: () => fetchOffers(page, perPage, search, type, status),
//   });
// };

const useOffers = (
  page = 1,
  perPage = 5,
  search = '',
  type?: PlanType | '',
  status?: StatusType | '',
) => {
  return useQuery({
    queryKey: ['offers', page, search, type, status],
    queryFn: () => fetchOffers(page, perPage, search, type, status),
  });
};

const useCreateOffer = () => {
  const queryClient = useQueryClient();

  return useMutation<OfferCreationResponse, Error, OfferRequest>({
    mutationFn: createOffer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('Error creating offer');
    },
  });
};

export { useCreateOffer, useOffers };
