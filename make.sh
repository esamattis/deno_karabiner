#!/bin/sh

set -eu

exec deno run --allow-env --allow-read --allow-write ${1:-example.ts}