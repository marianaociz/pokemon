import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
} from 'react-native';

import { Image } from 'expo-image';
import { router } from 'expo-router';

export default function Dashboard() {

    function handleBack() {
        router.push('/');
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <Image
                source={require('../../../assets/neyma.gif')}
                style={styles.backgroundGif}
                contentFit="cover"
            />

            <View style={styles.overlay}>
                <View style={styles.card}>

                    <Text style={styles.title}>
                        Pokémon
                    </Text>

                    <Text style={styles.subtitle}>
                        Login realizado com sucesso!
                    </Text>

                    <Text style={styles.description}>
                        Sua jornada Pokémon começou.
                        Explore batalhas, capture Pokémons
                        e monte seu time lendário.
                    </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleBack}
                    >
                        <Text style={styles.buttonText}>
                            Voltar para Login
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#000',
    },

    backgroundGif: {
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

    card: {
        width: '100%',
        maxWidth: 380,

        backgroundColor: 'rgba(15,15,15,0.92)',

        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',

        padding: 28,
        borderRadius: 28,

        alignItems: 'center',

        boxShadow: '0px 10px 30px rgba(0,0,0,0.45)',
    },

    title: {
        fontSize: 42,
        fontWeight: '900',

        color: '#FFCB05',

        marginBottom: 10,

        letterSpacing: 2,

        textShadow: '3px 3px 2px #2A75BB',
    },

    subtitle: {
        color: '#FFFFFF',

        fontSize: 24,

        fontWeight: '700',

        marginBottom: 14,

        textAlign: 'center',
    },

    description: {
        color: '#CBD5E1',

        fontSize: 15,

        textAlign: 'center',

        lineHeight: 24,

        marginBottom: 34,
    },

    button: {
        width: '100%',

        backgroundColor: '#2563EB',

        paddingVertical: 16,
        borderRadius: 18,
        alignItems: 'center',
        boxShadow: '0px 6px 18px rgba(37,99,235,0.45)',
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
});