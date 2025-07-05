#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Install dependencies
printf "${GREEN}Installing dependencies...${NC}\n"
npm install

# Step 2: Run setup checks
printf "\n${GREEN}Running environment and secret checks...${NC}\n"
node scripts/check-setup.cjs

if [ $? -ne 0 ]; then
  printf "\n${RED}Setup checks failed. Please fix the issues above before proceeding.${NC}\n"
  exit 1
fi

printf "\n${GREEN}Setup complete! You are ready to use the project.${NC}\n" 