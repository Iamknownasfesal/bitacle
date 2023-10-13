import { Root } from "./types";
import { local } from "ic0";
import "dotenv/config";

const API_LINK =
    process.env.COINGECKO_API_LINK ||
    "https://api.coingecko.com/api/v3/coins/internet-computer";

async function fetchData(): Promise<Root> {
    const response = await fetch(API_LINK);

    if (!response.ok) {
        throw new Error(
            `Failed to fetch data from CoinGecko: ${response.statusText}`,
        );
    }

    const data = await response.json();

    return data;
}

async function execute() {
    try {
        const data = await fetchData();
        const price = data.market_data.current_price.btc;
        let canister = local(process.env.CANISTER_ID); // Change this to ic for production(mainnet)
        await canister.call("addRound", price.toString(10));
    } catch (e) {
        console.error(
            "Error fetching or processing data from CoinGecko\nOr Error while calling addRound function:\n",
            e,
        );
    }
}

async function main() {
    console.log("Starting Bitacle Service...");
    await execute();
    setInterval(execute, 60000);
}

main();
