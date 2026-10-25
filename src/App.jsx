import { useCallback, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import homepage from "./assets/homepagesasset.gif";
import profile from "./assets/profile.webp";
import AspirasiForm from "./components/AspirasiForm";
import AspirasiList from "./components/AspirasiList";
import Login from "./components/Login";
import Masuk from "./pages/Masuk";

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function HomePage() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <>
      <div
        className="relative flex min-h-dvh w-full select-none flex-col justify-between gap-8 overflow-x-hidden bg-cover bg-center px-5 py-6 sm:gap-10 sm:px-10 sm:py-10 md:px-16 md:py-14"
        style={{ backgroundImage: `url(${homepage})` }}
      >
        <div className="pointer-events-none absolute inset-0 bg-black/25" />

        <div className="relative z-10 max-w-3xl space-y-6 pt-4 md:pt-10">
          <h1 className="text-[clamp(2.25rem,8vw,4.5rem)] font-light leading-[1.05] tracking-tight text-white drop-shadow-md">
            Hallo semua selamat datang di site{" "}
            <span className="text-[#dcff1e]">bangsawanMC</span>
          </h1>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollToSection("form")}
              className="inline-flex items-center gap-2 bg-[#dcff1e] px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-200 hover:brightness-95 active:scale-95"
            >
              Sampaikan aspirasi <span aria-hidden>→</span>
            </button>

            <button
              onClick={() => scrollToSection("aspirasi")}
              className="inline-flex items-center gap-2 border border-white/40 bg-white/15 px-6 py-3 text-sm font-medium text-white backdrop-blur-md transition-all duration-200 hover:bg-white/25 active:scale-95"
            >
              Lihat semua aspirasi
            </button>
          </div>
        </div>

        <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
          <a
            href="https://tiktok.com/@bangsawanMC"
            target="_blank"
            rel="noopener noreferrer"
            className="group order-2 inline-flex shrink-0 items-center gap-3 focus:outline-none lg:order-1"
          >
            <img
              src={profile}
              alt="BangsawanMC Profile"
              className="h-12 w-12 border border-white/40 object-cover shadow-md transition-transform duration-200 group-hover:scale-105"
            />
            <p className="whitespace-nowrap text-xl font-semibold text-white drop-shadow group-hover:underline sm:text-2xl">
              BangsawanMC
            </p>
          </a>

          <div className="order-1 w-full min-w-0 bg-white p-4 shadow-xl md:max-w-xl lg:order-2 lg:max-w-md">
            <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
              Tempat ini saya sediakan untuk menampung kritik, saran, serta
              ide-ide menarik dari Kalian. Masukan yang Kalian berikan akan
              menjadi evaluasi penting bagi saya untuk meningkatkan kualitas
              tayangan agar selalu menghibur, menginspirasi, dan bermanfaat bagi
              seluruh penonton, karena saya percaya channel yang sempurna adalah
              channel yang bisa menerima kritik dan selalu ingin berubah menjadi
              lebih baik.
            </p>
          </div>
        </div>
      </div>

      <section
        id="form"
        className="bg-white px-5 py-12 sm:px-10 md:px-16 md:py-20"
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:gap-14">
          <div className="w-full lg:sticky lg:top-10 lg:w-5/12 lg:self-start">
            <AspirasiForm
              onSubmitted={() => {
                setRefreshKey((key) => key + 1);
                scrollToSection("aspirasi");
              }}
            />
          </div>

          <div id="aspirasi" className="w-full scroll-mt-6 lg:w-7/12">
            <AspirasiList refreshKey={refreshKey} />
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const handleFinish = useCallback(() => setLoading(false), []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/masuk" element={<Masuk />} />
        </Routes>
      </BrowserRouter>

      {/* overlay loading, hilang otomatis setelah 3 detik */}
      {loading && <Login onFinish={handleFinish} />}
    </>
  );
}

export default App;