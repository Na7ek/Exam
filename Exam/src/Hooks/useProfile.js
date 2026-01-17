import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "../api/user.api";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
    retry: false,
  });
}
