
export const metalData = {
    gold: { planet: "Sun", symbol: "☉" },
    silver: { planet: "Moon", symbol: "☽" },
    copper: { planet: "Venus", symbol: "♀" },
    iron: { planet: "Mars", symbol: "♂" },
    tin: { planet: "Jupiter", symbol: "♃" },
    lead: { planet: "Saturn", symbol: "♄" },
    mercury: { planet: "Mercury", symbol: "☿" },
    quicksilver: { planet: "Mercury", symbol: "☿" }
};



export function metalToPlanet(metal) {
    const entry = metalData[metal.toLowerCase()];
    return entry ? entry.planet : null;
}



export function metalToSymbol(metal) {
    const entry = metalData[metal.toLowerCase()];
    return entry ? entry.symbol : null;
}


export function planetToMetal(planet) {
    planet = planet.toLowerCase();

    for (const metal in metalData) {
        if (metalData[metal].planet.toLowerCase() === planet) {
            return metal;
        }
    }

    return null;
}



export function symbolToMetal(symbol) {
    for (const metal in metalData) {
        if (metalData[metal].symbol === symbol) {
            return metal;
        }
    }

    return null;
}




export function metalsToPlanets(metals) {
    return metals.map(m => metalToPlanet(m));
}



export function metalsToSymbols(metals) {
    return metals.map(m => metalToSymbol(m));
}



export function symbolsToMetals(symbolString) {
    const metals = [];

    for (const symbol of symbolString) {
        const metal = symbolToMetal(symbol);
        if (metal) {
            metals.push(metal);
        }
    }

    return metals;
}



export function symbolsToPlanets(symbolString) {
    const metals = symbolsToMetals(symbolString);
    return metals.map(m => metalToPlanet(m));
}