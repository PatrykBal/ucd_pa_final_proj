export const BASE_URL = "https://ucd-pa-final-proj.onrender.com";

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export const AUTH_ENDPOINTS = {
  LOGIN: "/api/token/",
  REGISTER_CLIENT: "/api/register/client/",
  REGISTER_PROVIDER: "/api/register/provider/",
  PROFILE: "/api/profile/me/",
  REFRESH: "/api/token/refresh/",
};

export const PACKAGE_ENDPOINTS = {
  PROVIDERS: "/api/providers/",
  PACKAGES: "/api/packages/",
  SUBSCRIPTIONS: "/api/subscriptions/",
  REVIEWS: "/api/reviews/",
  WORKOUT_PLANS: "/api/workout-plans/",
};

export const USER_TYPES = {
  CLIENT: "CLIENT",
  PROVIDER: "PROVIDER",
};

export const PACKAGE_TYPES = {
  BASIC: "BASIC",
  STANDARD: "STANDARD",
  PREMIUM: "PREMIUM",
};

export const SUBSCRIPTION_STATUS = {
  ACTIVE: "ACTIVE",
  EXPIRED: "EXPIRED",
  CANCELLED: "CANCELLED",
};

// Profile endpoints
export const PROFILE_ENDPOINTS = {
  PROVIDERS: "/api/providers/",
  PROVIDER_DETAIL: (id) => `/api/providers/${id}/`,
  CLIENT_PROFILES: "/api/clients/",
  CLIENT_DETAIL: (id) => `/api/clients/${id}/`,
};
