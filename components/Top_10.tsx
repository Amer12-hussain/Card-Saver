import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Animated } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import { BlurView } from '@react-native-community/blur';
import firestore from '@react-native-firebase/firestore';
import SearchedResults from './SearchedResults';
const top_10 = useMemo(() => {
    console.log("Resturants in use memo ", resturants);

    const filteredRest = resturants?.filter((item: any) => {
        console.log(" resutnat single in use ,emo , ", item?._data);

        return (item?._data.resturant_type?.toLowerCase() === 'top_10')
    })
    console.log("Filtred Resturants in use memo ", filteredRest);

    return filteredRest
}, [resturants])