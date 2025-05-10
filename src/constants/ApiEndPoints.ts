const Endpoints = {
  apiSignup: '/auth/signup',
  apiSigninOtpVerify: '/auth/verify-otp-from-email',
  apiCreatePassword: '/auth/create-password',
  apiForgotPassword: '/auth/forgot-password',
  apiResetPassword: '/auth/reset-password',

  apiSignin: '/auth/signin',
  apiOtpVerify: '/auth/verify-otp',
  apiVerifyPassword: '/auth/verify-password',
  apiResendOtp: '/auth/resend-otp',
} as const;

export default Endpoints;
