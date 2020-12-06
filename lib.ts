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
    | "delete_forward"
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
    id: string;
    from: KeyPressFrom;
    to: KeyPressTo;
    to_if_alone?: KeyPressTo[];
}

export interface Rule {
    description: string;
    manipulators: Manipulator[];
}

export interface KarabinerConfig {
    global?: any;
    profiles?: {
        name?: string;
        complex_modifications?: {
            parameters?: any;
            rules?: Rule[];
        };
    }[];
}

export class KarabinerComplexRules {
    rules = [] as Rule[];

    addRule(rule: Rule | Rule[]) {
        if (Array.isArray(rule)) {
            this.rules.push(...rule);
        } else {
            this.rules.push(rule);
        }
    }

    getRules(): Rule[] {
        const rules: Rule[] = [];

        for (const rule of this.rules) {
            if (rule instanceof HyperKey) {
                rules.push(rule.getHyperKeyRule());
                rules.push(...rule.getKeyBindingRules());
            } else {
                rules.push(rule);
            }
        }

        return rules;
    }

    print() {
        console.log(JSON.stringify(this.getRules(), null, "    "));
    }

    async writeToProfile(profileName: string) {
        const homeDir = Deno.env.get("HOME");
        const confPath = homeDir + "/.config/karabiner/karabiner.json";

        const content = await Deno.readTextFile(confPath);

        const config: KarabinerConfig | undefined = JSON.parse(content);

        const profile = config?.profiles?.find((profile) => {
            return profile.name === profileName;
        });

        const availableProfiles = config?.profiles
            ?.map((profile) => {
                return `"${profile.name}"`;
            })
            .join(", ");

        if (!profile) {
            throw new Error(
                `Could not find Karabiner profile profile "${profileName}". Available profiles: ${availableProfiles}`,
            );
        }

        if (!profile.complex_modifications) {
            profile.complex_modifications = {};
        }

        profile.complex_modifications.rules = this.getRules();

        await Deno.writeTextFile(confPath, JSON.stringify(config, null, "  "));
    }
}

export interface HyperKeyBinding {
    /**
     * Description for Karabiner
     */
    description: string;
    /**
     * Symbol for the image generator
     */
    symbol?: string;
    from: Key;
    to: KeyPressTo | KeyPressTo[];
}

export class HyperKey {
    name: string;
    id: string;
    manipulator: HyperManipulator;
    bindings: HyperKeyBinding[];

    constructor(name: string, manipulator: HyperManipulator) {
        this.id = manipulator.id;
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

    getBindings() {
        return this.bindings;
    }

    getHyperKeyRule(): Rule {
        return {
            description: "HYPER: " + this.name,
            manipulators: [
                {
                    type: "basic",
                    from: this.manipulator.from,
                    to: [this.manipulator.to],
                    to_if_alone: this.manipulator.to_if_alone,
                },
            ],
        };
    }

    getModifiers(): Key[] {
        return [
            this.manipulator.to.key_code,
            ...(this.manipulator.to.modifiers ?? []),
        ];
    }

    getKeyBindingRules(): Rule[] {
        return this.bindings.map((bin) => {
            return {
                description: `HYPER: "${this.name}" + "${bin.from}" to "${bin.description}"`,
                manipulators: [
                    {
                        type: "basic",
                        from: {
                            key_code: bin.from,
                            modifiers: {
                                mandatory: this.getModifiers(),
                            },
                        },
                        to: [bin.to].flat(),
                    },
                ],
            };
        });
    }

    getRules() {
        return [this.getHyperKeyRule(), ...this.getKeyBindingRules()];
    }
}
