import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

import GameManager from '../../js/GameManager'

const getColor = (ele, num) => {
    var backgroundColor = '#cdc1b4';
    var textColor = '#F4FEF9';

    //Mint Colors
    switch (num){
        case null:
            backgroundColor = '#cdc1b4';
            textColor = '#cdc1b4';
            break;
        case 2:
            backgroundColor = 'rgb(238,228,218, .9)';//'#eee4da';
            textColor = '#775e65';
            break;
        case 4:
            backgroundColor = 'rgb(252, 127, 127, .9)';//'#FC7F7F';
            textColor = '#F4FEF9';
            break;
        case 8:
            backgroundColor = 'rgb(141, 203, 149)'; //'#8DCB95';
            textColor = '#F4FEF9';
            break;
        case 16:
            backgroundColor = 'rgb(93, 180, 143)';//'#5DB48F';
            textColor = '#F4FEF9';
            break;
        case 32:
            backgroundColor = 'rgb(67, 177, 155)';//'#43B19B';
            textColor = '#F4FEF9';
            break;
        case 64:
            backgroundColor = 'rgb(36, 142, 120)';//'#248E78';
            textColor = '#F4FEF9';
            break;
        case 128:
            backgroundColor = 'rgb(102, 204, 185)';//'#66CCB9';
            textColor = '#F4FEF9';
            break;
        case 256:
        case 512:
        case 1024:
            backgroundColor = 'rgb(146, 218, 180)';//'#92DAB4';
            textColor = '#F4FEF9';
            break;
        case 2048:
        case 4096:
            backgroundColor = '#edcc61';
            textColor = '#F4FEF9';
            break;
        case 8192:
            backgroundColor = '#58AD9C';
            textColor = '#F4FEF9';
            break;
        case 16384:
            backgroundColor = '#58AD9C';
            textColor = '#F4FEF9';
            break;  
        default:
            backgroundColor = '#385B78';
            textColor = '#F4FEF9';
    }

/*
    //Original 2048 colors
    switch (this.props.number){
        case null:
            backgroundColor = '#cdc1b4';
            textColor = '#cdc1b4';
            break;
        case 2:
            backgroundColor = '#eee4da';
            textColor = '#775e65';
            break;
        case 4:
            backgroundColor = '#ede0c8';
            textColor = '#775e65';
            break;
        case 8:
            backgroundColor = '#f2b179';
            textColor = 'white';
            break;
        case 16:
            backgroundColor = '#f59563';
            textColor = 'white';
            break;
        case 32:
            backgroundColor = '#f67c5f';
            textColor = 'white';
            break;
        case 64:
            backgroundColor = '#f65e3b';
            textColor = 'white';
            break;
        case 128:
            backgroundColor = '#edcf72';
            textColor = 'white';
            break;
        case 256:
        case 512:
        case 1028:
        case 2048:
            backgroundColor = '#edcc61';
            textColor = 'white';
            break;
        default:
            backgroundColor = 'darkgrey';
            textColor = '#cdc1b4';
    }*/

    if (ele === 'background') {
        return backgroundColor;
    } else if (ele === 'text'){
        return textColor;
    }
}

const Tile = (props) => {
    const { board, number } = props

    const getTileMargin = (size) => {
        var margin = '1px';

        switch(size){
            case 4:
                margin = '7px';
                break;
            case 5:
                margin = '5.8px';
                break;
            case 6:
                margin = '4.8px';
                break;
            case 7:
                margin = '2px';
                break;
        };

        return margin;
    }

    const getPowerShadow = () => {
        //
        var powerColor = '';
        var tile = board[GameManager.currentPowerTile];

        if (GameManager.navPowerTiles === true){
            if (tile.x === this.props.x && tile.y === this.props.y){
                switch(GameManager.activePower.type) {
                    case 'multiply':
                        powerColor = '1px 1px 5px 11px ' + 'rgb(110, 212, 117, .7)';
                        break;
                    case 'divide':
                        powerColor = '1px 1px 5px 11px ' + 'rgb(226,99,105, .7)';
                        break;
                    case 'two tile':
                        powerColor = '1px 1px 5px 11px ' + 'rgb(146,218,180, .7)';
                        break;
                    case 'four tile':
                        powerColor = '1px 1px 5px 11px ' + 'rgb(230,234,240, .7)';
                        break;
                    case 'freeze':
                        powerColor = '1px 1px 5px 11px ' + 'rgb(146,218,180, .7)';
                        break;
                    default:
                        powerColor = ''
                }
            } 
        }
        return  powerColor;
    }
    let tileStyle = {
        margin: getTileMargin(GameManager.size),
        backgroundColor: getColor('background', number),
        //color: getColor('text', number),
        boxShadow: !GameManager.navPowerTiles ? '' : getPowerShadow()
    }

    return (
        <View className={'tile'} style={[styles.tile, tileStyle]} onClick={()=>{
            if (GameManager.navPowerTiles){
                //this.props.useAbility(GameManager.activePower.type, GameManager.activePower.count);
                //this.props.changeTile(GameManager.activePower.type, GameManager.abilityTile.x, GameManager.abilityTile.y, GameManager.activePower.count)
            }
        }}>
            <Number number={number !== null ? number : null} {...props}/>
        </View>
    )
    
}

