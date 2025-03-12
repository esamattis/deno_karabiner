import {
    AltCondition,
    FrontmostApplicationCondition,
    HyperKey,
    KarabinerComplexModifications,
    Key,
    KeyPressTo,
} from "./lib/karabiner.ts";

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