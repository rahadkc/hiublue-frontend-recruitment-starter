import { z } from 'zod';

// Enums
export const PlanTypeEnum = z.enum(['pay_as_you_go', 'monthly', 'yearly'], {
  required_error: 'Plan type is required',
});
export const AdditionEnum = z.enum(['refundable', 'on_demand', 'negotiable']);

// Schema
export const offerSchema = z.object({
  plan_type: PlanTypeEnum,
  additions: z
    .array(AdditionEnum, {
      required_error: 'At least one addition is required',
    })
    .min(1, 'At least one addition is required'),
  user_id: z.preprocess(
    (val) => (val === '' ? undefined : val),
    z.number().min(1, 'User ID is required'),
  ),
  expired: z.date(),
  price: z
    .number({
      required_error: 'Price is required',
    })
    .min(0, 'Price must be a positive number'),
});

// TypeScript Type from Schema
export type OfferFormData = z.infer<typeof offerSchema>;
