import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Animated } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { BlurView } from '@react-native-community/blur';
import firestore from '@react-native-firebase/firestore';
import SearchedResults from './SearchedResults';
function getMaxDiscount(discountBanks) {
    let maxDiscount = null;
    console.log("Discounted banks are ", discountBanks)
    discountBanks.forEach((bank) => {
        const discountValue = parseFloat(bank.discount);

        if (!maxDiscount || discountValue > maxDiscount.discount) {
            maxDiscount = {
                name: bank.name,
                discount: discountValue,
            };
        }
    });
    console.log("Max discount value ", maxDiscount)
    return maxDiscount;
}
const resturantMaxDiscount = (resturant: any) => {
    let maxDisc: number = 0
    let name: string = ""
    console.log("Resturant is ", resturant)
    resturant?._data?.discount?.forEach((subItem: any) => {
        const temp = getMaxDiscount(subItem?.discount_bank)
        console.log("temp value is ", temp)
        if (temp?.discount > 0) {
            maxDisc = temp?.discount
            name = temp?.name
        }

    })
    console.log("Max discount is ", maxDisc)
    return { maxDisc, name }
}

export default function ElevatedCards() {
    const [isDetailVisible, setIsDetailVisible] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [inputValue, setInputValue] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [resturants, setResturants] = useState<any[] | []>([]);
    useEffect(() => {
        const getDatabase = async () => {
            const docRef = firestore().collection('resturants');
            const doc = await docRef.get();
            setResturants(doc.docs || []);
        };
        getDatabase();
    }, []);
    const handleCardPress = (restaurant: any) => {
        setSelectedRestaurant(restaurant);
        setIsDetailVisible(true);
        fadeAnim.setValue(0);
        fadeIn();
    };
    const popularResturant = useMemo(() => {
        const filteredRest = resturants?.filter((item: any) => {
            return (item?._data.resturant_type?.toLowerCase() === 'popular');
        });
        return filteredRest;
    }, [resturants]);
    const top_10 = useMemo(() => {
        const filteredRest = resturants?.filter((item: any) => {
            return (item?._data.resturant_type?.toLowerCase() === 'top_10');
        });
        return filteredRest;
    }, [resturants]);

    const Remarkable = useMemo(() => {
        const filteredRest = resturants?.filter((item: any) => {
            return (item?._data.resturant_type?.toLowerCase() === 'remarkable');
        });
        return filteredRest;
    }, [resturants]);

    function fadeIn() {
        Animated.timing(fadeAnim, {
            toValue: 1, // Fade to full opacity
            duration: 500,
            useNativeDriver: true,
        }).start();
    }
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
            return (item?._data.name?.toLowerCase()?.includes(inputValue?.toLowerCase()));
        });
        return filteredRest;
    }, [resturants, inputValue]);
    const CDay=()=>{
        const today = new Date();

        // Array of day names
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        // Get today's day name
        const currentDay = daysOfWeek[today.getDay()];

    };

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
                            popularResturant?.map((restaurant, index) => {
                                return(
                                <TouchableOpacity
                                    key={index}
                                    style={[styles.card, styles.elevated]}
                                    onPress={() => { handleCardPress(restaurant?._data) }}
                                >
                                    <View style={styles.imageContainer}>
                                        <Image source={imageMap[restaurant._data.name]} style={styles.image} />
                                    </View>
                                    <Text style={styles.texcol}>{restaurant._data.name}</Text>
                                <Text style={styles.maxDic}> Max Discount today: {resturantMaxDiscount(restaurant)?.name } {resturantMaxDiscount(restaurant)?.maxDisc || "0"} </Text>


                                </TouchableOpacity>
                            );})
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
                                        <Text style={styles.maxDic}> Max Discount today: {resturantMaxDiscount(restaurant)?.name} {resturantMaxDiscount(restaurant)?.maxDisc || "0"} </Text>

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
                                        <Text style={styles.maxDic}> Max Discount today: {resturantMaxDiscount(restaurant)?.name} {resturantMaxDiscount(restaurant)?.maxDisc || "0"}  </Text>

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
                    <ScrollView contentContainerStyle={styles.scrollContent}>
                        <Text style={styles.sectionHeading}>Name</Text>
                        <Text style={styles.detailText}>{selectedRestaurant?.name}</Text>

                        <View style={styles.sectionDivider} />

                        <Text style={styles.sectionHeading}>Bank Offers</Text>
                        {selectedRestaurant?.discount?.map((item: any, index: number) => (
                            <View key={index} style={styles.bankOfferContainer}>
                                <Text style={styles.detailText}>
                                    {item?.discount_day || "All Days"}
                                </Text>
                                {item?.discount_bank?.map((bank: any, bankIndex: number) => (
                                    <Text key={bankIndex} style={styles.detailText}>
                                        • {bank.name} ({bank.discount}%)
                                    </Text>
                                ))}
                            </View>
                        ))}

                        <View style={styles.sectionDivider} />

                        <Text style={styles.sectionHeading}>Contact</Text>
                        <Text style={styles.detailText}>📞 {selectedRestaurant?.contact}</Text>

                        <View style={styles.sectionHeading} />

                        <Text style={styles.sectionHeading}>Address</Text>
                        <Text style={styles.detailText}>📍 {selectedRestaurant?.address}</Text>

                        <View style={styles.sectionDivider} />

                        <Text style={styles.sectionHeading}>Rating</Text>
                        <Text style={styles.detailText}>⭐ {selectedRestaurant?.rating}</Text>

                        <View style={styles.sectionDivider} />

                        <Text style={styles.sectionHeading}>Reviews</Text>
                        {selectedRestaurant?.reviews?.map((review: string, index: number) => (
                            <Text key={index} style={styles.detailText}>
                                • {review}
                            </Text>
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
        fontSize: 25,
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
        width: 190,
        height: 120,
        margin: 20,
        elevation: 10,
    },
    maxDic: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#000000',
        textAlign: 'left',
        paddingLeft: 10,

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
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignSelf: 'center',
        top: '10%',
        maxHeight: '80%',
        zIndex: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 6,
    },
    sectionDivider: {
        borderBottomWidth: 6,
        borderBottomColor: '#eee',
        marginVertical: 1,
    },
    sectionHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 10,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    closeButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
        marginTop: 10,
    },
    detailText: {
        fontSize: 17,
        marginVertical: 6,
        color: '#000000',
        textAlign: 'left',
        marginLeft: 15,
        fontWeight: 'bold',
        lineHeight: 22,
    },
    detailLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E90FF', // Soft blue color for labels
        marginVertical: 6,
        marginLeft: 15,
    },
    closeButton: {
        fontSize: 19,
        color: '#FF4444',
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
   
    divider: {
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1,
        marginVertical: 10,
    },
});



