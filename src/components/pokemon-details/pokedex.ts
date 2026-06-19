import { StyleSheet } from 'react-native';

const colors = {
    background: '#0f172a',
    backgroundDark: '#0b1020',
    text: '#FFFFFF',
    accent: '#FFD700',
};

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },

    title: {
        fontSize: 32,
        fontWeight: '900',
        color: colors.accent,

        marginTop: 20,
        marginBottom: 20,

        textAlign: 'center',

        letterSpacing: 1,

        textShadowColor: 'rgba(0,0,0,0.6)',
        textShadowOffset: {
            width: 0,
            height: 2,
        },
        textShadowRadius: 6,
    },

    list: {
        paddingHorizontal: 20,
        paddingBottom: 120,
        alignItems: 'center',
    },

    row: {
        justifyContent: 'center',
        marginBottom: 12,
        gap: 8,
    },

    cardWrapper: {
        padding: 8,
        alignItems: 'center',
    },

    loading: {
        flex: 1,
        backgroundColor: colors.backgroundDark,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loadingText: {
        color: colors.text,
        marginTop: 12,
        fontSize: 16,
        fontWeight: '600',
    },
});