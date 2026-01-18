import { useQuery } from "@tanstack/react-query";
import { fetchUserCars } from "../api/user.api";

export function useUserCars() {
  return useQuery({
    queryKey: ["userCars"],
    queryFn: fetchUserCars,
    enabled: true,
    retry: false,
  });
}
