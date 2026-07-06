import { useState } from "react";
import { Sprout, Mail, Lock, User, Eye, EyeOff } from "lucide-react";

// ---- Expected user shape once auth is wired up ----
// {
//   id: string,
//   name: string,
//   email: string,
//   location: string,      // captured after first login, reused for Add Farm
//   farmFocus: "crop" | "livestock" | "both"
// }

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true); // true = login view, false = signup view
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const updateField = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  // Placeholder — wire up real auth calls later
  const handleSubmit = () => {
    console.log(isLogin ? "login" : "signup", form);
  };

  const isFormValid = isLogin
    ? form.email && form.password
    : form.name && form.email && form.password;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-100 p-8 space-y-6">
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
                placeholder="Daniel Ejimofor"
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
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="w-full bg-green-600 disabled:bg-gray-200 disabled:text-gray-400 text-white text-sm py-2.5 rounded-lg hover:bg-green-700 transition-colors"
        >
          {isLogin ? "Log In" : "Create Account"}
        </button>

        {/* Switch between login/signup — this is the state-driven toggle */}
        <p className="text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-600 font-medium"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
