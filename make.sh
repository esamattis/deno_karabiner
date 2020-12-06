#!/bin/sh

set -eu

file=$HOME/.config/karabiner/karabiner.json

exec deno run --allow-env --allow-read --allow-write example.ts