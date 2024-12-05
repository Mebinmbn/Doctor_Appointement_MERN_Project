const otpMap = new Map<string, string>();

export const generateOTP = (email: string): string => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit OTP
  otpMap.set(email, otp);
  // Expire the OTP after 5 minutes
  setTimeout(() => otpMap.delete(email), 5 * 60 * 1000);
  return otp;
};

export const verifyOTP = (email: string, otp: string): boolean => {
  const storedOtp = otpMap.get(email);
  console.log(otpMap);
  if (storedOtp === otp) {
    otpMap.delete(email);
    return true;
  }
  return false;
};
