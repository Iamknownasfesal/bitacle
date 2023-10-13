# bitacle

Bitacle is a ICP Canister(which is not online right now), which made for Dacade's Course.

This contract is used to get the 1 ICP -&gt; BTC currency exchange rate.

## Packages Used

- Ic0
- Azle
- @dfinity

## **Prerequisites**

- [Node.js](https://nodejs.org/en) (v16 or later)
- [DFX](https://internetcomputer.org/docs/current/references/cli-reference/dfx-parent) (v0.14.0 or later)

## **Installation**

1. Clone the repository:

   git clone [https://github.com/iamknownasfesal/bitacle](https://github.com/Iamknownasfesal/bitacle).git

2. Install dependencies:

   DO NOT USE **"npm install"** or **"pnpm i"**, ONLY USE "**yarn**".

   ```
   cd bitacle-contract
   yarn
   cd bitacle-service
   yarn
   ```

## **Testing**

1. Start the Internet Computer emulator:

   `dfx start --clean --background`

2. Deploy the canisters:

   ```
   cd bitacle-contract
   dfx deploy
   ```

   click the link on the terminal, should look like this:\
   `bitacle: http://127.0.0.1:4943/?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai&id=bkyz2-fmaaa-aaaaa-qaaaq-cai`

3. Create a .env file in bitacle-service like .env.example:

   ```
   cd bitacle-service
   touch test
   vim test
   ```

   get your canister id from the given link, it should be on top, and create your .env based on .env.example

4. Run the service:

   `npm run start`

5. There you go!

   Console can logs errors from canister, if it is "Not Found" errors you shouldn't care about these.

6. You can check rounds from the given dashboard link, look at the section 2

   In dashboard, click to query in bottom of getLatestRound, you should be able to get the latest exchange rate, when it got updated and roundId to query next.

## **Troubleshooting**

- If you encounter any issues with the Internet Computer emulator or DFX, refer to the [official documentation.](https://internetcomputer.org/docs/current/references/cli-reference/dfx-parent)
- If you encounter any issues with the TypeScript code or tests, refer to the source code and the [official TypeScript documentation.](https://www.typescriptlang.org/)

That's it! Let me know if you have any questions or need further assistance.
