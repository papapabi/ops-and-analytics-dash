import { useEffect, useMemo, useState } from "react";
import { apiClient } from "./api/client";
import { DataTable } from "./components/DataTable";
import { DistributionChart } from "./components/DistributionChart";
import { FilterBar } from "./components/FilterBar";
import { MetricCard } from "./components/MetricCard";
import { Sidebar } from "./components/Sidebar";
import { TrendChart } from "./components/TrendChart";
import { WidgetModal } from "./components/WidgetModal";
import type {
  DistributionItem,
  EventItem,
  FilterOptions,
  Metric,
  TrendPoint,
} from "./types";

interface FilterState {
  search: string;
  statuses: string[];
  regions: string[];
  tags: string[];
}

const initialFilters: FilterState = {
  search: "",
  statuses: [],
  regions: [],
  tags: [],
};

export default function App() {
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [trends, setTrends] = useState<TrendPoint[]>([]);
  const [distribution, setDistribution] = useState<DistributionItem[]>([]);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    const loadStatic = async () => {
      setLoading(true);
      try {
        const [m, t, d, f] = await Promise.all([
          apiClient.getMetrics(),
          apiClient.getTrends(),
          apiClient.getDistribution(),
          apiClient.getFilters(),
        ]);
        setMetrics(m);
        setTrends(t);
        setDistribution(d);
        setFilterOptions(f);
      } finally {
        setLoading(false);
      }
    };

    void loadStatic();
  }, []);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const response = await apiClient.getEvents(filters);
        setEvents(response.items);
      } finally {
        setLoading(false);
      }
    };

    void loadEvents();
  }, [filters]);

  const cards = useMemo(
    () =>
      loading
        ? Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card h-28 animate-pulse bg-slate-200 dark:bg-slate-800" />
          ))
        : metrics.map((metric) => <MetricCard key={metric.label} item={metric} />),
    [loading, metrics]
  );

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar dark={dark} onToggleTheme={() => setDark((v) => !v)} />

      <main className="w-full p-4 md:p-6">
        <header className="mb-5">
          <h1 className="text-2xl font-bold">Operations & Analytics Dashboard</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Copilot-style prototype with FastAPI and interactive UI components.
          </p>
        </header>

        <section className="mb-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{cards}</section>

        <section className="mb-5">
          <FilterBar options={filterOptions} value={filters} onChange={setFilters} />
        </section>

        <section className="mb-5 grid gap-4 xl:grid-cols-2">
          <TrendChart data={trends} />
          <DistributionChart data={distribution} />
        </section>

        <section>
          <DataTable rows={events} loading={loading} onCreate={() => setOpenModal(true)} />
        </section>
      </main>

      <WidgetModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSubmit={async (payload) => {
          await fetch(`${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000"}/api/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          const response = await apiClient.getEvents(filters);
          setEvents(response.items);
        }}
      />
    </div>
  );
}
