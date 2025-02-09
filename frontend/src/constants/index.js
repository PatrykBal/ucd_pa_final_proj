export const BASE_URL = "https://ucd-pa-final-proj.onrender.com";

export const ACCESS_TOKEN = "accessToken";
export const REFRESH_TOKEN = "refreshToken";

export const AUTH_ENDPOINTS = {
  LOGIN: "/token/",
  REGISTER_CLIENT: "/register/client/",
  REGISTER_PROVIDER: "/register/provider/",
  PROFILE: "/profile/me/",  // Make sure this matches your Django URL
  REFRESH: "/token/refresh/",
};

export const PACKAGE_ENDPOINTS = {
  PROVIDERS: "/providers/",
  PACKAGES: "/packages/",
  SUBSCRIPTIONS: "/subscriptions/",
  REVIEWS: "/reviews/",
  WORKOUT_PLANS: "/workout-plans/",
};

// Profile endpoints
export const PROFILE_ENDPOINTS = {
  PROVIDERS: "/providers/",
  PROVIDER_DETAIL: (id) => `/providers/${id}/`,
  CLIENT_PROFILES: "/clients/",
  CLIENT_DETAIL: (id) => `/clients/${id}/`,
}; 