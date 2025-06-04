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
  apiSaveClientFirmDerails: '/client-info-master/client-firm-details/16',
  apiSaveVendorDetails: '/client-info-master/vendor-details/16',
  apiSaveVisitDetails: '/client-info-master/follow-up/16',

  // Report apis
  apiGetReport: '/client-info-master/remark-reports',

  // Lead apis
  apiGetLeadProgress: '/client-info-master/16/lead-progress',

  // Tasks apis
  apiGetTaskHistory: '/client-info-master/john.doe@example.com/tasks',

  // Kyc Apis --
  // Personal Tab
  apiKycProfilePic: '/client-info-master/personal-kyc/profile',
  apiKycPanUpload: '/client-info-master/personal-kyc/pan',
  apiKycAadharUpload: '/client-info-master/personal-kyc/aadhar',
  apiKycResidenceDetail: '/client-info-master/personal-kyc/residence',
  // Business Tab
  apiUdhyamCertificate: '/client-info-master/business-kyc/udhyam',
  apiGstDocument: '/client-info-master/business-kyc/gst',
  apiGodownDetails: '/client-info-master/business-kyc/godown',
  apiCompanyPanDetails: '/client-info-master/business-kyc/pan',
  apiShareholding: '/client-info-master/business-kyc/share-holding',
  apiCompanyInformation: '/client-info-master/business-kyc/company-docs',
  // Get Api to check document uploaded or not
  apiGetKycChecked: '/client-info-master/personal-kyc/check/16',

  // BankList dropdown
  apiBankList: '/client-info-master/bank-list',
} as const;

export default Endpoints;
