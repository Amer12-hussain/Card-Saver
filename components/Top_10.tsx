import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Animated } from 'react-native';
import React, { useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { BlurView } from '@react-native-community/blur';

// Define the type for a restaurant
interface Top_10Res {
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
    // Type the Top_10restaurants state as an array of Top_10Res objects
    const [Top_10restaurants, setTop_10restaurants] = useState<Top_10Res[]>(
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
                name: "A",
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
                phone: "(061) 11",
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
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState<Top_10Res | null>(null);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    //  const [slideAnim] = useState(new Animated.Value(100)); // Initial position off-screen

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
    };

    const handleCardPress = (restaurant: Top_10Res) => {
        setSelectedRestaurant(restaurant);
        setIsDetailVisible(true);    
        fadeAnim.setValue(0);
        fadeIn();
    };

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1, // Fade to full opacity
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0, // Fade out
            duration: 500,
            useNativeDriver: true,
        }).start(() => setIsDetailVisible(false));
    };

    const filteredRestaurants = Top_10restaurants.filter(restaurant => {
        const lowercasedInput = inputValue.toLowerCase();
        return restaurant.name.toLowerCase().includes(lowercasedInput);
    });


    return (
        <View style={{ flex: 1 }}>
            {/* Blur background when modal is visible */}
            {isDetailVisible && (
                <BlurView
                    style={styles.absolute}
                    blurType="light"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                />
            )}

            
            <Text style={[styles.headingText, { textDecorationLine: 'underline' }]}>
                Top_10
            </Text>

            <ScrollView style={styles.container} horizontal={true}>
                {filteredRestaurants.length > 0 ? (
                    filteredRestaurants.map((top_10Res, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.card, styles.elevated]}
                            onPress={() => handleCardPress(top_10Res)}
                        >
                            <View style={styles.imageContainer}>
                                <Image source={top_10Res.image} style={styles.image} />
                            </View>
                            <Text style={styles.texcol}>{top_10Res.name}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.texcol}>No Top_10res found.</Text>
                )}
            </ScrollView>

            {/* Modal content with fade-in animation */}
            {isDetailVisible && (
                <Animated.View style={[styles.detailContainer, { opacity: fadeAnim }]}>
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
                    <TouchableOpacity onPress={fadeOut}>
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
        textAlignVertical: 'center',
        paddingHorizontal: 30,
        fontStyle: 'Roboto ',
        color: '#000000',
    },
    container: {
        padding: 2,
    },
    texcol: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 12,
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
        bottom: -20, // Adjusted to show from the bottom with a gap
        height: 400,
        width: '85%',
        backgroundColor: '#FFFFFF',
        borderRadius: 50,
        padding: 10,
        alignSelf: 'center',
    },
    detailText: {
        fontSize: 15,
        marginVertical: 5,
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
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

