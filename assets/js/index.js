// IDEAL IMPROVEMENTS
// disable player clicks until AI player moves (otherwise it is possible for player to make extra moves in between and comments on your hit are too quickly replaced with comments when AI hits)
// make AI player keep clicking surrounding spot where a ship has been found and not fully uncovered
// fix whatever is wrong with AA code where you can't change the ship array without the game acting weird
// add ship placement stage
// allow two human players
// refactor messy code

import Board from "./board.js";
import { AiPlayer } from "./ai-player.js";

window.onload = () => {
    const angryAlienComments = ["👽 You will pay for that, human!", "👽 A small loss.", "🤖 BLEEP BLOOP BLORP", "🤖 MY MAS-TERS WILL NOT TAKE THIS LIGHT-LY.", "👽 DESIST! Meddlesome beast!", "👽 Mother bought me that ship...", "👽 [infuriated static]"];
    const gladAlienComments = ["👽 A fine hit.", "👽 HAHAHAHAAAGHhhh! ...ahem.","👽 The vastness of our empire is beyond your comprehension.", "👽 You cannot win. Mars will be ours."];
    const h2 = document.querySelector("h2");
    const p = document.querySelector(".reset-p");
    const humanBoardDiv = document.querySelector(".human-board-div");
    const aiBoardDiv = document.querySelector(".ai-board-div");

    const startGame = () => {
        let won = false;
        let humanBoard = new Board();
        let aiBoard = new Board();
        const aiPlayer = new AiPlayer(aiBoard.grid);

        let humanGrid = humanBoard.grid;
        humanBoardDiv.innerHTML = "";
        h2.innerHTML = "";
        p.style.visibility = "hidden";

        let aiGrid = aiBoard.grid;
        aiBoardDiv.innerHTML = "";

        aiGrid.forEach((arr, index) => {
            arr.forEach((el, elIindex) => {
                const div = document.createElement("div");
                div.setAttribute("class", "baby-div")
                div.setAttribute("data-value", `${index},${elIindex}`);
                aiBoardDiv.appendChild(div);
            });
        });

        humanGrid.forEach((arr, index) => {
            arr.forEach((el, elIindex) => {
                const div = document.createElement("div");
                div.setAttribute("class", "baby-div")
                div.setAttribute("data-value", `${index},${elIindex}`);

                const clickSpace = () => {
                    if (!won) {
                        const rowCol = div.getAttribute("data-value");
                        const isHit = humanBoard.makeHit(rowCol[0], rowCol[2]);

                        if (isHit === null) {
                            div.style.backgroundColor = "rgba(117, 141, 82, .3)";
                        } else {
                            if (!div.classList.contains("hit")) {
                                div.classList.add("hit");
                                div.innerText = "💥";
                                setTimeout(() => {
                                    div.innerText = isHit;
                                },100);

                                if (humanBoard.isGameOver()) {
                                    h2.innerText = "👽 CURSES!!! You win this day, human!";
                                    h2.style.color = "red";
                                    p.style.visibility = "visible";
                                    won = true;
                                } else {
                                    const randNum = Math.floor(Math.random() * angryAlienComments.length);
                                    h2.innerText = angryAlienComments[randNum];
                                }
                            }
                        }
                        // AI PLAYER
                        const aiMove = aiPlayer.getMove(aiGrid);
                        const isAiHit = aiBoard.makeHit(aiMove[0], aiMove[2]);
                        const thisDiv = aiBoardDiv.querySelector(`[data-value="${aiMove[0]},${aiMove[2]}"]`);
                        setTimeout(() => {
                            if (isAiHit === null) {
                                thisDiv.style.backgroundColor = "rgba(117, 141, 82, .3)";
                            } else {
                                if (!thisDiv.classList.contains("hit")) {
                                    thisDiv.classList.add("hit");
                                    thisDiv.innerText = "💥";
                                    setTimeout(() => {
                                        thisDiv.innerText = isAiHit;
                                    },100);

                                    if (aiBoard.isGameOver()) {
                                        h2.innerText = "👽 HAHA, VICTORY! Your puny red planet is ours!";
                                        h2.style.color = "red";
                                        p.style.visibility = "visible";
                                        won = true;
                                    } else {
                                        const randNum = Math.floor(Math.random() * gladAlienComments.length);
                                        h2.innerText = gladAlienComments[randNum];
                                    }
                                }
                            }
                        }, 200);
                    }
                };

                div.addEventListener("click", clickSpace);
                humanBoardDiv.appendChild(div);
            });
        });
    };

    startGame();

    // reset
    const resetText = document.querySelector(".reset-text");
    const resetShip = document.querySelector(".reset-ship")

    function resetHover() {
        resetText.style.color = "rgb(137, 204, 38)";
    }
    function resetUnhover() {
        resetText.style.color = "rgb(184, 183, 183)";
    }
    function resetActive() {
        resetShip.innerText = "🚀";
        resetText.innerText = "BLASTOFF!";
        resetText.style.right = "465px";
        resetText.style.color = "#f92f60";
    }
    function resetRestore() {
        resetShip.innerText = "🛸";
        resetText.innerText = "reset";
        resetText.style.right = "497px";
        resetText.style.color = "rgb(184, 183, 183)";
    }
    function resetClick() {
        startGame();
    }
    resetShip.addEventListener("mouseover", resetHover);
    resetText.addEventListener("mouseover", resetHover);

    resetShip.addEventListener("mouseout", resetUnhover);
    resetText.addEventListener("mouseout", resetUnhover);

    resetShip.addEventListener("mousedown", resetActive);
    resetText.addEventListener("mousedown", resetActive);

    resetShip.addEventListener("mouseup", resetRestore);
    resetText.addEventListener("mouseup", resetRestore);

    resetShip.addEventListener("click", resetClick);
    resetText.addEventListener("click", resetClick);
}

// example grid:
// [null,    3, null, null, null, null, null, null, null]
// [null,    3, null, null, null, null, null, null, null]
// [null,    3,    3, null, null, null, null, null, null]
// [null, null,    3, null,    5,    5,    5,    5,    5]
// [null, null,    3, null, null, null, null, null, null]
// [null,    4, null, null, null, null, null, null, null]
// [null,    4, null, null, null, null, null, null, null]
// [null,    4, null, null, null, null, null, null,    2]
// [null,    4, null, null, null, null, null, null,    2]
