import { decodeNote } from "./decoder.mjs";
import {
    metalsToPlanets,
    metalsToSymbols,
    symbolsToMetals,
    symbolsToPlanets
} from "./alchemy.mjs";

const baseURL = "https://alchemy-kd0l.onrender.com";
const startURL = `${baseURL}/start`;
const statusURL = `${baseURL}/status`;
const submitURL = `${baseURL}/submit`;
const clueURL = `${baseURL}/clue`;

let token = null;
let promptShown = false;

const userConfig = {
    email: "oliversto@uia.no",
    nick: "RogerIsDed",
    pin: "4200"
};

const answers = {
    1: "4",
    2: "pi",
    3: "GoldQuicksilverSilverIronGold",
    4: "silver",
    5: "ANDORNOTXORANDNAND",
    6: "LUNAVENUSSOL" 
};
//SILVERCOPPERGOLDLEAD
async function getStatus() {
    const res = await fetch(statusURL, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": token
        }
    });

    const data = await res.json();

    if (!promptShown) {
        console.log("\nChallenge:", data.challengeId);
        console.log(data.prompt);
        promptShown = true;
    }

    console.log("Score:", data.currentScore);

    return data.challengeId;
}

async function submitAnswer(answer) {
    const res = await fetch(submitURL, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ answer })
    });

    const data = await res.json();
    console.log("Answer response:", data.message);
}

async function getClue() {
    const res = await fetch(clueURL, {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": token
        }
    });

    const data = await res.json();
    console.log("\n🔎 CLUE:");
    console.log(data.clue);
}

async function start() {
    try {

    
        const res = await fetch(startURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userConfig)
        });

        const data = await res.json();

        console.log("Start response:", data);

        token = data.token;

        if (!token) {
            console.log("No token received. Server might be asleep.");
            return;
        }

        console.log("Token:", token);

        
        const challengeId = await getStatus();

        
        const decoded = decodeNote();

        console.log("\nDecoded message:");
        console.log(decoded);

        
        const metals = decoded
            .replace(/\n/g, " ")
            .toLowerCase()
            .split(" ");

        console.log("\nMetals detected:");
        console.log(metals);

        
        const planets = metalsToPlanets(metals);
        const symbols = metalsToSymbols(metals);

        console.log("\nPlanet associations:");
        console.log(planets);

        console.log("\nAlchemy symbols:");
        console.log(symbols);

        
        const symbolString = symbols.join("");

        console.log("\nSymbol string:");
        console.log(symbolString);

        
        if (answers[challengeId]) {
            console.log("\nSubmitting answer:", answers[challengeId]);

            await submitAnswer(answers[challengeId]);

            await getStatus();
        } else {
            console.log("No stored answer for this challenge yet.");
        }

        
        await getClue();

    } catch (error) {
        console.error("Error during start:", error);
    }
}
start();