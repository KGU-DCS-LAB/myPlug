import React, { useState, useEffect } from 'react';
import { Box, Heading, HStack, Spacer, Text, View, Avatar } from "native-base";
import { Dimensions, ScrollView, StyleSheet, TouchableOpacity, Button } from "react-native";
import PressableButton from "../../components/common/PressableButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { config } from '../../../config';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

const FavoritesButton = () => {
    const windowWidth = Dimensions.get('window').width;
    const colNum3 = 3;
    const isFocused = useIsFocused();
    const [userId, setUserId] = useState('');
    const [bookmarked, setBookmarked] = useState([]);

    React.useEffect(() => {
        if(isFocused){
            console.log(1);
            try {
                AsyncStorage.getItem('userInfo')
                    .then(value => {
                        if (value != null) {
                            const UserInfo = JSON.parse(value);
                            setUserId(UserInfo[0].user_id);
                        }
                    }
                    )
            } catch (error) {
                console.log(error);
            }
        }
    }, [isFocused])

    useEffect(() => {
        let result = []
        let favorites = [];
        axios.post(config.ip + ':5000/favoritesRouter/findOwn', {
            user_id: userId
        }).then((response) => {
            // console.log(response.data);
            if (response.data.length == 0) {
                console.log('..');
              } else {
                result.push(response.data[0].station)

                for(let i=0; i<result[0].length; i++){
                    favorites.push(result[0][i].statNm)
                }
                setBookmarked(favorites);
                // console.log(favorites[0]);
              }
            }).catch(function (error) {
              console.log(error);
              setFirstRecord(true)
            })
    }, [userId]);

    // console.log(bookmarked);

    const ListItems = () => {
        return(
            <>
                {bookmarked.map((bookmark) =>
                <PressableButton
                key={bookmark}
                numOfCol={colNum3}
                width={windowWidth / colNum3 * 0.875}
                height={windowWidth / colNum3 * 0.9}
                onPress={() => console.log('ㅇㅇ')}
                title={bookmark}
                />
            )}
            </>
        )
    } 

    return(
    <>
        <ListItems/>
    </>
        
    )
}

export default FavoritesButton;