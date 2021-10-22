import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions} from 'react-native'

import GameManager from '../../js/GameManager'

import Info from './Info'
import Board from './Board'

const Game = (props) => {
    const { size, refresh, setRefresh } = props

    useEffect(() => {
        if (GameManager.startNewGame === true){
            actuate('new game')
        }
        
    })

    const initGame = () => {
        // If no previous game
        GameManager.startNewGame = true;

        if (GameManager.mode !== 'speed' || 'power' || 'cash'){
            GameManager.mode = 'speed';
        }

        actuate('new game'); 
    }

    const actuate = (type) => {
        // if game over
        if (GameManager.winGame === true){
            //show win screen 
            GameManager.showWinScreen = true;
            GameManager.winCount += 1;
        } else {
            GameManager.showWinScreen = false;
        }

        // if lose game
        if (GameManager.gameOver === true){
            //show lose screen
            GameManager.showLoseScreen = true;
        } else {
            GameManager.showLoseScreen = false;
        }

        // New Game
        if (type === 'new game' && GameManager.startNewGame === true){
            getBoard(null);

            GameManager.stopTime();

            /*this.setState({
                hr: 0,
                min: 0,
                sec: 0,
                ms: 0,
                timeBegan: new Date(),
                moveCounter: 0,
                counter: 0
            });*/

            GameManager.state.hr = 0;
            GameManager.state.min = 0;
            GameManager.state.sec = 0;
            GameManager.state.ms = 0;
            GameManager.state.timeBegan = new Date();
            GameManager.state.moveCounter = 0;
            GameManager.state.counter = 0;
            
            GameManager.startTime();
        
            GameManager.gameOver = false;
            GameManager.winCount = 0;
            GameManager.showWinScreen = false;
            GameManager.showLoseScreen = false;
            GameManager.startNewGame = false;
        }

        // Undo Move
        if (type === 'undo' && GameManager.undo === true && GameManager.state.canUndo === true && GameManager.undoCount > 0 && GameManager.canUndo === true) {
            GameManager.showLoseScreen = false;
            // Get previous board list, remove most recent, update grid to previous board
            if (GameManager.state.previousBoards.length >= 2){
                var boards = [];

                for (var i = 0; i < GameManager.state.previousBoards.length; i++){
                    boards.push(GameManager.state.previousBoards[i]);
                }
                
                boards.pop();

                var board = boards[boards.length - 1];

                /*this.setState({
                    board: board,
                    previousBoards: boards,
                    cells: this.grid(board),
                    score: this.state.undoScore
                });*/

                GameManager.state.board = board;
                GameManager.state.previousBoards = boards;
                GameManager.state.cells = grid(board);
                GameManager.state.score = GameManager.state.undoScore;

                if (GameManager.undoCount < 3){
                    GameManager.combo = 0;
                    GameManager.comboBlocks = [];
                } 
            }

            GameManager.undoCount = GameManager.undoCount - 1;
            if (GameManager.undoCount === 0){
                
                /*this.setState({
                    canUndo: false
                })*/
                GameManager.state.canUndo = false
            }
            
            GameManager.undo = false;
            GameManager.gameOver = false;
            GameManager.showWinScreen = false;
            GameManager.showLoseScreen = false;            
        }

        GameManager.undoNodes = [];
        for (var a = 0; a < GameManager.undoCount; a++){
            GameManager.undoNodes.push(a);
        }
    }

    const getBoard = (data) => {
        var board = [];
        var cells = [];
        var prevBoards = [];

        // If no previous game is found, create new board
        if ((!GameManager.state.board.pop(-1) && GameManager.state.board.length < (size * size) ) || GameManager.startNewGame === true || data == null) {
            var tileType;
            var startTile1 = Math.floor(Math.random() * 16 + 1);
            var startTile2 = Math.floor(Math.random() * 16 + 1);

            // Select two beginning tile locations at random
            while (startTile1 === startTile2) {
                startTile2 = Math.floor(Math.random() * 16 + 1);
            }
            // Create new board
            var counter = 0;
            for (var x = 0; x < size; x++){
                var row = [];
                for (var y = 0; y < size; y++){
                    // Add random tiles
                    counter++;
                    if (counter === startTile1 || counter === startTile2) {
                        tileType = true;
                    } else {
                        tileType = false;
                    }   

                    // Add tile to board
                    board.push(newTile(x, y, tileType));
                    row.push(newTile(x, y, tileType));
                }
                cells.push(row);
            }
            prevBoards.push(board);

            /*this.setState({
                board: board,
                cells: this.grid(board),
                previousBoards: prevBoards,
                score: 0
            }); */
            GameManager.state.board = board;
            GameManager.state.cells = grid(board);
            GameManager.state.previousBoards = prevBoards;
            GameManager.state.score = 0;
        } else if (!data){
            getBoard(null);
        } else {
            for (var a = 0; a < size; a++){
                var row = [];
                for (var b = 0; b < size; b++){ 
                    // Add tile to board
                    board.push(data[a][b]);
                    row.push(data[a][b]);
                }
                cells.push(row);
            }
            /*this.setState({
                board: board,
                cells: cells
            });*/
            GameManager.state.board = board;
            GameManager.state.cells = cells;            
        }
    }

    const newTile = (x, y, type, num, mergedFrom, previousPosition) => {
        var randomNum = Math.floor(Math.random() * 100 + 1);  
        var tile = {
            x: x,
            y: y,
            type: false,
            num: !num ? null : num,
            mergedFrom: !mergedFrom ? null : mergedFrom,
            previousPosition: !previousPosition ? null : previousPosition
        };
    
        if (type === true){
            if (randomNum < 11){
                tile.num = 4;
            } else {
                tile.num = 2;
            }
        } 

        return tile;
    }

    const grid = (board) => {
        var cells = [];

        if ( board && board.length > size){
            // Create grid from board
            var index = 0;
            for (var x = 0; x < size; x++){
                var row = [];
                for (var y = 0; y < size; y++){
                    row.push(board[index]);
                    index++;
                }
                cells.push(row);
            }
        } else if (board && board.length === size) {
            // Create grid from grid
            for (var x = 0; x < size; x++){
                var row = [];
                for (var y = 0; y < this.props.size; y++){ 
                    row.push(newTile(board[x][y].x, board[x][y].y, false, board[x][y].num));
                }
                cells.push(row);
            }
        } else {
            // Create grid from state
            var data = GameManager.state.cells;

            for (var x = 0; x < size; x++){
                var row = [];
                for (var y = 0; y < size; y++){ 
                    row.push(newTile(data[x][y].x, data[x][y].y, false, data[x][y].num));
                }
                cells.push(row);
            }
        }

        return cells;
    }



    useEffect(() => {
        initGame()
    })

    return (
        <View style={styles.container}>
            <Info {...props}/>
            <Board {...props}/>
        </View>
    )
}   

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        maxWidth: Dimensions.get('window').width,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Game