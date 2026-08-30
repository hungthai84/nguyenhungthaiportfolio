import React, { useState, useEffect, useRef } from "react";
import {
  Sun,
  Moon,
  CloudSun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudFog,
  Snowflake,
  Wind,
  Droplets,
  MapPin,
  RefreshCw,
  ChevronDown,
  Navigation,
  Compass,
  Thermometer,
  X,
  Umbrella,
  Sparkles
} from "lucide-react";
import { useLanguage } from "../i18n";
import { useSound } from "../context/SoundContext";

interface WeatherData {
  city: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  weatherCode: number;
  isDay: boolean;
  time: string;
}

const CITIES = [
  { id: "hcm", nameVi: "TP. Hồ Chí Minh", nameEn: "Ho Chi Minh City", shortName: "TP.HCM", lat: 10.8231, lon: 106.6297 },
  { id: "hn", nameVi: "Hà Nội", nameEn: "Hanoi", shortName: "Hà Nội", lat: 21.0285, lon: 105.8542 },
  { id: "dn", nameVi: "Đà Nẵng", nameEn: "Da Nang", shortName: "Đà Nẵng", lat: 16.0544, lon: 108.2022 },
  { id: "ct", nameVi: "Cần Thơ", nameEn: "Can Tho", shortName: "Cần Thơ", lat: 10.0452, lon: 105.7469 },
  { id: "hp", nameVi: "Hải Phòng", nameEn: "Hai Phong", shortName: "Hải Phòng", lat: 20.8449, lon: 106.6881 },
];

function getWeatherInfo(code: number, isDay: boolean, lang: "vi" | "en") {
  if (code === 0) {
    return {
      text: lang === "vi" ? (isDay ? "Nắng quang đãng" : "Đêm quang đãng") : (isDay ? "Clear Sky" : "Clear Night"),
      Icon: isDay ? Sun : Moon,
      color: isDay ? "text-amber-500" : "text-indigo-400",
      bgGradient: isDay ? "from-amber-500/20 to-orange-500/10" : "from-indigo-900/40 to-slate-900/40",
    };
  }
  if (code <= 3) {
    return {
      text: lang === "vi" ? (code === 1 ? "Ít mây, trời đẹp" : "Nhiều mây rải rác") : (code === 1 ? "Mainly Clear" : "Partly Cloudy"),
      Icon: CloudSun,
      color: isDay ? "text-sky-500" : "text-sky-300",
      bgGradient: "from-sky-500/20 to-blue-500/10",
    };
  }
  if (code === 45 || code === 48) {
    return {
      text: lang === "vi" ? "Sương mù nhẹ" : "Foggy",
      Icon: CloudFog,
      color: "text-slate-400",
      bgGradient: "from-slate-500/20 to-slate-700/10",
    };
  }
  if (code >= 51 && code <= 57) {
    return {
      text: lang === "vi" ? "Mưa phùn nhỏ" : "Light Drizzle",
      Icon: CloudDrizzle,
      color: "text-cyan-500",
      bgGradient: "from-cyan-500/20 to-blue-500/10",
    };
  }
  if (code >= 61 && code <= 67) {
    return {
      text: lang === "vi" ? "Có mưa rào" : "Rain Showers",
      Icon: CloudRain,
      color: "text-blue-500",
      bgGradient: "from-blue-500/20 to-indigo-500/10",
    };
  }
  if (code >= 71 && code <= 77) {
    return {
      text: lang === "vi" ? "Tuyết rơi" : "Snowy",
      Icon: Snowflake,
      color: "text-indigo-300",
      bgGradient: "from-indigo-400/20 to-blue-300/10",
    };
  }
  if (code >= 80 && code <= 82) {
    return {
      text: lang === "vi" ? "Mưa rào nặng hạt" : "Heavy Rain",
      Icon: CloudRain,
      color: "text-blue-600",
      bgGradient: "from-blue-600/20 to-cyan-600/10",
    };
  }
  if (code >= 95) {
    return {
      text: lang === "vi" ? "Dông sét & mưa rào" : "Thunderstorm",
      Icon: CloudLightning,
      color: "text-amber-400",
      bgGradient: "from-amber-500/20 to-purple-600/20",
    };
  }
  return {
    text: lang === "vi" ? "Thời tiết mát mẻ" : "Pleasant Weather",
    Icon: CloudSun,
    color: "text-sky-500",
    bgGradient: "from-sky-500/20 to-blue-500/10",
  };
}

interface FooterWeatherProps {
  layoutMode?: "vertical" | "horizontal";
  timeString?: string;
  dateString?: string;
}

