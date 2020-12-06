# Deno Karabiner

Write Complex Modifications for
[Karabiner-Elements](https://karabiner-elements.pqrs.org/) using TypeScript
and [Deno](https://deno.land/).

## Why?

Karabiner Complex Modifications are in JSON which is not too text editor
friendly format. By moving to TypeScript we gain following:

-   Ability write comments
-   Ability to use variables and any logic we want
-   Autocomplete via VSCode etc.
-   Type safety. The key codes etc. are typed
    -   Although this is not 100% complete. PRs welcome!

Why Deno? It's the simplest way to run TypeScript code on macOS. No need to
fiddle with npm and TypeScript configs.

## Usage

Create `generate.ts`:

```tsx
import { KarabinerComplexModifications } from "https://deno.land/x/karabiner@v0.2.0/karabiner.ts";

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

This will write the rules to the profile name "Default Profile" in your
Karabiner config in `~/.config/karabiner/karabiner.json`. It will not touch
any other options. The changes will be in effect immediately if you have
Karabiner running.

If you want to try it first on a different file you can pass it as the second
arg to `.writeToProfile()`.

```tsx
mods.writeToProfile("Default profile", "test.json");
```

> `--allow-env` is required so it can find your Karabiner config file using
> the HOME env which can be removed if you pass an explicit file name here

## Hyper Key Helper

The lib comes with a helper class for creating Hyper Keys and subsequent
bindings for them (aka layers).

```tsx
import { HyperKey } from "https://deno.land/x/karabiner@v0.2.0/karabiner.ts";

const hyper1 = new HyperKey({
    id: "hyper1",
    description: "Caps Lock",
    from: {
        key_code: "caps_lock",
        modifiers: {
            optional: ["any"],
        },
    },
});

// Add the hyper key rules to mods instance
mods.addRule(hyper1.getRules());
```

Hyper Keys can be used the create whole new "Layers" with `.bindKey()`.

For example in the finnish mac keyboard layout the curly brackets are really
painful to type (imo 😉) since it needs three keys: `shift + option + 8/9`
which are in awkward positions.

So here's how to type them with `Caps Lock + d/f`

```tsx
hyper1.bindKey({
    // Passed to the Karabiner preferences GUI
    description: "Open curly bracket",

    // Combine the hyper key with key "d"
    key: "d",

    // Emit open curly bracket keys
    to: {
        key_code: "8",
        modifiers: ["left_shift", "left_alt"],
    },
});

hyper1.bindKey({
    description: "Close curly bracket",
    key: "f",
    to: {
        key_code: "9",
        modifiers: ["left_shift", "left_alt"],
    },
});
```

The name, id and the descriptions are used to create readable descriptions to
the Karabiner preferences view

![image](https://user-images.githubusercontent.com/225712/101291575-8e209980-3812-11eb-93cc-02ad07e4ee01.png)

For example here's a layer I use

![image](https://user-images.githubusercontent.com/225712/101291309-79430680-3810-11eb-9c57-935b8cc324d0.png)

## Bonus!

Generate a mapping image like above automatically!

```tsx
import { writeHyperKeyImage } from "https://deno.land/x/karabiner@v0.2.0/svg.ts";

writeHyperKeyImage({
    hyperKeys: [hyper1, hyper2],
    inputSVGPath: "./images/layout.svg",
    ouputHTMLPath: "./layout.html",
});
```

The `layout.svg` can be found from [images/layout.svg](images/layout.svg) and
just open the generated `layout.html` in a browser.

The base svg image is quite opinionated. It supports two hyper keys with ids
`hyper1` and `hyper2`.

You can find my mapping image here: <https://esamattis.github.io/karabiner/>
