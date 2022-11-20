/* // this a subset of the features that Tom Clancy's Rainbow Six: Siege events provides - however,
// when writing an app that consumes events - it is best if you request
// only those features that you want to handle.
//
// NOTE: in the future we'll have a wildcard option to allow retrieving all

const { set } = require("mongoose");


// features
var g_interestedInFeatures = [
  'game_info',
  'match',
  'roster',
  'kill',
  'death',
  'match_info',
  'defuser',
  'me'
];

var onErrorListener,onInfoUpdates2Listener,	onNewEventsListener;


function registerEvents() {

  onErrorListener = function(info) {
    console.log("Error: " + JSON.stringify(info));
  }
  
  onInfoUpdates2Listener = function(info) {
    console.log("Info UPDATE: " + JSON.stringify(info));
  }
  
  onNewEventsListener = function(info) {
    console.log("EVENT FIRED: " + JSON.stringify(info));
  }

  // general events errors
  overwolf.games.events.onError.addListener(onErrorListener);
  
  // "static" data changed (total kills, username, steam-id)
  // This will also be triggered the first time we register
  // for events and will contain all the current information
  overwolf.games.events.onInfoUpdates2.addListener(onInfoUpdates2Listener);									
  // an event triggerd
  overwolf.games.events.onNewEvents.addListener(onNewEventsListener);
}

function unregisterEvents() {
    overwolf.games.events.onError.removeListener(onErrorListener);
  overwolf.games.events.onInfoUpdates2.removeListener(onInfoUpdates2Listener);
    overwolf.games.events.onNewEvents.removeListener(onNewEventsListener);
}

function gameLaunched(gameInfoResult) {
  if (!gameInfoResult) {
    return false;
  }

  if (!gameInfoResult.gameInfo) {
    return false;
  }

  if (!gameInfoResult.runningChanged && !gameInfoResult.gameChanged) {
    return false;
  }

  if (!gameInfoResult.gameInfo.isRunning) {
    return false;
  }

  // NOTE: we divide by 10 to get the game class id without it's sequence number
  if (Math.floor(gameInfoResult.gameInfo.id/10) != 10826) {
    return false;
  }

  console.log("Tom Clancy's Rainbow Six: Siege Launched");
  return true;

}

function gameRunning(gameInfo) {

  if (!gameInfo) {
    return false;
  }

  if (!gameInfo.isRunning) {
    return false;
  }

  // NOTE: we divide by 10 to get the game class id without it's sequence number
  if (Math.floor(gameInfo.id/10) != 10826) {
    return false;
  }

  console.log("Tom Clancy's Rainbow Six: Siege running");
  return true;

}


function setFeatures() {
  overwolf.games.events.setRequiredFeatures(g_interestedInFeatures, function(info) {
    if (info.status == "error")
    {
      //console.log("Could not set required features: " + info.reason);
      //console.log("Trying in 2 seconds");
      window.setTimeout(setFeatures, 2000);
      return;
    }

    console.log("Set required features:");
    console.log(JSON.stringify(info));
  });
}


// Start here
overwolf.games.onGameInfoUpdated.addListener(function (res) {
  if (gameLaunched(res)) {
    unregisterEvents();
    registerEvents();
    setTimeout(setFeatures, 1000);
  }
  console.log("onGameInfoUpdated: " + JSON.stringify(res));
});

overwolf.games.getRunningGameInfo(function (res) {
  if (gameRunning(res)) {
    registerEvents();
    setTimeout(setFeatures, 1000);
  }
  console.log("getRunningGameInfo: " + JSON.stringify(res));
});

overwolf.games.events.onNewEvents.addListener(function (res) {
  const REsong = new Audio('Speakeasy.mp3')
  const MEsong = new Audio('rl.mp3')
  if (gameRunning(res)) {
    registerEvents();
    setTimeout(setFeatures, 1000)
  }

  if (res.name == 'roundEnd') {
    REsong.play()
  }

  if (res.name == 'roundStart') {
    REsong.pause()
    REsong.currentTime = 0;
  }

  if (res.name == 'matchEnd') {
    REsong.pause()
    REsong.currentTime = 0;
    MEsong.play()
  }
})
*/
const REsong = new Audio('Speakeasy.mp3')
const MEsong = new Audio('rl.mp3')
overwolf.games.events.setRequiredFeatures(['roundEnd', 'roundStart', 'matchEnd', 'matchStart'], function (info) {
  document.getElementById('texthere').innerText += 'Set Features'
})

overwolf.games.events.onNewEvents.addListener(function(info) {
  console.log('EVENT FIRED: ' + JSON.stringify(info));
  document.getElementById('texthere').innerText = JSON.stringify(info)
  if (info.events.name == 'roundEnd') {
    if (res.name == 'roundEnd') {
      REsong.load()
      REsong.play()
    }
  
    if (res.name == 'roundStart') {
      REsong.pause()
      REsong.currentTime = 0;
    }
  
    if (res.name == 'matchEnd') {
      REsong.pause()
      REsong.currentTime = 0;
      MEsong.play()
    }
  }
});

function fortset() {
  document.getElementById('texthere').innerText += 'Set Features'
  REsong.load()
  REsong.play()
}

