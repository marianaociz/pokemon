import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    loginUser,
    registerUser,
    updateProfile,
} from '@/integration/authIntegration';

type Battle = {
    opponent: string;
    result: 'win' | 'loss';
};

type UserData = {
    userId: string;
    name: string;
    password: string;

    wins: number;
    losses: number;
    xp: number;
    level: number;

    battles: Battle[];
};

type AuthContextType = {
    user: UserData | null;
    isAuthenticated: boolean;
    loading: boolean;

    login: (name: string, password: string) => Promise<boolean>;
    register: (name: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;

    addWin: (opponent: string) => Promise<void>;
    addLoss: (opponent: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(
    {} as AuthContextType
);

const STORAGE_USER = '@user_data';

export function AuthProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await AsyncStorage.getItem(
                    STORAGE_USER
                );

                if (data) {
                    setUser(JSON.parse(data));
                }
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    async function register(
        name: string,
        password: string
    ) {
        try {
            const response = await registerUser(
                name,
                password
            );

            return !!response?.userId;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async function login(
        name: string,
        password: string
    ) {
        try {
            const response = await loginUser(
                name,
                password
            );

            if (!response?.userId) {
                return false;
            }

           const storedUser = await AsyncStorage.getItem(
    STORAGE_USER
);

        const oldUser = storedUser
            ? JSON.parse(storedUser)
            : null;

            const session: UserData = {
                userId: response.userId,
                name,
                password,

                wins: oldUser?.wins || 0,
                losses: oldUser?.losses || 0,
                xp: oldUser?.xp || 0,
                level: oldUser?.level || 1,

                battles: oldUser?.battles || [],
            };

            setUser(session);

            await AsyncStorage.setItem(
                STORAGE_USER,
                JSON.stringify(session)
            );

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

async function logout() {
    await AsyncStorage.removeItem(STORAGE_USER);
    setUser(null);
}

    async function updateUser(data: UserData) {
        setUser(data);

        await AsyncStorage.setItem(
            STORAGE_USER,
            JSON.stringify(data)
        );
    }

    async function addWin(
        opponent: string
    ) {
        if (!user) return;

        const xp = user.xp + 50;

        const newUser: UserData  = {
            ...user,
            wins: user.wins + 1,
            xp,
            level:
                Math.floor(xp / 100) + 1,
            battles: [
                {
                    opponent,
                    result: 'win',
                },
                ...user.battles,
            ],
        };

        await updateUser(newUser);

        try {
            await updateProfile(
                user.userId,
                newUser.level,
                newUser.wins,
                newUser.losses
            );
        } catch (error) {
            console.log(
                'Erro ao atualizar AWS:',
                error
            );
        }
    }

    async function addLoss(
        opponent: string
    ) {
        if (!user) return;

        const xp = user.xp + 20;

        const newUser: UserData  = {
            ...user,
            losses: user.losses + 1,
            xp,
            level:
                Math.floor(xp / 100) + 1,
            battles: [
                {
                    opponent,
                    result: 'loss',
                },
                ...user.battles,
            ],
        };

        await updateUser(newUser);

        try {
            await updateProfile(
                user.userId,
                newUser.level,
                newUser.wins,
                newUser.losses
            );
        } catch (error) {
            console.log(
                'Erro ao atualizar AWS:',
                error
            );
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading,

                login,
                register,
                logout,

                addWin,
                addLoss,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}