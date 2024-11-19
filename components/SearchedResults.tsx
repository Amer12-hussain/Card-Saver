import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Animated } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { BlurView } from '@react-native-community/blur';
import firestore from '@react-native-firebase/firestore';

interface SearchedResultsProps{
    resturants:any,
    handleCardPress:(data:any)=>void,
    imageMap:any
    
}
function SearchedResults({ resturants, handleCardPress, imageMap }:SearchedResultsProps) {
    console.log("inside the searhc ", resturants);
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
    const resturantMaxDiscount = (resturant:any)=>{
        let maxDisc:number = 0
        let name:string=""
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
        return {maxDisc,name}
    }
  return (
      <View>
          {resturants?.length > 0 ? (
              resturants?.map((restaurant, index) => (
                  <TouchableOpacity
                      key={index}
                      style={[styles.card, styles.elevated]}
                      onPress={() => { handleCardPress(restaurant?._data) }}
                  >
                      <View style={styles.imageContainer}>
                          <Image source={imageMap[restaurant._data.name]} style={styles.image} />
                      </View>
                      <Text style={styles.texcol}>{restaurant._data.name}</Text>
                      <Text style={styles.maxDic}> Max Discount today: {resturantMaxDiscount(restaurant)?.name || "name"}  {resturantMaxDiscount(restaurant)?.maxDisc || "no"}   🤑 </Text>
                  </TouchableOpacity>
              ))
          ) : (
              <Text style={styles.texcol}>No restaurants found.</Text>
          )}
      </View>
  )
}
const styles = StyleSheet.create({
    search: {
        textAlign: 'left',
        paddingHorizontal: 10,
    },
    searchbox: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        width: 350,
        height: 50,
        backgroundColor: '#CADFE2',
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
        padding: 100,
    },
    texcol: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        fontSize: 20,
        color: '#000000',
        textAlign: 'center',
      
    },
    card: {
        borderRadius: 10,
        width: 350,
        height: 180, // Increased height to fit image and text
        margin: 20,
        elevation: 10,
        backgroundColor: '#EEEEEE',
        //alignItems: 'center',
    },
    imageContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 8, // Space between image and text
    },
    image: {
        width:'101%',
        height: 100,
        borderRadius: 8,
    },
    maxDic:{
        fontWeight: 'bold',
      //  fontStyle: 'italic',
        fontSize: 18,
        color: '#000000',
        textAlign: 'left',
        paddingLeft: 10,

    },
});

export default SearchedResults;
