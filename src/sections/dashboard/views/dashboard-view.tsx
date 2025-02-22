'use client';

import { useDashboardSummary } from '@/hooks/api/useDashboardSummary';

// const offerData = {
//   plan_type: 'monthly' as PlanType,
//   additions: ['refundable'] as Addition[],
//   user_id: 1,
//   expired: '2025-12-31',
//   price: 99.99,
// };
export default function DashboardView() {
  const { data, isError, error } = useDashboardSummary('this-week');
  // const { data, isError, error } = useOffers(1, 10);
  // const createOfferMutation = useCreateOffer();

  console.log({ data, isError, error });
  // const createOffer = () => {
  //   createOfferMutation.mutate(offerData, {
  //     onSuccess: (response) => {
  //       console.log('Offer created:', response.data);
  //     },
  //   });
  // };
  // useEffect(() => {
  //   createOffer();
  // }, []);
  return <>Dashboard View</>;
}
