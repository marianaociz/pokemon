import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StatusBar,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

import { router } from 'expo-router';
import Header from '@/components/header';
import PokemonCard from '@/components/pokemon-card';
import { styles } from '../../styles/team';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';

import { useAuth } from '@/context/AuthContext';
import { getTeam } from '@/integration/pokemonIntegration';


import Alert from '@/components/alert';

interface Pokemon {
    id: number;
    name: string;
    image: string;
    types: string[];

    hp?: number;
    attack?: number;
    defense?: number;

    spAttack?: number;
    spDefense?: number;
    speed?: number;
}

export default function Team() {
    const [options, setOptions] = useState<Pokemon[]>([]);
    const [newPokemons, setNewPokemons] = useState<Pokemon[]>([]);
    const [selected, setSelected] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const [showMyPokemons, setShowMyPokemons] = useState(true);
    const [showOptions, setShowOptions] = useState(true); 

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    function showAlert(title: string, message: string) {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertVisible(true);
    }

useFocusEffect(
    useCallback(() => {
        console.log(
            'TEAM SCREEN',
            user
        );

        if (user?.userId) {
            loadFromCache();
        } else {
            alert(
                'Usuário sem userId'
            );
        }
    }, [user])
);

async function loadFromCache() {
    try {
        if (!user?.userId) return;

        const teamApi = await getTeam(user.userId);
        console.log(
    JSON.stringify(
        teamApi.team[0],
        null,
        2
    )
);

        const pokemons = teamApi.team.map(
            (pokemon: any) => ({
                id: Number(pokemon.index),
                name: pokemon.name,
                image: pokemon.image,
                types: pokemon.types,
                hp:
                    pokemon.abilities?.find(
                        (a: any) => a.name === 'hp'
                    )?.strength || 0,

                attack:
                    pokemon.abilities?.find(
                        (a: any) => a.name === 'attack'
                    )?.strength || 0,

                defense:
                    pokemon.abilities?.find(
                        (a: any) => a.name === 'defense'
                    )?.strength || 0,

                spAttack:
                    pokemon.abilities?.find(
                        (a: any) =>
                            a.name === 'special-attack'
                    )?.strength || 0,

                spDefense:
                    pokemon.abilities?.find(
                        (a: any) =>
                            a.name === 'special-defense'
                    )?.strength || 0,

                speed:
                    pokemon.abilities?.find(
                        (a: any) =>
                            a.name === 'speed'
                    )?.strength || 0,
            })
        );

        setOptions(pokemons);
    } catch (error) {
        console.log(
            'Erro ao carregar time:',
            error
        );
    } finally {
        setLoading(false);
    }
        const saved =
            await AsyncStorage.getItem(
                '@won_pokemons'
            );

        if (saved) {
            setNewPokemons(JSON.parse(saved));
        }

        }


function togglePokemon(id: number) {
    setSelected(prev => {
        if (prev.includes(id)) {
            return prev.filter(p => p !== id);
        }

        if (prev.length >= 5) {
            showAlert(
                'Limite atingido',
                'Você só pode selecionar até 5 Pokémon.'
            );

            return prev;
        }

        return [...prev, id];
    });
}

  function startTeamBattle() {
    if (selected.length !== 5) {
        showAlert(
            'Erro',
            'Selecione exatamente 5 Pokémon.'
        );

        return;
    }

    const allPokemons = [
        ...options,
        ...newPokemons,
    ];

    const teamPokemons = allPokemons.filter(
        pokemon =>
            selected.includes(pokemon.id)
    );

    if (teamPokemons.length !== 5) {
        showAlert(
            'Erro',
            'Não foi possível montar o time.'
        );

        return;
    }

    router.push({
        pathname: '/(app)/battle',
        params: {
            mode: 'team',
            team: JSON.stringify(teamPokemons),
        },
    });
}

    return (
        <ImageBackground
            source={require('../../../assets/1.jpg')}
            style={{ flex: 1, width: '100%', height:'100%'}}
            resizeMode="cover"
        >
            <StatusBar translucent backgroundColor="transparent" />

            <Alert
                title={alertTitle}
                message={alertMessage}
                visible={alertVisible}
                onClose={() => setAlertVisible(false)}
                type="error"
            />

            <View style={styles.overlay}>
                <Header />

                <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>

                    <View style={{
                        paddingHorizontal: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 20
                    }}>
                        <Text style={styles.sectionTitle}>Time de Pokémons disponíveis</Text>
                    </View>

                    {showOptions && (
                        <View style={styles.grid}>
                            {options.map(p => (
                           <PokemonCard
                                key={p.id}
                                name={p.name}
                                number={String(p.id)}
                                imageUrl={p.image}
                                type={p.types[0]}
                                hp={p.hp}
                                attack={p.attack}
                                defense={p.defense}
                                spAttack={p.spAttack}
                                spDefense={p.spDefense}
                                speed={p.speed}
                                onPress={() => togglePokemon(p.id)}
                                isSelected={selected.includes(p.id)}
                            />
                            ))}
                        </View>
                    )}

                    <View style={{ alignItems: 'center', marginTop: 25 }}>

                        <TouchableOpacity
                            onPress={startTeamBattle}
                            style={{
                                backgroundColor: '#FFD700',
                                paddingVertical: 14,
                                borderRadius: 16,
                                width: 220,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: '#000', fontWeight: '900' }}>
                                Batalha em Equipe
                            </Text>
                        </TouchableOpacity>

                    </View>

                      <View
                                    style={{
                                        paddingHorizontal: 15,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginTop: 20,
                                    }}
                                >
                                    <Text style={styles.sectionTitle}>
                                        Seus Novos Pokémons
                                    </Text>
                                 </View>
                                 <View style={styles.grid}>
                                    {newPokemons.length === 0 ? (
                                        <Text
                                            style={{
                                                color: '#fff',
                                                textAlign: 'center',
                                                width: '100%',
                                            }}
                                        >
                                            Nenhum Pokémon ganho ainda.
                                        </Text>
                                    ) : (
                                        newPokemons.map(p => (
                                     <PokemonCard
                                        key={`new-${p.id}`}
                                        name={p.name}
                                        number={String(p.id)}
                                        imageUrl={p.image}
                                        type={p.types[0]}
                                        hp={p.hp}
                                        attack={p.attack}
                                        defense={p.defense}
                                        spAttack={p.spAttack}
                                        spDefense={p.spDefense}
                                        speed={p.speed}
                                        onPress={() => togglePokemon(p.id)}
                                        isSelected={selected.includes(p.id)}
                                    />
                                        ))
                                    )}
                                </View>


                </ScrollView>
            </View>
        </ImageBackground>
    );
}