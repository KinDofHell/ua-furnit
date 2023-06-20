import {createContext, useState, ReactNode, FC, useEffect} from "react";
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

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useState<boolean>(false);

    useEffect(() => {
        setToken(!!localStorage.getItem("token"));
        if (token)
            setIsAuthenticated(true);
    }, [token]);

    const login = async (login: string | null, password: string | null) => {
        try {
            await axiosInstance
                .post("/login", {
                    login: login,
                    password: password,
                })
                .then((res) => {
                    localStorage.setItem("token", res.data);
                    setIsAuthenticated(true);
                });
        } catch (error) {
            alert("Помилка авторизації: пароль чи логін невірні!")
        }
    };

    const logout = () => {
        if (window.confirm("Ви дійсно хочете вийти?")) {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
