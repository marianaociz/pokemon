import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0b1020',
    },

    content: {
        alignItems: 'center',
        padding: 20,
        paddingBottom: 40,
    },

    backButton: {
        alignSelf: 'flex-start',
        marginLeft: 20,
        marginTop: 10,
    },

    backText: {
        color: '#FFD700',
        fontSize: 16,
        fontWeight: '800',
    },

    profileBox: {
        marginTop: 10,
        padding: 4,
        borderRadius: 80,
        borderWidth: 2,
        borderColor: '#FFD700',
    },

    avatar: {
        width: 130,
        height: 130,
        borderRadius: 65,
    },

    name: {
        color: '#fff',
        fontSize: 26,
        fontWeight: '900',
        marginTop: 12,
    },

    levelBox: {
        flexDirection: 'row',
        gap: 10,
        backgroundColor: '#111827',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginBottom: 20,
    },

    levelText: {
        color: '#FFD700',
        fontWeight: '900',
    },

    xpText: {
        color: '#fff',
        fontWeight: '700',
    },

    card: {
        width: '100%',
        backgroundColor: '#111827',
        borderRadius: 18,
        padding: 18,
        marginBottom: 12,
    },

    label: {
        color: '#FFD700',
        fontSize: 16,
        fontWeight: '900',
        marginBottom: 6,
    },

    value: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },

    historyBox: {
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#334155',
        paddingTop: 10,
    },

    historyItem: {
        color: '#cbd5e1',
        fontSize: 14,
    },

    listRow: {
        flexDirection: 'row',
        marginBottom: 4,
    },

    dot: {
        color: '#FFD700',
        marginRight: 6,
    },
});