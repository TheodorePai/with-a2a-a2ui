#!/bin/bash

# Run the TypeScript agent in development mode
cd "$(dirname "$0")/.." || exit 1

# Check if node_modules exists
if [ ! -d "agent-ts/node_modules" ]; then
    echo "Installing agent-ts dependencies..."
    cd agent-ts && npm install && cd ..
fi

cd agent-ts && npm run dev

