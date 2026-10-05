
import axios from "axios";
import { useEffect, useState } from "react";


import {
  ArrowUpRight,
  Code2,
  Loader2,

} from "lucide-react";

import { API_URL } from "../services/ApiUrl";
import ProjectDemo from "./ProjectDemo";
import { projectMediaUrl } from "../services/projectMedia";

function Github({ size = 24, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 .75a11.25 11.25 0 0 0-3.56 21.92c.56.1.77-.24.77-.54v-2.09c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 1.71 2.63 1.22 3.27.93.1-.73.39-1.22.71-1.5-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.23 1.16-3.02-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.1 1.15a10.8 10.8 0 0 1 5.63 0c2.15-1.46 3.1-1.15 3.1-1.15.61 1.55.23 2.7.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.63 5.27-5.14 5.55.4.35.76 1.03.76 2.08v3.1c0 .3.2.65.78.54A11.25 11.25 0 0 0 12 .75Z" />
    </svg>
  );
}

const linkStyle = "inline-flex min-h-11 items-center gap-2.5 text-sm font-medium transition-colors duration-200 hover:text-[#c5f277] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5f277] motion-reduce:transition-none";

function ProjectLinks({ projeto, featured = false }) {
  return (
    <div className="mt-auto flex flex-wrap items-center gap-x-7 gap-y-2 pt-7">
      <ProjectDemo projeto={projeto} />
      {projeto.projectUrl && (
        <a href={projeto.projectUrl} target="_blank" rel="noopener noreferrer" aria-label={`Ver projeto ${projeto.title}`} className={featured ? "inline-flex min-h-12 items-center gap-8 border border-[#c5f277] bg-[#c5f277] px-6 py-3 text-sm font-semibold text-[#101113] transition-colors hover:bg-[#d7f69f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5f277] motion-reduce:transition-none" : `${linkStyle} border-b border-[#c5f277]/40 text-[#c5f277]`}>
          Ver projeto <ArrowUpRight aria-hidden="true" size={17} />
        </a>
      )}
      {projeto.githubUrl && (
        <a href={projeto.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`GitHub do projeto ${projeto.title}`} className={`${linkStyle} text-white/65`}>
          <Github size={16} /> GitHub
        </a>
      )}
    </div>
  );
}

function ProjectTechnologies({ technologies }) {
  if (!Array.isArray(technologies) || technologies.length === 0) return null;

  return (
    <ul aria-label="Tecnologias do projeto" className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/10 pt-5 text-xs leading-6 text-white/55">
      {technologies.map((tech, index) => <li key={`${tech}-${index}`}>{tech}</li>)}
    </ul>
  );
}

