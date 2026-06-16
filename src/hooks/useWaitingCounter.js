import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Hook compartido para leer/incrementar el contador global de "personas esperando".
// Reemplaza la dependencia anterior de base44.entities.WaitingCount por un endpoint
// propio (/api/counter) respaldado por Upstash Redis. Arranca en 0 si no hay datos.

async function fetchCount() {
  const res = await fetch("/api/counter");
  if (!res.ok) throw new Error("No se pudo obtener el contador");
  const data = await res.json();
  return data.count ?? 0;
}

async function incrementCount() {
  const res = await fetch("/api/counter", { method: "POST" });
  if (!res.ok) throw new Error("No se pudo incrementar el contador");
  const data = await res.json();
  return data.count ?? 0;
}

export function useWaitingCount() {
  return useQuery({
    queryKey: ["waitingCount"],
    queryFn: fetchCount,
    initialData: 0,
    refetchInterval: 5000,
  });
}

export function useIncrementWaitingCount() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: incrementCount,
    onSuccess: (newCount) => {
      queryClient.setQueryData(["waitingCount"], newCount);
    },
  });
}
