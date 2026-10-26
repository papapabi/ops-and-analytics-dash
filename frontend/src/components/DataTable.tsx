import type { EventItem, Status } from "../types";

const statusStyles: Record<Status, string> = {
  healthy: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  warning: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  critical: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
};

interface DataTableProps {
  rows: EventItem[];
  loading: boolean;
  onCreate: () => void;
}

export function DataTable({ rows, loading, onCreate }: DataTableProps) {
  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-10 rounded bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
      </div>
    );
  }

  if (!rows.length) {
    return (
      <div className="card flex flex-col items-center justify-center gap-2 py-10 text-center">
        <p className="text-sm text-slate-500">No data found for this filter set.</p>
        <button
          onClick={onCreate}
          className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700"
        >
          Create Event
        </button>
      </div>
    );
  }

  return (
    <div className="card overflow-x-auto">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold">Live Events</h3>
        <button
          onClick={onCreate}
          className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white hover:bg-indigo-700"
        >
          New Event
        </button>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left dark:border-slate-800">
            <th className="py-2">Service</th>
            <th className="py-2">Status</th>
            <th className="py-2">Region</th>
            <th className="py-2">Tags</th>
            <th className="py-2">Owner</th>
            <th className="py-2">Updated</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-slate-100 dark:border-slate-800/70">
              <td className="py-3 font-medium">{row.service}</td>
              <td className="py-3">
                <span className={`badge ${statusStyles[row.status]}`}>{row.status}</span>
              </td>
              <td className="py-3">{row.region}</td>
              <td className="py-3">
                <div className="flex flex-wrap gap-1">
                  {row.tags.map((tag) => (
                    <span
                      key={tag}
                      className="badge border border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-3">{row.owner}</td>
              <td className="py-3 text-slate-500">
                {new Date(row.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
