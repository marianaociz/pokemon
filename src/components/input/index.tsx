import { View, TextInput, TouchableOpacity, Text } from 'react-native';

import { styles } from './style';

type Props = {
    placeholder: string;
    secureTextEntry?: boolean;
    value: string;
    onChangeText: (text: string) => void;
    showPassword?: boolean;
    togglePassword?: () => void;
}

export default function Input({
    placeholder,
    secureTextEntry,
    value,
    onChangeText,
    showPassword,
    togglePassword
}: Props) {
    return (
        <View style={styles.container}>

            <TextInput
                placeholder={placeholder}
                placeholderTextColor="#94A3B8"
                secureTextEntry={secureTextEntry}
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
            />

            {togglePassword && (
                <TouchableOpacity
                    onPress={togglePassword}
                    style={styles.eyeButton}
                >
                    <Text style={styles.eyeText}>
                        {showPassword ? '🙈' : '👁️'}
                    </Text>
                </TouchableOpacity>
            )}

        </View>
    );
}