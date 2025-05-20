const Endpoints = {
  // Auth apis
  apiSignup: '/auth/signup',
  apiSigninOtpVerify: '/auth/verify-otp-from-email',
  apiCreatePassword: '/auth/create-password',
  apiForgotPassword: '/auth/forgot-password',
  apiResetPassword: '/auth/reset-password',
  apiSignin: '/auth/login',

  // TODO
  apiOtpVerify: '/auth/verify-otp',
  apiResendOtp: '/auth/resend-otp',

  // Client apis
  apiGetAllClients: '/client-info-master/list',

  // Report apis
  apiGetReport: '/client-info-master/remark-reports',

  // Lead apis
  apiGetLeadProgress: '/client-info-master/6/lead-progress',

  // Tasks apis
  apiGetTaskHistory: '/client-info-master/john.doe@example.com/tasks',
} as const;

export default Endpoints;
