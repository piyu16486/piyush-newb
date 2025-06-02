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
  apiSaveBasicDetails: '/client-info-master/basic-details',
  apiSaveClientFirmDerails: '/client-info-master/client-firm-details/12',
  apiSaveVendorDetails: '/client-info-master/vendor-details/12',
  apiSaveVisitDetails: '/client-info-master/follow-up/12',

  // Report apis
  apiGetReport: '/client-info-master/remark-reports',

  // Lead apis
  apiGetLeadProgress: '/client-info-master/6/lead-progress',

  // Tasks apis
  apiGetTaskHistory: '/client-info-master/john.doe@example.com/tasks',

  // Kyc Apis
  apiKycProfilePic: '/client-info-master/personal-kyc/profile',
  apiKycResidenceDetail: '/client-info-master/personal-kyc/residence',
  apiKycPanUpload: '/client-info-master/personal-kyc/pan',
} as const;

export default Endpoints;
