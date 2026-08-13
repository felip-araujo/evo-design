import { useState } from "react";
import {
  ArrowLeft,
  Code2,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API_URL } from "../services/ApiUrl";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (!email.trim() || !senha.trim()) {
      toast.warning("Preencha o email e a senha.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Email ou senha inválidos.");
        return;
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (data.user) {
        localStorage.setItem("account", JSON.stringify(data.user));
      }

      toast.success("Login realizado com sucesso.");
      console.log(JSON.stringify(data.user.nivel));

      setTimeout(() => {
        if (data.user.nivel === "SUPER_ADMIN") {
          navigate("/dashboard");
          return;
        }

        navigate("/");
      }, 500);
    } catch (error) {
      console.error("Erro no login:", error);

      toast.error("Não foi possível conectar ao servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712] px-5 text-white">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.15),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.17),transparent_35%)]" />

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:70px_70px] opacity-30" />

      {/* Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />

      <section className="relative z-10 w-full max-w-[440px]">
        {/* Voltar */}
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Voltar ao portfólio
        </Link>

        {/* Card */}
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-7 shadow-2xl backdrop-blur-2xl md:p-9">
          {/* Header */}
          <div className="mb-9 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
              <Code2 size={28} className="text-emerald-400" />
            </div>

            <h1 className="mt-6 text-2xl font-bold tracking-tight">
              Área administrativa
            </h1>

            <p className="mt-2 text-sm leading-6 text-white/40">
              Acesse o painel para gerenciar os projetos do portfólio.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  autoComplete="email"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.035] py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-emerald-400/50 focus:bg-white/[0.055] focus:ring-4 focus:ring-emerald-500/5"
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
                Senha
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                />

                <input
                  type={mostrarSenha ? "text" : "password"}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.035] py-3.5 pl-12 pr-12 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-emerald-400/50 focus:bg-white/[0.055] focus:ring-4 focus:ring-emerald-500/5"
                />

                <button
                  type="button"
                  onClick={() => setMostrarSenha((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 transition hover:text-white"
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                >
                  {mostrarSenha ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative mt-2 flex w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-sky-500 py-3.5 font-semibold text-slate-950 shadow-[0_0_30px_rgba(52,211,153,0.12)] transition duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={19} className="animate-spin" />
                  Entrando...
                </span>
              ) : (
                "Entrar no painel"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-white/25">Área de acesso restrito</p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;
