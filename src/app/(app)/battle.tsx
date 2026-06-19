import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ScrollView,
    ImageBackground,
    Alert,
    StyleSheet,
} from 'react-native';

import { getTeam } from '@/integration/pokemonIntegration';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, router } from 'expo-router';
import Header from '@/components/header';
import { styles } from '../../styles/battle';
import { useAuth } from '@/context/AuthContext';


type Pokemon = {
    id: number;
    name: string;
    image: string;
    types: string[];

    hp: number;
    attack: number;
    defense: number;

    spAttack: number;
    spDefense: number;
    speed: number;
};

export default function Battle() {
    const { mode, pokemonName, pokemonImage, team } =
        useLocalSearchParams<{
            mode?: string;
            pokemonName?: string;
            pokemonImage?: string;
            team?: string;
        }>();

    const {
        user,
        addWin,
        addLoss,
    } = useAuth();
    let teamPokemons: Pokemon[] = [];

            try {
                teamPokemons = team
                    ? JSON.parse(String(team))
                    : [];
            } catch {
                teamPokemons = [];
            }

    const [loading, setLoading] = useState(true);
    const [enemyTeam, setEnemyTeam] = useState<Pokemon[]>([]);
    const [currentPlayerIndex, setCurrentPlayerIndex] =
    useState(0);

    const [currentEnemyIndex, setCurrentEnemyIndex] =
    useState(0);
    const currentPlayerPokemon =
    teamPokemons[currentPlayerIndex];
            
    const hasTeam =
    mode === 'team' &&
    team &&
    teamPokemons.length === 5;

    const currentEnemyPokemon =
    enemyTeam[currentEnemyIndex];

    const enemyRef = useRef<{ name: string; image: string } | null>(null);
    
    const [enemyHp, setEnemyHp] = useState(500);
    const [playerHp, setPlayerHp] = useState(500);

    const [message, setMessage] = useState('A batalha começou!');
    const [battleFinished, setBattleFinished] = useState(false);

    const [result, setResult] = useState<null | {
        win: boolean;
        xp: number;
    }>(null);

    const finishedRef = useRef(false);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const enemyStatsRef = useRef({ power: 25, defense: 10 });

    const pendingResultRef = useRef<null | { win: boolean; enemy: string }>(null);
    const resultHandledRef = useRef(false);

    async function finish(
        win: boolean,
        enemyName: string
    ) {
        if (finishedRef.current) return;

        finishedRef.current = true;

        setBattleFinished(true);
        setMessage('');

        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        pendingResultRef.current = {
            win,
            enemy: enemyName,
        };

        if (win) {
            setMessage('🏆 Vitória!');
        } else {
            setMessage('💀 Derrota!');
        }

if (win) {
    try {
        if (!user?.userId) return;

        const saved = await AsyncStorage.getItem('@won_pokemons');
        const currentTeam = saved ? JSON.parse(saved) : [];

        let newPokemon;

        while (true) {
            const randomId = Math.floor(Math.random() * 151) + 1;

            const exists = currentTeam.some((p: any) => p.id === randomId);
            if (exists) continue;

            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${randomId}`
            );

            const data = await response.json();

            newPokemon = {
                id: data.id,
                name: data.name,
                image: data.sprites.other['official-artwork'].front_default,
                types: data.types.map((t: any) => t.type.name),

                hp: data.stats[0].base_stat,
                attack: data.stats[1].base_stat,
                defense: data.stats[2].base_stat,
                spAttack: data.stats[3].base_stat,
                spDefense: data.stats[4].base_stat,
                speed: data.stats[5].base_stat,
            };

            break;
        }

        currentTeam.push(newPokemon);

        await AsyncStorage.setItem(
            '@won_pokemons',
            JSON.stringify(currentTeam)
        );

    } catch (error) {
        console.log('Erro ao adicionar pokemon:', error);
    }
}

        setResult({
            win,
            xp: win ? 80 : 30,
        });
    }

async function loadEnemy() {
    setLoading(true);

    const list: Pokemon[] = [];
    const usedIds = new Set<number>();

    while (list.length < 5) {
        const id = Math.floor(Math.random() * 151) + 1;

        if (usedIds.has(id)) continue;

        usedIds.add(id);

        const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        if (!res.ok) continue;

        const data = await res.json();

        list.push({
            id: data.id,
            name: data.name,
            image: data.sprites.other['official-artwork'].front_default,
            types: data.types.map((t: any) => t.type.name),

            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,

            spAttack: data.stats[3].base_stat,
            spDefense: data.stats[4].base_stat,
            speed: data.stats[5].base_stat,
        });
            }

            setEnemyTeam(list);

            if (!list.length) {
            setLoading(false);
            return;
            }
            enemyRef.current = {
                name: list[0].name,
                image: list[0].image,
            };

            enemyStatsRef.current = {
            power: Math.round(
                list.reduce(
                    (total, pokemon) =>
                        total + pokemon.attack,
                    0
                ) / list.length
            ),
            defense: Math.round(
                list.reduce(
                    (total, pokemon) =>
                        total + pokemon.defense,
                    0
                ) / list.length
            ),
        };

    setLoading(false);
}

    useEffect(() => {
        const m = String(mode || '').trim().toLowerCase();
       
        const isTeamValid = m === 'team' && team;

        if (!isTeamValid) {
            const t = setTimeout(() => {
                Alert.alert(
                    'Acesso negado',
                    'Escolha Pokémon e modo de batalha antes de entrar.',
                    [{ text: 'OK', onPress: () => router.replace('/(app)/team') }]
                );
            }, 100);

            return () => clearTimeout(t);
        }

        loadEnemy();

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [mode]);

    useEffect(() => {
        if (!battleFinished) return;
        if (!pendingResultRef.current) return;
        if (resultHandledRef.current) return;

        resultHandledRef.current = true;

        const { win, enemy } = pendingResultRef.current;

        setTimeout(() => {
            if (win) addWin(enemy);
            else addLoss(enemy);
        }, 0);

        pendingResultRef.current = null;
    }, [battleFinished]);

    function attack() {
                  if (
                    battleFinished ||
                    enemyHp <= 0 ||
                    playerHp <= 0
                ) {
                    if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }

                    return;
                }

         const enemyAttack =
         currentEnemyPokemon?.attack || 50;

         const enemyDefense =
         currentEnemyPokemon?.defense || 20;

        const playerAttack =
            mode === 'team'
                ? currentPlayerPokemon?.attack || 50
                : 50;

        const playerDamage = Math.max(
            Math.round(
                playerAttack * (0.5 + Math.random() * 0.5)
            ),
            5
        );

        const enemyDamage = Math.max(
            Math.round(
                (enemyAttack -
                    enemyDefense / 5) *
                (0.5 + Math.random() * 0.5)
            ),
            5
        );

        setEnemyHp(prev => Math.max(prev - playerDamage, 0));
        setPlayerHp(prev => Math.max(prev - enemyDamage, 0));

        setMessage(
    `⚔️ ${playerDamage} dano | 💥 ${enemyDamage} dano`
);
    }

        function startAuto() {
            if (loading) return;
            if (battleFinished) return;
            if (intervalRef.current) return;

            intervalRef.current = setInterval(
                attack,
                650
            );
        }

        useEffect(() => {
            const enemyName =
                enemyRef.current?.name || 'Inimigo';

            if (
                enemyHp <= 0 &&
                !battleFinished
            ) {

            if (
                currentEnemyIndex <
                enemyTeam.length - 1
            ) {

                setCurrentEnemyIndex(
                    prev => prev + 1
                );

                setEnemyHp(500);

                setMessage(
                    `💀 ${currentEnemyPokemon?.name} caiu!`
                );

                return;
            }

            finish(true, enemyName);
            return;
        }

        if (
            playerHp <= 0 &&
            !battleFinished
        ) {

            if (
                currentPlayerIndex <
                teamPokemons.length - 1
            ) {

                setCurrentPlayerIndex(
                    prev => prev + 1
                );

                setPlayerHp(500);

                setMessage(
                    `💀 ${currentPlayerPokemon?.name} caiu!`
                );

                return;
            }

            finish(false, enemyName);
            return;
        }
            if (
                battleFinished &&
                intervalRef.current
            ) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }, [
            enemyHp,
            playerHp,
            battleFinished,
        ]);

    async function restart() {
    setCurrentPlayerIndex(0);
    setCurrentEnemyIndex(0);
    finishedRef.current = false;
    resultHandledRef.current = false;
    pendingResultRef.current = null;

    setBattleFinished(false);
    setResult(null);

    setMessage('A batalha começou!');

    setPlayerHp(
        mode === 'team'
            ? 500
            : 100
    );

    setEnemyHp(
        mode === 'team'
            ? 500
            : 100
    );

    await loadEnemy();

    if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
    }
}

    function goTeams() {
        router.push('/(app)/team');
    }

    const renderHpText = (hp: number) =>
    mode === 'team'
        ? `${Math.round(hp)}/500`
        : `${Math.round(hp)}/100`;

        const StatBar = ({
    label,
    value,
}: {
    label: string;
    value: number;
}) => {
    const percent = Math.min(
        100,
        (value / 150) * 100
    );

    return (
        <View
            style={{
                width: '100%',
                marginTop: 4,
            }}
        >
            <Text
                style={{
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: '700',
                }}
            >
                {label} {value}
            </Text>

            <View
                style={{
                    height: 6,
                    backgroundColor: '#444',
                    borderRadius: 10,
                    overflow: 'hidden',
                }}
            >
                <View
                    style={{
                        width: `${percent}%`,
                        height: '100%',
                        backgroundColor: '#2d22c5',
                    }}
                />
            </View>
        </View>
    );
};

if (!hasTeam) {
    return (
        <ImageBackground
            source={require('../../../assets/1.jpg')}
            style={{ flex: 1 }}
            resizeMode="cover"
        >
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0,0,0,0.7)',
                }}
            />

            <Header />

            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 30,
                }}
            >
                <Text
                    style={{
                        fontSize: 90,
                    }}
                >
                    ⚔️
                </Text>

                <Text
                    style={{
                        color: '#FFD700',
                        fontSize: 34,
                        fontWeight: '900',
                        marginTop: 15,
                    }}
                >
                    Arena de Batalha
                </Text>

                <Text
                    style={{
                        color: '#fff',
                        fontSize: 18,
                        textAlign: 'center',
                        marginTop: 20,
                        lineHeight: 28,
                    }}
                >
                    Monte uma equipe com 5 Pokémon para iniciar uma batalha.
                </Text>

                <Text
                    style={{
                        color: '#D1D5DB',
                        fontSize: 15,
                        textAlign: 'center',
                        marginTop: 15,
                        lineHeight: 24,
                    }}
                >
                    Vá até a tela de Equipe, escolha seus Pokémon e clique em
                    "Batalha em Equipe".
                </Text>

                <TouchableOpacity
                    onPress={() =>
                        router.push('/(app)/team')
                    }
                    style={{
                        marginTop: 35,
                        backgroundColor: '#FFD700',
                        paddingHorizontal: 40,
                        paddingVertical: 16,
                        borderRadius: 20,
                    }}
                >
                    <Text
                        style={{
                            color: '#000',
                            fontWeight: '900',
                            fontSize: 16,
                        }}
                    >
                        Montar Time
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

    return (
        <ImageBackground
            source={require('../../../assets/1.jpg')}
            style={{ flex: 1, width: '100%' }}
            resizeMode="cover"
        >
            <View
                style={{
                    ...StyleSheet.absoluteFillObject,
                    backgroundColor: 'rgba(0,0,0,0.55)',
                }}
            />

            <Header />

            <ScrollView
                style={styles.container}
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom: 80,
                }}
            >
                <Text style={styles.title}>Arena de Batalha</Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#FFD700" />
                ) : !result ? (
                    <>
                        <View style={styles.card}>
                            <Text style={{ color: '#EF4444', fontWeight: '900' }}>
                                Adversário
                            </Text>

                         <Text style={styles.name}>
                            {mode === 'team'
                                ? currentEnemyPokemon?.name
                                : enemyRef.current?.name}
                        </Text>

                {mode === 'team' ? (
                    currentEnemyPokemon && (
                        <Image
                            source={{
                                uri: currentEnemyPokemon.image,
                            }}
                            style={styles.image}
                        />
                    )
                ) : enemyRef.current?.image ? (
                    <Image
                        source={{
                            uri: enemyRef.current.image,
                        }}
                        style={styles.image}
                    />
                    
                ) : (
                    <View
                        style={{
                            height: 120,
                            width: 120,
                            backgroundColor: '#333',
                        }}
                    />
                )}

                {mode === 'team' && currentEnemyPokemon && (
             <View
            style={{
                width: '100%',
                marginTop: 10,
            }}
        >
            <StatBar
                label="❤️ HP"
                value={currentEnemyPokemon.hp}
            />

            <StatBar
                label="⚔️ ATK"
                value={currentEnemyPokemon.attack}
            />

            <StatBar
                label="🛡 DEF"
                value={currentEnemyPokemon.defense}
            />

            <StatBar
                label="🔮 SP ATK"
                value={currentEnemyPokemon.spAttack}
            />

            <StatBar
                label="🧿 SP DEF"
                value={currentEnemyPokemon.spDefense}
            />

            <StatBar
                label="⚡ SPD"
                value={currentEnemyPokemon.speed}
            />
        </View>
)}
                            <View style={styles.hpBar}>
                                <View
                                    style={[
                                        styles.hpFill,
                                        {
                                            width: `${Math.max(
                                                    0,
                                                    (enemyHp /
                                                        (mode === 'team' ? 500 : 100)) *
                                                        100
                                                )}%`,
                                        },
                                    ]}
                                />
                            </View>

                            <Text style={styles.hpText}>{renderHpText(enemyHp)}</Text>
                        </View>

                        <Text style={styles.vs}>VS</Text>

                        <View style={styles.card}>
                            <Text style={{ color: '#22c55e', fontWeight: '900' }}>
                                Você
                            </Text>

                        <Text style={styles.name}>
                            {mode === 'team'
                                ? currentPlayerPokemon?.name
                                : pokemonName}
                        </Text>

                        {mode === 'team' ? (
                            currentPlayerPokemon && (
                                <Image
                                    source={{
                                        uri: currentPlayerPokemon.image,
                                    }}
                                    style={styles.image}
                                />
                            )
                        ) : pokemonImage ? (
                            <Image
                                source={{ uri: String(pokemonImage) }}
                                style={styles.image}
                            />
                        ) : (
                            <View
                                style={{
                                    height: 120,
                                    width: 120,
                                    backgroundColor: '#333',
                                }}
                            />
                        )}

                       {mode === 'team' && currentPlayerPokemon && (
    <View
        style={{
            width: '100%',
            marginTop: 10,
        }}
    >
        <StatBar
            label="❤️ HP"
            value={currentPlayerPokemon.hp}
        />

        <StatBar
            label="⚔️ ATK"
            value={currentPlayerPokemon.attack}
        />

        <StatBar
            label="🛡 DEF"
            value={currentPlayerPokemon.defense}
        />

        <StatBar
            label="🔮 SP ATK"
            value={currentPlayerPokemon.spAttack}
        />

        <StatBar
            label="🧿 SP DEF"
            value={currentPlayerPokemon.spDefense}
        />

        <StatBar
            label="⚡ SPD"
            value={currentPlayerPokemon.speed}
        />
    </View>
)}
                            <View style={styles.hpBar}>
                                <View
                                        style={[
                                            styles.hpFill,
                                            {
                                                width: `${Math.max(
                                                        0,
                                                        (playerHp /
                                                            (mode === 'team' ? 500 : 100)) *
                                                        100
                                                    )}%`,
                                            },
                                        ]}
                                    />
                            </View>

                            <Text style={styles.hpText}>{renderHpText(playerHp)}</Text>
                        </View>

                                {!battleFinished && (
                    <View style={styles.messageContainer}>
                        <Text style={styles.message}>
                            {message}
                        </Text>
                    </View>
                )}

                       <TouchableOpacity style={styles.attackButton} onPress={attack} disabled={loading}>
                            <Text style={styles.attackText}>ATACAR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.autoButton} onPress={startAuto}>
                            <Text style={styles.attackText}>AUTO</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <>
                        <View style={styles.card}>
                            <Text style={styles.name}>
                                {result.win ? '🏆 Vitória!' : '💀 Derrota!'}
                            </Text>

                            <Text style={styles.hpText}>
                                XP ganho: {result.xp}
                            </Text>
                        </View>

                        <TouchableOpacity style={styles.attackButton} onPress={restart}>
                            <Text style={styles.attackText}>
                                Batalhar Novamente
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.attackButton,
                                { backgroundColor: '#2563EB', marginTop: 10 },
                            ]}
                            onPress={goTeams}
                        >
                            <Text style={[styles.attackText, { color: '#fff' }]}>
                                Ir para Equipes
                            </Text>
                        </TouchableOpacity>
                    </>
                )}
            </ScrollView>
            
        </ImageBackground>
    
    );
}