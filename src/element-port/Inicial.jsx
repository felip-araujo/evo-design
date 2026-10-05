import { ArrowDown, ArrowUpRight } from "lucide-react";
import styles from "./Inicial.module.css";

const stackGroups = [
  { label: "Interfaces", items: ["React", "Tailwind", "WordPress"] },
  { label: "Aplicações & dados", items: ["Node.js", "Express", "PHP", "Prisma", "MySQL"] },
  { label: "Infraestrutura & integrações", items: ["Google Cloud", "Vercel", "Nginx", "APIs REST", "mTLS"] },
];

function Inicial() {
  const githubUrl = import.meta.env.VITE_GITHUB_URL;
  const linkStyle = "transition-colors duration-200 hover:text-[#c5f277] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5f277] motion-reduce:transition-none";

  return (
    <section id="inicio" aria-labelledby="hero-name" className="bg-[#101113] font-sans text-[#efefeb] selection:bg-[#c5f277] selection:text-[#101113]">
      <div className="mx-auto flex min-h-svh w-full max-w-[1440px] flex-col px-6 sm:px-10 lg:px-16">
        <header className="flex flex-wrap items-center justify-between gap-x-12 gap-y-5 border-b border-white/10 py-6 sm:py-8">
          <a href="#inicio" aria-label="Felipe Araujo — início" className={`text-sm font-semibold tracking-tight ${linkStyle}`}>
            Felipe Araújo<span className="text-[#c5f277]">.</span>
          </a>
          <nav aria-label="Navegação principal" className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-white/65 sm:gap-x-9 sm:text-sm">
            <a href="#projetos" className={linkStyle}>Projetos</a>
            <a href="#sobre" className={linkStyle}>Sobre</a>
            <a href="#skills" className={linkStyle}>Skills</a>
            <a href="#contato" className={linkStyle}>Contato</a>
          </nav>
        </header>

        <div className="grid flex-1 content-center gap-16 py-16 sm:py-20 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-16 lg:py-24 xl:gap-24">
          <div className={styles.introduction}>
            <p className="mb-7 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-[#c5f277] sm:mb-9">
              <span aria-hidden="true" className="h-px w-7 bg-current" />
              Full Stack Developer
            </p>
            <h1 id="hero-name" className="text-[clamp(3.5rem,7.5vw,7rem)] font-bold leading-[0.98] tracking-[-0.06em]">
              <span className="block">Felipe</span>
              <span className="block">Araujo<span className="text-[#c5f277]">.</span></span>
            </h1>
            <p className="mt-8 max-w-[43ch] text-base leading-[1.8] text-white/65 sm:mt-10 sm:text-lg">
              Construo aplicações web, integrações e produtos digitais com foco em performance, clareza e soluções reais.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5 sm:mt-11">
              <a href="#projetos" className="group inline-flex min-h-12 items-center gap-7 border border-[#c5f277] bg-[#c5f277] px-6 py-3 text-sm font-semibold text-[#101113] transition-colors duration-200 hover:bg-[#d7f69f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5f277] motion-reduce:transition-none">
                Ver projetos
                <ArrowDown aria-hidden="true" size={17} className="transition-transform duration-200 group-hover:translate-y-0.5 motion-reduce:transition-none" />
              </a>
              {githubUrl ? (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-12 items-center gap-2.5 text-sm ${linkStyle}`}>
                  GitHub <ArrowUpRight aria-hidden="true" size={15} />
                </a>
              ) : (
                <span aria-label="GitHub — link a configurar" className="inline-flex min-h-12 items-center gap-2.5 text-sm text-white/45">
                  GitHub <ArrowUpRight aria-hidden="true" size={15} />
                </span>
              )}
            </div>
          </div>

          <aside aria-labelledby="hero-stack-title" className={`${styles.stack} self-end lg:pb-1`}>
            <div className="mb-7 flex items-center justify-between gap-4">
              <h2 id="hero-stack-title" className="text-[11px] font-medium uppercase tracking-[0.14em] text-white/50">Tecnologias na prática</h2>
              <span aria-hidden="true" className="text-[11px] text-[#c5f277]">01 / STACK</span>
            </div>
            <div className="border-t border-white/15">
              {stackGroups.map(({ label, items }, index) => (
                <div key={label} className="border-b border-white/10 py-6">
                  <h3 className="mb-4 flex items-center gap-3 text-xs text-white/45">
                    <span aria-hidden="true" className="text-[10px] text-[#c5f277]">0{index + 1}</span>
                    {label}
                  </h3>
                  <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium tracking-tight text-white/85 sm:text-base">
                    {items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-5 text-[11px] text-white/40 sm:py-6 sm:text-xs">
          <p>Da interface à infraestrutura.</p>
          <p className="tracking-wide">Aplicações / Integrações / Produtos digitais</p>
        </footer>
      </div>
    </section>
  );
}

export default Inicial;
