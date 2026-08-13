import {
  Code2,
  MapPin,
  BriefcaseBusiness,
  GraduationCap,
  ShieldCheck,
  ServerCog,
  Layers3,
  Database,
} from "lucide-react";

function Sobre() {
  const tecnologias = [
    "React",
    "Tailwind CSS",
    "JavaScript",
    "Node.js",
    "Express",
    "Prisma",
    "PHP",
    "Laravel",
    "MySQL",
    "WordPress",
  ];

  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-[#030712] py-28 text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(34,197,94,0.10),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(59,130,246,0.10),transparent_35%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto w-[92%] max-w-7xl">
        {/* Cabeçalho */}
        <div
          data-aos="fade-up"
          className="mb-14 max-w-3xl"
        >
          <span className="mb-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            <Code2 size={18} />
            Sobre mim
          </span>

          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Tecnologia para transformar
            <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              problemas em soluções.
            </span>
          </h2>
        </div>

        {/* Container principal */}
        <div
          data-aos="fade-up"
          className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]"
        >
          {/* Lado esquerdo */}
          <div className="p-8 md:p-12 lg:p-14">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
              Desenvolvedor Full Stack
            </span>

            <h3 className="mt-4 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
              Construo aplicações pensando além do código.
            </h3>

            <div className="mt-7 max-w-2xl space-y-5 text-base leading-8 text-white/55 md:text-lg">
              <p>
                Sou <strong className="font-semibold text-white">Felipe Araujo</strong>,
                Desenvolvedor Full Stack com mais de{" "}
                <strong className="font-semibold text-white">
                  5 anos de experiência
                </strong>{" "}
                no desenvolvimento de sistemas web, APIs, plataformas e soluções
                digitais.
              </p>

              <p>
                Trabalho com tecnologias como{" "}
                <strong className="font-semibold text-white">
                  React, Node.js, PHP, JavaScript, Prisma e MySQL
                </strong>
                , atuando desde a construção da interface até arquitetura,
                integração e desenvolvimento do backend.
              </p>

              <p>
                Minha experiência também envolve{" "}
                <strong className="font-semibold text-white">
                  segurança da informação, LGPD, servidores, integração de
                  serviços e otimização de aplicações
                </strong>
                , sempre buscando construir soluções funcionais, escaláveis e
                fáceis de manter.
              </p>
            </div>

            {/* Tecnologias */}
            <div className="mt-9">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/30">
                Tecnologias que fazem parte do meu dia a dia
              </p>

              <div className="flex flex-wrap gap-2">
                {tecnologias.map((tecnologia) => (
                  <span
                    key={tecnologia}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/60 transition hover:border-emerald-400/30 hover:text-emerald-300"
                  >
                    {tecnologia}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Lado direito */}
          <div className="border-t border-white/10 bg-white/[0.015] p-8 md:p-10 lg:border-l lg:border-t-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {/* Experiência */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                  <BriefcaseBusiness size={21} />
                </div>

                <p className="mt-5 text-3xl font-bold">
                  5<span className="text-emerald-400">+</span>
                </p>

                <p className="mt-1 text-sm text-white/40">
                  Anos de experiência
                </p>
              </div>

              {/* Full Stack */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <Layers3 size={21} />
                </div>

                <p className="mt-5 text-lg font-bold">
                  Full Stack
                </p>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  Frontend, backend e integração de sistemas.
                </p>
              </div>

              {/* Backend */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-400/10 text-blue-400">
                  <ServerCog size={21} />
                </div>

                <p className="mt-5 text-lg font-bold">
                  APIs REST
                </p>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  Node.js, Express, Prisma, PHP e integrações.
                </p>
              </div>

              {/* Banco */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-400/10 text-violet-300">
                  <Database size={21} />
                </div>

                <p className="mt-5 text-lg font-bold">
                  Banco de Dados
                </p>

                <p className="mt-2 text-sm leading-6 text-white/40">
                  MySQL, MariaDB e modelagem de aplicações.
                </p>
              </div>
            </div>

            {/* Informações */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                  <MapPin
                    size={18}
                    className="text-emerald-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-white/30">Localização</p>
                  <p className="mt-1 text-sm font-medium">
                    Manaus, Amazonas
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                  <GraduationCap
                    size={18}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-white/30">Formação</p>
                  <p className="mt-1 text-sm font-medium">
                    Análise e Desenvolvimento de Sistemas
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                  <ShieldCheck
                    size={18}
                    className="text-blue-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-white/30">Experiência adicional</p>
                  <p className="mt-1 text-sm font-medium">
                    LGPD e Segurança da Informação
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sobre;