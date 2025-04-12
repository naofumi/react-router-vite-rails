import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {getMe, type Me} from "~/models/me"

type AuthContextType = {
  me: Me | null;
  resetMe: () => void;
};

const AuthContext = createContext<AuthContextType>({
  me: null,
  resetMe: () => {},
} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [me, setMe] = useState<Me | null>(null);
  const [meLoaded, setMeLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (meLoaded) {
      return
    }
    getMe().then(me => {
      setMe(me)
      setMeLoaded(true)
    })
  }, [meLoaded, setMe, setMeLoaded])

  const resetMe = () => {
    setMeLoaded(false)
    setMe(null)
  }

  return (
    <AuthContext.Provider value={{ me, resetMe }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook to use Auth
export const useAuth = () => {
  return useContext(AuthContext);
};
