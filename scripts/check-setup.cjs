#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let allOk = true;

function check(msg, cond) {
  if (cond) {
    console.log(`✅ ${msg}`);
  } else {
    console.log(`❌ ${msg}`);
    allOk = false;
  }
}

// 1. Check environment variables
check('ANCHOR_PROVIDER_URL is set', !!process.env.ANCHOR_PROVIDER_URL);
check('ANCHOR_WALLET is set', !!process.env.ANCHOR_WALLET);

// 2. Check id.json exists and is valid
const idPath = path.join(process.cwd(), 'id.json');
let idValid = false;
if (fs.existsSync(idPath)) {
  try {
    const arr = JSON.parse(fs.readFileSync(idPath, 'utf8'));
    idValid = Array.isArray(arr) && arr.length === 64 && arr.every(n => typeof n === 'number');
  } catch (e) {}
}
check('id.json exists and is a valid Solana keypair', idValid);

// 3. Check node_modules exists
check('node_modules directory exists', fs.existsSync(path.join(process.cwd(), 'node_modules')));

// 4. Check Hardhat keystore for required keys
let keystoreOk = false;
try {
  const out = execSync('npx hardhat keystore list', { encoding: 'utf8' });
  keystoreOk = out.includes('PRIVATE_KEY_OWNER') && out.includes('PRIVATE_KEY_SOLANA');
} catch (e) {}
check('Hardhat keystore contains PRIVATE_KEY_OWNER', keystoreOk);
check('Hardhat keystore contains PRIVATE_KEY_SOLANA', keystoreOk);

// 5. Check package.json and hardhat.config.js
check('package.json exists', fs.existsSync('package.json'));
check('hardhat.config.js exists', fs.existsSync('hardhat.config.js'));

if (!allOk) {
  console.log('\nSome checks failed. Please review the ❌ items above.');
  process.exit(1);
} else {
  console.log('\nAll setup checks passed! You are ready to go.');
  process.exit(0);
} 