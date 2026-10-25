import { useState } from "react";
import ConfigWarning from "./ConfigWarning";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

export default function AspirasiForm({ onSubmitted }) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!supabase) return;

    setSending(true);
    setError("");

    const { error: insertError } = await supabase
      .from("aspirations")
      .insert({ name: name.trim(), message: message.trim() });

    setSending(false);

    if (insertError) {
      setError("Gagal mengirim aspirasi. Coba beberapa saat lagi ya.");
      return;
    }

    setSent(true);
    setName("");
    setMessage("");
    onSubmitted();
  }

  const inputClass =
    "w-full px-4 py-3 bg-white border border-transparent text-slate-900 placeholder-slate-400 text-sm outline-none focus:border-slate-300 transition-colors";

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-4xl sm:text-5xl font-medium leading-[1.1] tracking-tight text-slate-900">
          Sampaikan <span className="text-black bg-[#dcff1e] p-1">Pesan</span>
        </h2>
        <p className="max-w-md text-sm leading-relaxed text-slate-500">
          Tulis kritik, saran, atau ide menarik untuk channel bangsawanMC. Tidak
          perlu login — langsung kirim saja.
        </p>
      </div>

      <div className="space-y-5 bg-slate-100 p-5 sm:p-7">
        {!isSupabaseConfigured && <ConfigWarning />}

        {sent ? (
          <div className="flex flex-col gap-3 border border-black/80 bg-[#dcff1e] p-4 sm:flex-row sm:items-center">
            <p className="flex-1 text-sm leading-relaxed text-gray-800">
              Terima kasih! Aspirasimu sudah terkirim dan tampil di bawah.
            </p>
            <button
              onClick={() => setSent(false)}
              className=" bg-white px-4 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 active:scale-95"
            >
              Kirim aspirasi lagi
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="nama"
                className="block text-xs font-medium text-slate-900"
              >
                Nama
              </label>
              <input
                id="nama"
                type="text"
                required
                maxLength={50}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Tulis namamu..."
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="pesan"
                className="block text-xs font-medium text-slate-900"
              >
                Kritik / Saran / Ide
              </label>
              <textarea
                id="pesan"
                required
                maxLength={1000}
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tulis aspirasimu di sini..."
                className={`${inputClass} resize-y`}
              />
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={sending || !isSupabaseConfigured}
              className="inline-flex w-full items-center justify-center gap-2  bg-[#dcff1e] px-5 py-3 text-sm font-medium text-black shadow-md transition-all duration-200 hover:bg-[#b7d319] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:justify-start sm:py-2.5"
            >
              {sending ? "Mengirim..." : "Kirim aspirasi"}
              {!sending && <span aria-hidden>→</span>}
            </button>
          </form>
        )}
      </div>

<div className="flex w-full overflow-hidden bg-slate-100">
  <svg
    aria-hidden="true"
    className="w-4 shrink-0 self-stretch"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="wave-edge"
        width="16"
        height="19.2"
        patternUnits="userSpaceOnUse"
      >
        <path
          d="M 8 0 Q 4 4.8, 8 9.6 T 8 19.2 L 0 19.2 L 0 0 Z"
          fill="indianred"
        />
      </pattern>
    </defs>
    <rect width="16" height="100%" fill="url(#wave-edge)" />
  </svg>

  <div className="min-w-0 flex-1 px-3 py-3 sm:px-4">
    <p className="text-lg font-bold leading-7 text-red-500">
      Peringatan!
    </p>
    <ul className="mt-1 list-disc space-y-1 pl-4 text-xs leading-relaxed text-slate-600 sm:text-sm">
      <li>Gunakan bahasa yang sopan. Dilarang memakai kata kasar atau menghina.</li>
      <li>Sampaikan kritik dan saran yang jelas dan membangun.</li>
      <li>Dilarang spam, pesan tidak jelas, atau mengirim link.</li>
    </ul>
  </div>
</div>

    </div>
  );
}