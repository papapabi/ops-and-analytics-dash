import axios from "axios";
import type {
  DistributionItem,
  EventItem,
  EventsResponse,
  FilterOptions,
  Metric,
  Status,
  TrendPoint,
} from "../types";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000",
});

export const apiClient = {
  getMetrics: async () => (await api.get<Metric[]>("/api/metrics")).data,
  getTrends: async () => (await api.get<TrendPoint[]>("/api/trends")).data,
  getDistribution: async () =>
    (await api.get<DistributionItem[]>("/api/distribution")).data,
  getFilters: async () => (await api.get<FilterOptions>("/api/filters")).data,
  getEvents: async (params: {
    search?: string;
    statuses?: string[];
    regions?: string[];
    tags?: string[];
  }) => {
    const query = new URLSearchParams();
    if (params.search) query.set("search", params.search);
    params.statuses?.forEach((status) => query.append("statuses", status));
    params.regions?.forEach((region) => query.append("regions", region));
    params.tags?.forEach((tag) => query.append("tags", tag));

    const url = query.toString() ? `/api/events?${query.toString()}` : "/api/events";
    return (await api.get<EventsResponse>(url)).data;
  },
  createEvent: async (payload: {
    service: string;
    status: Status;
    region: string;
    tags: string[];
    owner: string;
  }) => (await api.post<EventItem>("/api/events", payload)).data,
};
