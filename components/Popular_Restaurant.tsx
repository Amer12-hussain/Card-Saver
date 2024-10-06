import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Animated } from 'react-native';
import React, { useEffect, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { BlurView } from '@react-native-community/blur';
import firestore from '@react-native-firebase/firestore';
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
interface RemarkableRes {
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

interface ResturantInt{
    address:string,
    discount_on:string[],
    name:string,
    rating:number,
    reviews:string[]
}
export default function ElevatedCards() {
    // Type the restaurants state as an array of Restaurant objects
  
    const [Top_10restaurants, setTop_10restaurants] = useState<Top_10Res[]>(
        [
            {
                name: 'Double Cheeze Gulgasht',
                image: require('../assets/DoubleCheezeGulgasht.png'),
                Monday: " Monday                  HBL - Wedn",
               
            },
            // Add more restaurant data here
        ]
    );
    const [RemarkableRess, setRemarkableRes] = useState<RemarkableRes[]>(
        [
            {
                name: 'Double Cheeze Gulgasht',
                image: require('../assets/DoubleCheezeGulgasht.png'),  
                phone: '(061) 11',
            },
            {
                name: 'Double Cheeze Gulgasht',
                image: require('../assets/DoubleCheezeGulgasht.png'),

                phone: '(061) 11',
            },
        ]
    );

    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [resturants, setResturants] = useState<ResturantInt[]|[]>([])
  //  const [slideAnim] = useState(new Animated.Value(100)); // Initial position off-screen
    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
    };
    useEffect(()=>{
        const getDatabase = async () => {
          const docRef = firestore().collection('resturants');
          const doc = await docRef.get();

            setResturants(doc.docs||[])
          //   if (doc.exists) {
        //     // setmydata(doc.data());
        //   } else {
        //     console.log('No such document!');
        //   }
        };
        getDatabase()
    },[])
    const handleCardPress = (restaurant: any) => {
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

    const imageMap = {
        'fork-n-knive': require('./../assets/fork-n-knive.jpeg'),
        // Add more mappings here
    };
    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0, // Fade out
            duration: 500,
            useNativeDriver: true,
        }).start(() => setIsDetailVisible(false));
    };

    // const filteredRestaurants = resturants.filter(restaurant => {
    //     const lowercasedInput = inputValue.toLowerCase();
    //     return restaurant.name.toLowerCase().includes(lowercasedInput);
    // });

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

            <View style={styles.searchbox}>
                <TextInput
                    style={{ flex: 1, paddingHorizontal: 30 }}
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={isFocused ? '' : '🔍 Filter by Restaurant Name or Bank card'}
                />
            </View>
            <Text style={[styles.headingText, { textDecorationLine: 'underline' }]}>
                Popular Restaurant
            </Text>
            <ScrollView style={styles.container} horizontal={true}>
                {resturants.length > 0 ? (
                    resturants.map((restaurant, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.card, styles.elevated]}
                            onPress={() => handleCardPress(restaurant)}
                        >
                            <View style={styles.imageContainer}>
                                <Image source={imageMap[restaurant._data.name]} style={styles.image} />
                            </View>
                            <Text style={styles.texcol}>{restaurant._data.name}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.texcol}>No restaurants found.</Text>
                )}
            </ScrollView>
            <Text style={[styles.headingText, { textDecorationLine: 'underline' }]}>
                Top_10
            </Text>
            <ScrollView style={styles.container} horizontal={true}>
                {Top_10restaurants.length > 0 ? (
                    Top_10restaurants.map((top_10Res, index) => (
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
            <Text style={[styles.headingText, { textDecorationLine: 'underline' }]}>
                Remarkable
            </Text>
            <ScrollView style={styles.container} horizontal={true}>
                {RemarkableRess.length > 0 ? (
                    RemarkableRess.map((remarkableRes, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.card, styles.elevated]}
                            onPress={() => handleCardPress(remarkableRes)}
                        >
                            <View style={styles.imageContainer}>
                                <Image source={remarkableRes.image} style={styles.image} />
                            </View>
                            <Text style={styles.texcol}>{remarkableRes.name}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.texcol}>No RemarkableRes found.</Text>
                )}
            </ScrollView>

            {isDetailVisible && (
                <Animated.View style={[styles.detailContainer, { opacity: fadeAnim }]}>
                    <Text style={styles.detailText}>Name: {selectedRestaurant?.name}</Text>
                    <Text>Bank offers:</Text>
                    {/* <Text style={styles.detailText}>Monday : {selectedRestaurant?.Monday?.forEach((item)=>{
                        return item
                    })} {selectedRestaurant?.Monday || 'N/A'}</Text> */}
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

            {/* Modal content with fade-in animation */}
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
        fontStyle: 'normal',
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
        bottom: 200 , // Adjusted to show from the bottom with a gap
        height: 400,
        width: '85%',
        backgroundColor: '#EEEEEE',
        borderRadius: 50,
        padding: 10,
        alignSelf: 'center',
        zIndex: 5,
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
        zIndex: 1,
    },
});

