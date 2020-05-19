import {Text, View, FlatList, SafeAreaView, StyleSheet, Image} from "react-native";
import React from "react";
import Constants from 'expo-constants';
import * as AsyncStorage from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: '#f9c2aa',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
    image: {
        width: 40,
        height: 40,
    }
});

const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('favoris');
        if (value !== null) {
            // We have data!!
            console.log(value);
            // return value;
        }
    } catch (error) {
        // Error retrieving data
    }
};

const values = getData();

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
        image: 'https://static.openfoodfacts.org/images/products/317/973/012/1884/front_fr.19.400.jpg'
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
        image: 'https://static.openfoodfacts.org/images/products/317/973/012/1884/front_fr.19.400.jpg'
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
        image: 'https://static.openfoodfacts.org/images/products/317/973/012/1884/front_fr.19.400.jpg'
    },
];

function Item({ title, image }) {
    return (
        <View style={styles.item}>
            <Image
                style={styles.image}
                source={{
                    uri: {image},
                }}
            />
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

function Favoris() {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item title={item.title} image={item.image} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

export default Favoris;

