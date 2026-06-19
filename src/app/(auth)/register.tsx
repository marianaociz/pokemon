import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
} from 'react-native';

import { useState } from 'react';
import { router } from 'expo-router';
import { Image } from 'expo-image';

import Input from '../../components/input';
import Button from '../../components/button';
import Card from '../../components/card';
import Alert from '../../components/alert';

import { styles } from '../../styles/auth';
import { useAuth } from '@/context/AuthContext';

export default function Register() {
    const { register } = useAuth();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] =
        useState<'success' | 'error' | 'warning' | 'info'>('info');

    function showAlert(
        title: string,
        message: string,
        type: 'success' | 'error' | 'warning' | 'info'
    ) {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertType(type);
        setAlertVisible(true);
    }

    async function handleRegister() {
        const username = user.trim().toLowerCase();

        if (!username || !password.trim() || !confirmPassword.trim()) {
            showAlert(
                'Erro',
                'Preencha todos os campos.',
                'warning'
            );
            return;
        }

        if (password !== confirmPassword) {
            showAlert(
                'Erro',
                'As senhas não coincidem.',
                'error'
            );
            return;
        }

        try {
            const success = await register(
                username,
                password.trim()
            );

            if (!success) {
                showAlert(
                    'Erro',
                    'Esse usuário já existe ou não foi possível criar a conta.',
                    'error'
                );
                return;
            }

            showAlert(
                'Sucesso',
                'Conta criada com sucesso!',
                'success'
            );

            setTimeout(() => {
                setAlertVisible(false);
                router.replace('/');
            }, 800);

        } catch (error) {
            console.log(error);

            showAlert(
                'Erro',
                'Não foi possível criar a conta.',
                'error'
            );
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
                source={require('../../../assets/2.jpg')}
                style={styles.backgroundImage}
                contentFit="cover"
            />

            <View style={styles.overlay}>
                <Card>
                    <Text style={styles.logo}>Pokémon</Text>

                    <Text style={styles.subtitle}>
                        Cadastre-se para começar sua jornada Pokémon
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

                        <Input
                            placeholder="Confirmar Senha"
                            secureTextEntry={!showConfirmPassword}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            showPassword={showConfirmPassword}
                            togglePassword={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                        />
                    </View>

                    <Button
                        title="Cadastrar"
                        onPress={handleRegister}
                    />

                    <TouchableOpacity
                        onPress={() => router.replace('/')}
                    >
                        <Text style={styles.backText}>
                            Voltar para login
                        </Text>
                    </TouchableOpacity>
                </Card>
            </View>
        </View>
    );
}