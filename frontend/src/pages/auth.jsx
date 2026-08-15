import { useState } from "react";
import { Sprout, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { registerRequest, loginRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // true = login view, false = signup view
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(""); // for displaying error/success messages
  const [loading, setLoading] = useState(false); // for showing a loading spinner during API calls
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const updateField = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  // Placeholder — wire up real auth calls later
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin) {
      try {
        setLoading(true);
        const res = await registerRequest({
          name: form.name,
          email: form.email,
          password: form.password,
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        setMessage("Registration successful! Please log in.");
        setIsLogin(true); // Switch to login view after successful registration
        setForm({ name: "", email: "", password: "" }); // Clear form fields
      } catch (error) {
        setMessage(error.response?.data?.message || error.message || "An error occurred during registration.");
      } finally {
        setLoading(false);
        setMessage(""); // Clear message after a short delay
      }
    } else {
      try {
        setLoading(true);
        const res = await loginRequest({
          email: form.email,
          password: form.password,
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
        navigate("/"); // Redirect to dashboard upon successful login
      } catch (error) {
        setMessage(
          error.response?.data?.message || error.message || "An error occurred during login."
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const isFormValid = isLogin
    ? form.email && form.password
    : form.name && form.email && form.password;

  return (
    <div className="min-h-screen bg-gray-50 flex relative items-center justify-center p-4 inset-0 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/authBackground.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className=" absolute z-10 w-full max-w-sm bg-white rounded-2xl border border-gray-100 p-8 space-y-6">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2">
          <Sprout size={24} className="text-green-600" />
          <span className="font-semibold text-gray-900 text-lg">Farm Companion</span>
        </div>

        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {isLogin ? "Log in to manage your farm." : "Start managing your farm smarter."}
          </p>
        </div>

        {message && (
          <div className="w-full bg-red-50 border border-red-200 text-red-500 text-sm rounded-xl px-4 py-3 mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name — signup only */}
          {!isLogin && (
            <div>
              <label className="text-sm text-gray-700 font-medium">Name</label>
              <div className="relative mt-1">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={form.name}
                  onChange={updateField("name")}
                  placeholder="John Doe"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>
            </div>
          )}

          {/* Email */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Email</label>
            <div className="relative mt-1">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={form.email}
                onChange={updateField("email")}
                placeholder="you@example.com"
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Password</label>
            <div className="relative mt-1">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={updateField("password")}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Forgot password — login only */}
          {isLogin && (
            <div className="flex justify-end">
              <a href="/forgot-password" className="text-xs text-green-600">Forgot password?</a>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className="w-full bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm py-2.5 rounded-lg hover:bg-green-700 transition-colors"
          >
            {loading ? (isLogin ? "loggin in..." : "Registering...") : (isLogin ? "Log In" : "Create Account")}
          </button>

          {/* Switch between login/signup — this is the state-driven toggle */}
          <p className="text-center text-sm text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-green-600 font-medium"
            >
              {
                isLogin ? 'Create Account' : 'Login'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Auth;
