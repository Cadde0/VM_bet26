// src/context/SessionContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    points: number;
    profilePictureUrl?: string;
}

interface SessionContextType {
    user: User | null;
    loading: boolean;
    refresh: () => void;
    logout: () => Promise<void>;
}

const SessionContext = createContext<SessionContextType>({
    user: null,
    loading: true,
    refresh: () => { },
    logout: async () => { },
});

export function SessionProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/me');
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        setUser(null);
    };

    return (
        <SessionContext.Provider value={{ user, loading, refresh: fetchUser, logout }}>
            {children}
        </SessionContext.Provider>
    );
}

export function useSession() {
    return useContext(SessionContext);
}
