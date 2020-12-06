import { writeHyperKeyImage } from "./lib/svg.ts";
import {
    HyperKey,
    KarabinerComplexModifications,
    Key,
} from "./lib/karabiner.ts";
// import { writeHyperKeyImage } from "https://deno.land/x/karabiner@v0.1.1/svg.ts";
// import {
//     HyperKey,
//     KarabinerComplexModifications,
// } from "https://deno.land/x/karabiner@v0.1.1/karabiner.ts";

const hyper1 = new HyperKey({
    id: "hyper1",
    description: "Caps Lock",
    from: {
        key_code: "caps_lock",
        modifiers: {
            optional: ["any"],
        },
    },
    to_if_alone: [
        {
            key_code: "escape",
        },
    ],
});

const hyper2 = new HyperKey({
    id: "hyper2",
    description: "Alt Gr / Right Command",
    from: {
        key_code: "right_command",
        modifiers: {
            optional: ["any"],
        },
    },
});

hyper1.bindKey({
    symbol: `"`,
    description: "double quote",
    from: "k",
    to: {
        key_code: "2",
        modifiers: ["left_shift"],
    },
});

hyper1.bindKey({
    symbol: "'",
    description: "single quote",
    from: "j",
    to: {
        key_code: "non_us_pound",
    },
});

hyper1.bindKey({
    symbol: "|",
    description: "pipe",
    from: "y",
    to: {
        key_code: "7",
        modifiers: ["left_option"],
    },
});

hyper1.bindKey({
    symbol: ";",
    description: "semicolon",
    from: "n",
    to: {
        key_code: "comma",
        modifiers: ["left_shift"],
    },
});

hyper1.bindKey({
    symbol: ":",
    description: "colon",
    from: "m",
    to: {
        key_code: "period",
        modifiers: ["left_shift"],
    },
});

hyper1.bindKey({
    symbol: "`",
    description: "backtick",
    from: "h",
    to: [
        {
            key_code: "equal_sign",
            modifiers: ["left_shift"],
        },
        {
            key_code: "spacebar",
        },
    ],
});

hyper2.bindKey({
    symbol: "=",
    description: "equals",
    from: "b",
    to: {
        key_code: "0",
        modifiers: ["left_shift"],
    },
});

hyper2.bindKey({
    symbol: `\\`,
    description: "back slash",
    from: "t",
    to: {
        key_code: "7",
        modifiers: ["left_option", "left_shift"],
    },
});

hyper2.bindKey({
    symbol: "/",
    description: "forward slash",
    from: "g",
    to: {
        key_code: "7",
        modifiers: ["left_shift"],
    },
});

hyper1.bindKey({
    symbol: "?",
    description: "question mark",
    from: "i",
    to: {
        key_code: "hyphen",
        modifiers: ["right_shift"],
    },
});

hyper1.bindKey({
    symbol: "$",
    description: "pound",
    from: "u",
    to: {
        key_code: "4",
        modifiers: ["right_option"],
    },
});

hyper1.bindKey({
    description: "4 spaces",
    from: "spacebar",
    to: [
        {
            key_code: "spacebar",
        },
        {
            key_code: "spacebar",
        },
        {
            key_code: "spacebar",
        },
        {
            key_code: "spacebar",
        },
    ],
});

hyper1.bindKey({
    description: "4 backspaces",
    from: "delete_or_backspace",
    to: [
        {
            key_code: "delete_or_backspace",
        },
        {
            key_code: "delete_or_backspace",
        },
        {
            key_code: "delete_or_backspace",
        },
        {
            key_code: "delete_or_backspace",
        },
    ],
});

hyper2.bindKey({
    symbol: "⏮",
    description: "backspace",
    from: "n",
    to: {
        key_code: "delete_or_backspace",
    },
});

hyper2.bindKey({
    symbol: "⏭",
    description: "delete key",
    from: "m",
    to: {
        key_code: "delete_forward",
    },
});

hyper2.bindKey({
    symbol: "{",
    description: "Open curly bracket",
    from: "d",
    to: {
        key_code: "8",
        modifiers: ["left_shift", "left_alt"],
    },
});

