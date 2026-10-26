import { useMemo } from "react";
import type { ChangeEvent } from "react";
import type { FilterOptions } from "../types";

interface FilterState {
  search: string;
  statuses: string[];
  regions: string[];
  tags: string[];
}

interface FilterBarProps {
  options: FilterOptions | null;
  value: FilterState;
  onChange: (next: FilterState) => void;
}

function toggleValue(source: string[], value: string) {
  return source.includes(value)
    ? source.filter((item) => item !== value)
    : [...source, value];
}

export function FilterBar({ options, value, onChange }: FilterBarProps) {
  const ready = useMemo<FilterOptions>(
    () => options ?? { statuses: [], regions: [], tags: [] },
    [options]
  );

  return (
    <div className="card space-y-3">
      <input
        className="input"
        placeholder="Search by service, owner, region..."
        value={value.search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          onChange({ ...value, search: e.target.value })
        }
      />

      <div className="grid gap-3 md:grid-cols-3">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase text-slate-500">Status</p>
          <div className="flex flex-wrap gap-2">
            {ready.statuses.map((status) => (
              <button
                key={status}
                onClick={() =>
                  onChange({ ...value, statuses: toggleValue(value.statuses, status) })
                }
                className={`badge border ${
                  value.statuses.includes(status)
                    ? "border-indigo-300 bg-indigo-100 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
                    : "border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase text-slate-500">Region</p>
          <div className="flex flex-wrap gap-2">
            {ready.regions.map((region) => (
              <button
                key={region}
                onClick={() =>
                  onChange({ ...value, regions: toggleValue(value.regions, region) })
                }
                className={`badge border ${
                  value.regions.includes(region)
                    ? "border-indigo-300 bg-indigo-100 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
                    : "border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1 text-xs font-semibold uppercase text-slate-500">Tags</p>
          <div className="flex flex-wrap gap-2">
            {ready.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => onChange({ ...value, tags: toggleValue(value.tags, tag) })}
                className={`badge border ${
                  value.tags.includes(tag)
                    ? "border-indigo-300 bg-indigo-100 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
                    : "border-slate-300 text-slate-600 dark:border-slate-700 dark:text-slate-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
