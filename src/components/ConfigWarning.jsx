export default function ConfigWarning() {
  return (
    <div className="bg-red-500/70 border border-red-300/50 backdrop-blur-md text-white text-sm p-4 leading-relaxed">
      Supabase belum dikonfigurasi. Isi{" "}
      <span className="font-semibold">VITE_SUPABASE_URL</span> dan{" "}
      <span className="font-semibold">VITE_SUPABASE_ANON_KEY</span> di file{" "}
      <span className="font-semibold">.env</span>, lalu restart server (Ctrl+C
      lalu <span className="font-semibold">npm run dev</span>).
    </div>
  );
}
