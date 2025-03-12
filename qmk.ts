import { KarabinerComplexModifications } from "./lib/karabiner.ts";

const mods = new KarabinerComplexModifications();

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
        },
        {
            type: "basic",
            from: {
                key_code: "h",
                modifiers: {
                    mandatory: ["left_command"],
                },
            },
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

mods.writeToProfile("qmk");
