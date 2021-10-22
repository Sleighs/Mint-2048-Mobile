import React, { useEffect, useState,  } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

import GameManager from '../../js/GameManager'

const Time = (props) => {
    const {
        hours, minutes, seconds, milisec,
        startTime,
        stopTime,
        clockRunning,
    } = props

    const [gameTime, setGameTime] = useState(null)

    useEffect(() => {
        var timer;

        if (
            GameManager.state.timeState === 'running' 
            && GameManager.state.timeStarted == true
        ){
            timer = setInterval(() => {
                setGameTime(
                    (GameManager.state.hr !== 0 ? GameManager.state.hr + ':' : ' ') +
                    (GameManager.state.min < 10 ? '0' + GameManager.state.min : GameManager.state.min) + '.' +
                    (GameManager.state.sec < 10 ? '0' + GameManager.state.sec : GameManager.state.sec)  
                )
            })
        } 
        
        if ( timer && GameManager.state.timeStarted === false) {
            return () => clearInterval(timer)
        }
    })

    return (
        <View>
            <Text>{gameTime}</Text>
        </View>
    )
}

const Score = (props) => {

    const {
        score, bestScore
    } = props
    
    return (
        <View>
            <View style={styles.scoreContainer}>
                <View>
                    <Text>{score}</Text>
                    <Text>Score</Text>
                </View>
            </View>
            <View style={styles.bestScoreContainer}>
                <View>
                    <Text>{bestScore}</Text>
                    <Text>Best Score</Text>
                </View>
            </View>
        </View>
    )
}

const Buttons = (props) => { 
    
    return (
        <View>
            
        </View>
    )
}

const Info = (props) => {
    const { 
        size
    } = props

    return (
        <View style={styles.infoContainer}>
            
            <View>
                <Time 
                    hours={GameManager.state.hr}
                    minutes={GameManager.state.min} 
                    seconds={GameManager.state.sec} 
                    milisec={GameManager.state.ms}
                />
            </View>
            <View style={styles.gameTitleStyle} onClick={()=> console.log('openMenu')}>
                <Text style={styles.titleStyle}>{"mint"}</Text>
            </View>
            <View style={styles.infoBtns}>
                <Score {...props}
                    score={GameManager.state.score} 
                    bestScore={GameManager.state.bestScore}
                />
                <Buttons {...props}
                    pressed={false} 
                    newGame={this.props.newGame} 
                    undo={this.props.undo}
                />
            </View>
            
        </View>
    )
}   

const styles = StyleSheet.create({
    infoContainer: {
        flexDirection: 'row',
        flexWrap: "wrap",
        width: '100%',
        height: 168,
        margin: 'auto',
        padding: '4px 0',
        fontSize: '2em',
        maxWidth: Dimensions.get('window').width * .95,
    },   
    gameTitleStyle: {

    },
    titleStyle: {

    },
    infoBtns: {

    },
    scoreContainer: {

    },
    bestScoreContainer: {

    },
})

export default Info