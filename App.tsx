import { SafeAreaView, ScrollView, } from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import FlatCards from './components/FlatCard';
import Popular_Restaurant from './components/Popular_Restaurant';
import SpalshScreen from './SplashScreen';
import Top_10 from './components/Top_10';
import STAR_rating from './components/3STAR_rating';

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
          <Top_10/>
          <STAR_rating/>
        </ScrollView>
      </SafeAreaView>
    );
  }
}


