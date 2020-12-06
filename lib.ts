export type Key =
    | "right_command"
    | "right_control"
    | "right_command"
    | "right_option"
    | "right_shift"
    | "right_alt"
    | "left_command"
    | "left_control"
    | "left_command"
    | "left_option"
    | "left_shift"
    | "left_alt"
    | "left_gui"
    | "caps_lock"
    | "delete_forward"
    | "return_or_enter"
    | "spacebar"
    | "left_arrow"
    | "right_arrow"
    | "up_arrow"
    | "down_arrow"
    | "grave_accent_and_tilde"
    | "non_us_pound"
    | "delete_or_backspace"
    | "non_us_backslash"
    | "application"
    | "semicolon"
    | "quote"
    | "escape"
    | "open_bracket"
    | "close_bracket"
    | "slash"
    | "period"
    | "comma"
    | "equal_sign"
    | "hyphen"
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "7"
    | "8"
    | "9"
    | "0"
    | "q"
    | "w"
    | "e"
    | "r"
    | "t"
    | "y"
    | "u"
    | "i"
    | "o"
    | "p"
    | "a"
    | "s"
    | "d"
    | "f"
    | "g"
    | "h"
    | "j"
    | "k"
    | "l"
    | "z"
    | "x"
    | "c"
    | "v"
    | "b"
    | "n"
    | "m";

export interface KeyPressFrom {
    key_code: Key;
    modifiers?: {
        mandatory?: Key[];
        optional?: any;
    };
}

export interface KeyPressTo {
    key_code: Key;
    modifiers?: Key[];
}

export interface Manipulator {
    type: "basic";
    from: KeyPressFrom;
    to: KeyPressTo[];
    to_if_alone?: KeyPressTo[];
}

export interface HyperManipulator {
    from: KeyPressFrom;
    to: KeyPressTo;
    to_if_alone?: KeyPressTo[];
}

export interface Rule {
    description: string;
    manipulators: Manipulator[];
}
//   {
//     description: "HYPER: semi colon",
//     manipulators: [
//       {
//         from: {
//           key_code: "n",
//           modifiers: {
//             mandatory: [
//               "right_control",
//               "right_command",
//               "right_option",
//             ],
//           },
//         },
//         to: [
//           {
//             key_code: "comma",
//             modifiers: ["left_shift"],
//           },
//         ],
//         type: "basic",
//       },
//     ],
//   },

export class Rules {
    hyperKeys = [] as HyperKey[];
    rawRules = [] as Rule[];

    addRule(rule: Rule) {
        this.rawRules.push(rule);
    }

    addHyperKey(key: HyperKey) {
        this.hyperKeys.push(key);
    }

    getRules(): Rule[] {
        const rules: Rule[] = [];
        rules.push(...this.rawRules);

        for (const key of this.hyperKeys) {
            rules.push(key.getRule());
        }

        for (const key of this.hyperKeys) {
            rules.push(...key.getKeyBindingRules());
        }

        return rules;
    }
}

export interface HyperKeyBinding {
    description: string;
    from: Key;
    to: KeyPressTo | KeyPressTo[];
}

export class HyperKey {
    name: string;
    manipulator: HyperManipulator;
    bindings: HyperKeyBinding[];

    constructor(name: string, manipulator: HyperManipulator) {
        this.name = name;
        this.manipulator = manipulator;
        this.bindings = [];
    }

    bindKey(newBinding: HyperKeyBinding) {
        const existing = this.bindings.find((bin) => {
            return newBinding.from === bin.from;
        });

        if (existing) {
            throw new Error(
                `Cannot bind "${newBinding.description}" "${newBinding.from}" is already defined for hyper key "${this.name}" with "${existing.description}"`,
            );
        }

        this.bindings.push(newBinding);
    }

    getRule(): Rule {
        return {
            description: "HYPER: " + this.name,
            manipulators: [
                {
                    type: "basic",
                    from: this.manipulator.from,
                    to: [this.manipulator.to],
                },
            ],
        };
    }

    getKeyBindingRules(): Rule[] {
        return this.bindings.map((bin) => {
            return {
                description: `HYPER: '${this.name}' to '${bin.description}'`,
                manipulators: [
                    {
                        type: "basic",
                        from: {
                            key_code: bin.from,
                            modifiers: {
                                mandatory: [
                                    this.manipulator.to.key_code,
                                    ...(this.manipulator.to.modifiers ?? []),
                                ],
                            },
                        },
                        to: [bin.to].flat(),
                    },
                ],
            };
        });
    }
}
