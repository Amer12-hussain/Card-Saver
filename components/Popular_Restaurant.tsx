import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Animated } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { BlurView } from '@react-native-community/blur';
import firestore from '@react-native-firebase/firestore';
import SearchedResults from './SearchedResults';


export default function ElevatedCards() {
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [resturants, setResturants] = useState<any[] | []>([])
    useEffect(() => {
        const getDatabase = async () => {
            const docRef = firestore().collection('resturants');
            const doc = await docRef.get();
            setResturants(doc.docs || [])
        };
        getDatabase()
    }, [])
    const handleCardPress = (restaurant: any) => {
        setSelectedRestaurant(restaurant);
        setIsDetailVisible(true);
        fadeAnim.setValue(0);
        fadeIn();
    };
    const popularResturant = useMemo(() => {
        console.log("Resturants in use memo ", resturants);
        const filteredRest = resturants?.filter((item: any) => {
            console.log(" resutnat single in use ,emo , ", item?._data);
            return (item?._data.resturant_type?.toLowerCase() === 'popular')
        })
        console.log("Filtred Resturants in use memo ", filteredRest);
        return filteredRest
    }, [resturants])
    const top_10 = useMemo(() => {
        console.log("Resturants in use memo ", resturants);

        const filteredRest = resturants?.filter((item: any) => {
            console.log(" resutnat single in use ,emo , ", item?._data);

            return (item?._data.resturant_type?.toLowerCase() === 'top_10')
        })
        console.log("Filtred Resturants in use memo ", filteredRest);

        return filteredRest
    }, [resturants])

    const Remarkable = useMemo(() => {
        console.log("Resturants in use memo ", resturants);

        const filteredRest = resturants?.filter((item: any) => {
            console.log(" resutnat single in use ,emo , ", item?._data);

            return (item?._data.resturant_type?.toLowerCase() === 'remarkable')
        })
        console.log("Filtred Resturants in use memo ", filteredRest);

        return filteredRest
    }, [resturants])

    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1, // Fade to full opacity
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    const imageMap = {
        'fork-n-knive': require('./../assets/fork-n-knive.jpeg'),
        'Double Cheeze': require('./../assets/DoubleCheezeGulgasht.png'),
        'Pizza Hut': require('./../assets/Pizza-Hut.png'),
        'McDonald': require('./../assets/McDonald.png'),
        'Hardees': require('./../assets/Hardees.jpg'),
        'AlKaifMultan': require('./../assets/AlKaifMultan.jpeg'),

        // Add more mappings here
    };
    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0, // Fade out
            duration: 500,
            useNativeDriver: true,
        }).start(() => setIsDetailVisible(false));
    };

    const filteredResturants = useMemo(() => {
        const filteredRest = resturants?.filter((item: any) => {
            console.log(" resutnat single in use ,emo , ", item?._data);

            return (item?._data.name?.toLowerCase()?.includes(inputValue?.toLowerCase()))
        })
        return filteredRest
    }, [resturants, inputValue])

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
                    style={{ flex: 1, paddingHorizontal: 30, textAlign: 'left' }}
                    value={inputValue}
                    onChangeText={(text) => setInputValue(text)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder={isFocused ? '' : '🔍 Filter by Restaurant Name or Bank card'}

                />
            </View>
            {inputValue?.length > 0 ? (
                <View>
                    <SearchedResults
                        resturants={filteredResturants}
                        handleCardPress={handleCardPress}
                        imageMap={imageMap}
                    />
                </View>
            ) : (
                <View>
                    <Text style={[styles.headingText, { textDecorationLine: 'underline' }]}>
                        Popular Restaurant
                    </Text>
                    <ScrollView style={styles.container} horizontal={true}>
                        {popularResturant?.length > 0 ? (
                            popularResturant?.map((restaurant, index) => (
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.card, styles.elevated]}
                                    onPress={() => { handleCardPress(restaurant?._data) }}
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
                        {top_10?.length > 0 ? (
                            top_10?.map((restaurant, index) => {
                                console.log("top 10 item ", restaurant._data.name);
                                return (  // <-- Added parentheses here
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.card, styles.elevated]}
                                        onPress={() => { handleCardPress(restaurant?._data) }}
                                    >
                                        <View style={styles.imageContainer}>
                                            <Image source={imageMap[restaurant._data.name]} style={styles.image} />
                                        </View>
                                        <Text style={styles.texcol}>{restaurant._data.name}</Text>
                                    </TouchableOpacity>
                                )

                            })
                        ) : (
                            <Text style={styles.texcol}>No Top_10 res found.</Text>
                        )}

                    </ScrollView>
                    <Text style={[styles.headingText, { textDecorationLine: 'underline' }]}>
                        Remarkable
                    </Text>
                    <ScrollView style={styles.container} horizontal={true}>
                        {Remarkable?.length > 0 ? (
                            Remarkable?.map((restaurant, index) => {
                                return (  // <-- Added parentheses here
                                    <TouchableOpacity
                                        key={index}
                                        style={[styles.card, styles.elevated]}
                                        onPress={() => { handleCardPress(restaurant?._data) }}
                                    >
                                        <View style={styles.imageContainer}>
                                            <Image source={imageMap[restaurant._data.name]} style={styles.image} />
                                        </View>
                                        <Text style={styles.texcol}>{restaurant._data.name}</Text>
                                    </TouchableOpacity>
                                )

                            })
                        ) : (
                            <Text style={styles.texcol}>No Remarkable res found.</Text>
                        )}
                    </ScrollView>

                </View>
            )}
            {isDetailVisible && (
                <Animated.View style={[styles.detailContainer, { opacity: fadeAnim }]}>
                    <ScrollView
                        style={{ flexGrow: 1, flex: 1 }} // Ensures ScrollView takes up available space
                        contentContainerStyle={styles.scrollContent} // Ensures content is vertically centered
                    >
                        <Text style={styles.detailText}>Name: {selectedRestaurant?.name}</Text>
                        <Text style={styles.detailText}>Bank offers:</Text>
                        {selectedRestaurant?.discount?.map((item: any, index: number) => (
                            <Text key={index} style={styles.detailText}>
                                {item?.discount_day}:
                                {item?.discount_bank?.map((bank: string, bankIndex: number) => (
                                    <Text key={bankIndex} style={styles.detailText}>{bank}</Text>
                                ))}
                            </Text>
                        ))}
                        <Text style={styles.detailText}>Phone: {selectedRestaurant?.contact}</Text>
                        <Text style={styles.detailText}>Address: {selectedRestaurant?.address}</Text>
                        <Text style={styles.detailText}>Rating: {selectedRestaurant?.rating}</Text>
                        <Text style={styles.detailText}>Reviews:</Text>
                        {selectedRestaurant?.reviews?.map((review: string, index: number) => (
                            <Text key={index} style={styles.detailText}>{review}</Text>
                        ))}
                    </ScrollView>
                    <TouchableOpacity onPress={fadeOut} style={styles.closeButtonContainer}>
                        <Text style={styles.closeButton}>Close</Text>
                    </TouchableOpacity>
                </Animated.View>
            )}

        </View>
    );
}
export const styles = StyleSheet.create({
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
        width: '90%',
        backgroundColor: '#EEEEEE',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 15,
        alignSelf: 'center',
        top: '10%',
        maxHeight: '80%',
        zIndex: 5,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center', // Centers the content within ScrollView
        paddingBottom: 20,
    },
    closeButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
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
        fontSize: 18,
        color: 'red',
        fontWeight: 'bold',
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

