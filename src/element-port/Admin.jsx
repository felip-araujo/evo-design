import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Code2,
  ExternalLink,
  GitBranch,
  Image,
  Loader2,
  Pencil,
  Plus,
  Save,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { API_URL } from "../services/ApiUrl";
import { COVER_ACCEPT, MAX_COVER_BYTES, coverMimeForFile, DEMO_ACCEPT, MAX_DEMO_BYTES, demoTypeForFile, projectMediaUrl } from "../services/projectMedia";
import { uploadProjectMedia } from "../services/uploadProjectMedia";

const FORM_INICIAL = {
  title: "",
  category: "",
  summary: "",
  description: "",
  coverImage: "",
  demoUrl: "",
  demoType: "",
  technologies: "",
  projectUrl: "",
  githubUrl: "",
  featured: false,
  status: "DRAFT",
  displayOrder: 0,
};

function AdminProjetos() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [excluindoId, setExcluindoId] = useState(null);

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editandoId, setEditandoId] = useState(null);

  const [form, setForm] = useState(FORM_INICIAL);
  const [demoFile, setDemoFile] = useState(null);
  const [demoPreview, setDemoPreview] = useState("");
  const demoInputRef = useRef(null);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const coverInputRef = useRef(null);

  useEffect(() => {
    if (!coverPreview) return;
    return () => URL.revokeObjectURL(coverPreview);
  }, [coverPreview]);

  function limparArquivoCapa() {
    setCoverFile(null);
    setCoverPreview("");
    if (coverInputRef.current) coverInputRef.current.value = "";
  }

  function selecionarCapa(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!coverMimeForFile(file) || file.size === 0 || file.size > MAX_COVER_BYTES) {
      toast.warning("Selecione PNG, JPG, WebP ou GIF de até 10 MB.");
      event.target.value = "";
      return;
    }
    setCoverPreview(URL.createObjectURL(file));
    setCoverFile(file);
  }

  useEffect(() => {
    if (!demoPreview) return;
    return () => URL.revokeObjectURL(demoPreview);
  }, [demoPreview]);

  function limparArquivoDemo() {
    setDemoFile(null);
    setDemoPreview("");
    if (demoInputRef.current) demoInputRef.current.value = "";
  }

  function selecionarDemo(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const type = demoTypeForFile(file);
    if (!type || file.size === 0 || file.size > MAX_DEMO_BYTES) {
      toast.warning("Selecione um GIF, MP4 ou WebM de até 25 MB.");
      event.target.value = "";
      return;
    }
    setDemoPreview(URL.createObjectURL(file));
    setDemoFile(file);
  }

  useEffect(() => {
    carregarProjetos();
  }, []);

  async function carregarProjetos() {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/projeto`);

      setProjetos(response.data);
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);

      toast.error("Erro ao carregar projetos.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    if (name === "coverImage") limparArquivoCapa();

    setForm((prev) => ({
      ...prev,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  }

  function abrirNovoProjeto() {
    limparArquivoDemo();
    limparArquivoCapa();
    setEditandoId(null);
    setForm(FORM_INICIAL);
    setMostrarFormulario(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function editarProjeto(projeto) {
    limparArquivoDemo();
    limparArquivoCapa();
    setEditandoId(projeto.id);

    setForm({
      title: projeto.title || "",
      category: projeto.category || "",
      summary: projeto.summary || "",
      description: projeto.description || "",
      coverImage: projeto.coverImage || "",
      demoUrl: projeto.demoUrl || "",
      demoType: projeto.demoType || "",

      technologies: Array.isArray(projeto.technologies)
        ? projeto.technologies.join(", ")
        : "",

      projectUrl: projeto.projectUrl || "",
      githubUrl: projeto.githubUrl || "",
      featured: projeto.featured || false,
      status: projeto.status || "DRAFT",
      displayOrder: projeto.displayOrder || 0,
    });

    setMostrarFormulario(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function cancelarFormulario() {
    limparArquivoDemo();
    limparArquivoCapa();
    setMostrarFormulario(false);
    setEditandoId(null);
    setForm(FORM_INICIAL);
  }

  async function salvarProjeto(e) {
    e.preventDefault();
    if (salvando) return;

    if (!form.title.trim()) {
      toast.warning("Informe o título do projeto.");
      return;
    }

    if (!form.summary.trim()) {
      toast.warning("Informe o resumo do projeto.");
      return;
    }

    try {
      setSalvando(true);

      const technologies = form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

      let demoUrl = form.demoUrl;
      let demoType = form.demoType;
      let coverImage = form.coverImage;
      if (coverFile) {
        const uploaded = await uploadProjectMedia(coverFile, "cover");
        coverImage = uploaded.coverImage;
        setForm((prev) => ({ ...prev, coverImage }));
        limparArquivoCapa();
      }
      if (demoFile) {
        const uploaded = await uploadProjectMedia(demoFile, "demo");
        demoUrl = uploaded.demoUrl;
        demoType = uploaded.demoType;
        // Keep the uploaded file reference if saving the project needs a retry.
        setForm((prev) => ({ ...prev, demoUrl, demoType }));
        limparArquivoDemo();
      }

      const payload = {
        title: form.title.trim(),

        category:
          form.category.trim() || null,

        summary: form.summary.trim(),

        description:
          form.description.trim() || null,

        coverImage:
          coverImage.trim() || null,
        demoUrl: demoUrl || null,
        demoType: demoType || null,

        technologies,

        projectUrl:
          form.projectUrl.trim() || null,

        githubUrl:
          form.githubUrl.trim() || null,

        featured: form.featured,

        status: form.status,

        displayOrder:
          Number(form.displayOrder) || 0,
      };

      if (editandoId) {
        await axios.patch(
          `${API_URL}/projeto/${editandoId}`,
          payload
        );

        toast.success("Projeto atualizado com sucesso.");
      } else {
        await axios.post(
          `${API_URL}/projeto`,
          payload
        );

        toast.success("Projeto criado com sucesso.");
      }

      cancelarFormulario();

      await carregarProjetos();
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Erro ao salvar projeto."
      );
    } finally {
      setSalvando(false);
    }
  }

  async function excluirProjeto(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este projeto?"
    );

    if (!confirmar) return;

    try {
      setExcluindoId(id);

      await axios.delete(
        `${API_URL}/projeto/${id}`
      );

      toast.success("Projeto excluído com sucesso.");

      setProjetos((prev) =>
        prev.filter((projeto) => projeto.id !== id)
      );
    } catch (error) {
      console.error("Erro ao excluir projeto:", error);

      toast.error("Erro ao excluir projeto.");
    } finally {
      setExcluindoId(null);
    }
  }

  function statusProjeto(status) {
    if (status === "PUBLISHED") {
      return {
        texto: "Publicado",
        classe:
          "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
      };
    }

    if (status === "ARCHIVED") {
      return {
        texto: "Arquivado",
        classe:
          "border-white/10 bg-white/5 text-white/40",
      };
    }

    return {
      texto: "Rascunho",
      classe:
        "border-yellow-400/20 bg-yellow-400/10 text-yellow-300",
    };
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#030712] px-5 py-8 text-white">
      <ToastContainer
        position="top-right"
        theme="dark"
        autoClose={3000}
      />

      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(34,197,94,0.12),transparent_30%),radial-gradient(circle_at_85%_50%,rgba(59,130,246,0.12),transparent_30%)]" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        {/* TOP BAR */}
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              to="/"
              className="mb-5 inline-flex items-center gap-2 text-sm text-white/40 transition hover:text-white"
            >
              <ArrowLeft size={17} />
              Voltar ao portfólio
            </Link>

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Code2
                  size={25}
                  className="text-emerald-400"
                />
              </div>

              <div>
                <h1 className="text-2xl font-bold md:text-3xl">
                  Gerenciar projetos
                </h1>

                <p className="mt-1 text-sm text-white/40">
                  Cadastre e atualize os projetos exibidos no portfólio.
                </p>
              </div>
            </div>
          </div>

          {!mostrarFormulario && (
            <button
              onClick={abrirNovoProjeto}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-3.5 font-semibold text-slate-950 transition hover:scale-[1.02]"
            >
              <Plus size={19} />
              Novo Projeto
            </button>
          )}
        </div>

        {/* FORMULÁRIO */}
        {mostrarFormulario && (
          <section className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 md:px-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                  {editandoId
                    ? "Editar projeto"
                    : "Novo projeto"}
                </span>

                <h2 className="mt-1 text-xl font-bold">
                  {editandoId
                    ? "Atualizar informações"
                    : "Cadastrar novo projeto"}
                </h2>
              </div>

              <button
                type="button"
                onClick={cancelarFormulario}
                disabled={salvando}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/50 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={salvarProjeto}
              className="p-6 md:p-8"
            >
              <fieldset disabled={salvando} className="grid min-w-0 gap-6 lg:grid-cols-2">
                {/* TÍTULO */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
                    Título *
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Ex: Plataforma de Gestão para Agronegócio"
                    className="input-admin"
                  />
                </div>

                {/* CATEGORIA */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
                    Categoria
                  </label>

                  <input
                    type="text"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    placeholder="Ex: Sistema Web"
                    className="input-admin"
                  />
                </div>

                {/* RESUMO */}
                <div className="lg:col-span-2">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
                    Resumo *
                  </label>

                  <textarea
                    name="summary"
                    value={form.summary}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Resumo curto que será exibido no card..."
                    className="input-admin resize-none"
                  />
                </div>

                {/* DESCRIÇÃO */}
                <div className="lg:col-span-2">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
                    Descrição completa
                  </label>

                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Descreva o projeto, problema resolvido, funcionalidades..."
                    className="input-admin resize-y"
                  />
                </div>

                {/* IMAGEM */}
                <div className="lg:col-span-2">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
                    Imagem de capa
                  </label>

                  <div className="relative">
                    <Image
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                    />

                    <input
                      type="text"
                      inputMode="url"
                      name="coverImage"
                      value={form.coverImage}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="input-admin pl-12"
                    />
                  </div>

                  <label htmlFor="project-cover-file" className="mb-2 mt-4 block text-sm text-white/60">Ou envie a imagem de capa</label>
                  <input ref={coverInputRef} id="project-cover-file" type="file" accept={COVER_ACCEPT} disabled={salvando} onChange={selecionarCapa} className="input-admin file:mr-4 file:border-0 file:bg-[#c5f277] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#101113]" />
                  <p className="mt-2 text-xs leading-6 text-white/45">PNG, JPG, WebP ou GIF, até 10 MB.</p>

                  {(coverFile || form.coverImage) && (
                    <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                      <img
                        src={coverFile ? coverPreview : projectMediaUrl(form.coverImage)}
                        alt="Prévia"
                        className="h-52 w-full object-cover"
                      />
                      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
                        <span className="text-xs text-white/50">{coverFile ? coverFile.name : "Capa cadastrada"}</span>
                        <button type="button" disabled={salvando} onClick={() => { limparArquivoCapa(); setForm((prev) => ({ ...prev, coverImage: "" })); }} className="min-h-10 text-sm text-red-300 hover:text-red-200 disabled:opacity-50">Remover capa</button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-2">
                  <label htmlFor="project-demo-file" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
                    Demonstração do projeto (opcional)
                  </label>
                  <p className="mb-3 text-sm leading-6 text-white/50">Envie um GIF ou vídeo curto do sistema funcionando. GIF, MP4 ou WebM, até 25 MB. A demonstração será a mídia principal no portfólio; a capa fica como alternativa.</p>
                  <input ref={demoInputRef} id="project-demo-file" type="file" accept={DEMO_ACCEPT} disabled={salvando} onChange={selecionarDemo} className="input-admin file:mr-4 file:border-0 file:bg-[#c5f277] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-[#101113]" />
                  {(demoFile || form.demoUrl) && (
                    <div className="mt-4 border border-white/10 p-4">
                      {((demoFile && demoTypeForFile(demoFile)) || form.demoType) === "VIDEO" ? (
                        <video src={demoFile ? demoPreview : projectMediaUrl(form.demoUrl)} controls playsInline preload="metadata" className="max-h-72 w-full" />
                      ) : (
                        <img src={demoFile ? demoPreview : projectMediaUrl(form.demoUrl)} alt="Prévia da demonstração" className="max-h-72 w-full object-contain" />
                      )}
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                        <span className="text-xs text-white/50">{demoFile ? `${demoFile.name} · ${(demoFile.size / 1024 / 1024).toFixed(1)} MB` : "Demonstração cadastrada"}</span>
                        <button type="button" disabled={salvando} onClick={() => { limparArquivoDemo(); setForm((prev) => ({ ...prev, demoUrl: "", demoType: "" })); }} className="min-h-10 text-sm text-red-300 hover:text-red-200 disabled:opacity-50">Remover demonstração</button>
                      </div>
                    </div>
                  )}
                </div>

                {/* TECNOLOGIAS */}
                <div className="lg:col-span-2">
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
                    Tecnologias
                  </label>

                  <input
                    type="text"
                    name="technologies"
                    value={form.technologies}
                    onChange={handleChange}
                    placeholder="React, Tailwind CSS, Node.js, Express, Prisma, MySQL"
                    className="input-admin"
                  />

                  <p className="mt-2 text-xs text-white/25">
                    Separe as tecnologias por vírgula.
                  </p>

                  {form.technologies && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {form.technologies
                        .split(",")
                        .map((item) => item.trim())
                        .filter(Boolean)
                        .map((tech, index) => (
                          <span
                            key={`${tech}-${index}`}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60"
                          >
                            {tech}
                          </span>
                        ))}
                    </div>
                  )}
                </div>

                {/* URL PROJETO */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
                    Link do projeto
                  </label>

                  <div className="relative">
                    <ExternalLink
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                    />

                    <input
                      type="url"
                      name="projectUrl"
                      value={form.projectUrl}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="input-admin pl-12"
                    />
                  </div>
                </div>

                {/* GITHUB */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
                    GitHub
                  </label>

                  <div className="relative">
                    <GitBranch
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
                    />

                    <input
                      type="url"
                      name="githubUrl"
                      value={form.githubUrl}
                      onChange={handleChange}
                      placeholder="https://github.com/..."
                      className="input-admin pl-12"
                    />
                  </div>
                </div>

                {/* STATUS */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                    className="input-admin"
                  >
                    <option value="DRAFT">
                      Rascunho
                    </option>

                    <option value="PUBLISHED">
                      Publicado
                    </option>

                    <option value="ARCHIVED">
                      Arquivado
                    </option>
                  </select>
                </div>

                {/* ORDEM */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/45">
                    Ordem de exibição
                  </label>

                  <input
                    type="number"
                    name="displayOrder"
                    value={form.displayOrder}
                    onChange={handleChange}
                    min="0"
                    className="input-admin"
                  />
                </div>

                {/* DESTAQUE */}
                <div className="lg:col-span-2">
                  <label className="flex cursor-pointer items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-4 transition hover:bg-white/[0.04]">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={form.featured}
                      onChange={handleChange}
                      className="h-5 w-5 accent-emerald-400"
                    />

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/10 text-emerald-400">
                      <Star size={19} />
                    </div>

                    <div>
                      <span className="block text-sm font-semibold">
                        Projeto em destaque
                      </span>

                      <span className="mt-1 block text-xs text-white/35">
                        Esse projeto terá maior destaque na página pública.
                      </span>
                    </div>
                  </label>
                </div>
              </fieldset>

              {/* BOTÕES */}
              <div className="mt-8 flex flex-col justify-end gap-3 border-t border-white/10 pt-6 sm:flex-row">
                <button
                  type="button"
                  onClick={cancelarFormulario}
                  disabled={salvando}
                  className="rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/70 transition hover:bg-white/10"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  disabled={salvando}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {salvando ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />

                      Salvando...
                    </>
                  ) : (
                    <>
                      <Save size={18} />

                      {editandoId
                        ? "Salvar alterações"
                        : "Criar projeto"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        )}

        {/* LISTAGEM */}
        <section>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">
                Projetos cadastrados
              </h2>

              <p className="mt-1 text-sm text-white/35">
                {projetos.length} projeto
                {projetos.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-[350px] items-center justify-center">
              <Loader2
                size={34}
                className="animate-spin text-emerald-400"
              />
            </div>
          ) : projetos.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] px-6 py-20 text-center">
              <Code2
                size={44}
                className="mx-auto text-white/15"
              />

              <h3 className="mt-5 text-lg font-semibold">
                Nenhum projeto cadastrado
              </h3>

              <p className="mt-2 text-sm text-white/35">
                Adicione o primeiro projeto ao seu portfólio.
              </p>

              <button
                onClick={abrirNovoProjeto}
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950"
              >
                <Plus size={17} />
                Novo Projeto
              </button>
            </div>
          ) : (
            <div className="grid gap-5">
              {projetos.map((projeto) => {
                const status = statusProjeto(
                  projeto.status
                );

                return (
                  <article
                    key={projeto.id}
                    className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.03] transition hover:border-white/15 hover:bg-white/[0.045]"
                  >
                    <div className="grid md:grid-cols-[190px_1fr]">
                      {/* IMAGE */}
                      <div className="relative min-h-[180px] overflow-hidden bg-[#08111f] md:min-h-full">
                        {projeto.coverImage ? (
                          <img
                            src={projectMediaUrl(projeto.coverImage)}
                            alt={projeto.title}
                            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full min-h-[180px] items-center justify-center">
                            <Code2
                              size={45}
                              className="text-white/10"
                            />
                          </div>
                        )}
                      </div>

                      {/* CONTENT */}
                      <div className="p-6">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                          <div className="max-w-3xl">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`rounded-full border px-3 py-1 text-[11px] font-semibold ${status.classe}`}
                              >
                                {status.texto}
                              </span>

                              {projeto.featured && (
                                <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[11px] font-semibold text-cyan-300">
                                  <Star size={11} />
                                  Destaque
                                </span>
                              )}

                              <span className="text-xs text-white/25">
                                Ordem: {projeto.displayOrder}
                              </span>
                            </div>

                            <h3 className="mt-4 text-xl font-bold">
                              {projeto.title}
                            </h3>

                            {projeto.category && (
                              <p className="mt-1 text-sm font-medium text-emerald-400">
                                {projeto.category}
                              </p>
                            )}

                            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">
                              {projeto.summary}
                            </p>

                            {Array.isArray(
                              projeto.technologies
                            ) &&
                              projeto.technologies.length >
                                0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                  {projeto.technologies.map(
                                    (tech) => (
                                      <span
                                        key={tech}
                                        className="rounded-lg bg-white/5 px-2.5 py-1 text-[11px] text-white/50"
                                      >
                                        {tech}
                                      </span>
                                    )
                                  )}
                                </div>
                              )}
                          </div>

                          {/* ACTIONS */}
                          <div className="flex gap-2 lg:flex-col">
                            <button
                              onClick={() =>
                                editarProjeto(projeto)
                              }
                              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-emerald-300"
                            >
                              <Pencil size={16} />
                              Editar
                            </button>

                            <button
                              onClick={() =>
                                excluirProjeto(projeto.id)
                              }
                              disabled={
                                excluindoId === projeto.id
                              }
                              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-400/10 bg-red-400/5 px-4 py-2.5 text-sm font-medium text-red-300/70 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300 disabled:opacity-50"
                            >
                              {excluindoId ===
                              projeto.id ? (
                                <Loader2
                                  size={16}
                                  className="animate-spin"
                                />
                              ) : (
                                <Trash2 size={16} />
                              )}

                              Excluir
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>

      {/* ESTILO REUTILIZADO DOS INPUTS */}
      <style>{`
        .input-admin {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.10);
          background: rgba(255, 255, 255, 0.035);
          padding: 0.875rem 1rem;
          font-size: 0.875rem;
          color: white;
          outline: none;
          transition: all 0.25s ease;
        }

        .input-admin::placeholder {
          color: rgba(255, 255, 255, 0.18);
        }

        .input-admin:focus {
          border-color: rgba(52, 211, 153, 0.45);
          background: rgba(255, 255, 255, 0.055);
          box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.05);
        }

        .input-admin option {
          background: #08111f;
          color: white;
        }
      `}</style>
    </main>
  );
}

export default AdminProjetos;
