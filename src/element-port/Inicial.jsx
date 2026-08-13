import { ArrowRight, Download, Code2 } from "lucide-react";

function Inicial() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-[#030712] text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.18),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.18),transparent_35%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:80px_80px] opacity-20" />

      <header
        data-aos="fade-down"
        className="relative z-10 mx-auto mt-6 flex w-[92%] max-w-7xl items-center justify-between rounded-3xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-xl"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
          <Code2 className="text-emerald-400" size={26} />
        </div>

        <nav className="hidden items-center gap-9 text-sm font-medium text-white/80 md:flex">
          <a href="#inicio" className="text-emerald-400">
            Início
          </a>
          <a href="#projetos" className="hover:text-emerald-400">
            Projetos
          </a>
          <a href="#sobre" className="hover:text-emerald-400">
            Sobre
          </a>
          <a href="#skills" className="hover:text-emerald-400">
            Skills
          </a>
          <a href="#contato" className="hover:text-emerald-400">
            Contato
          </a>
        </nav>
      </header>

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-100px)] w-[92%] max-w-7xl items-center gap-16 py-16 lg:grid-cols-2">
        <div data-aos="fade-right">
          <span className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/80 backdrop-blur-xl">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_#4ade80]" />
            Disponível para novos projetos
          </span>

          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            <span className="block text-white/75">Olá, meu nome é</span>
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Felipe Araujo.
            </span>
          </h1>

          <h2 className="mt-6 text-2xl font-medium text-white/85 md:text-3xl">
            Desenvolvedor Full Stack
          </h2>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/60">
            Desenvolvo soluções digitais personalizadas utilizando{" "}
            <strong className="text-white">PHP</strong>,{" "}
            <strong className="text-white">React</strong>,{" "}
            <strong className="text-white">NodeJs</strong> e{" "}
            <strong className="text-white">TailwindCSS</strong>, com sólida
            experiência no desenvolvimento de{" "}
            <strong className="text-white">API's REST</strong> em{" "}
            <strong className="text-white">Next.js</strong> integrando{" "}
            <strong className="text-white">Express e Prisma</strong>.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#projetos"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-400 to-sky-500 px-8 py-4 font-semibold text-slate-950 transition hover:scale-[1.03]"
            >
              Ver Projetos
              <ArrowRight className="transition group-hover:translate-x-1" />
            </a>

            <a
              href="/Felipe Araujo-DesenvolvedorFull-Stack.pdf"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-8 py-4 font-semibold text-white/85 backdrop-blur-xl transition hover:bg-white/10"
            >
              <Download size={20} />
              Baixar Currículo
            </a>
          </div>
        </div>

        <div
          data-aos="fade-left"
          className="relative mx-auto flex w-full max-w-lg items-center justify-center"
        >
          <div className="absolute h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
          <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative rotate-3 rounded-[2rem] border border-cyan-400/30 bg-white/5 p-3 shadow-2xl backdrop-blur-xl">
            <img
              src="/felipe-araujo.png"
              alt="Felipe Araujo"
              className="h-[420px] w-[340px] rounded-[1.5rem] object-cover"
            />
          </div>

          <div className="absolute -left-4 top-28 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm shadow-xl backdrop-blur-xl">
            <span className="font-bold text-violet-300">PHP</span>
          </div>

          <div className="absolute -right-2 bottom-28 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-sm shadow-xl backdrop-blur-xl">
            <span className="font-bold text-yellow-300">JS</span>
          </div>

          <div className="absolute -bottom-30 left-0 w-62 rotate-[-4deg] rounded-2xl border border-white/10 bg-[#08111f]/30 p-4 shadow-3xl backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-4">
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className="text-xs text-white/40">code.php</span>
            </div>

            <pre className="text-xs leading-6 text-white/70">
              {`<?php
function solucao($problema) {
  $codigo = investir_tempo();
  $resultado = gerar_valor();

  return impacto_real();
}`}
            </pre>
          </div>
        </div>
      </main>
    </section>
  );
}

export default Inicial;
