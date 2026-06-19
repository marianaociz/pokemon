import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    button: {
        width: '100%',
        backgroundColor: '#2563EB',

        paddingVertical: 17,

        borderRadius: 16,

        justifyContent: 'center',
        alignItems: 'center',

        ...Platform.select({
            web: {
                boxShadow: '0px 6px 18px rgba(37,99,235,0.45)',
            },
            ios: {
                shadowColor: '#2563EB',
                shadowOffset: {
                    width: 0,
                    height: 6,
                },
                shadowOpacity: 0.4,
                shadowRadius: 10,
            },
            android: {
                elevation: 8,
            },
        }),
    },

    text: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '700',
    },
});