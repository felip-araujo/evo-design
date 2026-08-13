
import axios from "axios";
import { useEffect, useState } from "react";


import {
  ArrowUpRight,
  Code2,
//   Github,
  Loader2,
  ExternalLink,
} from "lucide-react";

import { API_URL } from "../services/ApiUrl";

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
          if (a.featured !== b.featured) {
            return b.featured - a.featured;
          }

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

  if (loading) {
    return (
      <section
        id="projetos"
        className="flex min-h-[600px] items-center justify-center bg-[#030712]"
      >
        <div className="flex flex-col items-center gap-4">
          <Loader2
            size={36}
            className="animate-spin text-emerald-400"
          />

          <span className="text-sm text-white/50">
            Carregando projetos...
          </span>
        </div>
      </section>
    );
  }

  if (erro) {
    return (
      <section
        id="projetos"
        className="flex min-h-[500px] items-center justify-center bg-[#030712] px-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            Não foi possível carregar os projetos.
          </h2>

          <p className="mt-3 text-white/50">
            Tente novamente em alguns instantes.
          </p>

          <button
            onClick={carregarProjetos}
            className="mt-6 rounded-xl bg-emerald-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-emerald-300"
          >
            Tentar novamente
          </button>
        </div>
      </section>
    );
  }

  const projetoDestaque =
    projetos.find((projeto) => projeto.featured) || projetos[0];

  const outrosProjetos = projetos.filter(
    (projeto) => projeto.id !== projetoDestaque?.id
  );

  return (
    <section
      id="projetos"
      className="relative overflow-hidden bg-[#030712] py-28 text-white"
    >
      {/* Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_10%_70%,rgba(34,197,94,0.10),transparent_30%)]" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto w-[92%] max-w-7xl">
        {/* Título */}
        <div
          data-aos="fade-up"
          className="mb-16 max-w-3xl"
        >
          <span className="mb-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            <Code2 size={18} />
            Projetos
          </span>

          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Projetos que transformaram
            <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              ideias em soluções reais.
            </span>
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/50">
            Uma seleção de sistemas, aplicações e plataformas desenvolvidas
            para resolver problemas reais através da tecnologia.
          </p>
        </div>

        {projetos.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-8 py-16 text-center">
            <Code2
              size={36}
              className="mx-auto text-white/20"
            />

            <h3 className="mt-5 text-xl font-semibold">
              Nenhum projeto publicado ainda.
            </h3>

            <p className="mt-2 text-white/40">
              Novos projetos serão adicionados em breve.
            </p>
          </div>
        ) : (
          <>
            {/* PROJETO DESTAQUE */}
            {projetoDestaque && (
              <article
                data-aos="fade-up"
                className="group grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl backdrop-blur-xl transition hover:border-emerald-400/20 lg:grid-cols-[1.15fr_0.85fr]"
              >
                {/* Imagem */}
                <div className="relative min-h-[350px] overflow-hidden bg-[#08111f] md:min-h-[450px]">
                  {projetoDestaque.coverImage ? (
                    <img
                      src={projetoDestaque.coverImage}
                      alt={projetoDestaque.title}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full min-h-[450px] items-center justify-center">
                      <Code2
                        size={70}
                        className="text-white/10"
                      />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#030712]/60" />

                  <div className="absolute left-6 top-6">
                    <span className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 backdrop-blur-xl">
                      Projeto em destaque
                    </span>
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="flex flex-col justify-center p-8 md:p-12">
                  {projetoDestaque.category && (
                    <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
                      {projetoDestaque.category}
                    </span>
                  )}

                  <h3 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
                    {projetoDestaque.title}
                  </h3>

                  <p className="mt-6 leading-7 text-white/55">
                    {projetoDestaque.summary}
                  </p>

                  {/* Tecnologias */}
                  {Array.isArray(projetoDestaque.technologies) &&
                    projetoDestaque.technologies.length > 0 && (
                      <div className="mt-7 flex flex-wrap gap-2">
                        {projetoDestaque.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/65"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                  {/* Links */}
                  <div className="mt-9 flex flex-wrap gap-3">
                    {projetoDestaque.projectUrl && (
                      <a
                        href={projetoDestaque.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/link inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.03]"
                      >
                        Ver projeto

                        <ArrowUpRight
                          size={18}
                          className="transition group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                        />
                      </a>
                    )}

                    {projetoDestaque.githubUrl && (
                      <a
                        href={projetoDestaque.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                      >
                        <Github size={18} />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )}

            {/* OUTROS PROJETOS */}
            {outrosProjetos.length > 0 && (
              <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {outrosProjetos.map((projeto, index) => (
                  <article
                    key={projeto.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 80}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-2 hover:border-emerald-400/30 hover:bg-white/[0.045]"
                  >
                    {/* Imagem */}
                    <div className="relative h-56 overflow-hidden bg-[#08111f]">
                      {projeto.coverImage ? (
                        <img
                          src={projeto.coverImage}
                          alt={projeto.title}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Code2
                            size={50}
                            className="text-white/10"
                          />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent" />

                      {projeto.featured && (
                        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider backdrop-blur-xl">
                          Destaque
                        </span>
                      )}
                    </div>

                    {/* Conteúdo */}
                    <div className="flex flex-1 flex-col p-6">
                      {projeto.category && (
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-400">
                          {projeto.category}
                        </span>
                      )}

                      <h3 className="mt-3 text-xl font-bold leading-snug">
                        {projeto.title}
                      </h3>

                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-white/50">
                        {projeto.summary}
                      </p>

                      {/* Tecnologias */}
                      {Array.isArray(projeto.technologies) &&
                        projeto.technologies.length > 0 && (
                          <div className="mt-5 flex flex-wrap gap-2">
                            {projeto.technologies
                              .slice(0, 4)
                              .map((tech) => (
                                <span
                                  key={tech}
                                  className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-medium text-white/60"
                                >
                                  {tech}
                                </span>
                              ))}

                            {projeto.technologies.length > 4 && (
                              <span className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] text-white/40">
                                +{projeto.technologies.length - 4}
                              </span>
                            )}
                          </div>
                        )}

                      {/* Rodapé */}
                      <div className="mt-auto flex items-center gap-4 pt-7">
                        {projeto.projectUrl && (
                          <a
                            href={projeto.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition hover:text-emerald-400"
                          >
                            Ver projeto
                            <ExternalLink size={16} />
                          </a>
                        )}

                        {projeto.githubUrl && (
                          <a
                            href={projeto.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`GitHub do projeto ${projeto.title}`}
                            className="ml-auto text-white/40 transition hover:text-white"
                          >
                            <Github size={19} />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default Projetos;