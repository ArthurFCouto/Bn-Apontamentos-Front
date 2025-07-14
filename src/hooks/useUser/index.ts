import { useContext } from "react";
import { UserContext, UserContextData } from "@/contexts/user";

export function useUser(): UserContextData {
  const context = useContext(UserContext);

  return context;
}
