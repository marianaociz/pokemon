import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
    children: React.ReactNode;
};

export default function Card({ children }: Props) {
    return (
        <View style={styles.card}>
            {children}
        </View>
    ); 
}

const styles = StyleSheet.create({
    card: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: 'rgba(15,23,42,0.95)',
        borderRadius: 32,
        paddingVertical: 32,
        paddingHorizontal: 26,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.06)',
        boxShadow: '0px 15px 40px rgba(0,0,0,0.55)',
    },
});

// card da pagina de login//