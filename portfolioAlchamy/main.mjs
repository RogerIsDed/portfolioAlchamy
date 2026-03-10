const baseURL = "https://alchemy-kd0l.onrender.com";
const startURL = `${baseURL}/start`;
const statusURL = `${baseURL}/status`;
const submitURL = `${baseURL}/submit`;

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
    6:
};

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
    console.log(data.message);
}

async function start() {
    const res = await fetch(startURL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userConfig)
    });

    const data = await res.json();
    token = data.token;

    console.log("Token:", token);

    const challengeId = await getStatus();

    if (answers[challengeId]) {
        await submitAnswer(answers[challengeId]);
        await getStatus();
    } else {
        console.log("No stored answer for this challenge yet.");
    }
}

start();