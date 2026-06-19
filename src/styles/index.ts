import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    card: {
        width: '31%',
        minWidth: 140,

        backgroundColor: '#1e1e1e',

        borderRadius: 22,

        padding: 14,

        marginBottom: 18,

        borderWidth: 1,
        borderColor: '#2d2d2d',

        boxShadow: '0px 6px 12px rgba(0,0,0,0.30)',
    },

    imageBox: {
        height: 120,

        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#2a2a2a',

        borderRadius: 18,

        marginBottom: 12,
    },

    image: {
        width: 110,
        height: 110,
    },

    info: {
        gap: 4,
    },

    number: {
        fontSize: 12,
        color: '#9ca3af',
        fontWeight: '700',
    },

    name: {
        fontSize: 18,
        fontWeight: '900',
        color: '#ffffff',
    },

    text: {
        fontSize: 12,
        color: '#d1d5db',
        lineHeight: 16,
    },
});