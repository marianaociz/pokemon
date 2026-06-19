import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Animated,
    StyleSheet,
} from 'react-native';

import { AlertProps } from './types';
import { Colors } from '../../constants/colors';

export default function AlertWeb({
    title,
    message,
    visible,
    onClose,
    type = 'info',
}: AlertProps) {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();

            const timer = setTimeout(onClose, 5000);
            return () => clearTimeout(timer);
        } else {
            fadeAnim.setValue(0);
        }
    }, [visible, onClose, fadeAnim]);

    const colors = {
        error: Colors.semantic.error,
        success: Colors.semantic.success,
        warning: Colors.semantic.warning,
        info: Colors.semantic.info,
    };

    const current = colors[type];

    return (
        <Modal transparent visible={visible} animationType="none">
            <View style={styles.overlay}>
                <Animated.View
                    style={[
                        styles.container,
                        {
                            opacity: fadeAnim,
                            backgroundColor: current.bg,
                            borderLeftColor: current.border,
                        },
                    ]}
                >
                    <View style={{ flex: 1 }}>
                        <Text style={[styles.title, { color: current.text }]}>
                            {title}
                        </Text>

                        <Text style={[styles.message, { color: current.text }]}>
                            {message}
                        </Text>
                    </View>

                    <TouchableOpacity onPress={onClose}>
                        <Text style={{ color: current.text }}>✕</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        width: '90%',
        maxWidth: 400,
        padding: 18,
        borderRadius: 16,
        flexDirection: 'row',
        borderLeftWidth: 5,

        boxShadow: '0px 8px 30px rgba(0,0,0,0.5)',
    },

    title: {
        fontSize: 16,
        fontWeight: '800',
        marginBottom: 4,
    },

    message: {
        fontSize: 14,
    },
});