import React, { useEffect, useState, useMemo } from 'react';

import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    useWindowDimensions,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';

import { Redirect, router } from 'expo-router';

import PokemonCard from '../../../components/pokemon-card';
import Header from '../../../components/header';
import PokemonDetails from '../../../components/pokemon-details';

import { useAuth } from '../../../context/AuthContext';

import { styles } from '../../../components/pokemon-details/pokedex';

type PokemonFull = {
    name: string;
    id: number;
    image: string;
    type: string;
    description: string;

    hp: number;
    attack: number;
    defense: number;

    spAttack: number;
    spDefense: number;
    speed: number;

    isRare: boolean;
    isLegendary: boolean;
    isMythical: boolean;
};

export default function Pokemons() {
    const { isAuthenticated } = useAuth();

    const [data, setData] = useState<PokemonFull[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { width } = useWindowDimensions();

    const numColumns = width < 600 ? 2 : width < 1200 ? 3 : 4;

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch(
                    'https://pokeapi.co/api/v2/pokemon?limit=500'
                );

                const json = await res.json();

                const details = await Promise.all(
                    json.results.map(async (poke: any) => {
                        const pokemonRes = await fetch(poke.url);
                        const p = await pokemonRes.json();

                        const hp =
                            p.stats.find(
                                (s: any) => s.stat.name === 'hp'
                            )?.base_stat || 0;

                        const attack =
                            p.stats.find(
                                (s: any) => s.stat.name === 'attack'
                            )?.base_stat || 0;

                        const defense =
                            p.stats.find(
                                (s: any) => s.stat.name === 'defense'
                            )?.base_stat || 0;

                        const spAttack =
                            p.stats.find(
                                (s: any) =>
                                    s.stat.name === 'special-attack'
                            )?.base_stat || 0;

                        const spDefense =
                            p.stats.find(
                                (s: any) =>
                                    s.stat.name === 'special-defense'
                            )?.base_stat || 0;

                        const speed =
                            p.stats.find(
                                (s: any) =>
                                    s.stat.name === 'speed'
                            )?.base_stat || 0;

                        const total = hp + attack + defense + spAttack + spDefense + speed;

                        return {
                            id: p.id,
                            name: p.name,
                            image:
                                p.sprites.other[
                                    'official-artwork'
                                ].front_default,
                            type:
                                p.types[0]?.type?.name || 'normal',

                            hp,
                            attack,
                            defense,

                            spAttack,
                            spDefense,
                            speed,

                            isRare: total >= 250 && total < 330,
                            isLegendary: total >= 330 && total < 400,
                            isMythical: total >= 400,

                            description: `${p.name} é do tipo ${
                                p.types[0]?.type?.name || 'normal'
                            }.`,
                        };
                    })
                );

                setData(details);

                if (details.length > 0) {
                    setSelectedId(details[0].id);
                }
            } catch (error) {
                console.log('Erro ao carregar pokémons:', error);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, []);

    const selectedPokemon = useMemo(() => {
        if (!data.length) return null;

        return (
            data.find(pokemon => pokemon.id === selectedId) ||
            data[0]
        );
    }, [data, selectedId]);

    if (!isAuthenticated) {
        return <Redirect href="/(auth)" />;
    }

    if (loading || !selectedPokemon) {
        return (
            <View style={styles.loading}>
                <ActivityIndicator size="large" color="#FFD700" />
                <Text style={styles.loadingText}>
                    Carregando Pokémons...
                </Text>
            </View>
        );
    }

    return (
        <ImageBackground
            source={require('../../../../assets/1.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Header />
                <TouchableOpacity
            onPress={() => router.push('/(app)')}
                style={{
                    marginTop: 10,
                    marginLeft: 15,
                    alignSelf: 'flex-start',
                    backgroundColor: '#FFD700',
                    paddingHorizontal: 15,
                    paddingVertical: 8,
                    borderRadius: 8,
                }}
            >
                <Text
                    style={{
                        fontWeight: 'bold',
                        color: '#000',
                    }}
                >
                    ← Voltar
                </Text>
            </TouchableOpacity>

                <FlatList
                    data={data}
                    numColumns={numColumns}
                    key={String(numColumns)}
                    keyExtractor={(item) => item.id.toString()}
                    columnWrapperStyle={
                        numColumns > 1 ? styles.row : undefined
                    }
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                    extraData={selectedId}

                    removeClippedSubviews={false}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={7}
                    ListHeaderComponent={
                        <>
                            <PokemonDetails
                                pokemon={selectedPokemon}
                                onPrev={() => {
                                    const index = data.findIndex(
                                        p => p.id === selectedId
                                    );

                                    if (index > 0) {
                                        setSelectedId(
                                            data[index - 1].id
                                        );
                                    }
                                }}
                                onNext={() => {
                                    const index = data.findIndex(
                                        p => p.id === selectedId
                                    );

                                    if (index < data.length - 1) {
                                        setSelectedId(
                                            data[index + 1].id
                                        );
                                    }
                                }}
                            />

                            <Text style={styles.title}>
                                Pokédex
                            </Text>
                        </>
                    }
                    renderItem={({ item }) => {
                        return (
                            <View
                                style={[
                                    styles.cardWrapper,
                                    {
                                        width: `${100 / numColumns}%`,
                                        borderWidth:
                                            item.id === selectedId ? 2 : 0,
                                        borderColor:
                                            item.id === selectedId
                                                ? '#FFD700'
                                                : 'transparent',
                                    },
                                ]}
                            >
                                <PokemonCard
                                    name={item.name}
                                    number={`${item.id}`}
                                    imageUrl={item.image}
                                    type={item.type}

                                    hp={item.hp}
                                    attack={item.attack}
                                    defense={item.defense}

                                    spAttack={item.spAttack}
                                    spDefense={item.spDefense}
                                    speed={item.speed}

                                    isRare={item.isRare}
                                    isLegendary={item.isLegendary}
                                    isMythical={item.isMythical}
                                    onPress={() => setSelectedId(item.id)}
                                />
                            </View>
                        );
                    }}
                />
            </View>
        </ImageBackground>
    );
}