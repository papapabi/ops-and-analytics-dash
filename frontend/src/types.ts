export type Status = "healthy" | "warning" | "critical";

export interface Metric {
  label: string;
  value: number;
  delta: number;
  trend: "up" | "down";
}

export interface TrendPoint {
  date: string;
  throughput: number;
  errors: number;
}

export interface DistributionItem {
  name: string;
  value: number;
}

export interface EventItem {
  id: number;
  service: string;
  status: Status;
  region: string;
  tags: string[];
  owner: string;
  created_at: string;
}

export interface EventsResponse {
  items: EventItem[];
  total: number;
}

export interface FilterOptions {
  statuses: string[];
  regions: string[];
  tags: string[];
}
