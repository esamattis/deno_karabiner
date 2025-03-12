import { writeHyperKeyImage } from "./lib/svg.ts";
import {
    AltCondition,
    FrontmostApplicationCondition,
    HyperKey,
    KarabinerComplexModifications,
    Key,
    KeyPressTo,
} from "./lib/karabiner.ts";
// import { writeHyperKeyImage } from "https://deno.land/x/karabiner@v0.1.1/svg.ts";
// import {
//     HyperKey,
//     KarabinerComplexModifications,
// } from "https://deno.land/x/karabiner@v0.1.1/karabiner.ts";
//
const SUPER_MOD: Key[] = [
    "left_shift",
    "left_control",
    "left_command",
    "left_option",
];

const HYPER: KeyPressTo = {
    key_code: "left_shift",
    modifiers: [
        "left_control",
        "left_command",
        "left_option",
    ],
};

const WhenRDS: AltCondition = {
    enable: [
        {
            type: "frontmost_application_if",
            bundle_identifiers: ["^com.microsoft.rdc.macos$"],
        },
    ],
    disable: [
        {
            type: "frontmost_application_unless",
            bundle_identifiers: ["^com.microsoft.rdc.macos$"],
        },
    ],
};

const WhenChrome: AltCondition = {
    enable: [
        {
            type: "frontmost_application_if",
            bundle_identifiers: ["^com.google.Chrome$"],
        },
    ],
    disable: [
        {
            type: "frontmost_application_unless",
            bundle_identifiers: ["^com.google.Chrome$"],
        },
    ],
};

const hyper1 = new HyperKey({
    id: "hyper1",
    description: "Left option to hyper1",
    from: {
        // apple_vendor_top_case_key_code: "keyboard_fn",
        key_code: "left_option",
    },
});

const hyper2 = new HyperKey({
    id: "hyper2",
    description: "Alt Gr / Right Command",
    from: {
        key_code: "right_command",
    },
});

// const hyper3 = new HyperKey({
//     id: "hyper3",
//     description: "<> key",
//     from: {
//         key_code: "grave_accent_and_tilde",
//     },
// });

hyper1.bindKey({
    symbol: "@",
    description: "At sign",
    key: "a",
    to: {
        key_code: "2",
        modifiers: ["right_option"],
    },
});

hyper1.bindKey({
    symbol: "@",
    description: "EUR Symbol €",
    key: "e",
    to: {
        key_code: "4",
        modifiers: ["right_shift"],
    },
});

hyper1.bindKey({
    symbol: `"`,
    description: "double quote",
    key: "k",
    to: {
        key_code: "2",
        modifiers: ["left_shift"],
    },
});

hyper1.bindKey({
    symbol: "'",
    description: "single quote",
    key: "h",
    to: {
        key_code: "non_us_pound",
    },
});

hyper1
    .bindKey({
        symbol: "|",
        description: "pipe",
        key: "y",
        to: {
            key_code: "7",
            modifiers: ["right_option"],
        },
    })
    .alt(WhenRDS, {
        description: "pipe (rds)",
        to: {
            key_code: "non_us_backslash",
            modifiers: ["right_option"],
        },
    });

hyper1.bindKey({
    symbol: "~",
    description: "semicolon",
    key: "n",
    to: [
        {
            key_code: "close_bracket",
            modifiers: ["right_option"],
        },
        {
            key_code: "spacebar",
        },
    ],
});

hyper1.bindKey({
    symbol: "^",
    description: "caret",
    key: "m",
    to: [
        {
            key_code: "close_bracket",
            modifiers: ["left_shift"],
        },
        {
            key_code: "spacebar",
        },
    ],
});

hyper1.bindKey({
    symbol: "*",
    description: "asterisk",
    key: "semicolon",
    to: {
        key_code: "backslash",
        modifiers: ["left_shift"],
    },
});

hyper1.bindKey({
    symbol: "#",
    description: "hash",
    key: "u",
    to: {
        key_code: "3",
        modifiers: ["left_shift"],
    },
});

hyper1.bindKey({
    symbol: "&",
    description: "and",
    key: "period",
    to: {
        key_code: "6",
        modifiers: ["left_shift"],
    },
});

hyper1.bindKey({
    symbol: "!",
    description: "exclamation mark",
    key: "o",
    to: {
        key_code: "1",
        modifiers: ["left_shift"],
    },
});

