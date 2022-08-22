import React, { useState, useEffect } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import { config } from '../../../config';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import { Box, Center, Heading, HStack, Pressable } from 'native-base';

const FindFavorites = ({ user_id, statId }) => {
    const [star, setStar] = useState('star-border');
    const isFocused = useIsFocused();
    const [firstRecord, setFirstRecord] = useState(true);

    useEffect(() => {
        getFavorites();
    }, [isFocused, statId]);

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
                for (let i = 0; i < result[0].length; i++) {
                    if (result[0][i].statId == statId) {
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
        if (star == 'star') {
            //즐겨찾기 취소
            axios.post(config.ip + ':5000/favoritesRouter/favoirteDelete', {
                data: {
                    user_id: user_id,
                    statId: statId
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

        } else {
            if (firstRecord) {
                axios.post(config.ip + ':5000/favoritesRouter/save', {
                    data: {
                        user_id: user_id,
                        station: { statId: statId },
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
                        statId: statId,
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
            {
                user_id != 'unknown' &&
                <Pressable
                    onPress={() => addToFavorites()}

                >
                    <Box
                        height="30"
                        width="150"
                        borderWidth="1"
                        borderColor="coolGray.300"
                        shadow="3"
                        bg="yellow.300"
                        px="5"
                        mx="2"
                        rounded="8"
                    >
                        <Center>
                            <HStack>
                                <Heading size="md">즐겨찾기</Heading><MaterialIcons name={star} size={24} color={"black"} />
                            </HStack>
                        </Center>
                    </Box>
                </Pressable>
            }
        </>

    )
}

export default FindFavorites;