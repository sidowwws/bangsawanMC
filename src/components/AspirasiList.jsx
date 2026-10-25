import { useCallback, useEffect, useState } from "react";
import ConfigWarning from "./ConfigWarning";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { getAdminSession, logoutAdmin } from "../lib/adminAuth";
import { timeAgo } from "../lib/time";

function CommentForm({ aspirationId, author, onSubmitted }) {
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!supabase || !content.trim()) return;

    setSending(true);
    setError("");

    const { error: insertError } = await supabase
      .from("comments")
      .insert({ aspiration_id: aspirationId, author, content: content.trim() });

    setSending(false);

    if (insertError) {
      setError("Gagal mengirim komentar. Coba lagi.");
      return;
    }

    setContent("");
    onSubmitted();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          required
          maxLength={500}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={`Balas sebagai ${author}...`}
          className="flex-1 border border-transparent bg-white px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-slate-300"
        />
        <button
          type="submit"
          disabled={sending}
          className=" bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-slate-800 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {sending ? "Mengirim..." : "Balas"}
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </form>
  );
}

export default function AspirasiList({ refreshKey = 0 }) {
  const [aspirations, setAspirations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [admin, setAdmin] = useState(getAdminSession());

  const fetchAspirations = useCallback(async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from("aspirations")
      .select(
        "id, name, message, created_at, comments(id, author, content, created_at)",
      )
      .order("created_at", { ascending: false });

    setLoading(false);

    if (error) {
      setLoadError("Gagal memuat aspirasi. Coba refresh halaman ya.");
      return;
    }

    setAspirations(data ?? []);
    setLoadError("");
  }, []);

  useEffect(() => {
    fetchAspirations();
  }, [fetchAspirations, refreshKey]);

  function handleLogout() {
    logoutAdmin();
    setAdmin(null);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <h2 className="text-4xl sm:text-5xl font-medium leading-[1.1] tracking-tight text-slate-900">
          Semua <span className="p-1 bg-[#dcff1e]">Pesan</span>
        </h2>
        {admin && (
          <div className="flex items-center gap-2">
            <span className="bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
              Mode Admin
            </span>
            <button
              onClick={handleLogout}
              className="text-xs font-medium text-slate-500 underline underline-offset-2 transition-colors hover:text-slate-900"
            >
              Keluar
            </button>
          </div>
        )}
      </div>

      {!isSupabaseConfigured && <ConfigWarning />}

      {loading && <p className="text-sm text-slate-500">Memuat aspirasi...</p>}

      {!loading && loadError && (
        <p className="text-sm text-red-500">{loadError}</p>
      )}

      {!loading && !loadError && aspirations.length === 0 && (
        <div className=" bg-slate-100 p-6">
          <p className="text-sm leading-relaxed text-slate-500">
            Belum ada aspirasi. Jadilah yang pertama!
          </p>
        </div>
      )}

      <div className="space-y-3 lg:max-h-[75vh] lg:overflow-y-auto lg:pr-2">
        {aspirations.map((item) => {
          const comments = [...(item.comments ?? [])].sort(
            (a, b) => new Date(a.created_at) - new Date(b.created_at),
          );

          return (
            <article
              key={item.id}
              className="space-y-4  bg-slate-100 p-4 sm:p-6"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
                <p className="break-words whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                  <span className="font-semibold text-slate-900">
                    {item.name}
                  </span>
                  <span className="text-slate-400"> : </span>
                  {item.message}
                </p>
                <span className="whitespace-nowrap text-xs text-slate-400 sm:pt-0.5">
                  {timeAgo(item.created_at)}
                </span>
              </div>

              {comments.length > 0 && (
                <div className="space-y-2">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="w-fit max-w-full bg-slate-900 px-4 py-2 text-sm leading-relaxed text-white shadow-sm break-words whitespace-pre-wrap"
                    >
                      <span className="font-semibold">{comment.author}</span>
                      <span className="text-white/70"> : </span>
                      {comment.content}
                    </div>
                  ))}
                </div>
              )}

              {admin && (
                <CommentForm
                  aspirationId={item.id}
                  author={admin.username}
                  onSubmitted={fetchAspirations}
                />
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
