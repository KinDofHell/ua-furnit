import {createContext, useState, ReactNode, FC, useEffect} from "react";
import axiosInstance from "../../utils/axiosInstance";
import jwtDecode, {JwtPayload} from 'jwt-decode';

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextValue {
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (login: string | null, password: string | null) => Promise<void>;
    logout: () => void;
}

interface DecodedToken extends JwtPayload {
    [key: string]: any;
}

export const AuthContext = createContext<AuthContextValue>(null!);

export const AuthProvider: FC<AuthProviderProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>('');

    useEffect(() => {
        setToken(localStorage.getItem("token"));
        if (token)
        {
            setIsAuthenticated(true);
            const decoded = jwtDecode<DecodedToken>(token)
            if(decoded.role === "648c33eaf4a0e1b4f812be09")
                setIsAdmin(true);
        }
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
                    const decoded = jwtDecode<DecodedToken>(res.data);
                    if(decoded.role === "648c33eaf4a0e1b4f812be09")
                        setIsAdmin(true);
                });
        } catch (error) {
            alert("Помилка авторизації: пароль чи логін невірні!")
        }
    };

    const logout = () => {
        if (window.confirm("Ви дійсно хочете вийти?")) {
            localStorage.removeItem("token");
            setIsAuthenticated(false);
            setIsAdmin(false);
        }
    };

    return (
        <AuthContext.Provider value={{isAuthenticated, isAdmin, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
