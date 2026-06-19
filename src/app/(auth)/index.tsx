import { useState } from 'react';
import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
} from 'react-native';

import { Image } from 'expo-image';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../../components/button';
import Input from '../../components/input';
import Card from '../../components/card';
import Alert from '../../components/alert';

import { styles } from '../../styles/auth';
import { useAuth } from '@/context/AuthContext';

export default function Index() {
    const { login } = useAuth();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] =
        useState<'success' | 'error' | 'warning' | 'info'>('info');

    function showCustomAlert(
        title: string,
        message: string,
        type: 'success' | 'error' | 'warning' | 'info'
    ) {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertType(type);
        setAlertVisible(true);
    }

    async function handleLogin() {
        if (!user.trim() || !password.trim()) {
            showCustomAlert('Erro', 'Preencha usuário e senha.', 'warning');
            return;
        }

        try {
            const success = await login(user.trim(), password.trim());

            if (!success) {
                showCustomAlert(
                    'Erro',
                    'Usuário ou senha incorretos.',
                    'error'
                );
                return;
            }

            showCustomAlert(
                'Bem-vindo!',
                `Login realizado com sucesso, ${user}!`,
                'success'
            );

            setTimeout(() => {
                setAlertVisible(false);
                router.replace('/(app)/pokedex');
            }, 800);

        } catch (error) {
            console.log(error);
            showCustomAlert('Erro', 'Falha ao fazer login.', 'error');
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <Alert
                visible={alertVisible}
                title={alertTitle}
                message={alertMessage}
                type={alertType}
                onClose={() => setAlertVisible(false)}
            />

            <Image
                source={require('../../../assets/3.jpg')}
                style={styles.backgroundImage}
                contentFit="cover"
            />

            <View style={styles.overlay}>
                <Card>
                    <Text style={styles.logo}>Pokémon</Text>

                    <Text style={styles.subtitle}>
                        Entre na sua conta para continuar sua jornada
                    </Text>

                    <View style={styles.form}>
                        <Input
                            placeholder="Usuário"
                            value={user}
                            onChangeText={setUser}
                        />

                        <Input
                            placeholder="Senha"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                            showPassword={showPassword}
                            togglePassword={() =>
                                setShowPassword(!showPassword)
                            }
                        />
                    </View>

                    <Button title="Entrar" onPress={handleLogin} />

                    <TouchableOpacity
                        onPress={() =>
                            router.push('/(auth)/register')
                        }
                    >
                        <Text style={styles.registerText}>
                            Criar conta
                        </Text>
                    </TouchableOpacity>
                </Card>
            </View>
        </View>
    );
}