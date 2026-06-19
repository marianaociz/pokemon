import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { router, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const { isAuthenticated, logout } = useAuth();
    const pathname = usePathname();

    async function handleLogout() {
        await logout();
        router.replace('/(auth)');
    }

    function go(path: string) {
        if (pathname === path) return; 
        router.replace(path);
    }

    return (
        <View style={styles.header}>
            <View style={styles.left}>
                <Image
                    source={require('../../../assets/pokemon.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.menu}>
                <TouchableOpacity
                    style={styles.pill}
                    onPress={() => go('/(app)/pokedex')}
                >
                    <Text style={styles.pillText}>Pokédex</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.pill}
                    onPress={() => go('/(app)/battle')}
                >
                    <Text style={styles.pillText}>Batalhas</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.pill}
                    onPress={() => go('/(app)/team')}
                >
                    <Text style={styles.pillText}>Equipe</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.iconWrap}
                    onPress={() => go('/(app)/perfil')}
                >
                    <Ionicons name="person-circle" size={34} color="#FFD700" />
                </TouchableOpacity>

                {isAuthenticated ? (
                    <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Sair</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => router.replace('/(auth)')}
                    >
                        <Text style={styles.loginText}>Entrar</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 70,
        backgroundColor: '#0b1020',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#1f2937',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },

    left: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    logo: {
        width: 130,
        height: 45,
    },

    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    pill: {
        backgroundColor: '#111827',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#1f2937',
    },

    pillText: {
        color: '#F3F4F6',
        fontWeight: '800',
        fontSize: 13,
    },

    iconWrap: {
        padding: 4,
        borderRadius: 30,
        backgroundColor: '#111827',
        borderWidth: 1,
        borderColor: '#1f2937',
    },

    loginBtn: {
        backgroundColor: '#16a34a',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },

    loginText: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 12,
    },

    logoutBtn: {
        backgroundColor: '#ef4444',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 16,
    },

    logoutText: {
        color: '#fff',
        fontWeight: '800',
        fontSize: 12,
    },
});