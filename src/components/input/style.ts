// style.ts

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({

    container: {
        position: 'relative',
        width: '100%',
    },

    input: {
        width: '100%',
        height: 58,

        backgroundColor: 'rgba(15,23,42,0.92)',

        borderRadius: 18,

        paddingHorizontal: 18,
        paddingRight: 60,

        color: '#FFFFFF',
        fontSize: 16,

        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',

        boxShadow: '0px 4px 12px rgba(0,0,0,0.20)',
    },

    eyeButton: {
        position: 'absolute',

        right: 18,
        top: 17,

        justifyContent: 'center',
        alignItems: 'center',
    },

    eyeText: {
        fontSize: 20,
    },
});