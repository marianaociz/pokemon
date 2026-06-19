import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },

    card: {
        width: '90%',
        maxWidth: 850,
        minHeight: 320,

        borderRadius: 30,
        borderWidth: 5,
        borderColor: '#FFD700',

        padding: 20,
        overflow: 'hidden',
        position: 'relative',
    },

    backgroundIcon: {
        position: 'absolute',
        right: -20,
        bottom: -40,
        fontSize: 200,
        opacity: 0.15,
    },

    image: {
        zIndex: 2,
    },

    infoBox: {
        width: 320,
        minHeight: 220,

        justifyContent: 'center',
        alignItems: 'center',

        zIndex: 2,

        marginLeft: 30,
    },

    name: {
        fontSize: 30,
        fontWeight: '900',
        color: '#FFFFFF',

        textAlign: 'center',

        minHeight: 40,
        width: '100%',

        marginBottom: 8,
    },

    number: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',

        textAlign: 'center',

        minHeight: 24,
        width: '100%',

        marginBottom: 10,
    },

    info: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',

        textAlign: 'center',

        minHeight: 24,
        width: '100%',
    },

    arrow: {
        color: '#FFD700',
        fontSize: 40,
        fontWeight: '900',
    },

    sideArrowLeft: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginRight: 5,
    },

    sideArrowRight: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        marginLeft: 5,
    },
});