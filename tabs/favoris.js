import {Text, View, FlatList, SafeAreaView, StyleSheet, Image} from "react-native";
import React, {Component} from "react";
import Constants from 'expo-constants';
import * as AsyncStorage from "react-native";

export default class Favoris extends Component {
    constructor(props){
        super(props);
        this.state = {
            products: false
        }


    }

    componentDidMount() {
        const getData = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('favoris');
                jsonValue != null ? JSON.parse(jsonValue) : null
                console.log(jsonValue)
                this.setState({
                    products: jsonValue
                });
            } catch (error) {
                // Error retrieving data
            }
        };
        getData()
    }

    render() {
        return (
            <View>
                <Text>{this.state.products}</Text>
            </View>
            // <SafeAreaView style={styles.container}>
            //     <FlatList
            //         data={this.state.products}
            //         renderItem={({ item }) => <Item title={item.title} image={item.image} />}
            //         keyExtractor={item => item.id}
            //     />
            // </SafeAreaView>
        );
    }
}

function Item({ title, image }) {

    const value = getData();

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




