import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

import Header from '../../components/header';
import { useAuth } from '../../context/AuthContext';
import { styles } from '../../styles/perfil';

import { getProfile } from '@/integration/authIntegration';

type ProfileApi = {
    userId: string;
    username: string;
    level: number;
    vitorias: number;
    derrotas: number;
};

type Battle = {
    opponent: string;
    result: 'win' | 'loss';
};

type UserData = {
    userId: string;
    name: string;
    wins: number;
    losses: number;
    xp: number;
    level: number;
    battles: Battle[];
};

export default function Perfil() {
    const [openSection, setOpenSection] =
        useState<string | null>(null);

    const [localUser, setLocalUser] =
        useState<UserData | null>(null);

    const [profile, setProfile] =
        useState<ProfileApi | null>(null);

    const { user } = useAuth();

    useEffect(() => {
        async function loadUser() {
            try {
                const data =
                    await AsyncStorage.getItem(
                        '@user_data'
                    );

                if (data) {
                    const userData =
                        JSON.parse(data);

                    setLocalUser(userData);

                    if (userData.userId) {
                        const profileApi =
                            await getProfile(
                                userData.userId
                            );

                        setProfile(profileApi);
                    }
                }
            } catch (error) {
                console.log(
                    'Erro ao carregar perfil:',
                    error
                );
            }
        }

        loadUser();
    }, [user]);

    if (!localUser) return null;

    const battlesHistory =
        (localUser.battles || []).map(
            (b) =>
                `Vs ${b.opponent} - ${
                    b.result === 'win'
                        ? 'Vitória'
                        : 'Derrota'
                }`
        );

    const toggleSection = (
        section: string
    ) => {
        setOpenSection((prev) =>
            prev === section ? null : section
        );
    };

    const renderTextList = (
        items: string[]
    ) =>
        items.map((item, index) => (
            <View
                key={index}
                style={styles.listRow}
            >
                <Text style={styles.dot}>
                    •
                </Text>

                <Text
                    style={styles.historyItem}
                >
                    {item}
                </Text>
            </View>
        ));

    return (
        <View style={styles.container}>
            <Header />

            <TouchableOpacity
                style={styles.backButton}
               onPress={() => router.push('/(app)')}
            >
                <Text style={styles.backText}>
                    Voltar
                </Text>
            </TouchableOpacity>

            <ScrollView
                contentContainerStyle={
                    styles.content
                }
            >
                <View style={styles.profileBox}>
                    <Image
                        source={{
                            uri: 'https://i.pravatar.cc/300',
                        }}
                        style={styles.avatar}
                    />
                </View>

                <Text style={styles.name}>
                    {profile?.username ??
                        localUser.name}
                </Text>

                <View style={styles.levelBox}>
                    <Text
                        style={styles.levelText}
                    >
                        Nível{' '}
                        {profile?.level ??
                            localUser.level}
                    </Text>

                    <Text style={styles.xpText}>
                        {localUser.xp || 0} XP
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.card}
                    onPress={() =>
                        toggleSection(
                            'battles'
                        )
                    }
                >
                    <Text style={styles.label}>
                        ⚔️ Batalhas
                    </Text>

                    <Text style={styles.value}>
                        🏆{' '}
                        {profile?.vitorias ??
                            localUser.wins}{' '}
                        | 💀{' '}
                        {profile?.derrotas ??
                            localUser.losses}
                    </Text>

                    {openSection ===
                        'battles' && (
                        <View
                            style={
                                styles.historyBox
                            }
                        >
                            {battlesHistory.length ===
                            0 ? (
                                <Text
                                    style={
                                        styles.historyItem
                                    }
                                >
                                    Nenhuma
                                    batalha ainda
                                </Text>
                            ) : (
                                renderTextList(
                                    battlesHistory
                                )
                            )}
                        </View>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}