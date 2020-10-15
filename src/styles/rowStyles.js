import { StyleSheet } from 'react-native';

export const rowStyles = StyleSheet.create({
    row:{
        flexDirection: "row",
        paddingTop: 12
    },
    coinName:{
        flex: 1,
        alignSelf: "center"
    },
    price: {
        flex: 2,
        marginRight: 12,
    },
    holding:{
        flex: 2,
        marginRight: 12
    },
    rowBell:{
        flex: 0.4,
        alignSelf: "center",
        textAlign: "center",
    }
});