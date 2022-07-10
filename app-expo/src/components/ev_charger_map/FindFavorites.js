import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { config } from '../../../config';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

const FindFavorites = ({user_id, statNm}) => {
    const [star, setStar] = useState('star-border');
    const isFocused = useIsFocused();
    const [firstRecord, setFirstRecord] = useState(true);
    
    useEffect(() => {
        getFavorites();
    }, [isFocused, statNm]);

    const getFavorites = () => {
        let result = []
        axios.post(config.ip + ':5000/favoritesRouter/findOwn', {
            user_id: user_id
        }).then((response) => {
            // console.log(response.data);
            if (response.data.length == 0) {
                setFirstRecord(true)
              } else {
                result.push(response.data[0].station)
                setFirstRecord(false);
                for(let i=0; i<result[0].length; i++){
                    if(result[0][i].statNm == statNm){
                        setStar('star');
                        break;
                    }
                }
                // console.log(result[0][0]);
              }
            }).catch(function (error) {
              console.log(error);
              setFirstRecord(true)
            })
    }

    const addToFavorites = () => {
        if(star == 'star'){
            //즐겨찾기 취소
            axios.post(config.ip + ':5000/favoritesRouter/favoirteDelete', {
                data: {
                  user_id: user_id,
                  statNm: statNm
                }
              })
                .then((response) => {
                  if (response.data.status == 'success') {
                    console.log('즐겨찾기 취소');
                    setStar('star-border');
                  }
                }).catch(function (error) {
                  console.log(error);
                });
            
        } else{
            if(firstRecord){
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
            } else {
                axios.post(config.ip + ':5000/favoritesRouter/saveMore', {
                    data: {
                        user_id: user_id,
                        statNm: statNm,
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
        }
    }

    return (
        <>
        {user_id != 'unknown' && 
        <TouchableOpacity activeOpacity={0.8} onPress={() => addToFavorites()}>
            <MaterialIcons name={star} size={24} color={"black"} />
        </TouchableOpacity>}
        </>
        
    )
}

export default FindFavorites;