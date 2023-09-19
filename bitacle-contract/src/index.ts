// Made for the Internet Computer and Dacade Course
// A AggregatorV3Interface(which is ChainLink) like contract.
// This contract is used to get the BTC -> ICP currency exchange rate.
// The contract is deployed on the IC and the BTC -> ICP exchange rate is updated every 10 minutes.

import {
  $query,
  $update,
  Record,
  StableBTreeMap,
  match,
  Result,
  nat64,
  ic,
  Opt,
} from "azle";
import { v4 as uuidv4 } from "uuid";

type Round = Record<{
  roundId: string;
  value: string;
  updatedAt: nat64;
}>;

type RoundPayload = Record<{
  value: string;
}>;

let roundStorage = new StableBTreeMap<string, Round>(0, 44, 1024);
let latestRound: string = "";

$query;
export function getLatestRound(): Result<Opt<Round>, string> {
  return Result.Ok(roundStorage.get(latestRound));
}

$query;
export function getRound(id: string): Result<Round, string> {
  return match(roundStorage.get(id), {
    Some: (round) => Result.Ok<Round, string>(round),
    None: () => Result.Err<Round, string>(`Round with ${id} not found.`),
  });
}

$update;
export function addRound(payload: RoundPayload): Result<Round, string> {
  const round: Round = { roundId: uuidv4(), updatedAt: ic.time(), ...payload };
  roundStorage.insert(round.roundId, round);
  latestRound = round.roundId;
  return Result.Ok(round);
}

globalThis.crypto = {
  // @ts-ignore
  getRandomValues: () => {
    let array = new Uint8Array(32);

    for (let i = 0; i < array.length; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }

    return array;
  },
};
