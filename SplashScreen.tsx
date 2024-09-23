import { Image,StyleSheet,View } from "react-native";
import React from "react";
import Icon from './assets/app_icon.png';

export default function SpalshScreen(){
    return (
       <View style={styles.container}>
          <View>

            <Image source={Icon}style={styles.image}/>
          </View>
       </View>
    );
}


const styles = StyleSheet.create({
    container:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:'#ffffff',
    },
    image :{
      width:500,
      height:500,
      resizeMode:'cover',
    },
});
