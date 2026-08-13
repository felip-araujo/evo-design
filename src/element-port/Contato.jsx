import { ArrowUpRight, Mail, MessageCircle, QrCode, Send } from "lucide-react";

function Contato() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden bg-[#030712] py-28 text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(34,197,94,0.12),transparent_30%),radial-gradient(circle_at_85%_60%,rgba(59,130,246,0.10),transparent_30%)]" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto w-[92%] max-w-7xl">
        {/* Cabeçalho */}
        <div data-aos="fade-up" className="mb-14 max-w-3xl">
          <span className="mb-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-emerald-400">
            <MessageCircle size={18} />
            Contato
          </span>

          <h2 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Vamos conversar ?
          </h2>
        </div>

        {/* Container principal */}
        <div
          data-aos="fade-up"
          className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-2xl backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]"
        >
          {/* Texto */}
          <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-400">
              <Send size={25} />
            </div>

            <h3 className="mt-7 max-w-xl text-3xl font-bold leading-tight md:text-4xl">
              Vamos pular a parte burocrática.
            </h3>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/55">
              Escaneie o QR Code e entre em contato direto comigo pelo{" "}
              <strong className="font-semibold text-white">WhatsApp</strong>.
            </p>

            <p className="mt-3 max-w-xl text-lg leading-8 text-white/55">
              Ou, se preferir, envie um email para{" "}
              <a
                href="mailto:felipedgart@gmail.com"
                className="font-semibold text-emerald-400 transition hover:text-emerald-300"
              >
                felipedgart@gmail.com
              </a>
            </p>

            {/* Email */}
            <a
              href="mailto:felipedgart@gmail.com"
              className="group mt-9 flex max-w-md items-center justify-between rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-emerald-400/30 hover:bg-white/[0.05]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-emerald-400">
                  <Mail size={20} />
                </div>

                <div>
                  <span className="block text-xs text-white/30">
                    Prefere email?
                  </span>

                  <span className="mt-1 block text-sm font-medium text-white/80">
                    felipedgart@gmail.com
                  </span>
                </div>
              </div>

              <ArrowUpRight
                size={19}
                className="text-white/25 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-400"
              />
            </a>
          </div>

          {/* QR CODE */}
          <div className="relative flex items-center justify-center border-t border-white/10 bg-white/[0.015] p-8 md:p-12 lg:border-l lg:border-t-0">
            <div className="absolute h-60 w-60 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative w-full max-w-[330px]">
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-xl">
                {/* Espaço para sua imagem */}
                <div className="relative aspect-square overflow-hidden rounded-[1.5rem] border border-dashed border-white/15 bg-[#08111f]">
                  {/* Quando tiver o QR Code, substitua este bloco */}
                    <img
                      src="/qr-code-felipe.png"
                      alt="QR Code para contato via WhatsApp"
                      className="h-full w-full object-cover"
                    />

                  {/*
                    QUANDO TIVER A IMAGEM DO QR CODE,
                    REMOVA O BLOCO ACIMA E USE:

                    <img
                      src="/qr-code-felipe.png"
                      alt="QR Code para contato via WhatsApp"
                      className="h-full w-full object-cover"
                    />
                  */}
                </div>

                <div className="mt-5 text-center">
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/5 px-4 py-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#4ade80]" />

                    <span className="text-xs font-medium text-emerald-300">
                      WhatsApp
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-6 text-white/35">
                    Aponte a câmera do celular e fale comigo diretamente.
                  </p>
                </div>
              </div>

              {/* Elementos decorativos */}
              <div className="absolute -right-4 -top-4 h-10 w-10 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl" />

              <div className="absolute -bottom-4 -left-4 h-14 w-14 rounded-2xl border border-white/10 bg-emerald-400/5 backdrop-blur-xl" />
            </div>
          </div>
        </div>

        {/* Frase final */}
        <div
          data-aos="fade-up"
          className="mt-8 flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/[0.02] p-6 md:flex-row md:items-center md:justify-between"
        >
          <p className="text-sm text-white/40">
            Tem um projeto, uma oportunidade ou só quer trocar uma ideia?
          </p>

          <span className="text-sm font-semibold text-emerald-400">
            Pode chamar.
          </span>
        </div>
      </div>
    </section>
  );
}

export default Contato;
