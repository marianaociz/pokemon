import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        width: 220,
        margin: 8,
        borderRadius: 24,
        borderWidth: 5,
        padding: 12,
        minHeight: 360,
        overflow: 'hidden',
        position: 'relative',

        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.4,
                shadowRadius: 10,
            },

            android: {
                elevation: 10,
            },

            web: {
                boxShadow: '0px 8px 20px rgba(0,0,0,0.4)',
            },
        }),
    },

    backgroundIcon: {
        position: 'absolute',
        right: -15,
        bottom: -20,
        fontSize: 170,
        opacity: 0.15,
        zIndex: 0,
        transform: [{ rotate: '-15deg' }],
    },

    // ⭐ RARIDADE (ESQUERDA)
    rarityBadge: {
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: 22,
        zIndex: 999,
    },

    // ⭐ FAVORITO (DIREITA COM BRILHO)
    favoriteBadge: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 999,

        shadowColor: '#FFD700',
        shadowOpacity: 0.9,
        shadowRadius: 12,
        elevation: 10,
    },

    favoriteText: {
        fontSize: 22,
        textShadowColor: '#FFD700',
        textShadowRadius: 10,
    },

    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 2,
    },

    number: {
        color: '#111827',
        fontSize: 13,
        fontWeight: '900',
        textAlign: 'center',
        marginTop: 8,
    },

    hp: {
        color: '#111827',
        fontWeight: '900',
        fontSize: 12,
    },

    imageBox: {
        height: 165,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: 16,
        marginTop: 10,
        marginBottom: 12,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.5)',
        zIndex: 2,
    },

    image: {
        width: 140,
        height: 140,
    },

    name: {
        color: '#111827',
        fontSize: 20,
        fontWeight: '900',
        textAlign: 'center',
        letterSpacing: 1,
        marginTop: 6,
        zIndex: 2,
    },

    type: {
        alignSelf: 'center',
        color: '#FFFFFF',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 999,
        marginTop: 10,
        fontSize: 11,
        fontWeight: '900',
        zIndex: 2,
        overflow: 'hidden',
    },

    stats: {
        color: '#111827',
        fontSize: 12,
        fontWeight: '900',
        textAlign: 'center',
        alignSelf: 'center',
        width: '100%',
        marginTop: 10,
        zIndex: 2,
    },

    description: {
        color: '#1F2937',
        fontSize: 11,
        textAlign: 'center',
        marginTop: 10,
        lineHeight: 16,
        zIndex: 2,
    },

    rareBorder: {
        borderColor: '#38BDF8',
        borderWidth: 5,

        ...Platform.select({
            ios: {
                shadowColor: '#38BDF8',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.9,
                shadowRadius: 15,
            },

            android: {
                elevation: 18,
            },

            web: {
                boxShadow: '0px 0px 18px rgba(56,189,248,0.9)',
            },
        }),
    },

    legendaryBorder: {
        borderColor: '#FFD700',
        borderWidth: 6,

        ...Platform.select({
            ios: {
                shadowColor: '#FFD700',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 22,
            },

            android: {
                elevation: 25,
            },

            web: {
                boxShadow: '0px 0px 25px rgba(255,215,0,0.9)',
            },
        }),
    },

    mythicalBorder: {
        borderColor: '#FF00FF',
        borderWidth: 7,

        ...Platform.select({
            ios: {
                shadowColor: '#FF00FF',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 28,
            },

            android: {
                elevation: 30,
            },

            web: {
                boxShadow: '0px 0px 30px rgba(255,0,255,0.9)',
            },
        }),
    },

    barBackground: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 2,
},

barFill: {
    height: '100%',
    backgroundColor: '#2d22c5',
    borderRadius: 10,
},
});