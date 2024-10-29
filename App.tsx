import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import FlatCards from './components/FlatCard';
import Popular_Restaurant from './components/Popular_Restaurant';
import SplashScreen from './SplashScreen';

export default function App() {
  const [isShowSplash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  }, []);

  if (isShowSplash) {
    return <SplashScreen />;
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <FlatCards />
          <Popular_Restaurant style={styles.fullHeight} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  fullHeight: {
    flex: 1,
  },
});

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



