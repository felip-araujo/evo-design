import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { API_URL } from '../services/ApiUrl';
import { getToken } from '../services/Auth.Jsx';

function duration(seconds) {
  const value = Math.round(Number(seconds) || 0);
  return value < 60 ? `${value}s` : `${Math.floor(value / 60)}min ${value % 60}s`;
}

export default function Analytics() {
  const [days, setDays] = useState('7');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${API_URL}/analytics/summary?days=${days}`, {
          headers: { Authorization: `Bearer ${getToken()}` }, signal: controller.signal,
        });
        if (!response.ok) throw new Error(response.status === 401 || response.status === 403 ? 'Sua sessão não tem acesso às métricas. Entre novamente.' : 'Não foi possível carregar as métricas. Verifique se o backend e a tabela de acessos estão atualizados.');
        setData(await response.json());
      } catch (failure) {
        if (!controller.signal.aborted) setError(failure.message);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [days, revision]);

  return (
    <section className="mb-10 rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 md:p-8" aria-labelledby="analytics-title">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div><h2 id="analytics-title" className="text-xl font-bold">Acessos ao portfólio</h2><p className="mt-1 text-sm text-white/45">Visitantes, visitas e tempo com a página visível.</p></div>
        <div className="flex items-center gap-3">
          <select aria-label="Período das métricas" value={days} onChange={(event) => setDays(event.target.value)} className="rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm">
            <option value="1">Últimas 24 horas</option><option value="7">Últimos 7 dias</option><option value="30">Últimos 30 dias</option><option value="90">Últimos 90 dias</option>
          </select>
          <button type="button" aria-label="Atualizar métricas" disabled={loading} onClick={() => setRevision((value) => value + 1)} className="rounded-xl border border-white/10 p-2 disabled:opacity-40"><RefreshCw size={18} className={loading ? 'animate-spin' : ''} /></button>
        </div>
      </div>
      {error ? <p role="alert" className="text-sm text-red-300">{error}</p> : loading ? <p role="status" className="text-sm text-white/50">Carregando métricas...</p> : data && <>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[[ 'Visitantes únicos', data.visitors ], [ 'Visitas', data.visits ], [ 'Tempo médio por visita', duration(data.averageSeconds) ], [ 'Tempo total', duration(data.totalSeconds) ]].map(([label, value]) => <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"><p className="text-sm text-white/45">{label}</p><p className="mt-2 text-3xl font-semibold text-emerald-300">{value}</p></div>)}
        </div>
        <h3 className="mb-3 mt-7 font-semibold">Visitas por dia <span className="text-xs font-normal text-white/40">(UTC)</span></h3>
        <div className="flex h-32 items-end gap-1 overflow-x-auto" aria-label="Gráfico de visitas diárias">
          {data.daily.map((day) => <div key={day.date} className="flex min-w-5 flex-1 flex-col items-center justify-end gap-1" title={`${day.date}: ${day.visits} visitas`}><span className="text-[10px] text-white/50">{day.visits || ''}</span><div className="w-full rounded-t bg-emerald-400/70" style={{ height: `${Math.max(2, day.visits / Math.max(1, ...data.daily.map((item) => item.visits)) * 80)}px` }} /><span className="text-[9px] text-white/40">{day.date.slice(8)}</span></div>)}
        </div>
        <h3 className="mb-3 mt-7 font-semibold">Últimos acessos</h3>
        {data.recent.length === 0 ? <p className="text-sm text-white/45">Nenhum acesso registrado neste período. A coleta começa após a ativação.</p> : <div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-white/40"><tr>{['Visitante', 'Quando', 'Página', 'Dispositivo / navegador', 'Origem', 'Tempo'].map((label) => <th key={label} className="whitespace-nowrap px-3 py-3 font-medium">{label}</th>)}</tr></thead><tbody>{data.recent.map((visit) => <tr key={visit.id} className="border-t border-white/10 text-white/70"><td className="px-3 py-3" title={visit.visitorId}>Anônimo {visit.visitorId.slice(0, 8)}</td><td className="whitespace-nowrap px-3 py-3">{new Date(visit.startedAt).toLocaleString('pt-BR')}</td><td className="px-3 py-3">{visit.path}</td><td className="whitespace-nowrap px-3 py-3">{visit.device} · {visit.browser}</td><td className="px-3 py-3">{visit.referrer || 'Direto'}</td><td className="whitespace-nowrap px-3 py-3">{duration(visit.durationSeconds)}</td></tr>)}</tbody></table></div>}
      </>}
      <p className="mt-5 text-xs leading-5 text-white/35">Visitantes únicos são estimados por navegador; outro aparelho ou limpeza do armazenamento pode contar novamente. Acessos do administrador logado não entram na coleta. O tempo é aproximado e atualizado a cada 15 segundos.</p>
    </section>
  );
}
