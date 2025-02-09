export const BASE_URL = "https://ucd-pa-final-proj.onrender.com";

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export const AUTH_ENDPOINTS = {
  LOGIN: "/token/", // Remove /api/
  REGISTER_CLIENT: "/register/client/",
  REGISTER_PROVIDER: "/register/provider/",
  PROFILE: "/profile/me/",
  REFRESH: "/token/refresh/",
};

export const PACKAGE_ENDPOINTS = {
  PROVIDERS: "/providers/", // Remove /api/
  PACKAGES: "/packages/",
  SUBSCRIPTIONS: "/subscriptions/",
  REVIEWS: "/reviews/",
  WORKOUT_PLANS: "/workout-plans/",
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
