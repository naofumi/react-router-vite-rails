import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { baseApiPath } from "~/utilities/proxy";

type AuthContextUserType = {
  id: number;
  email: string;
};

type AuthContextType = {
  currentUser: AuthContextUserType | null;
  setCurrentUser: (user: AuthContextUserType | null) => void;
};

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  setCurrentUser: () => {},
} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthContextUserType | null>(
    null
  );

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth
export const useAuth = () => {
  return useContext(AuthContext);
};
