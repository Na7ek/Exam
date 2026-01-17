import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginRequest } from "../api/auth.api";

export function useLogin() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ username, password }) => loginRequest({ username, password }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["profile"] });
    },
  });
}
