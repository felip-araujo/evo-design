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
      aria-labelledby="skills-title"
      className="bg-[#101113] py-16 font-sans text-[#efefeb] selection:bg-[#c5f277] selection:text-[#101113] sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Cabeçalho */}
        <div
          data-aos="fade-up"
          className="mb-12 border-b border-white/10 pb-10 sm:mb-16 sm:pb-12"
        >
          <span className="mb-6 inline-flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-[#c5f277]">
            <span aria-hidden="true" className="h-px w-7 bg-current" />
            Skills
          </span>

          <h2 id="skills-title" className="max-w-3xl text-4xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Tecnologias que fazem parte
            <span className="block">
              do meu dia a dia<span className="text-[#c5f277]">.</span>
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-white/65">
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
                className="group min-w-0 border border-white/10 bg-[#151719] p-6 transition-colors duration-300 hover:border-[#c5f277]/35 motion-reduce:transition-none sm:p-7 md:p-8"
              >
                <div className="flex items-start gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-white/10 text-[#c5f277] transition-colors duration-300 group-hover:border-[#c5f277]/35 motion-reduce:transition-none">
                    <Icon aria-hidden="true" size={23} strokeWidth={1.5} />
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.025em] sm:text-2xl">
                      {grupo.titulo}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/60">
                      {grupo.descricao}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-6">
                  {grupo.skills.map((skill) => (
                    <span
                      key={skill}
                      className="border border-white/10 px-3.5 py-2 text-sm font-medium text-white/75 transition-colors duration-200 hover:border-[#c5f277]/40 hover:text-[#c5f277] motion-reduce:transition-none"
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
          className="mt-8 overflow-hidden border border-white/10 bg-[#151719] sm:mt-10"
        >
          <div className="border-b border-white/10 px-7 py-6 md:px-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/10 text-[#c5f277]">
                <ShieldCheck aria-hidden="true" size={20} strokeWidth={1.5} />
              </div>

              <div>
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#c5f277]">
                  Além do código
                </span>

                <h3 className="mt-1 text-xl font-semibold tracking-[-0.025em]">
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
                    aria-hidden="true"
                    size={22}
                    strokeWidth={1.5}
                    className="text-[#c5f277]"
                  />

                  <h4 className="mt-5 font-semibold tracking-tight">
                    {item.titulo}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-white/60">
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
          className="mt-8 flex flex-col gap-4 border-t border-white/10 py-6 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p className="font-medium tracking-tight">
              Desenvolvimento Full Stack de ponta a ponta
            </p>

            <p className="mt-2 text-sm leading-6 text-white/55">
              Da interface ao banco de dados, API e integração com serviços.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#c5f277]">
            <Code2 aria-hidden="true" size={17} />
            Frontend + Backend
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
