export const ROUTES = {
  dashboard: '/dashboard',
  onboarding: '/onboarding',
  login: '/login',
} as const;

export const ENDPOINTS = {
  login: '/login',
  summary: '/dashboard/summary',
  stat: '/dashboard/stat',
  offer: '/offers',
  users: '/users',
} as const;

export const MESSAGES = {
  CREATE_OFFER_SUCCESS: 'Create Offer successfully!',
  CREATE_OFFER_FAIL: 'Failed to Create Offer.',
} as const;

export const WIDGET_TEXT = {
  TOTAL_USERS: 'Total Active Users',
  CLICKS: 'Total Clicks',
  APPEARANCE: 'Total Appearances',
  TREND: 'previous month',
} as const;
