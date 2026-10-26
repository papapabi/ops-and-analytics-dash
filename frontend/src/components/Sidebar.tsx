import { BarChart3, LayoutDashboard, Settings, ShieldCheck } from "lucide-react";

interface SidebarProps {
  dark: boolean;
  onToggleTheme: () => void;
}

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Analytics", icon: BarChart3 },
  { label: "Reliability", icon: ShieldCheck },
  { label: "Settings", icon: Settings },
];

export function Sidebar({ dark, onToggleTheme }: SidebarProps) {
  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 lg:flex lg:flex-col">
      <div className="mb-6 text-lg font-semibold">Ops Console</div>
      <nav className="space-y-1">
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                idx === 0
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <button
          onClick={onToggleTheme}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Switch to {dark ? "Light" : "Dark"} Mode
        </button>
      </div>
    </aside>
  );
}
