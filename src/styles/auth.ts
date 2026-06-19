import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },

    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.72)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },

    logo: {
        fontSize: 42,
        fontWeight: '900',
        color: '#FFCB05',
        textAlign: 'center',
        marginBottom: 10,
        letterSpacing: 2,

        textShadowColor: '#2A75BB',
        textShadowOffset: {
            width: 3,
            height: 3,
        },
        textShadowRadius: 2,
    },

    title: {
        fontSize: 32,
        fontWeight: '900',
        color: '#FFFFFF',
        textAlign: 'center',
    },

    subtitle: {
        color: '#CBD5E1',
        textAlign: 'center',
        marginTop: 8,
        marginBottom: 28,
        lineHeight: 22,
        fontSize: 15,
    },

    form: {
        gap: 18,
        marginBottom: 24,
    },

    registerText: {
        textAlign: 'center',
        color: '#93C5FD',
        marginTop: 20,
        fontWeight: '700',
        fontSize: 15,
    },

    backText: {
        textAlign: 'center',
        color: '#93C5FD',
        marginTop: 20,
        fontWeight: '700',
        fontSize: 15,
    },
});