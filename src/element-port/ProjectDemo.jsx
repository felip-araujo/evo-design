import { useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { projectMediaUrl } from "../services/projectMedia";

function ProjectDemo({ projeto }) {
  const dialogRef = useRef(null);
  const [opened, setOpened] = useState(false);

  if (!projeto.demoUrl || !["GIF", "VIDEO"].includes(projeto.demoType)) return null;

  function openDemo() {
    setOpened(true);
    dialogRef.current.showModal();
  }

  function closeDemo() {
    dialogRef.current.close();
  }

  return (
    <>
      <button type="button" onClick={openDemo} aria-haspopup="dialog" aria-label={`Ver demonstração de ${projeto.title}`} className="inline-flex min-h-11 items-center gap-2.5 border-b border-white/20 py-2 text-sm font-medium text-white/85 transition-colors duration-200 hover:border-[#c5f277]/50 hover:text-[#c5f277] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c5f277] motion-reduce:transition-none">
        <Play aria-hidden="true" size={16} /> Ver demonstração
      </button>
      <dialog ref={dialogRef} aria-label={`Demonstração de ${projeto.title}`} onClose={() => setOpened(false)} className="fixed inset-0 m-auto max-h-[90dvh] w-[calc(100%-2rem)] max-w-5xl overflow-y-auto border border-white/15 bg-[#101113] p-0 text-[#efefeb] backdrop:bg-black/80">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#c5f277]">Demonstração</p>
            <h2 className="mt-1 break-words text-lg font-semibold tracking-tight">{projeto.title}</h2>
          </div>
          <button type="button" onClick={closeDemo} aria-label="Fechar demonstração" className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 transition-colors hover:border-[#c5f277]/50 hover:text-[#c5f277] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c5f277] motion-reduce:transition-none">
            <X aria-hidden="true" size={20} />
          </button>
        </div>
        {opened && (
          <div className="bg-black p-2 sm:p-4">
            {projeto.demoType === "VIDEO" ? (
              <video src={projectMediaUrl(projeto.demoUrl)} poster={projectMediaUrl(projeto.coverImage) || undefined} controls playsInline preload="metadata" aria-label={`Vídeo demonstrativo de ${projeto.title}`} className="mx-auto max-h-[70dvh] w-full">
                Seu navegador não suporta vídeo. <a href={projectMediaUrl(projeto.demoUrl)}>Abrir demonstração</a>
              </video>
            ) : (
              <img src={projectMediaUrl(projeto.demoUrl)} alt={`Demonstração do funcionamento de ${projeto.title}`} className="mx-auto max-h-[70dvh] w-full object-contain" />
            )}
          </div>
        )}
      </dialog>
    </>
  );
}

export default ProjectDemo;
