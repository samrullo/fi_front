export const API_HOSTNAME = window.REACT_APP_API_HOSTNAME || "http://localhost:8000";

export const LOGIN_ENDPOINT = `${API_HOSTNAME}/auth/login/`;
export const LOGOUT_ENDPOINT = `${API_HOSTNAME}/auth/logout/`;
export const REGISTER_ENDPOINT = `${API_HOSTNAME}/auth/register/`;
export const RESEND_EMAIL_VERIFICATION = `${API_HOSTNAME}/auth/resend-email-verification/`;
export const USER_INFO_ENDPOINT = `${API_HOSTNAME}/auth/user-info/`;

export const PRODUCTS_ENDPOINT = `${API_HOSTNAME}/ecommerce/v1/ecommerce/products/`;

export const USIG_DATA_ENDPOINT = `${API_HOSTNAME}/usig_data/`;
export const CURVES_ENDPOINT = `${API_HOSTNAME}/fi/v1/curves/`;
export const CURVEPOINTS_ENDPOINT = `${API_HOSTNAME}/fi/v1/curve-points/`;
export const STRESS_SCENARIOS_ENDPOINT = `${API_HOSTNAME}/fi/v1/stress-scenarios/`;