const Number = (props) => {
    const { number , color} = props
   
    const getFontSize = (size, number) => {
        var fontSize = '1em';

        switch(size){
            case 1:
            case 2:
            case 3:
                fontSize = '3.5em';
                break;
            case 4:
                fontSize = '2.81em';
                
                if (number > 100 && number < 1000) {
                    fontSize = '2.15em';
                } else if (number > 1000 && number < 10000) {
                    fontSize = '1.85em';
                } else if (number > 10000 && number < 100000) {
                    fontSize = '1.05em';
                } else if (number > 100000 && number < 1000000) {
                    fontSize = '0.8em';
                }
                break;
            case 5:
                fontSize = '2em';
                break;
            case 6:
                fontSize = '1em';
                break;
        }

        return fontSize;
    }
    const getMargin = (num) => {
        var margin = '11%';
        switch(num){
            case 16:
            case 32:
            case 64:
                margin = '11%';
                break;
            case 128:
            case 256:
            case 512:
                margin = '23%';
                break;
            case 1024:
            case 2048:
            case 4096:
            case 8192:
                margin = '-16%';
                break;
            case 16384:
            case 32768:
            case 65536:
                margin = '4.5%';
                break;
            case 131072:
            case 262144:
                margin = '49%';
                break;
        }
        return margin;
    }

    const getPadding = (num) => {
        var padding = '';
        switch(num){
            case 1024:
            case 2048:
            case 4096:
            case 8192:
                padding = '45.5% 0px 0px 0px'
                break;
            case 16384:
            case 32768:
            case 65536:
                padding = '43% 0px 0px 0px';
                break;
            default:
                padding = '0 0 0 0';
        }

        return padding;
    }
    let numContainerStyle = {
        justifyContent: 'center',
        alignItems: 'center',
    }
    let numStyle = {
        fontFamily: 'arial',
        fontWeight: 'bold',
        width: '90%',
        height: '90%',
        textAlign: 'center',
        marginTop: getMargin(number),
        padding: getPadding(number),
        textShadow: number !== null ? '0px 0px 0px #bbada0' : '0px 0px 0px #cdc1b4',
        fontSize: getFontSize(GameManager.size, number),
        color: getColor('text', number),
    }
    return (
        <View style={numContainerStyle}>
            <Text style={numStyle}>
                {number !== null ? number : '0'}
            </Text>
        </View>
    )
    
}

const Board = (props) => {
    const { size } = props

    const board = GameManager.state.board

    return (
        <View style={styles.board}>
            {board.map((tile, i)=>{
                return (
                    <Tile 
                        number={!tile.num ? null : tile.num } 
                        key={i} 
                        board={board} 
                        x={board[i].x} 
                        y={board[i].y} 
                        //useAbility={useAbility} 
                        //changeTile={changeTile}
                    />
                )
            })}
        </View>
    )
}   

const styles = StyleSheet.create({
    board: {
        flexDirection: 'row',
        flexWrap: "wrap",
        width: '100%',
        height: Dimensions.get('window').width * .95,
        margin: '10px auto',
        padding: '.5%',
        borderRadius: 5,
        backgroundColor: '#bbada0',
        boxShadow: !GameManager.navPowerTiles ? '' : '1px 1px 5px 11px rgb(255,225,100,.5)',
        maxWidth: Dimensions.get('window').width * .95,
    },
    
    tile: {
        height: ((Dimensions.get('window').width * .93) / GameManager.size) * .85,
        width: ((Dimensions.get('window').width * .93) / GameManager.size) * .85,
        borderRadius: 7,
        display: 'inline-block',
        userSelect: 'none',
    }
        
})

export default Board