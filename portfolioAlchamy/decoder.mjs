// decoder.mjs

export function buildKeyAlphabet() {
    const key = "QFMBTHLCZPRSKVJXDGUWOYAEIN";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // remove duplicates and append missing letters
    let result = "";

    for (const char of key + alphabet) {
        if (!result.includes(char)) {
            result += char;
        }
    }

    return result;
}

export function decodeCipher(text) {
    const cipherAlphabet = buildKeyAlphabet();
    const plainAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let decoded = "";

    for (const char of text) {
        if (plainAlphabet.includes(char)) {
            const index = cipherAlphabet.indexOf(char);
            decoded += plainAlphabet[index];
        } else {
            decoded += char;
        }
    }

    return decoded;
}

export function decodeNote() {
    const cipherText = `UZSYTG MJXXTG
LJSB STQB`;

    return decodeCipher(cipherText);
}