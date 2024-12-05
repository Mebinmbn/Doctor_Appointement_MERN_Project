import axios from "axios";
import { useState, useCallback, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
}

interface AxiosError {
  response?: {
    data: {
      error?: string;
    };
  };
}

function PatientLogin() {
  const initialValues: FormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  };

  const { setEmail } = useAuth();
  const [signState, setSignState] = useState("Sign In");
  const [formData, setFormData] = useState<FormValues>(initialValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const navigate = useNavigate();
  const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  const phoneRegex = /^[6-9]\d{9}$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Handle input changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  // Validation function
  const validate = (values: FormValues): FormErrors => {
    const errors: FormErrors = {};

    if (!values.firstName) {
      errors.firstName = "First name is required!";
    } else if (!nameRegex.test(values.firstName)) {
      errors.firstName = "First name contains invalid characters!";
    }

    if (!values.lastName) {
      errors.lastName = "Last name is required!";
    } else if (!nameRegex.test(values.lastName)) {
      errors.lastName = "Last name contains invalid characters!";
    }

    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!values.phone) {
      errors.phone = "Phone is required!";
    } else if (!phoneRegex.test(values.phone)) {
      errors.phone = "Not a valid mobile number";
    }

    if (!values.password) {
      errors.password = "Password is required!";
    } else if (!passwordRegex.test(values.password)) {
      errors.password =
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    return errors;
  };

  // Handle form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validate(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        setEmail(formData.email);

        // Signup request
        const response = await axios.post(
          "http://localhost:8080/api/patients/signup",
          formData,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        console.log("Patient created:", response.data);
        toast.success("Account created, please verify your account");

        // Send OTP request
        await axios.post(
          "http://localhost:8080/api/otp/send",
          { email: formData.email },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        navigate("/otp");
        setFormData(initialValues);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error in signup request:", axiosError);
        if (
          axiosError.response &&
          axiosError.response.data.error ===
            "User already exists with this email"
        ) {
          toast.error(
            "User already exists with this email. Please try logging in."
          );
        } else {
          toast.error("Error in signup. Try again", axiosError.response);
        }
        setFormData(initialValues);
      }
    }
  };

  const validateSigninData = (email: string, password: string) => {
    const errors: FormErrors = {};
    if (!email) {
      errors.email = "Email is required!";
    } else if (!emailRegex.test(email)) {
      errors.email = "This is not a valid email format!";
    }

    if (!password) {
      errors.password = "Password is required!";
    } else if (!passwordRegex.test(password)) {
      errors.password =
        "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a number, and a special character.";
    }
    return errors;
  };

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validateSigninData(formData.email, formData.password);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      try {
        setEmail(formData.email);
        const email = formData.email;
        const password = formData.password;

        // Signup request
        const response = await axios.post(
          "http://localhost:8080/api/patients/signin",
          { email, password },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );

        console.log("Patient signed in:", response.data);
        toast.success("You signed in successfully");

        navigate("/");
        setFormData(initialValues);
      } catch (error) {
        const axiosError = error as AxiosError;
        console.error("Error in signup request:", axiosError);

        toast.error("Invalid Credintials", axiosError.response);

        setFormData(initialValues);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#007E85]">
      <div className="bg-gray-200 h-[35rem] w-96 text-center p-4 rounded-lg drop-shadow-xl border-[1px] border-[#007E85]">
        <h1 className="text-2xl font-bold pt-2 pb-2 text-[#007E85]">
          {signState}
        </h1>
        {signState === "Sign Up" ? (
          <form onSubmit={handleSignup}>
            <InputField
              name="firstName"
              value={formData.firstName}
              error={formErrors.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <InputField
              name="lastName"
              value={formData.lastName}
              error={formErrors.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <InputField
              name="email"
              value={formData.email}
              error={formErrors.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <InputField
              name="phone"
              value={formData.phone}
              error={formErrors.phone}
              onChange={handleChange}
              placeholder="Phone"
            />
            <PassField
              name="password"
              value={formData.password}
              error={formErrors.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <button className="bg-[#007E85] rounded-lg p-2 mt-4 my-2 text-white w-24 font-bold">
              Sign Up
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignIn}>
            <InputField
              name="email"
              value={formData.email}
              error={formErrors.email}
              onChange={handleChange}
              placeholder="Email"
            />
            <PassField
              name="password"
              value={formData.password}
              error={formErrors.password}
              onChange={handleChange}
              placeholder="Password"
            />
            <button className="bg-[#007E85] rounded-lg p-2 mt-4 my-2 text-white w-24 font-bold">
              Sign In
            </button>
          </form>
        )}
        <SwitchForm signState={signState} setSignState={setSignState} />
      </div>
    </div>
  );
}

export default PatientLogin;

const InputField = ({
  name,
  value,
  error,
  onChange,
  placeholder,
}: {
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => (
  <>
    <input
      type="text"
      name={name}
      className="border-[1px] border-[#007E85] rounded-lg h-10 w-80 mt-2 p-2 font-light"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    <p className="font-thin text-red-400 text-sm p-0 m-0">{error}</p>
  </>
);

const PassField = ({
  name,
  value,
  error,
  onChange,
  placeholder,
}: {
  name: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => (
  <>
    <input
      type="password"
      name={name}
      className="border-[1px] border-[#007E85] rounded-lg h-10 w-80 mt-2 p-2 font-light"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    <p className="font-thin text-red-400 text-sm p-0 m-0">{error}</p>
  </>
);

// const SignInForm = () => (
//   <form onSubmit={handleSignIn}>
//     <input
//       type="email"
//       name="email"
//       value={formData.email}
//       error={formErrors.email}
//       onChange={handleChange}
//       className="border-[1px] border-[#007E85] rounded-lg h-10 w-80 my-4 p-2 font-light"
//       placeholder="email"
//     />
//     <input
//       type="password"
//       className="border-[1px] border-[#007E85] rounded-lg h-10 w-80 my-4 p-2 font-light"
//       placeholder="Password"
//     />
//     <p className="position-absolute text-blue-400 text-sm mb-2 ">
//       Forgot password?
//     </p>
//     <button
//       type="submit"
//       className="bg-[#007E85] rounded-lg p-2 my-4 my-2 text-white w-24 font-bold"
//     >
//       Sign In
//     </button>
//   </form>
// );

// Component to Switch Forms
const SwitchForm = ({
  signState,
  setSignState,
}: {
  signState: string;
  setSignState: (state: string) => void;
}) => (
  <div className="form-switch">
    {signState === "Sign Up" ? (
      <p>
        Already have an Account?{" "}
        <span
          onClick={() => {
            setSignState("Sign In");
          }}
          className="text-blue-400 text-sm cursor-pointer"
        >
          Sign In
        </span>
      </p>
    ) : (
      <p>
        New to us?{" "}
        <span
          onClick={() => {
            setSignState("Sign Up");
          }}
          className="text-blue-400 text-sm cursor-pointer"
        >
          Sign Up
        </span>
      </p>
    )}
  </div>
);
