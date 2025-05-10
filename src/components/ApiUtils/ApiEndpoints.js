export const API_HOSTNAME = window.REACT_APP_API_HOSTNAME || "http://localhost:8000";

// Auth Endpoints
export const LOGIN_ENDPOINT = `${API_HOSTNAME}/auth/login/`;
export const LOGOUT_ENDPOINT = `${API_HOSTNAME}/auth/logout/`;
export const REGISTER_ENDPOINT = `${API_HOSTNAME}/auth/register/`;
export const RESEND_EMAIL_VERIFICATION = `${API_HOSTNAME}/auth/resend-email-verification/`;
export const USER_INFO_ENDPOINT = `${API_HOSTNAME}/auth/user-info/`;

// Ecommerce Example (can be removed if unused)
export const PRODUCTS_ENDPOINT = `${API_HOSTNAME}/ecommerce/v1/ecommerce/products/`;

// Data Endpoints
export const USIG_DATA_ENDPOINT = `${API_HOSTNAME}/usig_data/`;

// Fixed Income App Endpoints
export const CURVES_DESCRIPTIONS_ENDPOINT = `${API_HOSTNAME}/fi/v1/curve-descriptions/`;
export const CURVEPOINTS_ENDPOINT = `${API_HOSTNAME}/fi/v1/curve-points/`;
export const CURVEPOINTS_BY_DATE_ENDPOINT = (curveName, adate) =>
  `${API_HOSTNAME}/fi/v1/curve-points/by-date/${curveName}/${adate}/`;
export const CURVEPOINTS_UPLOAD_ENDPOINT = `${API_HOSTNAME}/fi/v1/upload-curve/`;

export const STRESS_SCENARIOS_ENDPOINT = `${API_HOSTNAME}/fi/v1/stress-scenarios/`;
export const STRESS_SCENARIOS_UPLOAD_ENDPOINT = `${API_HOSTNAME}/fi/v1/upload-stress-scenarios/`;

export const STRESS_SCENARIO_DESCRIPTIONS_ENDPOINT = `${API_HOSTNAME}/fi/v1/stress-scenario-descriptions/`;


export const VANILLA_BONDS_ENDPOINT = `${API_HOSTNAME}/fi/v1/vanilla-bonds/`;
export const RISK_CORES_ENDPOINT = `${API_HOSTNAME}/fi/v1/risk-cores/`;
export const RISK_CORES_UPLOAD_ENDPOINT = `${API_HOSTNAME}/fi/v1/upload-calc-risk-cores/`;
export const RISK_SCENARIOS_ENDPOINT = `${API_HOSTNAME}/fi/v1/risk-scenarios/`;
export const POSITIONS_ENDPOINT = `${API_HOSTNAME}/fi/v1/positions/`;
export const SCENARIO_POSITIONS_ENDPOINT = `${API_HOSTNAME}/fi/v1/scenario-positions/`;
export const TRANSACTIONS_ENDPOINT = `${API_HOSTNAME}/fi/v1/transactions/`;
export const ABOR_PNL_ENDPOINT = `${API_HOSTNAME}/fi/v1/aborpnls/`;
