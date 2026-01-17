import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutRequest } from "../api/auth.api";

export function useLogout() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: logoutRequest,
    onSuccess: () => {
      qc.removeQueries({ queryKey: ["profile"] });
    },
  });
}
