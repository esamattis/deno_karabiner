# Deno Karabiner

Write Complex Modifications for [Karabiner
Elements](https://karabiner-elements.pqrs.org/) using Typescript and
[Deno](https://deno.land/).

## Why?

Karabiner Complex Modification are JSON and complex JSON files are too editor
friendly. By moving to TypeScript we gain following:

-   Ability write comments
-   Variables
-   Autocomplete
-   Type safety. The key codes etc. are typed
    -   Although this is not 100% complete. PRs welcome!

## Usage

Create `generate.ts`:

```tsx
import { KarabinerComplexModifications } from "https://deno.land/x/karabiner@v0.1.1/karabiner.ts";

const mods = new KarabinerComplexModifications();

mods.addRule({
    description: "Map Caps Lock to Escape",
    manipulators: [
        {
            type: "basic",
            from: {
                key_code: "caps_lock",
            },
            to: [
                {
                    key_code: "escape",
                },
            ],
        },
    ],
});

mods.writeToProfile("Default profile");
```

Run it with

```
deno run --allow-env --allow-read --allow-write generate.ts
```

This will write the rules to the "Default Profile" in your Karabiner config
in `~/.config/karabiner/karabiner.json`. It will not touch any other options.
The changes will be in effect immediately if you have Karabiner running.

If you want to try on a different file you can pass it as the second arg to
`.writeToProfile()`.

```tsx
mods.writeToProfile("Default profile", "test.json");
```

> `--allow-env` is required so it can find your Karabiner config file using
> the HOME env which can be removed if you pass an explicit file name here

## Hyper Key Helper

The lib comes with a helper class for creating Hyper Keys and subsequent
bindings for it

```tsx
import { HyperKey } from "https://deno.land/x/karabiner@v0.1.1/karabiner.ts";

const hyper1 = new HyperKey("Caps Lock", {
    id: "hyper1",
    from: {
        key_code: "caps_lock",
        modifiers: {
            optional: ["any"],
        },
    },
    to: {
        key_code: "right_control",
        modifiers: ["right_command", "right_option"],
    },
    to_if_alone: [
        {
            key_code: "escape",
        },
    ],
});
```

This would make the Caps Lock a Hyper Key which emits `right_control`,
`right_command` and `right_option` when combined with some other key but when
pressed alone it will emit `escape`.

### Layers

Hyper Keys can be used the create whole new "Layers" with `.bindKey()`.

For example in the finnish mac keyboard layout the curly brackets are really
painful to type since it needs three keys: `shift + option + 8` which are in
(imo) awkward positions.

```tsx
hyper1.bindKey({
    // Passed to the Karabiner preferences GUI
    description: "Open curly bracket",

    // Combine the hyper key with key "d"
    from: "d",

    // Emit open curly bracket keys
    to: {
        key_code: "8",
        modifiers: ["left_shift", "left_alt"],
    },
});

hyper1.bindKey({
    symbol: "}",
    description: "close curly bracket",
    from: "f",
    to: {
        key_code: "9",
        modifiers: ["left_shift", "left_alt"],
    },
});
```
