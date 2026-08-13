import {
  Braces,
  Code2,
  Database,
  ServerCog,
  Wrench,
  Users,
  MessageSquare,
  Lightbulb,
  Workflow,
  ShieldCheck,
} from "lucide-react";

function Skills() {
  const grupos = [
    {
      titulo: "Frontend",
      descricao: "Interfaces modernas, responsivas e focadas em experiência.",
      icon: Braces,
      skills: [
        "React",
        "JavaScript",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Bootstrap",
      ],
    },
    {
      titulo: "Backend",
      descricao: "APIs, regras de negócio e integrações entre sistemas.",
      icon: ServerCog,
      skills: [
        "Node.js",
        "Express",
        "PHP",
        "Laravel",
        "Prisma",
        "APIs REST",
      ],
    },
    {
      titulo: "Banco de Dados",
      descricao: "Modelagem, consultas e persistência de dados.",
      icon: Database,
      skills: [
        "MySQL",
        "MariaDB",
        "Prisma ORM",
        "Modelagem de Dados",
      ],
    },
    {
      titulo: "Ferramentas & Infra",
      descricao: "Versionamento, deploy, servidores e desenvolvimento.",
      icon: Wrench,
      skills: [
        "Git",
        "Docker",
        "Composer",
        "WordPress",
        "SMTP",
        "Integrações",
      ],
    },
  ];

  const modoTrabalho = [
    {
      titulo: "Resolução de Problemas",
      descricao: "Foco em transformar necessidades em soluções práticas.",
      icon: Lightbulb,
    },
    {
      titulo: "Comunicação",
      descricao: "Facilidade para alinhar demandas técnicas e de negócio.",
      icon: MessageSquare,
    },
    {
      titulo: "Trabalho em Equipe",
      descricao: "Experiência acompanhando demandas e projetos em conjunto.",
      icon: Users,
    },
    {
      titulo: "Organização",
      descricao: "Gestão de prioridades, manutenção e evolução de projetos.",
      icon: Workflow,
    },
  ];

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-[#030712] py-28 text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.10),transparent_30%),radial-gradient(circle_at_20%_80%,rgba(34,197,94,0.10),transparent_30%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto w-[92%] max-w-7xl">
        {/* Cabeçalho */}
        <div
          data-aos="fade-up"
          className="mb-14 max-w-3xl"
        >
          <span className="mb-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            <Code2 size={18} />
            Skills
          </span>

          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Tecnologias que fazem parte
            <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              do meu dia a dia.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/50">
            Ferramentas e tecnologias que utilizo no desenvolvimento de
            aplicações, APIs, sistemas web e soluções digitais completas.
          </p>
        </div>

        {/* Skills Técnicas */}
        <div className="grid gap-5 md:grid-cols-2">
          {grupos.map((grupo, index) => {
            const Icon = grupo.icon;

            return (
              <article
                key={grupo.titulo}
                data-aos="fade-up"
                data-aos-delay={index * 80}
                className="group rounded-[2rem] border border-white/10 bg-white/[0.03] p-7 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/20 hover:bg-white/[0.045] md:p-8"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-emerald-400 transition group-hover:bg-emerald-400/10">
                    <Icon size={23} />
                  </div>

                  <div>
                    <h3 className="text-xl font-bold">
                      {grupo.titulo}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/40">
                      {grupo.descricao}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {grupo.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-xl border border-white/10 bg-white/[0.035] px-3.5 py-2 text-sm font-medium text-white/65 transition hover:border-emerald-400/30 hover:bg-emerald-400/5 hover:text-emerald-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>

        {/* Como trabalho */}
        <div
          data-aos="fade-up"
          className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]"
        >
          <div className="border-b border-white/10 px-7 py-6 md:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                <ShieldCheck size={20} />
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-400">
                  Além do código
                </span>

                <h3 className="mt-1 text-xl font-bold">
                  Como trabalho
                </h3>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4">
            {modoTrabalho.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.titulo}
                  className={`p-7 ${
                    index !== modoTrabalho.length - 1
                      ? "border-b border-white/10 lg:border-b-0 lg:border-r"
                      : ""
                  } ${
                    index === 1
                      ? "md:border-l md:border-white/10 lg:border-l-0"
                      : ""
                  } ${
                    index === 2
                      ? "md:border-b-0"
                      : ""
                  }`}
                >
                  <Icon
                    size={22}
                    className="text-white/30"
                  />

                  <h4 className="mt-5 font-semibold">
                    {item.titulo}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-white/35">
                    {item.descricao}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rodapé da seção */}
        <div
          data-aos="fade-up"
          className="mt-8 flex flex-col gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-emerald-400/[0.06] to-blue-500/[0.06] p-6 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="font-semibold">
              Desenvolvimento Full Stack de ponta a ponta
            </p>

            <p className="mt-1 text-sm text-white/40">
              Da interface ao banco de dados, API e integração com serviços.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
            <Code2 size={17} />
            Frontend + Backend
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;