import { Sun, Moon, Cloud, CloudSun, CloudMoon, CloudRain, CloudDrizzle, CloudLightning, CloudSnow, CloudFog } from "lucide-react";

// Maps OpenWeatherMap's "icon" code to a matching lucide-react icon.
// Icon codes: https://openweathermap.org/weather-conditions
// Pattern: first 2 digits = condition, last letter = d (day) or n (night)
const iconMap = {
  "01d": Sun,
  "01n": Moon,
  "02d": CloudSun,
  "02n": CloudMoon,
  "03d": Cloud,
  "03n": Cloud,
  "04d": Cloud,
  "04n": Cloud,
  "09d": CloudDrizzle,
  "09n": CloudDrizzle,
  "10d": CloudRain,
  "10n": CloudRain,
  "11d": CloudLightning,
  "11n": CloudLightning,
  "13d": CloudSnow,
  "13n": CloudSnow,
  "50d": CloudFog,
  "50n": CloudFog,
};

// Returns the matching component, falling back to a generic cloud if the code is unrecognized
export const getWeatherIcon = (iconCode) => iconMap[iconCode] || Cloud;

// Ready-to-use component — pass the raw OpenWeatherMap icon code + optional size/className
const WeatherIcon = ({ code, size = 20, className = "text-amber-500" }) => {
  const Icon = getWeatherIcon(code);
  return <Icon size={size} className={className} />;
};

export default WeatherIcon;
