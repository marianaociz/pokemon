import { Stack, useRouter, useSegments } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function AppLayout() {
    const { loading, isAuthenticated } = useAuth();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (loading) return;

        const inApp = segments[0] === '(app)';
        const inAuth = segments[0] === '(auth)';

        if (!isAuthenticated && inApp) {
            console.log('REDIRECIONANDO');
            router.replace('/(auth)');
        }

        if (isAuthenticated && inAuth) {
            router.replace('/(app)/pokedex');
        }
    }, [loading, isAuthenticated, segments]);

    if (loading) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#0b1020',
            }}>
                <ActivityIndicator size="large" color="#FFD700" />
            </View>
        );
    }

    return <Stack screenOptions={{ headerShown: false }} />;
}