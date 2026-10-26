import { useState } from "react";
import type { Status } from "../types";

interface WidgetModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: {
    service: string;
    status: Status;
    region: string;
    tags: string[];
    owner: string;
  }) => Promise<void>;
}

export function WidgetModal({ open, onClose, onSubmit }: WidgetModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [state, setState] = useState({
    service: "",
    status: "healthy" as Status,
    region: "us-east",
    tags: "",
    owner: "",
  });

  if (!open) return null;

  const canSubmit = state.service.trim() && state.owner.trim();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-5 shadow-xl dark:bg-slate-900">
        <h3 className="mb-4 text-lg font-semibold">Create Event</h3>

        <div className="grid gap-3 md:grid-cols-2">
          <input
            className="input"
            placeholder="Service"
            value={state.service}
            onChange={(e) => setState((s) => ({ ...s, service: e.target.value }))}
          />
          <input
            className="input"
            placeholder="Owner"
            value={state.owner}
            onChange={(e) => setState((s) => ({ ...s, owner: e.target.value }))}
          />

          <select
            className="input"
            value={state.status}
            onChange={(e) => setState((s) => ({ ...s, status: e.target.value as Status }))}
          >
            <option value="healthy">healthy</option>
            <option value="warning">warning</option>
            <option value="critical">critical</option>
          </select>

          <input
            className="input"
            placeholder="Region"
            value={state.region}
            onChange={(e) => setState((s) => ({ ...s, region: e.target.value }))}
          />

          <input
            className="input md:col-span-2"
            placeholder="Tags (comma-separated)"
            value={state.tags}
            onChange={(e) => setState((s) => ({ ...s, tags: e.target.value }))}
          />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-700"
          >
            Cancel
          </button>
          <button
            disabled={!canSubmit || submitting}
            onClick={async () => {
              setSubmitting(true);
              await onSubmit({
                service: state.service.trim(),
                owner: state.owner.trim(),
                status: state.status,
                region: state.region.trim() || "us-east",
                tags: state.tags
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean),
              });
              setSubmitting(false);
              onClose();
            }}
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm text-white disabled:opacity-50"
          >
            {submitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
