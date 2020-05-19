import {Text, View, Image, StyleSheet, SectionList, Button, AsyncStorage} from "react-native";
import React from "react";

const styles = StyleSheet.create({
    product: {
        width: 250,
        height: 250,
    },
    item: {
        backgroundColor: "#f9c2aa",
        padding: 100,
        marginVertical: 0
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 24
    }
});

const DATA = [
    {
        title: "Name",
        data: ["Eau minérale naturelle renforcée au gaz de la source",]
    },
    {
        title: "Calcium",
        data: ["0.16",]
    },
    {
        title: "Magnésium",
        data: ["0.0039",]
    },
    {
        title: "Sodium",
        data: ["0.0096",]
    }
];

const addFav = async (product) => {
    try {
        const jsonValue = JSON.stringify(product)
        await AsyncStorage.setItem('favoris', jsonValue)
    } catch (error) {
        console.log(error)
    }
};


const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

function Product({route}) {

    return (

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{route.params === undefined ? "No product" : route.params.product.product_name}</Text>
            <Image
                source={{uri: route.params === undefined ? "No product" : route.params.product.image_small_url }}
                style={{ alignSelf: 'center', width: 200, height: 200, borderRadius: 100 }}
            />

            <Text>Sel</Text>
            <Text>{route.params === undefined ? "" : route.params.product.nutriments.salt}</Text>
            <Button title={"Ajouter aux  favoris"} onPress={() => addFav(route.params.product)} />
        </View>
    );
}

export default Product;
