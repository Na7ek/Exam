import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerRequest } from "../api/auth.api";

export function useRegister() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: registerRequest,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