hyper1.bindKey({
    symbol: "%",
    description: "percent",
    key: "comma",
    to: {
        key_code: "5",
        modifiers: ["left_shift"],
    },
});

hyper1.bindKey({
    symbol: "`",
    description: "backtick",
    key: "l",
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

hyper1.bindKey({
    symbol: "_",
    description: "underscore",
    key: "j",
    to: [
        {
            key_code: "slash",
            modifiers: ["left_shift"],
        },
    ],
});

hyper2.bindKey({
    symbol: "=",
    description: "equals",
    key: "b",
    to: {
        key_code: "0",
        modifiers: ["left_shift"],
    },
});

// Does not work with command modifiers
// hyper1.bindKey({
//     symbol: "+",
//     description: "plus",
//     key: "slash",
//     to: {
//         key_code: "hyphen",
//     },
// });

hyper2.bindKey({
    symbol: `\\`,
    description: "back slash",
    key: "t",
    to: {
        key_code: "7",
        modifiers: ["right_option", "left_shift"],
    },
});

hyper2.bindKey({
    symbol: "/",
    description: "forward slash",
    key: "g",
    to: {
        key_code: "7",
        modifiers: ["left_shift"],
    },
});

hyper1.bindKey({
    symbol: "?",
    description: "question mark",
    key: "i",
    to: {
        key_code: "hyphen",
        modifiers: ["right_shift"],
    },
});

hyper1.bindKey({
    symbol: "$",
    description: "pound",
    key: "p",
    to: {
        key_code: "4",
        modifiers: ["right_option"],
    },
});

hyper1.bindKey({
    description: "backspace",
    key: "spacebar",
    to: [
        {
            key_code: "delete_or_backspace",
        },
    ],
});

hyper1.bindKey({
    description: "backspace",
    key: "delete_or_backspace",
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
    key: "n",
    to: {
        key_code: "delete_or_backspace",
    },
});

hyper2.bindKey({
    symbol: "⏭",
    description: "delete key",
    key: "m",
    to: {
        key_code: "delete_forward",
    },
});

hyper2
    .bindKey({
        symbol: "{",
        description: "Open curly bracket",
        key: "d",
        to: {
            key_code: "8",
            modifiers: ["left_shift", "right_option"],
        },
    })
    .alt(WhenRDS, {
        description: "Open curly bracket (rds)",
        to: {
            key_code: "7",
            modifiers: ["right_option"],
        },
    });

hyper2
    .bindKey({
        symbol: "}",
        description: "Close curly bracket",
        key: "f",
        to: {
            key_code: "9",
            modifiers: ["left_shift", "right_option"],
        },
    })
    .alt(WhenRDS, {
        description: "Close curly bracket (rds)",
        to: {
            key_code: "0",
            modifiers: ["right_option"],
        },
    });

// hyper2.bindKey({
//     symbol: "[",
//     description: "open square bracket",
//     key: "3",
//     to: {
//         key_code: "8",
//         modifiers: ["right_option"],
//     },
// });

// hyper2.bindKey({
//     symbol: "]",
//     description: "close square bracket",
//     key: "4",
//     to: {
//         key_code: "9",
//         modifiers: ["right_option"],
//     },
// });

hyper2.bindKey({
    symbol: "[",
    description: "open square bracket (alt)",
    key: "a",
    to: {
        key_code: "8",
        modifiers: ["right_option"],
    },
});

hyper2.bindKey({
    symbol: "]",
    description: "close square bracket (alt",
    key: "s",
    to: {
        key_code: "9",
        modifiers: ["right_option"],
    },
});

hyper2.bindKey({
    symbol: "(",
    description: "open paren",
    key: "e",
    to: {
        key_code: "8",
        modifiers: ["left_shift"],
    },
});

hyper2.bindKey({
    symbol: ")",
    description: "close paren",
    key: "r",
    to: {
        key_code: "9",
        modifiers: ["left_shift"],
    },
});

hyper2
    .bindKey({
        symbol: "<",
        description: "open angle bracket",
        key: "c",
        to: {
            key_code: "non_us_backslash",
        },
    })
    .alt(WhenRDS, {
        description: "open angle bracket (rds)",
        to: {
            key_code: "non_us_backslash",
        },
    });

hyper2
    .bindKey({
        symbol: ">",
        description: "close angle bracket",
        key: "v",
        to: {
            key_code: "non_us_backslash",
            modifiers: ["left_shift"],
        },
    })
    .alt(WhenRDS, {
        description: "close angle bracket (rds)",
        to: {
            key_code: "non_us_backslash",
            modifiers: ["right_shift"],
        },
    });

hyper2.bindKey({
    symbol: "⬅️",
    description: "left arrow",
    key: "h",
    to: {
        key_code: "left_arrow",
    },
});

hyper2.bindKey({
    symbol: "⬇️",
    description: "down arrow",
    key: "j",
    to: {
        key_code: "down_arrow",
    },
});

hyper2.bindKey({
    symbol: "⬆️",
    description: "up arrow",
    key: "k",
    to: {
        key_code: "up_arrow",
    },
});

hyper2.bindKey({
    symbol: "➡️",
    description: "right arrow",
    key: "l",
    to: {
        key_code: "right_arrow",
    },
});

hyper2
    .bindKey({
        symbol: "⇠",
        description: "to start of line",
        key: "semicolon",
        to: {
            key_code: "home",
        },
    })
    .alt(WhenChrome, {
        description: "to start of line (chrome)",
        to: {
            key_code: "left_arrow",
            modifiers: ["left_gui"],
        },
    });

hyper2
    .bindKey({
        symbol: "⇢",
        description: "to end of the line",
        key: "quote",
        to: {
            key_code: "end",
        },
    })
    .alt(WhenChrome, {
        description: "to end of the line (chrome)",
        to: {
            key_code: "right_arrow",
            modifiers: ["left_gui"],
        },
    });

hyper2.bindKey({
    description: "Select and copy line",
    key: "y",
    to: [
        {
            key_code: "right_arrow",
            modifiers: ["left_gui"],
        },
        {
            key_code: "left_arrow",
            modifiers: ["left_gui", "left_shift"],
        },
        {
            key_code: "c",
            modifiers: ["left_command"],
        },
    ],
});

hyper2.bindKey({
    description: "Put clipboard content as an new line",
    key: "p",
    to: [
        {
            key_code: "right_arrow",
            modifiers: ["left_gui"],
        },
        {
            key_code: "return_or_enter",
        },
        {
            key_code: "v",
            modifiers: ["left_command"],
        },
    ],
});

// const SpectacleKeys: Key[] = [
//     "1",
//     "2",
//     "q",
//     "w",
//     "e",
//     "a",
//     "s",
//     "d",
//     "z",
//     "x",
//     "c",
// ];

// SpectacleKeys.forEach((key) => {
//     hyper1.bindKey({
//         description: "Spectacle " + key,
//         key: key,
//         to: {
//             key_code: key,
//             modifiers: ["left_control", "left_option", "left_command"],
//         },
//     });
// });

const mods = new KarabinerComplexModifications();

// mods.addRule({
//     description: "Map command to left option",
//     manipulators: [
//         {
//             type: "basic",
//             from: {
//                 key_code: "left_option",
//             },
//             to: [
//                 {
//                     key_code: "left_command",
//                     modifiers: ["left_shift"],
//                 },
//             ],
//             conditions: [
//                 {
//                     type: "frontmost_application_if",
//                     bundle_identifiers: ["^com.neovide.neovide"],
//                 },
//             ],
//         },
//     ],
// });

mods.addRule({
    description: "Disable confusing backtic button as standalone",
    manipulators: [
        {
            type: "basic",
            from: {
                key_code: "equal_sign",
            },
        },
    ],
});

mods.addRule({
    description: "Disable confusing ¨ button as standalone",
    manipulators: [
        {
            type: "basic",
            from: {
                key_code: "close_bracket",
            },
        },
    ],
});

mods.addRule({
    description: "disable single quote button as it is too close to enter",
    manipulators: [
        {
            type: "basic",
            from: {
                key_code: "backslash",
            },
            // to: [
            //     {
            //         key_code: "escape",
            //     },
            // ],
        },
    ],
});

// mods.addRule({
//     description: "Disable quote button (too close to enter)",
//     manipulators: [
//         {
//             type: "basic",
//             from: {
//                 key_code: "non_us_pound",
//             },
//         },
//     ],
// });

mods.addRule({
    description: "Disable insert",
    manipulators: [
        {
            type: "basic",
            from: {
                key_code: "insert",
            },
        },
    ],
});

mods.addRule({
    // https://superuser.com/questions/1043596/mac-osx-remove-hide-window-keyboard-shortcut
    description: "Disable command+h",
    manipulators: [
        {
            type: "basic",
            from: {
                key_code: "h",
                modifiers: {
                    mandatory: ["right_command"],
                },
            },
            to: [
                // {
                //     key_code: "h",
                //     modifiers: ["left_shift", "left_control", "left_gui"],
                // },
            ],
        },
        {
            type: "basic",
            from: {
                key_code: "h",
                modifiers: {
                    mandatory: ["left_command"],
                },
            },
            to: [
                // {
                //     key_code: "h",
                //     modifiers: ["left_shift", "left_control", "left_gui"],
                // },
            ],
        },
    ],
});

mods.addRule({
    // https://superuser.com/questions/1043596/mac-osx-remove-hide-window-keyboard-shortcut
    description: "Disable command+m",
    manipulators: [
        {
            type: "basic",
            from: {
                key_code: "m",
                modifiers: {
                    mandatory: ["left_command"],
                },
            },
        },
        {
            type: "basic",
            from: {
                key_code: "m",
                modifiers: {
                    mandatory: ["right_command"],
                },
            },
        },
    ],
});

// mods.addRule({
//     description: "Disable stuff temporarily for learning",
//     manipulators: [
//         {
//             // (
//             type: "basic",
//             from: {
//                 key_code: "8",
//                 modifiers: {
//                     mandatory: ["left_shift"],
//                 },
//             },
//         },
//         {
//             // )
//             type: "basic",
//             from: {
//                 key_code: "9",
//                 modifiers: {
//                     mandatory: ["left_shift"],
//                 },
//             },
//         },
//         {
//             // (
//             type: "basic",
//             from: {
//                 key_code: "8",
//                 modifiers: {
//                     mandatory: ["right_shift"],
//                 },
//             },
//         },
//         {
//             // )
//             type: "basic",
//             from: {
//                 key_code: "9",
//                 modifiers: {
//                     mandatory: ["right_shift"],
//                 },
//             },
//         },
//         {
//             // "
//             type: "basic",
//             from: {
//                 key_code: "2",
//                 modifiers: {
//                     mandatory: ["right_shift"],
//                 },
//             },
//         },
//         {
//             // =
//             type: "basic",
//             from: {
//                 key_code: "hyphen",
//                 modifiers: {
//                     mandatory: ["right_shift"],
//                 },
//             },
//         },
//         {
//             // 0
//             type: "basic",
//             from: {
//                 key_code: "0",
//                 modifiers: {
//                     mandatory: ["right_shift"],
//                 },
//             },
//         },
//         {
//             // /
//             type: "basic",
//             from: {
//                 key_code: "7",
//                 modifiers: {
//                     mandatory: ["right_shift"],
//                 },
//             },
//         },
//     ],
// });

mods.addRule({
    description: "Turn å to backspace",
    manipulators: [
        {
            type: "basic",
            from: {
                key_code: "open_bracket",
                modifiers: {
                    optional: ["any"],
                },
            },
            to: [
                {
                    key_code: "delete_or_backspace",
                },
            ],
        },
    ],
});

mods.addRule({
    description: "Turn section key to super key",
    manipulators: [
        {
            type: "basic",
            from: {
                key_code: "non_us_backslash",
                modifiers: {
                    optional: ["any"],
                },
            },
            to: [HYPER],
        },
    ],
});

mods.addRule({
    description: "",
    manipulators: [
        {
            type: "basic",
            from: {
                key_code: "grave_accent_and_tilde",
                modifiers: {
                    optional: ["any"],
                },
            },
            to: [HYPER],
        },
    ],
});

const UNMUTE: KeyPressTo = {
    shell_command:
        `osascript -e 'display notification "🔊 🔴 UNMUTED" sound name "pop"' -e 'delay 0.25' -e 'set volume input volume 70'`,
    // shell_command: `echo unmute >> ~/mute.log`,
};

const MUTE: KeyPressTo = {
    shell_command:
        `osascript -e 'set volume input volume 0' -e 'delay 0.25' -e 'display notification "🔇 muted" sound name "frog"'`,
    // shell_command: `echo mute >> ~/mute.log`,
};

mods.addRule({
    description: "Speak when held down, mute on tap",
    manipulators: [
        {
            type: "basic",
            from: {
                key_code: "pause",
            },
            to_if_held_down: [UNMUTE],
            to_after_key_up: [MUTE],

            // Use halt to disable to_after_key_up
            to_if_alone: [{ ...MUTE, halt: true }],
        },
    ],
});

mods.addRule({
    description: "Mute when held down, unmute on tap",
    manipulators: [
        {
            type: "basic",
            from: {
                key_code: "scroll_lock",
            },
            to_if_held_down: [MUTE],
            to_after_key_up: [UNMUTE],

            // Use halt to disable to_after_key_up
            to_if_alone: [{ ...UNMUTE, halt: true }],
        },
    ],
});

// hyper3.bindKey({
//     symbol: `m`,
//     description: "Mute",
//     key: "m",
//     to: MUTE,
// });

// hyper3.bindKey({
//     symbol: `u`,
//     description: "Unmute",
//     key: "u",
//     to: UNMUTE,
// });

// hyper3.bindKey({
//     symbol: `b`,
//     description: "Toggle nightlight",
//     key: "b",
//     to: {
//         shell_command: `/usr/local/bin/nightlight toggle && osascript -e 'display notification "Nightlight!" sound name "frog"'`,
//     },
// });

// hyper3.bindKey({
//     symbol: `1pw`,
//     description: "1password",
//     key: "1",
//     to: {
//         key_code: "1",
//         modifiers: SUPER_MOD,
//     },
// });

// hyper3.bindKey({
//     symbol: `1pw`,
//     description: "1password",
//     key: "2",
//     to: {
//         key_code: "2",
//         modifiers: SUPER_MOD,
//     },
// });

// hyper3.bindKey({
//     symbol: `toggl`,
//     description: "Toggl",
//     key: "t",
//     to: {
//         key_code: "t",
//         modifiers: SUPER_MOD,
//     },
// });

// hyper3.bindKey({
//     symbol: "Screenshot",
//     description: "Toggl",
//     key: "z",
//     to: {
//         key_code: "z",
//         modifiers: SUPER_MOD,
//     },
// });

// hyper3.bindKey({
//     symbol: "Voice Over",
//     description: "Toggle Voice Over",
//     key: "v",
//     to: {
//         key_code: "v",
//         modifiers: SUPER_MOD,
//     },
// });

mods.addRule(hyper1.getRules());
mods.addRule(hyper2.getRules());
// mods.addRule(hyper3.getRules());

mods.addRule({
    description: "fn to left control",
    manipulators: [
        {
            type: "basic",
            from: {
                // key_code: "caps_lock",
                apple_vendor_top_case_key_code: "keyboard_fn",
                modifiers: {
                    optional: ["any"],
                },
            },
            to: [
                {
                    key_code: "left_control",
                },
            ],
        },
    ],
});

mods.addRule({
    description: "control to left option",
    manipulators: [
        {
            type: "basic",
            from: {
                key_code: "left_control",
                modifiers: {
                    optional: ["any"],
                },
            },
            to: [
                {
                    key_code: "left_option",
                },
            ],
        },
    ],
});

mods.addRule({
    description: "Map Caps Lock to control",
    manipulators: [
        {
            type: "basic",
            from: {
                key_code: "caps_lock",
                modifiers: {
                    optional: ["any"],
                },
            },
            to: [
                {
                    key_code: "tab",
                },
            ],
        },
    ],
});

// mods.addRule({
//     description: "mod tap m",
//     manipulators: [
//         {
//             type: "basic",
//             from: {
//                 key_code: "m",
//                 modifiers: { "optional": ["any"] },
//             },
//             to: [
//                 {
//                     key_code: "right_command",
//                     lazy: true,
//                 },
//             ],
//             "to_if_alone": [
//                 {
//                     "key_code": "m",
//                     "halt": true,
//                 },
//             ],
//             "to_delayed_action": {
//                 "to_if_canceled": [
//                     {
//                         "key_code": "m",
//                     },
//                 ],
//             },
//             "to_if_held_down": [
//                 {
//                     "key_code": "right_command",
//                     "repeat": false,
//                     "halt": true,
//                 },
//             ],

//             parameters: {
//                 "basic.to_if_alone_timeout_milliseconds": 200,
//                 // "basic.simultaneus_threshold_milliseconds": 250,
//             },
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
