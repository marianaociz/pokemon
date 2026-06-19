import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    useWindowDimensions,
} from 'react-native';

import { styles } from './styles';

const typeIcons: Record<string, string> = {
    fire: '🔥',
    water: '🌊',
    grass: '🌿',
    electric: '⚡',
    ice: '❄️',
    psychic: '🔮',
    ghost: '👻',
    dragon: '🐉',
    rock: '🪨',
    ground: '🏜️',
    flying: '☁️',
    bug: '🐛',
    poison: '☣️',
    fighting: '👊',
    dark: '🌑',
    steel: '⚙️',
    fairy: '✨',
    normal: '⭐',
};

const typeColors: Record<string, string> = {
    fire: '#F97316',
    water: '#3B82F6',
    grass: '#22C55E',
    electric: '#FACC15',
    ice: '#67E8F9',
    psychic: '#EC4899',
    ghost: '#7C3AED',
    dragon: '#8B5CF6',
    rock: '#A16207',
    ground: '#CA8A04',
    flying: '#60A5FA',
    bug: '#65A30D',
    poison: '#9333EA',
    fighting: '#B45309',
    dark: '#374151',
    steel: '#94A3B8',
    fairy: '#F9A8D4',
    normal: '#D1D5DB',
};

type Props = {
    pokemon: any;
    onNext: () => void;
    onPrev: () => void;
};

export default function PokemonDetails({
    pokemon,
    onNext,
    onPrev,
}: Props) {
    const { width } = useWindowDimensions();

    const isSmall = width < 768;
    const isLarge = width > 1400;

    if (!pokemon) return null;

    console.log(
        'Pokemon selecionado:',
        pokemon.name,
        pokemon.id
    );

    const pokemonType =
        pokemon?.type?.toLowerCase() || 'normal';

    const backgroundColor =
        typeColors[pokemonType] || '#FFD700';

    const icon =
        typeIcons[pokemonType] || '⭐';

    const borderStyle =
        pokemon.isMythical
            ? {
                  borderColor: '#A855F7',
                  borderWidth: 8,
              }
            : pokemon.isLegendary
            ? {
                  borderColor: '#FACC15',
                  borderWidth: 7,
              }
            : pokemon.isRare
            ? {
                  borderColor: '#38BDF8',
                  borderWidth: 6,
              }
            : {};

    const glowStyle =
        pokemon.isMythical
            ? {
                  shadowColor: '#A855F7',
                  shadowOpacity: 1,
                  shadowRadius: 50,
                  elevation: 20,
              }
            : pokemon.isLegendary
            ? {
                  shadowColor: '#FACC15',
                  shadowOpacity: 0.9,
                  shadowRadius: 30,
                  elevation: 14,
              }
            : pokemon.isRare
            ? {
                  shadowColor: '#38BDF8',
                  shadowOpacity: 0.8,
                  shadowRadius: 22,
                  elevation: 12,
              }
            : {};

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.sideArrowLeft}
                onPress={onPrev}
            >
                <Text style={styles.arrow}>◀</Text>
            </TouchableOpacity>

            <View
                key={pokemon.id}
                style={[
                    styles.card,
                    {
                        backgroundColor,
                        flexDirection: isSmall
                            ? 'column'
                            : 'row',
                        alignItems: 'center',
                    },
                    borderStyle,
                    glowStyle,
                ]}
            >
                <Text style={styles.backgroundIcon}>
                    {icon}
                </Text>

                <Image
                    source={{
                        uri:
                            pokemon.image ||
                            'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
                    }}
                    resizeMode="contain"
                    style={[
                        styles.image,
                        {
                            width: isSmall
                                ? 220
                                : isLarge
                                ? 320
                                : 280,

                            height: isSmall
                                ? 220
                                : isLarge
                                ? 320
                                : 280,
                        },
                    ]}
                />

                <View style={styles.infoBox}>
                    <Text
                        style={styles.name}
                        numberOfLines={1}
                    >
                        {pokemon?.name?.toUpperCase() || 'POKÉMON'}
                    </Text>

                    <Text style={styles.number}>
                        #{pokemon?.id ?? 0}
                    </Text>

                    <View
                        style={{
                            marginTop: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: 6,
                            height: 120,
                            width: '100%',
                        }}
                    >
                        <Text style={styles.info}>
                            ❤️ HP: {pokemon?.hp ?? 0}
                        </Text>

                        <Text style={styles.info}>
                            ⚔️ Ataque: {pokemon?.attack ?? 0}
                        </Text>

                        <Text style={styles.info}>
                            🛡️ Defesa: {pokemon?.defense ?? 0}
                        </Text>

                        <Text style={styles.info}>
                            {icon} Tipo:{' '}
                            {pokemon?.type?.toUpperCase() || 'NORMAL'}
                        </Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={styles.sideArrowRight}
                onPress={onNext}
            >
                <Text style={styles.arrow}>▶</Text>
            </TouchableOpacity>
        </View>
    );
}