import React, { FormEvent, useCallback, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OTPVerification = () => {
  const initialValue = {
    one: "",
    two: "",
    three: "",
    four: "",
  };
  const navigate = useNavigate();
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpValues, setOtpValues] = useState(initialValue);
  const { email } = useAuth();

  const onChangeHandle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setOtpValues((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    },
    []
  );

  const verifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    const otp =
      otpValues.one + otpValues.two + otpValues.three + otpValues.four;
    console.log(otp);
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/otp/verify",
        {
          email,
          otp,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      toast.success("OTP verified successfully. Your email is verified.");
      setOtpValues(initialValue);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost:8080/otp/send", {
        email,
      });
      setIsOtpSent(true);
      console.log(response);
      toast.success("OTP sent successfully. Please check your email.");
      setOtpValues(initialValue);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#007E85]">
      <div className="bg-gray-200 bor h-[20rem] w-96   text-center p-4 rounded-lg drop-shadow-xl border-[1px] border-[#007E85]">
        <h1 className="text-2xl font-bold pt-2 pb-2 text-[#007E85]">
          OTP Verification
        </h1>
        <p className="m-4">Enter your otp</p>
        <form onSubmit={verifyOtp}>
          <div className="flex justify-between text-center w-64 mx-auto mt-5">
            <input
              type="text"
              name="one"
              value={otpValues.one}
              onChange={onChangeHandle}
              className="h-12 w-12 border-[1px] border-[#007E85] bg-blue-100 text-center"
            />
            <input
              type="text"
              name="two"
              value={otpValues.two}
              onChange={onChangeHandle}
              className="h-12 w-12 border-[1px] border-[#007E85] bg-blue-100 text-center"
            />
            <input
              type="text"
              name="three"
              value={otpValues.three}
              onChange={onChangeHandle}
              className="h-12 w-12 border-[1px] border-[#007E85] bg-blue-100 text-center"
            />
            <input
              type="text"
              name="four"
              value={otpValues.four}
              onChange={onChangeHandle}
              className="h-12 w-12 border-[1px] border-[#007E85] bg-blue-100 text-center"
            />
          </div>
          <p className="mt-5">
            didn't get the otp?{" "}
            <span
              className="text-blue-800 cursor-pointer"
              onClick={handleResendClick}
            >
              Resend otp
            </span>
          </p>
          <button
            type="submit"
            className="bg-[#007E85] rounded-lg w-20 h-10 text-white m-4"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
