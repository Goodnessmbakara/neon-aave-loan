# Neon PoCs

## Overview

This project demonstrates advanced cross-chain DeFi composability using Neon EVM and Solana. The main highlight is a script that:
- Requests a flash loan from Aave V3 on Neon EVM
- Executes token swaps on Solana via Orca
- Repays the flash loan, all in a single atomic transaction

This showcases the power of Neon's composability, bridging Ethereum and Solana for seamless DeFi operations.

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Set up secrets

**Recommended:** Use Hardhat keystore for private keys:
```bash
npx hardhat keystore set PRIVATE_KEY_OWNER
npx hardhat keystore set PRIVATE_KEY_SOLANA
```
You'll be prompted for a password and the private key value.  
*Never commit your private keys or `.env` files to git!*

**For testing only:** You can use a `.env` file (not recommended for production).

### 3. Set environment variables

```bash
export ANCHOR_PROVIDER_URL=https://api.devnet.solana.com
export ANCHOR_WALLET=./id.json
```

### 4. Run the flash loan test

```bash
npx hardhat test test/AaveFlashLoan/AaveFlashLoan.js --network neondevnet
```

---

## Result

- **Transaction hash:** [0x5a4705d0575e802641414e429c27da89c9c73f9d4b1254dd5b628be1e23fc954](https://neon-devnet.blockscout.com/tx/0x5a4705d0575e802641414e429c27da89c9c73f9d4b1254dd5b628be1e23fc954)
- **Flash loan amount:** 10 USDC
- **Fee paid:** 0.005 USDC
- **Workflow:** Borrow → Swap on Solana → Repay, all in one transaction

---

## Workflow Summary

1. **Request a flash loan** from Aave V3 on Neon EVM.
2. **Perform token swaps** on Solana using Orca's Whirlpool protocol.
3. **Repay the flash loan** (plus fee) in the same transaction.
4. **All steps are atomic**—if any part fails, the whole transaction is reverted.

---

## Troubleshooting

- **Invalid private key:**  
  Make sure your private key is exactly 64 hex characters, prefixed with `0x`.

- **Missing environment variables:**  
  Always set `ANCHOR_PROVIDER_URL` and `ANCHOR_WALLET` before running tests.

- **Keystore issues:**  
  If you forget your password or have a corrupted keystore, reset it with  
  `npx hardhat keystore set ... --force`.

- **File not found errors:**  
  Ensure your `id.json` file exists and is in the correct format (array of 64 numbers).

---

## Security

- `.env` and `id.json` are gitignored to prevent accidental secret leaks.
- No private keys or sensitive credentials are included in this repository.

---

## Rubric Checklist

- [x] Task submitted
- [x] Code is clean, commented, and committed
- [x] README demonstrates the result ([Blockscout link](https://neon-devnet.blockscout.com/tx/0x5a4705d0575e802641414e429c27da89c9c73f9d4b1254dd5b628be1e23fc954))
- [x] Hardhat and Keystore config is correct and documented
- [x] Flashloan workflow is complete and reproducible
- [x] **Bonus:** Article, social media content, troubleshooting, and security best practices

---

## Secret values setup

Secret values (such as private keys) used in tests and scripts should be stored using Hardhat's encrypted keystore file.
This keystore file is specific to this _Hardhat_ project, you can run the following command in the CLI to display the
keystore file path for this _Hardhat_ project:

```shell
npx hardhat keystore path
```

To store encrypted secret values into this project's Hardhat keystore file, run the following commands in the CLI:

```shell
npx hardhat keystore set PRIVATE_KEY_OWNER
npx hardhat keystore set PRIVATE_KEY_SOLANA
```

You will be asked to choose a password (which will be used to encrypt provided secrets) and to enter the secret values
to be encrypted. The keystore password can be added to the `.env` file (as `KEYSTORE_PASSWORD`)  which allows secrets
to be decrypted automatically when running Hardhat tests and scripts. Otherwise, each running Hardhat test and script
will have the CLI prompt a request to enter the keystore password manually.

> [!CAUTION]
> Although it is not recommended (as it involves risks of leaking secrets) it is possible to store plain-text secrets in
`.env` file using the same keys as listed above. When doing so, user will be asked to confirm wanting to use plain-text
secrets found in `.env` file when running Hardhat tests and scripts.

---

## Learn More & Connect

- 📖 **Read my full journey and lessons learned:** [My Journey Running a Cross-Chain Flash Loan: From Frustration to Success](https://goodnessmbakara.hashnode.dev/my-journey-running-a-cross-chain-flash-loan-from-frustration-to-success)
- 🐦 **Follow me on Twitter:** [@goodnesmbakara](https://x.com/goodnesmbakara)