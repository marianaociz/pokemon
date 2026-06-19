import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.55)',
    },

    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0b1020',
    },

    content: {
        paddingHorizontal: 16,
        paddingBottom: 80,
    },

    header: {
        marginTop: 10,
        marginBottom: 20,
    },

    title: {
        color: '#FFD700',
        fontSize: 28,
        fontWeight: '900',
        textAlign: 'center',
        marginTop: 10,
    },

    subtitle: {
        color: '#d1d5db',
        textAlign: 'center',
        marginTop: 6,
        fontSize: 14,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap', 
        marginBottom: 14,
    },


    backButton: {
        alignSelf: 'flex-start',
        marginTop: 12,
        marginBottom: 15,
        backgroundColor: '#111827',
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFD700',
    },

    backText: {
        color: '#FFD700',
        fontWeight: '900',
        fontSize: 15,
    },


    card: {
        width: '47%', 
        minHeight: 240,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.15)',
        padding: 10,
        backgroundColor: '#1f2937',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,

        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.3,
                shadowRadius: 10,
            },
            android: {
                elevation: 6,
            },
        }),
    },

    selectedCard: {
        borderColor: '#FFD700',
        borderWidth: 3,
        backgroundColor: '#334155',
    },

    imageContainer: {
        width: '100%',
        height: 110,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 16,
        marginBottom: 10,
    },

    image: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },

    name: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '900',
        textAlign: 'center',
        textTransform: 'capitalize',
    },

    typeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 6,
    },

    typeBadge: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
        margin: 2,
    },

    typeText: {
        fontSize: 10,
        fontWeight: '900',
        color: '#000',
    },

  
    myPokemonCard: {
        width: 95,
        height: 120,
        backgroundColor: '#111827',
        borderRadius: 14,
        margin: 6,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFD700',
    },

    myPokemonImage: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },

    myPokemonName: {
        color: '#fff',
        fontSize: 10,
        fontWeight: '900',
        marginTop: 5,
        textAlign: 'center',
    },


    soloButton: {
        marginTop: 20,
        width: '85%',
        maxWidth: 260,
        alignSelf: 'center',
        backgroundColor: '#2563EB',
        paddingVertical: 14,
        borderRadius: 16,
        alignItems: 'center',
    },

    soloButtonText: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 15,
    },

    teamBattleButton: {
        marginTop: 15,
        width: '85%',
        maxWidth: 260,
        alignSelf: 'center',
        backgroundColor: '#FFD700',
        paddingVertical: 14,
        borderRadius: 16,
        alignItems: 'center',
        marginBottom: 25,
    },

    teamBattleText: {
        color: '#000',
        fontWeight: '900',
        fontSize: 15,
    },


    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 5,
    },

    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 15,
    },

    sectionTitle: {
        color: '#FFD700',
        fontSize: 18,
        fontWeight: '900',
        paddingHorizontal: 20,
    },

    arrow: {
        color: '#FFD700',
        fontSize: 18,
        fontWeight: '900',
    },

    emptyText: {
        color: '#fff',
        textAlign: 'center',
        marginVertical: 10,
        fontWeight: '700',
    },
});