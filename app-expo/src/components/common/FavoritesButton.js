import React, { useState, useEffect } from 'react';
import { Box, Heading, HStack, Spacer, Text, View, Avatar } from "native-base";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, Button } from "react-native";
import PressableButton from "../../components/common/PressableButton";

const FavoritesButton = ({favorites}) => {
    const windowWidth = Dimensions.get('window').width;
    const colNum3 = 3;

    console.log(favorites);
    
    return(
    <>
        
            <PressableButton
                        numOfCol={colNum3}
                        width={windowWidth / colNum3 * 0.875}
                        height={windowWidth / colNum3 * 0.9}
                        onPress={() => console.log('ㅇㅇ')}
                        title={favorites[1]}
                    />
                    
    </>
        
    )
}

export default FavoritesButton;