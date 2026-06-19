// components/button/index.tsx

import { TouchableOpacity, Text } from 'react-native';

import { styles } from './style';

type Props = {
    title: string;
    onPress: () => void;
}

export default function Button({
    title,
    onPress
}: Props) {
    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={onPress}
        >
            <Text style={styles.text}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}