import { useEffect } from 'react';
import { Alert as RNAlert } from 'react-native';
import { AlertProps } from './types';

export default function AlertAndroid({
    title,
    message,
    visible,
    onClose,
}: AlertProps) {
    useEffect(() => {
        if (visible) {
            RNAlert.alert(title, message, [
                { text: 'OK', onPress: onClose },
            ]);
        }
    }, [visible, title, message, onClose]);

    return null;
}