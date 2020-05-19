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

const addData = async () => {
    try {
        await AsyncStorage.setItem('favoris', [{'name':'Perrier', 'id': '3179730121884' , 'image': 'https://static.openfoodfacts.org/images/products/317/973/012/1884/front_fr.19.400.jpg'}]);
    } catch (error) {
        // Error saving data
    }
};


const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);

function Product() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image
                style={styles.product}
                source={{
                    uri: 'https://static.openfoodfacts.org/images/products/317/973/012/1884/front_fr.19.400.jpg',
                }}
            />
            <Button title={"Add to favoris"} onPress={() => addData()}/>
            <SectionList
                sections={DATA}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item }) => <Item title={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.header}>{title}</Text>
                )}
            />
        </View>
    );
}

export default Product;
