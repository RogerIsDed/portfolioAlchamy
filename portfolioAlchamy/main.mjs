import { decodeNote } from "./decoder.mjs";

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
        // Start session
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
            console.log("Failed to get token.");
            return;
        }

        console.log("Token:", token);

        // Get challenge status
        const challengeId = await getStatus();

        // Run decoder locally for debugging
        console.log("\nDecoded note locally:");
        console.log(decodeNote());

        // Submit answer if we have one stored
        if (answers[challengeId]) {
            console.log("\nSubmitting answer:", answers[challengeId]);
            await submitAnswer(answers[challengeId]);
            await getStatus();
        } else {
            console.log("No stored answer for this challenge yet.");
        }

        // Fetch a clue
        await getClue();

    } catch (error) {
        console.error("Error during start:", error);
    }
}
start();