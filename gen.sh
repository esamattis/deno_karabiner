#!/bin/sh

set -eu

file=$HOME/.config/karabiner/karabiner.json

exec deno run --allow-env --allow-read=$file --allow-write=$file gen.ts