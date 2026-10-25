import { useEffect, useState } from "react";
import profile from "../assets/profile.webp";

const DURATION = 1500; // lama loading (ms)
const FADE = 500; // lama fade out (ms)

export default function Login({ onFinish }) {
  const [filled, setFilled] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setFilled(true));
    const leaveTimer = setTimeout(() => setLeaving(true), DURATION);
    const doneTimer = setTimeout(() => onFinish(), DURATION + FADE);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8 bg-white px-6 transition-opacity ease-out ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      style={{ transitionDuration: `${FADE}ms` }}
    >
      {/* spinner: lingkaran lime dengan busur gelap yang berputar */}
      <div className="relative h-24 w-24">
        <img
          src={profile}
          alt="BangsawanMC"
          className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] rounded-full object-cover"
        />
        <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-[#dcff1e]" />
      </div>

      {/* nama */}
      <div className="space-y-3 text-center">
        <h1 className="text-3xl font-light tracking-tight text-slate-900 sm:text-4xl">
          bangsawan
          <span className="ml-1 bg-[#dcff1e] px-2 font-medium text-slate-900">
            MC
          </span>
        </h1>
        <p className="animate-pulse text-sm text-slate-500">
          Memuat halaman...
        </p>
      </div>

      {/* progress bar 0% -> 100% selama 3 detik */}
      <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-[#dcff1e] ease-linear"
          style={{
            width: filled ? "100%" : "0%",
            transitionProperty: "width",
            transitionDuration: `${DURATION}ms`,
          }}
        />
      </div>
    </div>
  );
}
