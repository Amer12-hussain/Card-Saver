import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Animated } from 'react-native';
import React, { useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

// Define the type for a RemarkableRes
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

export default function ElevatedCards() {
    // Type the RemarkableRess state as an array of RemarkableRes objects
    const [RemarkableRess, setRemarkableRes] = useState<RemarkableRes[]>(
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
        ]
    );

    const [inputValue, setInputValue] = useState<string>('');
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [selectedRemarkableRes, setSelectedRemarkableRes] = useState<RemarkableRes | null>(null); // Typing for selectedRemarkableRes
    const [isDetailVisible, setIsDetailVisible] = useState<boolean>(false);
    const [slideAnim] = useState(new Animated.Value(100)); // Initial position off-screen

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
    };

    const handleCardPress = (RemarkableRes: RemarkableRes) => {
        setSelectedRemarkableRes(RemarkableRes);
        setIsDetailVisible(true);
        slideAnim.setValue(-100);
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

    const filteredRemarkableRess = RemarkableRess.filter(RemarkableRes => {
        const lowercasedInput = inputValue.toLowerCase();
        return RemarkableRes.name.toLowerCase().includes(lowercasedInput);
    });


    return (
        <View style={{ flex: 1 }}>

            <Text style={[styles.headingText, { textDecorationLine: 'underline' }]}>
                Remarkable
            </Text>

            <ScrollView style={styles.container} horizontal={true}>
                {filteredRemarkableRess.length > 0 ? (
                    filteredRemarkableRess.map((RemarkableRes, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[styles.card, styles.elevated]}
                            onPress={() => handleCardPress(RemarkableRes)}
                        >
                            <View style={styles.imageContainer}>
                                <Image source={RemarkableRes.image} style={styles.image} />
                            </View>
                            <Text style={styles.texcol}>{RemarkableRes.name}</Text>
                        </TouchableOpacity>
                    ))
                ) : (
                    <Text style={styles.texcol}>No RemarkableRess found.</Text>
                )}
            </ScrollView>


            {isDetailVisible && (
                <Animated.View style={[styles.detailContainer, { transform: [{ translateY: slideAnim }] }]}>
                    <Text style={styles.detailText}>Name: {selectedRemarkableRes?.name}</Text>
                    <Text>Bank offers:</Text>
                    <Text style={styles.detailText}>{selectedRemarkableRes?.Monday || 'N/A'}</Text>
                    <Text style={styles.detailText}>{selectedRemarkableRes?.Tuesday || 'N/A'}</Text>
                    <Text style={styles.detailText}>{selectedRemarkableRes?.Wednesday || 'N/A'}</Text>
                    <Text style={styles.detailText}>{selectedRemarkableRes?.Thursday || 'N/A'}</Text>
                    <Text style={styles.detailText}>{selectedRemarkableRes?.Friday || 'N/A'}</Text>
                    <Text style={styles.detailText}>{selectedRemarkableRes?.Saturday || 'N/A'}</Text>
                    <Text style={styles.detailText}>{selectedRemarkableRes?.Sunday || 'N/A'}</Text>

                    <Text style={styles.detailText}>Phone: {selectedRemarkableRes?.phone || 'N/A'}</Text>
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
        bottom: -20,
        height: 400,
        width: '85%', // Set width as a percentage of the screen width, or use a fixed value like 300
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        padding: 10,
        elevation: 30,
        alignSelf: 'center', // Center the slide horizontally
        zIndex: 10, 
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
