import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    card: {
        width: '48%',
        minWidth: 150,

        backgroundColor: '#1e1e1e',

        borderRadius: 22,

        padding: 14,

        marginBottom: 16,

        borderWidth: 1,
        borderColor: '#2d2d2d',

        // sombra Android + iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,

        boxShadow: '0px 6px 10px rgba(0,0,0,0.3)',
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
        fontSize: 20,
        fontWeight: '900',
        color: '#ffffff',
    },

    text: {
        fontSize: 13,
        color: '#d1d5db',
        lineHeight: 18,
    },
});