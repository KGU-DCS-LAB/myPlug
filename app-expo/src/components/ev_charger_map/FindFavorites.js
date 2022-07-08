import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { config } from '../../../config';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from '@react-navigation/native';

const FindFavorites = ({user_id, statNm}) => {
    const [star, setStar] = useState('star-border');
    const isFocused = useIsFocused();
    const [favorites, setFavorites] = useState([]);
    
    useEffect(() => {
        getFavorites();
    }, [isFocused]);

    const getFavorites = () => {
        let result = []
        axios.post(config.ip + ':5000/favoritesRouter/findOwn', {
            user_id: user_id
        }).then((response) => {
            if (response.data.length > 0) {
                response.data.forEach((item) => {
                    result.push(item);
                });
            } 
            setFavorites(result);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const addToFavorites = () => {
        axios.post(config.ip + ':5000/favoritesRouter/save', {
            data: {
                user_id: user_id,
                station: {statNm: statNm},
            }
        }).then((response) => {
            if (response.data.status === 'success') {
                setStar('star');
                console.log('즐겨찾기 성공');
            } else {
                alert('즐겨찾기 실패');
            }
        }).catch(function (error) {
            console.log(error);
        })
    }

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => addToFavorites()}>
            <MaterialIcons name={star} size={24} color={"black"} />
        </TouchableOpacity>
    )
}

export default FindFavorites;