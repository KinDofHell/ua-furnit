import { createContext, useState, ReactNode, FC, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (login: string | null, password: string | null) => Promise<void>;
  logout: () => void;
}
export const AuthContext = createContext<AuthContextValue>(null!);

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (login: string | null, password: string | null) => {
    try {
      await axiosInstance
        .post("/login", {
          login: login,
          password: password,
        })
        .then((res) => {
          token &&
            !localStorage.getItem("token") &&
            localStorage.setItem("token", res.data);
          setIsAuthenticated(true);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    if (window.confirm("Ви дійсно хочете вийти?"))
      localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
