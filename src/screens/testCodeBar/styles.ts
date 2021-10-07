import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    info: {
        height: '50%',
        backgroundColor: 'white'
    },

    container2: {
        flex: 1,
    },

    scanner: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    scannerGrid: {
        flex: 1,
        width: "100%",
        backgroundColor: "transparent",
        justifyContent: "space-between",
    },

    topbar: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 32,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        paddingBottom: 30,
    },

    flipText: {
        fontSize: 16,
        lineHeight: 16,
        margin: 5,
    },

    bottomBar: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 32,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        paddingTop: 30,
    },

    instructions: {
        maxWidth: 300,
        textAlign: "center",
        fontSize: 16,
        lineHeight: 20,
    },
});