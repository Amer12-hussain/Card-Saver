import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Animated } from 'react-native';
import React, { useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

// Define the type for a restaurant
interface Restaurant {
    name: string;
    image: any;  // You can specify a more precise type if needed for images
    Monday?: string; // Optional property
    Tuesday?: string; // Optional property
    Wednesday?: string; // Optional property
    Thursday?: string; // Optional property
    Friday?: string; // Optional property
    Saturday?: string; // Optional property
    Sunday?: string; // Optional property
    phone?: string; // Optional property
}

export default function ElevatedCards() {
    // Type the restaurants state as an array of Restaurant objects
    const [restaurants, setRestaurant] = useState<Restaurant[]>(
        [
            {
                name: "Double Cheeze Gulgasht",
                image: require('../assets/DoubleCheezeGulgasht.png'),
                Monday: " Monday                  HBL - Wedn",
                Tuesday: " Tuesday                HBL - Wedn",
                Wednesday: " Wednesday            HBL - Wedn",
                Thursday: " Thursday              HBL - Wedn",
                Friday: " Friday                  HBL - Wedn",
                Saturday: " Saturday              HBL - Wedn",
                Sunday: " Sunday                  HBL - Wedn",
                phone: "(061) 11",
            },
            {
                name: "AAAAAAA",
                image: require('../assets/DoubleCheezeGulgasht.png'),
                Monday: " Monday   HBL - Wedn",
                Tuesday: " Tuesday   HBL - Wedn",
                Wednesday: " Wednesday   HBL - Wedn",
                Thursday: " Thursday   HBL - Wedn",
                Friday: " Friday   HBL - Wedn",
                Saturday: " Saturday   HBL - Wedn",
                Sunday: " Sunday   HBL - Wedn",
                phone: "(061) 11",
                phone: "(061) 111 123 456",
            },
            {
                name: "B",
                image: require('../assets/DoubleCheezeGulgasht.png'),
                Monday: " Monday   HBL - Wedn",
                Tuesday: " Tuesday   HBL - Wedn",
                Wednesday: " Wednesday   HBL - Wedn",
                Thursday: " Thursday   HBL - Wedn",
                Friday: " Friday   HBL - Wedn",
                Saturday: " Saturday   HBL - Wedn",
                Sunday: " Sunday   HBL - Wedn",
                phone: "(061) 11", phone: "(061) 111 123 456",
            },
            {
                name: "C",
                image: require('../assets/DoubleCheezeGulgasht.png'),
                bank: "UBL - F",
                phone: "(061) 6",
            },
            {
                name: "D",
                image: require('../assets/DoubleCheezeGulgasht.png'),
                bank: "UBL - ",
                phone: "(061) 111 123 456",
            },
            // Add more restaurant data here
        ]
    );

    const [inputValue, setInputValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null); // Typing for selectedRestaurant
    const [isDetailVisible, setIsDetailVisible] = useState<boolean>(false);
    const [slideAnim] = useState(new Animated.Value(100)); // Initial position off-screen

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
    };

    const handleCardPress = (restaurant: Restaurant) => {
        setSelectedRestaurant(restaurant);
        setIsDetailVisible(true);
        slideIn(); // Start slide-in animation
    };

    const slideIn = () => {
        Animated.timing(slideAnim, {
            toValue: 0, // Slide to visible position
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const slideOut = () => {
        Animated.timing(slideAnim, {
            toValue: -800, // Hide the view
            duration: 100,
            useNativeDriver: true,
        }).start(() => setIsDetailVisible(false));
    };

    const filteredRestaurants = restaurants.filter(restaurant => {
        const lowercasedInput = inputValue.toLowerCase();
        return restaurant.name.toLowerCase().includes(lowercasedInput);
    });


    return (
        <View style={{ flex: 1 }}>

            <Text style={[styles.headingText, { textDecorationLine: 'underline' }]}>
                Remarkable
            </Text>

            <ScrollView style={styles.container} horizontal={true}>
                {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((restaurant, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.card, styles.elevated]}
                            onPress={() => handleCardPress(restaurant)}
                        >
                            <View style={styles.imageContainer}>
                                <Image source={restaurant.image} style={styles.image} />
                            </View>
                            <Text style={styles.texcol}>{restaurant.name}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.texcol}>No restaurants found.</Text>
                )}
            </ScrollView>


            {isDetailVisible && (
                <Animated.View style={[styles.detailContainer, { transform: [{ translateY: slideAnim }] }]}>
                    <Text style={styles.detailText}>Name: {selectedRestaurant?.name}</Text>
                    <Text>Bank offers:</Text>
                    <Text style={styles.detailText}>{selectedRestaurant?.Monday || 'N/A'}</Text>
                    <Text style={styles.detailText}>{selectedRestaurant?.Tuesday || 'N/A'}</Text>
                    <Text style={styles.detailText}>{selectedRestaurant?.Wednesday || 'N/A'}</Text>
                    <Text style={styles.detailText}>{selectedRestaurant?.Thursday || 'N/A'}</Text>
                    <Text style={styles.detailText}>{selectedRestaurant?.Friday || 'N/A'}</Text>
                    <Text style={styles.detailText}>{selectedRestaurant?.Saturday || 'N/A'}</Text>
                    <Text style={styles.detailText}>{selectedRestaurant?.Sunday || 'N/A'}</Text>

                    <Text style={styles.detailText}>Phone: {selectedRestaurant?.phone || 'N/A'}</Text>
                    <TouchableOpacity onPress={slideOut}>
                        <Text style={styles.closeButton}>Close</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    searchbox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: 350,
        height: 50,
        backgroundColor: '#EEEEEE',
        margin: 20,
        elevation: 10,
    },
    headingText: {
        fontSize: 37,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        paddingHorizontal: 30,
        fontStyle: 'italic',
        color: '#000000',
    },
    container: {
        padding: 2,
    },
    texcol: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 16,
        color: '#000000',
        marginTop: 77,
        textAlign: 'center',
    },
    card: {
        borderRadius: 8,
        width: 180,
        height: 100,
        margin: 20,
        elevation: 10,
    },
    elevated: {
        backgroundColor: '#EEEEEE',
    },
    imageContainer: {
        position: 'absolute',
        top: 5,
        right: 5,
        left: 5,
    },
    image: {
        width: 166,
        height: 70,
        borderRadius: 8,
    },
    detailContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 400,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        elevation: 30,
    },
    detailText: {
        fontSize: 15,
        marginVertical: 5,
        color: 'bold',
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#000000',
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 20,
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});
