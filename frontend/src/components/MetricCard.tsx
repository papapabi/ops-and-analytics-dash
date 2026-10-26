import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { Metric } from "../types";

export function MetricCard({ item }: { item: Metric }) {
  const isUp = item.trend === "up";

  return (
    <div className="card">
      <p className="mb-2 text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
      <p className="text-2xl font-semibold">
        {Number.isInteger(item.value) ? item.value.toLocaleString() : item.value}
      </p>
      <div
        className={`mt-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
          isUp
            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
            : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
        }`}
      >
        {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        <span>{Math.abs(item.delta)}%</span>
      </div>
    </div>
  );
}
