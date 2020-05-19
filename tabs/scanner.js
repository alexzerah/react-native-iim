import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Vibration} from "react-native-web";
import { NavigationContainer, TabActions } from '@react-navigation/native';
import {Haptic} from 'expo';


export default function Scanner({navigation}) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const jumpToAction = TabActions.jumpTo('Product', { user: 'Satya' });

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data  }) => {
        setScanned(true);
        Vibration.vibrate();

        fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
            .then((response) => response.json())
            .then((responseJson) => {

                // // Variante de navigate si je veux aller dans une autre pile de navigation
                // // https://reactnavigation.org/docs/params#passing-params-to-nested-navigators
                // this.props.navigation.navigate('Home', {
                //     screen: 'Details',
                //     params: { product: responseJson.product },
                // });

                navigation.navigate('Product', {
                    product: responseJson.product,
                });

            })
            .catch((error) =>{
                console.error(error);
            });


    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
            }}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
        </View>
    );
}
