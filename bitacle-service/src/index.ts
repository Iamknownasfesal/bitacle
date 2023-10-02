import { Root } from "./types";
import { local } from "ic0";
import "dotenv/config";

const API_LINK = process.env.COINGECKO_API_LINK || "https://api.coingecko.com/api/v3/coins/internet-computer";

async function fetchData(): Promise<Root> {
    const response = await fetch(API_LINK);

    if (!response.ok) {
        throw new Error(`Failed to fetch data from CoinGecko: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
}

async function main() {
    setInterval(async () => {
        try {
            const data = await fetchData();
            const price = data.market_data.current_price.btc;
            let canister = local(process.env.CANISTER_ID); // Change this to ic for production(mainnet)
            await canister.call("addRound", {
                value: price.toString(10),
            });
        } catch (e) {
            console.error("Error fetching or processing data from CoinGecko:", e);

        }
    }, 60000);
}

main();
