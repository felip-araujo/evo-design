import { ArrowUpRight, MapPin } from "lucide-react";

const tecnologias = [
  "React", "Tailwind CSS", "JavaScript", "Node.js", "Express",
  "Prisma", "PHP", "Laravel", "MySQL", "WordPress",
];

function Sobre() {
  return (
    <section
      id="sobre"
      aria-labelledby="about-title"
      className="bg-[#101113] py-16 font-sans text-[#efefeb] selection:bg-[#c5f277] selection:text-[#101113] sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <header className="mb-12 border-b border-white/10 pb-10 sm:mb-16 sm:pb-12">
          <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-[#c5f277]">
            <span aria-hidden="true" className="h-px w-7 bg-current" />
            Sobre mim
          </p>
          <h2 id="about-title" className="max-w-[18ch] text-4xl font-bold leading-[1.08] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Por trás do código,<br />
            pode me chamar de Felipe<span className="text-[#c5f277]">.</span>
          </h2>
        </header>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          <div>
            <p className="max-w-[40ch] text-xl leading-relaxed tracking-[-0.02em] text-white/90 sm:text-2xl">
              Sou Felipe Araújo, desenvolvedor Full Stack. Meu trabalho vai da interface que você vê às integrações e à infraestrutura que sustentam uma aplicação.
            </p>
            <div className="mt-7 max-w-[55ch] space-y-5 text-base leading-8 text-white/65">
              <p>
                Há mais de cinco anos, desenvolvo sistemas web, APIs, plataformas e soluções digitais. Nesse caminho, trabalho com as diferentes partes de um produto: frontend, backend, dados e serviços que precisam conversar entre si.
              </p>
              <p>
                Para mim, construir uma aplicação é olhar além do código. É entender o problema, cuidar da experiência de quem vai usar e pensar em como a solução será mantida depois de ir para o ar.
              </p>
              <p>
                Minha experiência também passa por servidores, otimização de aplicações, segurança da informação e LGPD. Levo esse olhar para o desenvolvimento, buscando soluções funcionais, claras e fáceis de manter.
              </p>
            </div>

            <div className="mt-9 border-l-2 border-[#c5f277] pl-5 sm:mt-10 sm:pl-6">
              <p className="max-w-[36ch] text-lg font-medium leading-7 tracking-tight sm:text-xl sm:leading-8">
                Do primeiro desenho à aplicação em produção, cada detalhe faz parte da solução.
              </p>
            </div>

            <a href="#contato" className="group mt-8 inline-flex min-h-12 items-center gap-6 border-b border-[#c5f277]/40 py-3 text-sm font-medium text-[#c5f277] transition-colors duration-200 hover:text-[#efefeb] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5f277] motion-reduce:transition-none">
              Vamos conversar
              <ArrowUpRight aria-hidden="true" size={18} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </a>
          </div>

          <aside aria-label="Um pouco da minha trajetória" className="self-start border-t border-white/15 pt-6 lg:mt-1">
            <div className="flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-7">
              <div>
                <p className="text-6xl font-semibold leading-none tracking-[-0.05em] sm:text-7xl">
                  5<span className="text-[#c5f277]">+</span>
                </p>
                <p className="mt-3 text-xs text-white/55">Anos construindo soluções digitais</p>
              </div>
              <p className="flex items-center gap-2 pb-1 text-xs text-white/65">
                <MapPin aria-hidden="true" size={15} className="text-[#c5f277]" />
                Manaus, Amazonas
              </p>
            </div>

            <dl>
              <div className="border-b border-white/10 py-6">
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/45">Formação</dt>
                <dd className="mt-3 max-w-[28ch] text-base leading-7">Análise e Desenvolvimento de Sistemas</dd>
              </div>
              <div className="border-b border-white/10 py-6">
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/45">Atuação</dt>
                <dd className="mt-3 text-sm leading-7 text-white/75">Frontend, backend e integração de sistemas. APIs REST, servidores e modelagem de dados com MySQL e MariaDB.</dd>
              </div>
              <div className="border-b border-white/10 py-6">
                <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/45">Um olhar além do desenvolvimento</dt>
                <dd className="mt-3 text-sm leading-7 text-white/75">Segurança da informação, LGPD e otimização de aplicações.</dd>
              </div>
            </dl>
          </aside>
        </div>

        <div className="mt-12 grid gap-5 border-t border-white/10 pt-6 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
          <h3 className="text-[11px] font-medium uppercase leading-6 tracking-[0.12em] text-white/45">Ferramentas do meu dia a dia</h3>
          <ul aria-label="Tecnologias" className="flex flex-wrap gap-x-6 gap-y-2 text-sm leading-6 text-white/65">
            {tecnologias.map((tecnologia) => <li key={tecnologia}>{tecnologia}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Sobre;
