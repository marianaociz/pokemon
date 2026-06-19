import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import { styles } from './styles';

type Props = {
    name: string;
    number: string;
    imageUrl: string;
    type?: string;

    hp?: number;
    attack?: number;
    defense?: number;

    spAttack?: number;
    spDefense?: number;
    speed?: number;

    isRare?: boolean;
    isLegendary?: boolean;
    isMythical?: boolean;

    isSelected?: boolean;
    onPress?: () => void;
};

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

export default function PokemonCard({
    name,
    number,
    imageUrl,
    type,

    hp,
    attack,
    defense,
    spAttack,
    spDefense,
    speed,

    isRare,
    isLegendary,
    isMythical,
    isSelected = false,
    onPress,
}: Props) {

    const pokemonType =
        type?.toLowerCase() || 'normal';

    const backgroundColor =
        typeColors[pokemonType] || '#F7D14A';

    const icon =
        typeIcons[pokemonType] || '⭐';

        const StatBar = ({ label, value }: { label: string; value: number }) => {
        const percent = Math.min(100, value);

    return (
        <View style={{ marginTop: 4 }}>
            <Text style={{ fontSize: 10, fontWeight: '900', color: '#111' }}>
                {label} {value}
            </Text>

            <View style={styles.barBackground}>
                <View
                    style={[
                        styles.barFill,
                        { width: `${percent}%` }
                    ]}
                />
            </View>
        </View>
    );
};

    return (
        <TouchableOpacity
            activeOpacity={0.85}
            onPress={onPress}
            style={[
                styles.card,
                { backgroundColor },

                isRare && styles.rareBorder,
                isLegendary && styles.legendaryBorder,
                isMythical && styles.mythicalBorder,

                isSelected && {
                    borderWidth: 3,
                    borderColor: '#FFD700',
                },
            ]}
        >
            {(isMythical || isLegendary || isRare) && (
                <View
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        zIndex: 10,
                    }}
                >
                    <Text style={{ fontSize: 16 }}>
                        {isMythical
                            ? '🌟'
                            : isLegendary
                            ? '👑'
                            : '⭐'}
                    </Text>
                </View>
            )}

            <TouchableOpacity
                activeOpacity={0.7}
                onPress={(e) => {
                    e.stopPropagation();
                  
                }}
                style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 20,
                }}
            >
             
            </TouchableOpacity>

            <Text style={styles.backgroundIcon}>
                {icon}
            </Text>

            <View style={styles.imageBox}>
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                />
            </View>

            <Text style={styles.name}>
                {name.toUpperCase()}
            </Text>

            {type && (
                <Text style={styles.type}>
                    {type.toUpperCase()}
                </Text>
            )}

            <View style={{ marginTop: 10, width: '100%' }}>

                <StatBar label="❤️ HP" value={hp ?? 0} />
                <StatBar label="⚔️ ATK" value={attack ?? 0} />
                <StatBar label="🛡 DEF" value={defense ?? 0} />
                <StatBar label="🔮 SP ATK" value={spAttack ?? 0} />
                <StatBar label="🧿 SP DEF" value={spDefense ?? 0} />
                <StatBar label="⚡ SPD" value={speed ?? 0} />

            </View>

            <Text style={styles.number}>
                #{number}
            </Text>
        </TouchableOpacity>
    );
}