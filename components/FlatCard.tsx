import { StyleSheet,Text,View } from 'react-native';
import React from 'react';


export default function FlatCards() {
    return (
        <View>
            <View style={styles.card}>
                <Text style={styles.headingText}>Card Saver </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headingText:{
      fontSize:35,
      fontWeight:'bold',
      textAlignVertical:'center',
      paddingHorizontal: 70,
      fontStyle :'italic',
      color:'#ffffff',
    } ,
    card :{
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 8,
        width:350,
        height:70,
        backgroundColor:'#F54749',
        margin:20,
        elevation:10,

    },
});



