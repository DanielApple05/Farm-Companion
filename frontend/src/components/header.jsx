import { Search, Sprout, CloudSun, Loader2, AlertCircle } from "lucide-react";
import { getUserName, getInitials } from "../helpers";
import { useEffect } from "react";
import { useWeather } from "../api/weather";
import { getWeatherIcon } from "./weatherIcon";

const user = {
  role: "Smallholder Farmer",
  avatarUrl: "",
};

const Header = () => {
  const { weatherData, loading, error, fetchWeather } = useWeather();

  useEffect(() => {
    fetchWeather("Port harcourt", "metric");
    console.log("Weather data fetched:", weatherData);
  }, [fetchWeather]);

  const cityName = weatherData?.city?.name;
  const currentTemp = weatherData?.list?.[0]?.main?.temp;
  const description = weatherData?.list?.[0]?.weather?.[0]?.description;
  const iconCode = weatherData?.list?.[0]?.weather?.[0]?.icon;
  const WeatherIconComponent = getWeatherIcon(iconCode);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-100 border-b border-gray-100 fixed z-10 h-20 w-full">
      <div className="flex items-center gap-2 px-2">
        <Sprout size={22} className="text-green-600" />
        <span className="font-semibold text-gray-900">Farm Companion</span>
      </div>

      <div className="relative w-full max-w-xl">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-200"
        />
      </div>

      <div className="hidden md:flex flex-col  text-sm ">
        {loading ? (
          <div className="flex items-center gap-2 text-gray-500">
            <Loader2 size={14} className="animate-spin" />
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 text-red-500">
            <AlertCircle size={14} />
            <span>Weather unavailable</span>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-1 text-gray-900 font-medium">
            <WeatherIconComponent size={20} className="text-amber-400" />
              <span>{cityName || "Port Harcourt"}</span>
            </div>
            <div className="flex items-center justify-between gap-2 ">
              <span className="text-gray-600 ">
                {currentTemp ? `${Math.round(currentTemp)}°C` : "--"}
              </span>
              <span className="text-xs text-gray-500">
                {description ? description : "Forecast ready"}
              </span>
            </div>
          </>
        )}
      </div>



        <div className="flex items-center gap-3">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
          ) : (
            <div className="w-9 h-9 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-sm font-medium">
              {getInitials()}
            </div>
          )}
          <div className="hidden sm:block text-sm">
            <p className="font-medium text-gray-900 leading-tight">{getUserName()}</p>
            <p className="text-xs text-gray-500 leading-tight">{user.role}</p>
          </div>
        </div>
      
    </header>
  );
};

export default Header;
