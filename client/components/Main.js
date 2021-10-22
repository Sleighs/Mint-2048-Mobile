import React, { Component, useEffect, useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'

import { useDispatch } from 'react-redux'
import store from '../redux/store'
import { getUser } from '../redux/rootReducer'

import firebase from 'firebase'

import Game from './game/Game'

import GameManager from '../js/GameManager'

const Main = (props) => {
    const dispatch = useDispatch()
    const [userCheck, setUserCheck] = useState(false);
    const [refresh, setRefresh] = useState(false)

    function fetchUser() {
        firebase.firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get()
            .then((snapshot) => {
                if (snapshot.exists){
                    console.log('user exists', { fetchUser: snapshot.data() })
                    dispatch(getUser(snapshot.data()))
                } else {
                    console.log('user does not exist')
                }
            })
    }

    useEffect(()=>{
        if (!userCheck){
            fetchUser()
            setUserCheck(true)
        }

        if (refresh) {
            setRefresh(false)
        }
    })

    return (
        <View>
            <Game 
                size={GameManager.size} 
                refresh={refresh} 
                setRefresh={setRefresh} 
                {...props}
            />
        </View>
    )
}

export default Main