function ProjectCover({ projeto, featured = false }) {
  const hasDemo = projeto.demoUrl && ["GIF", "VIDEO"].includes(projeto.demoType);
  const coverStyle = `relative block overflow-hidden border border-white/10 bg-[#181a1d] ${featured ? "aspect-[4/3] sm:aspect-[16/9] lg:aspect-[2/1]" : "aspect-[16/10]"}`;

  if (hasDemo && projeto.demoType === "VIDEO") {
    return (
      <div className={coverStyle}>
        <video src={projectMediaUrl(projeto.demoUrl)} poster={projeto.coverImage || undefined} autoPlay={!window.matchMedia("(prefers-reduced-motion: reduce)").matches} muted loop controls playsInline preload="metadata" aria-label={`Demonstração de ${projeto.title}`} className="h-full w-full object-contain">
          Seu navegador não suporta vídeo. <a href={projectMediaUrl(projeto.demoUrl)}>Abrir demonstração</a>
        </video>
      </div>
    );
  }

  const image = hasDemo ? (
    <img src={projectMediaUrl(projeto.demoUrl)} alt={`Demonstração do funcionamento de ${projeto.title}`} loading="lazy" className="h-full w-full object-contain" />
  ) : projeto.coverImage ? (
    <img src={projeto.coverImage} alt={projeto.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none" />
  ) : (
    <div className="flex h-full flex-col items-center justify-center gap-4 text-white/30">
      <Code2 aria-hidden="true" size={featured ? 64 : 32} strokeWidth={1} />
      <span className="text-[10px] uppercase tracking-[0.14em]">{projeto.category || "Aplicação web"}</span>
    </div>
  );

  if (projeto.projectUrl) {
    return (
      <a href={projeto.projectUrl} target="_blank" rel="noopener noreferrer" aria-label={`Abrir projeto ${projeto.title}`} className={`${coverStyle} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5f277]`}>
        {image}
        <span aria-hidden="true" className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center border border-white/15 bg-[#101113] text-[#c5f277] transition-colors duration-200 group-hover:bg-[#c5f277] group-hover:text-[#101113] motion-reduce:transition-none sm:bottom-6 sm:right-6">
          <ArrowUpRight size={22} />
        </span>
      </a>
    );
  }

  return (
    <div className={coverStyle}>{image}</div>
  );
}

function Projetos() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    carregarProjetos();
  }, []);

  const carregarProjetos = async () => {
    try {
      setLoading(true);
      setErro(false);
      const response = await axios.get(`${API_URL}/projeto`);
      const projetosPublicados = response.data
        .filter((projeto) => projeto.status === "PUBLISHED")
        .sort((a, b) => {
          if (a.featured !== b.featured) return b.featured - a.featured;
          return a.displayOrder - b.displayOrder;
        });
      setProjetos(projetosPublicados);
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
      setErro(true);
    } finally {
      setLoading(false);
    }
  };

  const projetoDestaque = projetos.find((projeto) => projeto.featured) || projetos[0];
  const outrosProjetos = projetos.filter((projeto) => projeto.id !== projetoDestaque?.id);

  return (
    <section id="projetos" aria-labelledby="projects-title" className="bg-[#101113] py-16 font-sans text-[#efefeb] selection:bg-[#c5f277] selection:text-[#101113] sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <header className="mb-12 grid gap-7 border-b border-white/10 pb-10 sm:mb-16 sm:pb-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:items-end lg:gap-16 xl:gap-24">
          <div>
            <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-[#c5f277]">
              <span aria-hidden="true" className="h-px w-7 bg-current" />
              Projetos selecionados
            </p>
            <h2 id="projects-title" className="text-[clamp(2.75rem,6vw,5.5rem)] font-bold leading-[1.02] tracking-[-0.05em]">
              Menos teoria.<br />Mais <span className="text-[#c5f277]">projeto real.</span>
            </h2>
          </div>
          <p className="max-w-[43ch] text-sm leading-7 text-white/60 sm:text-base">
            Aplicações, sistemas e plataformas construídos para resolver problemas reais. Da interface às integrações que fazem tudo funcionar.
          </p>
        </header>

        {loading ? (
          <div role="status" className="flex min-h-64 items-center justify-center gap-4 text-sm text-white/60">
            <Loader2 aria-hidden="true" size={22} className="animate-spin text-[#c5f277] motion-reduce:animate-none" />
            Carregando projetos...
          </div>
        ) : erro ? (
          <div role="alert" className="border-b border-white/10 py-12">
            <h3 className="text-xl font-semibold tracking-tight">Não foi possível carregar os projetos.</h3>
            <p className="mt-3 text-sm text-white/55">Tente novamente em alguns instantes.</p>
            <button onClick={carregarProjetos} className="mt-6 min-h-12 border border-[#c5f277] bg-[#c5f277] px-6 py-3 text-sm font-semibold text-[#101113] transition-colors hover:bg-[#d7f69f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5f277] motion-reduce:transition-none">
              Tentar novamente
            </button>
          </div>
        ) : projetos.length === 0 ? (
          <div className="border-b border-white/10 py-12">
            <h3 className="text-xl font-semibold tracking-tight">Nenhum projeto publicado ainda.</h3>
            <p className="mt-3 text-sm text-white/55">Novos projetos serão adicionados em breve.</p>
          </div>
        ) : (
          <>
            {projetoDestaque && (
              <article className="group border-b border-white/10 pb-12 sm:pb-16">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.12em]">
                  <span className="flex items-center gap-3 text-[#c5f277]"><span aria-hidden="true" className="h-1.5 w-1.5 bg-current" />01 / Projeto em destaque</span>
                  {projetoDestaque.category && <span className="text-white/55">{projetoDestaque.category}</span>}
                </div>
                <ProjectCover projeto={projetoDestaque} featured />
                <div className="mt-8 grid min-w-0 gap-6 sm:mt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
                  <div>
                    <h3 className="break-words text-3xl font-semibold leading-[1.1] tracking-[-0.04em] sm:text-4xl lg:text-5xl">{projetoDestaque.title}</h3>
                    <ProjectTechnologies technologies={projetoDestaque.technologies} />
                  </div>
                  <div className="flex flex-col">
                    <p className="text-base leading-8 text-white/70">{projetoDestaque.summary}</p>
                    <ProjectLinks projeto={projetoDestaque} featured />
                  </div>
                </div>
              </article>
            )}

            {outrosProjetos.length > 0 && (
              <div className="mt-12 sm:mt-16">
                <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3 sm:mb-10">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Explore outros projetos<span className="text-[#c5f277]">.</span></h3>
                  <span className="text-xs text-white/45">{outrosProjetos.length} {outrosProjetos.length === 1 ? "projeto" : "projetos"}</span>
                </div>
                <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
                {outrosProjetos.map((projeto, index) => (
                  <article key={projeto.id} className="group flex min-w-0 flex-col border-b border-white/10 pb-6 transition-colors duration-200 hover:border-[#c5f277]/40 focus-within:border-[#c5f277]/40 motion-reduce:transition-none sm:pb-8">
                    <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-[10px] uppercase tracking-[0.12em]">
                      <span className="text-[#c5f277]">{String(index + 2).padStart(2, "0")} / Projeto</span>
                      {projeto.category && <span className="text-white/45">{projeto.category}</span>}
                      {projeto.featured && <span className="text-[#c5f277]">Em destaque</span>}
                    </div>
                    <ProjectCover projeto={projeto} />
                    <h4 className="mt-6 break-words text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-3xl">{projeto.title}</h4>
                    <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">{projeto.summary}</p>
                    <ProjectTechnologies technologies={projeto.technologies} />
                    <ProjectLinks projeto={projeto} />
                  </article>
                ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Projetos;
