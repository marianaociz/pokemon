import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import { router, Redirect } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#FFD700" />
            </View>
        );
    }

    if (!isAuthenticated) {
        return <Redirect href="/(auth)" />;
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Bem-vinda à Pokédex
                </Text>

                <Text style={styles.subtitle}>
                    Explore Pokémons, descubra tipos e monte sua coleção.
                </Text>

                <View style={styles.cardsContainer}>
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => router.push('/pokedex')}
                    >
                        <Text style={styles.emoji}>⚡</Text>
                        <Text style={styles.cardTitle}>Pokémons</Text>
                        <Text style={styles.cardText}>
                            Veja todos os Pokémons disponíveis.
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.card}
                       onPress={() => router.push('/(app)/perfil')}
                    >
                        <Text style={styles.emoji}>👤</Text>
                        <Text style={styles.cardTitle}>Perfil</Text>
                        <Text style={styles.cardText}>
                            Visualize seus dados.
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0b1020',
    },

    container: {
        flex: 1,
        backgroundColor: '#0b1020',
    },

    content: {
        flex: 1,
        padding: 24,
    },

    title: {
        fontSize: 34,
        fontWeight: '900',
        color: '#FFD700',
        marginBottom: 10,
    },

    subtitle: {
        fontSize: 16,
        color: '#CBD5E1',
        marginBottom: 30,
    },

    cardsContainer: {
        flexDirection: 'row',
        gap: 16,
        flexWrap: 'wrap',
    },

    card: {
        flex: 1,
        minWidth: 180,
        backgroundColor: '#111827',
        borderRadius: 24,
        padding: 20,
        borderWidth: 1,
        borderColor: '#1f2937',
    },

    emoji: {
        fontSize: 40,
        marginBottom: 12,
    },

    cardTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 8,
    },

    cardText: {
        color: '#CBD5E1',
        lineHeight: 22,
    },
});