hyper2.bindKey({
    symbol: "}",
    description: "Close curly bracket",
    from: "f",
    to: {
        key_code: "9",
        modifiers: ["left_shift", "left_alt"],
    },
});

hyper2.bindKey({
    symbol: "[",
    description: "open square bracket",
    from: "3",
    to: {
        key_code: "8",
        modifiers: ["right_option"],
    },
});

hyper2.bindKey({
    symbol: "]",
    description: "close square bracket",
    from: "4",
    to: {
        key_code: "9",
        modifiers: ["right_option"],
    },
});

hyper2.bindKey({
    symbol: "(",
    description: "open paren",
    from: "e",
    to: {
        key_code: "8",
        modifiers: ["left_shift"],
    },
});

hyper2.bindKey({
    symbol: ")",
    description: "close paren",
    from: "r",
    to: {
        key_code: "9",
        modifiers: ["left_shift"],
    },
});

hyper2.bindKey({
    symbol: "<",
    description: "open angle bracket",
    from: "c",
    to: {
        key_code: "grave_accent_and_tilde",
    },
});

hyper2.bindKey({
    symbol: ">",
    description: "close angle bracket",
    from: "v",
    to: {
        key_code: "grave_accent_and_tilde",
        modifiers: ["left_shift"],
    },
});

hyper2.bindKey({
    symbol: "⬅️",
    description: "left arrow",
    from: "h",
    to: {
        key_code: "left_arrow",
    },
});

hyper2.bindKey({
    symbol: "⬇️",
    description: "down arrow",
    from: "j",
    to: {
        key_code: "down_arrow",
    },
});

hyper2.bindKey({
    symbol: "⬆️",
    description: "up arrow",
    from: "k",
    to: {
        key_code: "up_arrow",
    },
});

hyper2.bindKey({
    symbol: "➡️",
    description: "right arrow",
    from: "l",
    to: {
        key_code: "right_arrow",
    },
});

hyper2.bindKey({
    symbol: "⇠",
    description: "to start of line",
    from: "semicolon",
    to: {
        key_code: "left_arrow",
        modifiers: ["left_gui"],
    },
});

hyper2.bindKey({
    symbol: "⇢",
    description: "to end of the line",
    from: "quote",
    to: {
        key_code: "right_arrow",
        modifiers: ["left_gui"],
    },
});

const SpectaclKeys: Key[] = [
    "1",
    "2",
    "q",
    "w",
    "e",
    "a",
    "s",
    "d",
    "z",
    "x",
    "c",
];

SpectaclKeys.forEach((key) => {
    hyper1.bindKey({
        description: "Spectacle " + key,
        from: key,
        to: {
            key_code: key,
            modifiers: ["left_control", "left_option", "left_command"],
        },
    });
});

const mods = new KarabinerComplexModifications();

mods.addRule({
    description: "backtick fix",
    manipulators: [
        {
            type: "basic",
            from: {
                key_code: "equal_sign",
            },
            to: [
                {
                    key_code: "equal_sign",
                    modifiers: ["left_shift"],
                },
                {
                    key_code: "spacebar",
                },
            ],
        },
    ],
});

mods.addRule(hyper1.getRules());
mods.addRule(hyper2.getRules());

// mods.addRule({
//     description: "Map Caps Lock to Escape",
//     manipulators: [
//         {
//             type: "basic",
//             from: {
//                 key_code: "caps_lock",
//             },
//             to: [
//                 {
//                     key_code: "escape",
//                 },
//             ],
//         },
//     ],
// });

if (Deno.env.get("GH_PAGES")) {
    writeHyperKeyImage({
        hyperKeys: [hyper1, hyper2],
        inputSVGPath: "./images/layout.svg",
        ouputHTMLPath: "./build/index.html",
    });
} else {
    mods.writeToProfile("Default profile");
    writeHyperKeyImage({
        hyperKeys: [hyper1, hyper2],
        inputSVGPath: "./images/layout.svg",
        ouputHTMLPath: "./layout.html",
    });
}
