const baseURL = "https://alchemy-kd0l.onrender.com";
const startURL = `${baseURL}/start`;
const statusURL = `${baseURL}/status`;
const submitURL = `${baseURL}/submit`;
const clueURL = `${baseURL}/clue`;

let token = null;

const userConfig = {
    "email": "oliversto@uia.no",
    "nick": "RogerIsDed",
    "pin": "4200"
};

let respons = await (await fetch(startURL, {
    body: JSON.stringify(userConfig),
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
})).json();

token = respons.token;

console.log(token);
console.log(startURL);

respons = await (await fetch(submitURL, {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": token,
    }
})).json();

console.log(respons);


