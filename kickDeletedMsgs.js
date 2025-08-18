// ==UserScript==
// @name             Kick Keep Deleted Messages
// @author           intsven
// @namespace        intsven
// @description      Keep deleted messages in Kick chat
// @version          0.1
// @match          https://kick.com/*
// @run-at           document-start
// @downloadURL      https://github.com/intsven/TMuserscripts/raw/main/kickDeletedMsgs.js
// @updateURL        https://github.com/intsven/TMuserscripts/raw/main/kickDeletedMsgs.js
// @license          MIT
// @grant            none
// ==/UserScript==

// Check if sockets already exist
const sockets = [];
const nativeWebSocket = window.WebSocket;
const version = '14';
if (!sockets) {
    const sockets = [];
}
if (!nativeWebSocket) {
    const nativeWebSocket = window.WebSocket;
}
if (!version) {
    const version = '14';
}

window.WebSocket = function(...args){
    const socket = new nativeWebSocket(...args);
    sockets.push(socket);
    console.log('WSHook args:', args);
    const url = args[0];
  
    console.log('WSHook version:', version);
    // append function to the socket onmessage event
    //socket.onmessage.
    
    return socket;
};
setTimeout(() => {
    // or create a button which, when clicked, does something with the sockets
    console.log(sockets);
    for (const socket of sockets) {
        const oldOnMessage = socket.onmessage;
        socket.onmessage = function(event) {
            //console.log('WSHook onmessage:', event);
            try {
                WSHookMessage(event);
            } catch (error) {
                console.info('WSHook error:', error);
            }
            if (oldOnMessage) {
                oldOnMessage.bind(this)(event);
            }
        }
    } 
}, 5000);



function WSHookMessage(event) {
    const eventUrl = event.target.url;
    console.log('WSHook eventUrl:', eventUrl);
};