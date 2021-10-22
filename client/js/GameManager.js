var GameManager = {
    size: 4,
    mode: '',
    startNewGame: false,
    undo: false,
    canUndo: true,
    undoCount: 0,
    undoNodes: [],
    direction: '',
    showMenu: false,
    colorScheme: 'mint',
    moved: false,
    winGame: false,
    winCount: 0,
    gameOver: false,
    showWinScreen: false,
    showLoseScreen: false,
    abilities: [],
    gameType: 'mint',
    powers: [
      { 
        type: 'multiply',
        count: 0,
        color: 'rgb(110, 212, 117)'//''#6ED475'
      },
      { 
        type: 'divide',
        count: 0,
        color:'#E26369' //rgb(226,99,105)
      },
      { 
        type: 'four tile',
        count: 0,
        color: '#e6eaf0' //rgb(230,234,240)
      },
      {
        type: 'two tile',
        count: 0,
        color: '#92DAB4' //rgb(146,218,180)
      },
      {
        type: 'freeze',
        count: 0,
        color: '#7AB5D5'
      },
      {
        type: 'grow',
        count: 0,
        color: '#58AD9C' //rgb(88, 173, 156)
      }
    ],
    currentAbility: '',
    currentAbilityId: '',
    abilityTile: null,
    combo: 0,
    comboBlocks: [],
    bestCombo: 0,
    powersModeOn: true,
    choosePowers: false,
    powerSelection: null,
    currentPower: 1,
    powersCount: 0,
    currentPowerTile: 0,
    activePower: null,
    navPowerTiles: false,
    tooltip: '',
    newGame: false,
    swipeMove: false,
    swipeDirection: null
  };
  
  GameManager.state = {
    //Game
    board: [],
    previousBoards: [],
    cells: [],
    savedGame: false,
    turnCount: 0,
    score: 0,
    bestScore: 0,
    menuVisible: false,
    undo: false,
    canUndo: false,
    undoScore: 0,
    margeAnim: false,
    moveCounter: 0,
    
    //Timer
    hr: 0,
    min: 0,
    sec: 0,
    ms: 0,
    timeStarted: false,
    timeBeganMaster: null,
    timeBegan: null, 
    timeStopped: null,
    stoppedDuration: 0, 
    masterTime: null,
    started: null,
    timeState: "new",
    interval: null
  }

  // Time Functions
  GameManager.startTime = function(){
    console.log('clock started')
    
    if (GameManager.state.timeBegan === null) {
        /*this.setState({
            timeBegan: new Date(),
            timeBeganMaster: this.state.timeBegan
        });    */   
        GameManager.state.timeBegan = new Date();
        GameManager.state.timeBeganMaster = GameManager.state.timeBegan; 
    }
    

    if (GameManager.state.timestopped !== null) {
        /*this.setState({
            stoppedDuration: this.state.stoppedDuration + (new Date() - this.state.timeStopped)
        });*/
        GameManager.stoppedDuration = GameManager.state.stoppedDuration + (new Date() - GameManager.state.timeStopped)

    }

    /*this.setState({
        timeState: 'running',
        timeStarted: true
    });*/
    GameManager.state.timeState = 'running';
    GameManager.state.timeStarted = true;

    GameManager.interval = setInterval(() => {GameManager.clockRunning()}, 100); 
}
GameManager.stopTime = function(){
    return clearInterval(GameManager.interval);
}
GameManager.clockRunning = function(){
    var currentTime = new Date();
    var timeElapsed = new Date(currentTime - GameManager.state.timeBegan);

    /*this.setState({
        hr: timeElapsed.getUTCHours(),
        min: timeElapsed.getUTCMinutes(),
        sec: timeElapsed.getUTCSeconds(),
        ms: timeElapsed.getUTCMilliseconds()
    });   */

    GameManager.state.hr = timeElapsed.getUTCHours()
    GameManager.state.min = timeElapsed.getUTCMinutes()
    GameManager.state.sec = timeElapsed.getUTCSeconds()
    GameManager.state.ms = timeElapsed.getUTCMilliseconds()
}


  export default GameManager;