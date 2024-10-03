import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import FlatCards from './components/FlatCard';
import Popular_Restaurant from './components/Popular_Restaurant';
import SpalshScreen from './SplashScreen';
import firestore from '@react-native-firebase/firestore';

export default function App() {
  const [isShowSplash, setSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  });
  if (isShowSplash) {
    return <SpalshScreen />;
  }
  else {
    return (
      <SafeAreaView>
        <ScrollView>
          <FlatCards />
          <Popular_Restaurant />
        </ScrollView>
      </SafeAreaView>
    );
  }
  // This is not a code only for testing purpose of firebase 
  // const [myData, setmydata] = useState(null);
  // useEffect(() => {
  //   getDatabase();

  // }, []);
  // const getDatabase = async () => {
  //   const docRef = firestore().collection('121').doc('Zi1pX1pVs6bESvebAo9h');
  //   const doc = await docRef.get();

  //   if (doc.exists) {
  //     console.log(doc.data());  // This will log the actual document data (fields)
  //     setmydata(doc.data());
  //   } else {
  //     console.log('No such document!');
  //   }
  // };
  // return (
  //   <View>
  //     <Text> Say :-{myData ? myData.name : 'loading'}</Text>
  //   </View>
  // );
}


