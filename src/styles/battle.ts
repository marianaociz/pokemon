import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        paddingHorizontal: 12,
    },

    loading: {
        flex: 1,
        backgroundColor: '#0b1020',
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        color: '#FFD700',
        fontSize: 28,
        fontWeight: '900',
        marginVertical: 18,
        textAlign: 'center',
    },


    card: {
        width: '88%',
        alignSelf: 'center',

        backgroundColor: '#1b2333',
        borderRadius: 20,
        padding: 14,

        alignItems: 'center',
        justifyContent: 'center',

        marginBottom: 14,

        borderWidth: 1,
        borderColor: '#2f3b52',

        shadowColor: '#000',
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 6,
    },

    image: {
        width: 120,   
        height: 120,
        resizeMode: 'contain',
        marginBottom: 8,
    },

    name: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '900',
        textTransform: 'capitalize',
        marginBottom: 6,
    },

 
    hpBar: {
        width: '100%',
        height: 12,
        backgroundColor: '#111827',
        borderRadius: 999,
        overflow: 'hidden',
        marginTop: 8,
    },

    hpFill: {
        height: '100%',
        backgroundColor: '#22c55e',
    },

    hpText: {
        color: '#fff',
        marginTop: 4,
        fontWeight: '700',
        fontSize: 11,
    },


    vs: {
        color: '#FFD700',
        fontSize: 34,
        fontWeight: '900',
        marginVertical: 10,
        textAlign: 'center',
    },

   message: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 22,
    },

    messageContainer: {
        height: 70,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    attackButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 12,
        paddingHorizontal: 35,
        borderRadius: 16,
        marginTop: 10,
        alignSelf: 'center',
    },

    attackText: {
        color: '#000',
        fontWeight: '900',
        fontSize: 15,
    },

    autoButton: {
        backgroundColor: '#10B981',
        paddingVertical: 12,
        paddingHorizontal: 35,
        borderRadius: 16,
        marginTop: 10,
        alignSelf: 'center',
    },

 
    teamGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 4,
    },

    teamCard: {
        width: '29%', 
        aspectRatio: 0.85,

        backgroundColor: '#1b2333', 
        borderRadius: 14,

        margin: 4,

        alignItems: 'center',
        justifyContent: 'center',

        borderWidth: 1,
        borderColor: '#FFD700', 
    },

    teamImage: {
        width: 55,
        height: 55,
        resizeMode: 'contain',
    },

    teamName: {
        color: '#FFF',
        fontWeight: '800',
        marginTop: 4,
        textAlign: 'center',
        textTransform: 'capitalize',
        fontSize: 9,
    },

 
    battleButtonWrapper: {
        width: '100%',
        marginTop: 15,
        marginBottom: 25,
        alignItems: 'center',
    },
});