import { useState } from "react";
import {
  Sprout,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
} from "lucide-react";
import { registerRequest, loginRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const updateField = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setIsSuccess(false);
      setMessage("");

      if (!isLogin) {
        const res = await registerRequest({
          name: form.name,
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        setMessage("Registration successful! Please log in.");
        setIsSuccess(true);
        setIsLogin(true);

        setForm({
          name: "",
          email: "",
          password: "",
        });
      } else {
        const res = await loginRequest({
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
        navigate("/");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong. Please try again."
      );
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = isLogin
    ? form.email && form.password
    : form.name && form.email && form.password;

  return (
    <main
      className="
        relative min-h-screen
        flex items-center justify-center
        px-4 py-6
        sm:px-6 sm:py-10
        bg-cover bg-center bg-no-repeat
      "
      style={{
        backgroundImage: "url('/images/authBackground.png')",
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Auth Card */}
      <div
        className="
          relative z-10
          w-full
          max-w-sm
          sm:max-w-md
          bg-white
          rounded-2xl
          border border-gray-100
          shadow-xl
          p-5
          sm:p-7
          md:p-8
        "
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50">
            <Sprout
              size={20}
              className="text-green-600"
            />
          </div>

          <span className="text-base sm:text-lg font-semibold text-gray-900">
            Farm Companion
          </span>
        </div>

        {/* Heading */}
        <div className="mt-6 text-center">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
            {isLogin
              ? "Welcome back"
              : "Create your account"}
          </h1>

          <p className="mt-1.5 text-xs sm:text-sm text-gray-500">
            {isLogin
              ? "Log in to manage your farm."
              : "Start managing your farm smarter."}
          </p>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`w-full border text-sm rounded-xl px-4 py-3 mt-3 ${isSuccess
                ? "bg-green-50 border-green-200 text-green-600"
                : "bg-red-50 border-red-200 text-red-500"
              }`}
          >
            {message}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 space-y-4"
        >
          {/* Name */}
          {!isLogin && (
            <div>
              <label className="text-xs sm:text-sm font-medium text-gray-700">
                Name
              </label>

              <div className="relative mt-1.5">
                <User
                  size={16}
                  className="
                    absolute left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="text"
                  value={form.name}
                  onChange={updateField("name")}
                  placeholder="John Doe"
                  className="
                    w-full
                    rounded-xl
                    border border-gray-200
                    bg-white
                    py-2.5
                    pl-9
                    pr-3
                    text-base
                    text-gray-900
                    outline-none
                    transition
                    focus:border-green-400
                    focus:ring-2
                    focus:ring-green-100
                  "
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-700">
              Email
            </label>

            <div className="relative mt-1.5">
              <Mail
                size={16}
                className="
                  absolute left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="email"
                value={form.email}
                onChange={updateField("email")}
                placeholder="you@example.com"
                className="
                  w-full
                  rounded-xl
                  border border-gray-200
                  bg-white
                  py-2.5
                  pl-9
                  pr-3
                  text-base
                  text-gray-900
                  outline-none
                  transition
                  focus:border-green-400
                  focus:ring-2
                  focus:ring-green-100
                "
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-xs sm:text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative mt-1.5">
              <Lock
                size={16}
                className="
                  absolute left-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={updateField("password")}
                placeholder="••••••••"
                className="
                  w-full
                  rounded-xl
                  border border-gray-200
                  bg-white
                  py-2.5
                  pl-9
                  pr-10
                  text-base
                  text-gray-900
                  outline-none
                  transition
                  focus:border-green-400
                  focus:ring-2
                  focus:ring-green-100
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="
                  absolute right-3
                  top-1/2
                  -translate-y-1/2
                  p-1
                  text-gray-400
                  hover:text-gray-600
                "
              >
                {showPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          {isLogin && (
            <div className="flex justify-end">
              <a
                href="/forgot-password"
                className="text-xs font-medium text-green-600 hover:text-green-700"
              >
                Forgot password?
              </a>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="
              w-full
              rounded-xl
              bg-green-600
              px-4
              py-2.5
              text-base
              font-medium
              text-white
              transition
              hover:bg-green-700
              disabled:cursor-not-allowed
              disabled:bg-gray-200
              disabled:text-gray-400
            "
          >
            {loading
              ? isLogin
                ? "Logging in..."
                : "Creating account..."
              : isLogin
                ? "Log In"
                : "Create Account"}
          </button>

          {/* Toggle */}
          <p className="pt-1 text-center text-xs sm:text-sm text-gray-500">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsLogin((prev) => !prev);
                setMessage("");
              }}
              className="font-medium text-green-600 hover:text-green-700"
            >
              {isLogin ? "Create Account" : "Login"}
            </button>
          </p>
        </form>
      </div>
    </main>
  );
};

export default Auth;
