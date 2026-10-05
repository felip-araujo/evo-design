import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";

const focusStyle = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5f277]";
const arrowStyle = "shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none";

function Contato() {
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL;
  const githubUrl = import.meta.env.VITE_GITHUB_URL;
  const whatsappUrl = import.meta.env.VITE_WHATSAPP_URL;
  const secondaryStyle = `group inline-flex min-h-11 items-center gap-3 border-b border-white/15 py-2 text-sm text-white/70 transition-colors duration-200 hover:border-[#c5f277]/50 hover:text-[#c5f277] motion-reduce:transition-none ${focusStyle}`;
  const linkedinStyle = `group flex min-h-14 items-center justify-between gap-4 border border-white/20 px-5 py-4 text-sm font-medium transition-colors duration-200 hover:border-[#c5f277]/50 hover:text-[#c5f277] motion-reduce:transition-none ${focusStyle}`;

  return (
    <section
      id="contato"
      aria-labelledby="contact-title"
      className="bg-[#101113] py-16 font-sans text-[#efefeb] selection:bg-[#c5f277] selection:text-[#101113] sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 border-t border-white/10 pt-10 sm:gap-14 sm:pt-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-16 xl:gap-24">
          <header>
            <p className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-[#c5f277]">
              <span aria-hidden="true" className="h-px w-7 bg-current" />
              Contato
            </p>
            <h2 id="contact-title" className="text-4xl font-bold leading-[1.05] tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              Vamos<br className="hidden lg:block" /> conversar<span className="text-[#c5f277]">.</span>
            </h2>
            <p className="mt-7 max-w-[38ch] text-base leading-8 text-white/65 sm:text-lg">
              Aberto a oportunidades, projetos e conversas sobre desenvolvimento.
            </p>
            <p className="mt-4 max-w-[43ch] text-sm leading-7 text-white/45">
              Para uma oportunidade profissional ou para trocar experiências, entre em contato pelo canal que preferir.
            </p>
          </header>

          <div className="min-w-0 lg:pt-2">
            <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.12em] text-white/45">Contato direto</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <a href="mailto:felipedgart@gmail.com" className={`group flex min-h-14 items-center justify-between gap-4 border border-[#c5f277] bg-[#c5f277] px-5 py-4 text-sm font-semibold text-[#101113] transition-colors duration-200 hover:bg-[#d7f69f] motion-reduce:transition-none ${focusStyle}`}>
                <span className="flex items-center gap-3"><Mail aria-hidden="true" size={18} strokeWidth={1.5} />E-mail</span>
                <ArrowUpRight aria-hidden="true" size={18} className={arrowStyle} />
              </a>
              {linkedinUrl ? (
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className={linkedinStyle}>
                  LinkedIn <ArrowUpRight aria-hidden="true" size={18} className={arrowStyle} />
                </a>
              ) : (
                <span aria-label="LinkedIn indisponível" className="flex min-h-14 items-center justify-between gap-4 border border-white/10 px-5 py-4 text-sm text-white/35">
                  LinkedIn <ArrowUpRight aria-hidden="true" size={18} />
                </span>
              )}
            </div>
            <a href="mailto:felipedgart@gmail.com" className={`mt-4 inline-block max-w-full break-all text-sm text-white/60 transition-colors duration-200 hover:text-[#c5f277] motion-reduce:transition-none ${focusStyle}`}>
              felipedgart@gmail.com
            </a>

            <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
              {githubUrl && (
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={secondaryStyle}>
                  GitHub <ArrowUpRight aria-hidden="true" size={16} className={arrowStyle} />
                </a>
              )}
              {whatsappUrl ? (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={secondaryStyle}>
                  <MessageCircle aria-hidden="true" size={16} strokeWidth={1.5} /> WhatsApp
                  <ArrowUpRight aria-hidden="true" size={16} className={arrowStyle} />
                </a>
              ) : (
                <a href="#contact-qr" className={secondaryStyle}>
                  <MessageCircle aria-hidden="true" size={16} strokeWidth={1.5} /> WhatsApp
                  <span className="text-[10px] text-white/45">via QR Code</span>
                </a>
              )}
            </div>

            <figure id="contact-qr" className="mt-8 flex scroll-mt-8 items-center gap-5 border-t border-white/10 pt-6 sm:mt-10">
              <img src="/qr-code-felipe.png" alt="QR Code para abrir o contato no WhatsApp" width="192" height="192" loading="lazy" className="h-40 w-40 shrink-0 object-contain sm:h-48 sm:w-48" />
              <figcaption>
                <p className="text-xs font-medium text-white/70">Escaneie para abrir no celular</p>
                <p className="mt-2 text-xs leading-6 text-white/45">Acesso rápido ao WhatsApp.</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contato;
