// ==UserScript==
// @name             X.com Livestream Theater mode
// @author           intsven
// @namespace        intsven
// @description      Theater mode for x.com
// @version          0.2
// @match            https://x.com/i/broadcasts/*
// @run-at           document-start
// @downloadURL      https://github.com/intsven/TMuserscripts/raw/main/xLiveTheater.js
// @updateURL        https://github.com/intsven/TMuserscripts/raw/main/xLiveTheater.js
// @license          MIT
// @grant            none
// @require          http://localhost:8000/xLiveTheater.js
// ==/UserScript==

(function () {
    'use strict';
    function waitForElm(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }
    
            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    observer.disconnect();
                    resolve(document.querySelector(selector));
                }
            });
    
            // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        });
    }

    function enableTheaterMode() {
        if (removedHeader) {
            return;
        }
        // Find <header> with role="banner" and remove it
        const header = document.querySelector('header[role="banner"]');
        if (header) {
            header.remove();
            removedHeader = true;
        }
        else {
            console.log('No header found');
        }
        // Find div with data-testid="primaryColumn"
        const primaryColumn = document.querySelector('div[data-testid="primaryColumn"]');
        if (primaryColumn) {
            // Remove max-width from primaryColumn
            primaryColumn.style.maxWidth = 'none';
        }
        // Find <main> with role="main"
        const main = document.querySelector('main[role="main"]');
        // Find first <div> in <main> with role="main"
        const div = main?.querySelector('div');
        if (div) {
            div.style.width = '1450px';
        }
        // Get div with aria-label="Trending"
        const trending = document.querySelector('div[aria-label="Trending"]');
        // Get child div of trending
        const trendingChild = trending?.querySelector('div');
        if (trendingChild) {
            trendingChild.style.height = 'calc(-70px + 100dvh)';
        }
    };

    let removedHeader = false;
    // Wait until <button> with aria-label="Share Menu" is found
    waitForElm('button[aria-label="Share Menu"]').then((button) => {
        // Check if button already exists
        if (button.previousElementSibling?.innerText === 'THEATER') {
            return;
        }
        // Get div parent of button
        const parent = button.parentElement;
        // Create new button
        const newButton = document.createElement('button');
        newButton.setAttribute('aria-label', 'Theater mode');
        // Set inner text of new button
        newButton.innerText = 'THEATER';
        // Add click event listener to new button
        newButton.onclick = enableTheaterMode;
        // Insert new button before button
        parent.insertBefore(newButton, button);
    });
    
})();