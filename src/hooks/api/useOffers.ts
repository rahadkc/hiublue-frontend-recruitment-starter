import apiClient from '@/services/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type Offer = {
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
  data: Offer[];
  links: Links;
  meta: Meta;
};

type PlanType = 'monthly' | 'yearly' | 'pay_as_you_go';
type Addition = 'refundable' | 'on_demand' | 'negotiable';

type OfferRequest = {
  plan_type: PlanType;
  additions: Addition[];
  user_id: number;
  expired: string; // ISO date format (e.g., "YYYY-MM-DD")
  price: number;
};

type OfferCreationResponse = {
  message: string;
  data: OfferRequest;
};

const fetchOffers = async (page: number, perPage: number) => {
  try {
    const { data } = await apiClient.get<OffersResponse>(
      `/offers?page=${page}&per_page=${perPage}`,
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
    const { data } = await apiClient.post<OfferCreationResponse>('/offers', offerData);
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error('Failed to create offer');
  }
};

const useOffers = (page = 1, perPage = 5) => {
  return useQuery({
    queryKey: ['offers', page],
    queryFn: () => fetchOffers(page, perPage),
  });
};

// const useCreateOffer = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: createOffer,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['offers'] });
//     },
//     onError: (error: unknown) => {
//       if (error instanceof Error) {
//         throw new Error(error.message);
//       }
//       throw new Error('Error creating offer');
//     },
//   });
// };

// const useCreateOffer = () => {
//   const queryClient = useQueryClient();
//   return useMutation<OfferRequest, Error, OfferRequest>({
//     mutationFn: createOffer,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['offers'] });
//     },
//     onError: (error: unknown) => {
//       if (error instanceof Error) {
//         throw new Error(error.message);
//       }
//       throw new Error('Error creating offer');
//     },
//   });
// };

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

export { useCreateOffer, useOffers, type Offer, type PlanType, type Addition };
