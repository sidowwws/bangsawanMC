import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../lib/adminAuth";

export default function Masuk() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (loginAdmin(username.trim(), password)) {
      navigate("/", { replace: true });
      setTimeout(() => {
        document
          .getElementById("aspirasi")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 150);
    } else {
      setError("Username atau password salah.");
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-white border border-transparent text-slate-900 placeholder-slate-400 text-sm outline-none focus:border-slate-300 transition-colors";

  return (
    <div className="flex min-h-dvh w-full flex-col bg-white px-5 py-8 sm:px-10 md:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-1 items-center justify-center py-10">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-3 text-center sm:text-left">
            <h1 className="text-4xl font-medium leading-[1.1] tracking-tight text-slate-900 sm:text-5xl">
              Masuk <span className="p-1 bg-[#dcff1e]">admin</span>
            </h1>
          </div>

          <div className=" bg-slate-100 p-5 sm:p-7">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-xs font-medium text-slate-900"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-slate-900"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className={inputClass}
                />
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2  bg-[#dcff1e] px-5 py-3 text-sm font-medium text-black shadow-md transition-all duration-200 hover:bg-[#b7d319] active:scale-95"
              >
                Masuk <span aria-hidden>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}