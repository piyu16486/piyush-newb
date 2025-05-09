const Endpoints = {
  apiSignup: '/auth/signup',
  apiSigninOtpVerify: '/auth/verify-otp-from-email',
  apiCreatePassword: '/auth/create-password',
  
  apiSignin: '/auth/signin',
  apiOtpVerify: '/auth/verify-otp',
  apiForgotPassword: '/auth/forgot-password',
  apiVerifyPassword: '/auth/verify-password',
  apiResendOtp: '/auth/resend-otp',
} as const;

export default Endpoints;
