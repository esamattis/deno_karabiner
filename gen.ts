import { HyperKey, KarabinerProfile } from "./lib.ts";

const karabiner = new KarabinerProfile("Default profile");
karabiner.addRule({
    description: "backtick fix",
    manipulators: [
        {
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
            type: "basic",
        },
    ],
});

const hyper1 = new HyperKey("Caps Lock", {
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

const hyper2 = new HyperKey("Alt Gr / Right Command", {
    from: {
        key_code: "right_command",
        modifiers: {
            optional: ["any"],
        },
    },
    to: {
        key_code: "right_shift",
        modifiers: ["right_command", "right_option"],
    },
});

karabiner.addHyperKey(hyper1);
karabiner.addHyperKey(hyper2);

hyper1.bindKey({
    description: "double quote",
    from: "k",
    to: {
        key_code: "2",
        modifiers: ["left_shift"],
    },
});

hyper1.bindKey({
    description: "single quote",
    from: "j",
    to: {
        key_code: "non_us_pound",
    },
});

hyper1.bindKey({
    description: "pipe",
    from: "y",
    to: {
        key_code: "7",
        modifiers: ["left_option"],
    },
});

hyper1.bindKey({
    description: "semicolon",
    from: "n",
    to: {
        key_code: "comma",
        modifiers: ["left_shift"],
    },
});

hyper1.bindKey({
    description: "colon",
    from: "m",
    to: {
        key_code: "period",
        modifiers: ["left_shift"],
    },
});

hyper1.bindKey({
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
    description: "equals",
    from: "t",
    to: {
        key_code: "period",
        modifiers: ["left_shift"],
    },
});

hyper1.bindKey({
    description: "plus",
    from: "l",
    to: {
        key_code: "hyphen",
        modifiers: ["left_shift"],
    },
});

hyper2.bindKey({
    description: "back slash",
    from: "b",
    to: {
        key_code: "7",
        modifiers: ["left_option", "left_shift"],
    },
});

hyper2.bindKey({
    description: "forward slash",
    from: "g",
    to: {
        key_code: "7",
        modifiers: ["left_shift"],
    },
});

hyper1.bindKey({
    description: "question mark",
    from: "i",
    to: {
        key_code: "hyphen",
        modifiers: ["right_shift"],
    },
});

hyper1.bindKey({
    description: "pound $",
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

hyper2.bindKey({
    description: "backspace",
    from: "n",
    to: {
        key_code: "delete_or_backspace",
    },
});

hyper2.bindKey({
    description: "delete key",
    from: "m",
    to: {
        key_code: "delete_forward",
    },
});

hyper2.bindKey({
    description: "open curly bracket",
    from: "d",
    to: {
        key_code: "8",
        modifiers: ["left_shift", "left_alt"],
    },
});

hyper2.bindKey({
    description: "close curly bracket",
    from: "f",
    to: {
        key_code: "9",
        modifiers: ["left_shift", "left_alt"],
    },
});

hyper2.bindKey({
    description: "open square bracket",
    from: "3",
    to: {
        key_code: "8",
        modifiers: ["right_option"],
    },
});

hyper2.bindKey({
    description: "close square bracket",
    from: "4",
    to: {
        key_code: "8",
        modifiers: ["right_option"],
    },
});

hyper2.bindKey({
    description: "open paren",
    from: "c",
    to: {
        key_code: "8",
        modifiers: ["left_shift"],
    },
});

hyper2.bindKey({
    description: "close paren",
    from: "v",
    to: {
        key_code: "9",
        modifiers: ["left_shift"],
    },
});

hyper2.bindKey({
    description: "open angle bracket",
    from: "e",
    to: {
        key_code: "grave_accent_and_tilde",
    },
});

hyper2.bindKey({
    description: "close angle bracket",
    from: "r",
    to: {
        key_code: "grave_accent_and_tilde",
        modifiers: ["left_shift"],
    },
});

hyper2.bindKey({
    description: "left arrow",
    from: "h",
    to: {
        key_code: "left_arrow",
    },
});

hyper2.bindKey({
    description: "down arrow",
    from: "j",
    to: {
        key_code: "down_arrow",
    },
});

hyper2.bindKey({
    description: "up arrow",
    from: "k",
    to: {
        key_code: "up_arrow",
    },
});

hyper2.bindKey({
    description: "right arrow",
    from: "l",
    to: {
        key_code: "right_arrow",
    },
});

hyper2.bindKey({
    description: "to start of line",
    from: "semicolon",
    to: {
        key_code: "left_arrow",
        modifiers: ["left_gui"],
    },
});

hyper2.bindKey({
    description: "to end of the line",
    from: "quote",
    to: {
        key_code: "right_arrow",
        modifiers: ["left_gui"],
    },
});

karabiner.writeComplexRules();
