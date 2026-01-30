import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useTracks() {
  return useQuery({
    queryKey: [api.tracks.list.path],
    queryFn: async () => {
      const res = await fetch(api.tracks.list.path);
      if (!res.ok) throw new Error("Failed to fetch tracks");
      return api.tracks.list.responses[200].parse(await res.json());
    },
  });
}

export function useTrack(id: number) {
  return useQuery({
    queryKey: [api.tracks.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.tracks.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch track");
      return api.tracks.get.responses[200].parse(await res.json());
    },
  });
}