export default function FooterWeather({ layoutMode = "vertical", timeString, dateString }: FooterWeatherProps) {
  const { lang } = useLanguage();
  const { playSound } = useSound();
  const [selectedCityId, setSelectedCityId] = useState<string>("hcm");
  const [customLocationName, setCustomLocationName] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherData>({
    city: "TP. Hồ Chí Minh",
    temp: 31,
    feelsLike: 33,
    humidity: 72,
    windSpeed: 12,
    precipitation: 0,
    weatherCode: 1,
    isDay: true,
    time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popup on click outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent | TouchEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Fetch weather data from Open-Meteo
  const fetchWeather = async (lat: number, lon: number, cityName: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&timezone=auto`
      );
      if (!res.ok) throw new Error("Weather fetch failed");
      const data = await res.json();
      const current = data.current;

      const now = new Date();
      const timeStr = now.toLocaleTimeString(lang === "vi" ? "vi-VN" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      setWeather({
        city: cityName,
        temp: Math.round(current.temperature_2m),
        feelsLike: Math.round(current.apparent_temperature),
        humidity: Math.round(current.relative_humidity_2m),
        windSpeed: Math.round(current.wind_speed_10m),
        precipitation: current.precipitation || 0,
        weatherCode: current.weather_code,
        isDay: current.is_day === 1,
        time: timeStr,
      });
    } catch (err) {
      console.warn("Using fallback weather data:", err);
      // Fallback sensible default for Vietnam
      setWeather((prev) => ({
        ...prev,
        city: cityName,
        time: new Date().toLocaleTimeString(lang === "vi" ? "vi-VN" : "en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
    } finally {
      setIsLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    const city = CITIES.find((c) => c.id === selectedCityId) || CITIES[0];
    fetchWeather(city.lat, city.lon, lang === "vi" ? city.nameVi : city.nameEn);
  }, [selectedCityId, lang]);

  // Periodic weather refresh every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const city = CITIES.find((c) => c.id === selectedCityId) || CITIES[0];
      fetchWeather(city.lat, city.lon, customLocationName || (lang === "vi" ? city.nameVi : city.nameEn));
    }, 600000);
    return () => clearInterval(interval);
  }, [selectedCityId, customLocationName, lang]);

  // GPS Geolocation Handler
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert(lang === "vi" ? "Trình duyệt không hỗ trợ định vị GPS." : "Geolocation is not supported by your browser.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const locName = lang === "vi" ? "Vị trí của bạn" : "Current Location";
        setCustomLocationName(locName);
        setSelectedCityId("custom");
        fetchWeather(latitude, longitude, locName);
        setIsLocating(false);
      },
      (error) => {
        console.warn("Geolocation error:", error);
        setIsLocating(false);
        alert(
          lang === "vi"
            ? "Không thể lấy vị trí hiện tại. Vui lòng cho phép quyền truy cập vị trí."
            : "Could not access current location. Please allow location permissions."
        );
      },
      { timeout: 8000 }
    );
  };

  const weatherInfo = getWeatherInfo(weather.weatherCode, weather.isDay, lang);
  const CurrentIcon = weatherInfo.Icon;

  const currentCityObj = CITIES.find((c) => c.id === selectedCityId);
  const displayCityShort = customLocationName 
    ? (lang === "vi" ? "Vị trí" : "Live") 
    : (currentCityObj?.shortName || "TP.HCM");

  return (
    <div className="relative inline-flex items-center" ref={popoverRef}>
      {/* ========================================================================= */}
      {/* COMPACT PILL / TRIGGER BUTTON */}
      {/* ========================================================================= */}
      {layoutMode === "vertical" ? (
        <button
          type="button"
          onClick={() => {
            playSound("click");
            setIsOpen(!isOpen);
          }}
          className="group flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 pr-3 sm:pr-4 rounded-full h-[50px] sm:h-[56px] bg-transparent hover:bg-white/10 dark:hover:bg-slate-800/40 border border-transparent transition-all duration-200 active:scale-95 cursor-pointer text-left font-['Play',sans-serif]"
          title={lang === "vi" ? `Thời tiết: ${weather.temp}°C tại ${weather.city}` : `Weather: ${weather.temp}°C in ${weather.city}`}
        >
          {/* Time & Date Block */}
          {timeString && dateString && (
            <div className="flex flex-col items-start px-2 py-0.5 border-r border-slate-300/50 dark:border-slate-600/50 pr-3 font-['Play',sans-serif]">
              <span className="text-[13px] sm:text-[15px] font-bold tracking-wider text-blue-600 dark:text-blue-400 font-['Play',sans-serif]">{timeString}</span>
              <span className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase font-['Play',sans-serif]">{dateString}</span>
            </div>
          )}

          {/* Weather Icon with subtle pulsing glow */}
          <div className="relative flex items-center justify-center pl-1">
            <CurrentIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${weatherInfo.color} group-hover:rotate-12 transition-transform duration-300`} />
            {isLoading && (
              <span className="absolute inset-0 rounded-full bg-sky-400/20 animate-ping" />
            )}
          </div>

          {/* Temperature & City pill */}
          <div className="flex items-center gap-1.5">
            <span className="text-sm sm:text-base font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
              {weather.temp}°C
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 hidden xs:inline truncate max-w-[80px]">
              • {displayCityShort}
            </span>
          </div>

          <ChevronDown className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-500 transition-transform duration-200 ml-1 ${isOpen ? "rotate-180 text-blue-500" : ""}`} />
        </button>
      ) : (
        /* HORIZONTAL SIDEBAR RIGHT TRIGGER */
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group flex flex-col items-center gap-1 p-2 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/90 dark:hover:bg-slate-700/90 border border-slate-200/80 dark:border-slate-700 transition-all duration-200 shadow-2xs hover:shadow-xs active:scale-95 cursor-pointer w-full text-center"
          title={lang === "vi" ? `Thời tiết: ${weather.temp}°C tại ${weather.city}` : `Weather: ${weather.temp}°C in ${weather.city}`}
        >
          <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
            <CurrentIcon className={`w-5 h-5 ${weatherInfo.color}`} />
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-slate-800 dark:text-slate-100">
              {weather.temp}°C
            </span>
            <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400 truncate max-w-[70px]">
              {displayCityShort}
            </span>
          </div>
        </button>
      )}

      {/* ========================================================================= */}
      {/* EXPANDED WEATHER POPOVER CARD */}
      {/* ========================================================================= */}
      {isOpen && (
        <div 
          className={`absolute z-[9999] ${
            layoutMode === "vertical" 
              ? "bottom-full left-0 mb-2.5 origin-bottom-left" 
              : "right-full top-0 mr-2.5 origin-top-right"
          } w-[280px] sm:w-[320px] rounded-2xl sm:rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xl p-4 text-slate-800 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-200`}
        >
          {/* Header: Location & Close Button */}
          <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate">
                  {weather.city}
                </h4>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                  {lang === "vi" ? `Cập nhật lúc ${weather.time}` : `Updated at ${weather.time}`}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => {
                  const city = CITIES.find((c) => c.id === selectedCityId) || CITIES[0];
                  fetchWeather(city.lat, city.lon, customLocationName || (lang === "vi" ? city.nameVi : city.nameEn));
                }}
                className={`p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${isLoading ? "animate-spin text-blue-500" : ""}`}
                title={lang === "vi" ? "Làm mới dữ liệu" : "Refresh"}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title={lang === "vi" ? "Đóng" : "Close"}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Big Temperature Hero Section */}
          <div className="my-3 p-3 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 dark:from-slate-800/80 dark:to-slate-800/40 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {weather.temp}°
                </span>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                  C
                </span>
              </div>
              <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
                {weatherInfo.text}
              </p>
              <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                {lang === "vi" ? `Cảm giác như: ${weather.feelsLike}°C` : `Feels like: ${weather.feelsLike}°C`}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 shadow-sm">
              <CurrentIcon className={`w-10 h-10 ${weatherInfo.color}`} />
            </div>
          </div>

          {/* 3 Detail Metric Pills (Humidity, Wind, Precipitation) */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            {/* Humidity */}
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex flex-col items-center text-center">
              <Droplets className="w-3.5 h-3.5 text-blue-500 mb-0.5" />
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {lang === "vi" ? "Độ ẩm" : "Humidity"}
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                {weather.humidity}%
              </span>
            </div>

            {/* Wind */}
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex flex-col items-center text-center">
              <Wind className="w-3.5 h-3.5 text-teal-500 mb-0.5" />
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {lang === "vi" ? "Gió" : "Wind"}
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                {weather.windSpeed} km/h
              </span>
            </div>

            {/* Precipitation */}
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex flex-col items-center text-center">
              <Umbrella className="w-3.5 h-3.5 text-cyan-500 mb-0.5" />
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                {lang === "vi" ? "Lượng mưa" : "Precip"}
              </span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
                {weather.precipitation} mm
              </span>
            </div>
          </div>

          {/* City Selection Pills + GPS Locate Button */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {lang === "vi" ? "Chọn tỉnh / thành phố" : "Select location"}
              </span>
              <button
                type="button"
                onClick={handleGetLocation}
                disabled={isLocating}
                className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                title={lang === "vi" ? "Lấy vị trí hiện tại qua GPS" : "Use GPS location"}
              >
                <Navigation className={`w-3 h-3 ${isLocating ? "animate-spin" : ""}`} />
                <span>{lang === "vi" ? "Định vị GPS" : "GPS"}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1">
              {CITIES.map((c) => {
                const isSelected = selectedCityId === c.id && !customLocationName;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => {
                      setCustomLocationName(null);
                      setSelectedCityId(c.id);
                    }}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-2xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {c.shortName}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
