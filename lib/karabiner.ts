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
    key_code?: Key;
    shell_command?: string;
    modifiers?: Key[];
    lazy?: boolean;
    set_variable?: {
        name: string;
        value: number | string;
    };
}

/**
 * https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/frontmost-application/
 */
export interface FrontmostApplicationCondition {
    type: "frontmost_application_if" | "frontmost_application_unless";
    description?: string;
    bundle_identifiers?: string[];
    file_paths?: string[];
}

/**
 * https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/device/
 */
export interface DeviceCondition {
    type: "device_if" | "device_unless";
    identifiers: {
        vendor_id?: number;
        product_id?: number;
        location_id?: boolean;
        is_keyboard?: boolean;
        is_pointing_device?: boolean;
    }[];
}

/**
 * https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/variable/
 */
export interface VariableCondition {
    type: "variable_if" | "variable_unless";
    name: string;
    value: number | string;
}

export type Condition =
    | FrontmostApplicationCondition
    | DeviceCondition
    | VariableCondition;

/**
 * https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/
 */
export interface Manipulator {
    type: "basic";
    from: KeyPressFrom;
    to?: KeyPressTo[];
    to_if_alone?: KeyPressTo[];
    to_after_key_up?: KeyPressTo[];
    conditions?: Condition[];
}

export interface HyperKeyConfig {
    id: string;
    from: KeyPressFrom;
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

export class KarabinerComplexModifications {
    rules = [] as Rule[];
    title = "Deno Karabiner";
    id = "deno";

    constructor(options?: { title?: string; id?: string }) {
        if (options?.title) {
            this.title = options.title;
        }
        if (options?.id) {
            this.id = options.id;
        }
    }

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

    /**
     * In the format of
     * https://karabiner-elements.pqrs.org/docs/json/root-data-structure/#custom-json-file-in-configkarabinerassetscomplex_modifications
     */
    print() {
        console.log(
            JSON.stringify(
                { title: this.title, rules: this.getRules() },
                null,
                "    ",
            ),
        );
    }

    async writeToProfile(profileName: string, configPath?: string) {
        if (!configPath) {
            const homeDir = Deno.env.get("HOME");
            configPath = homeDir + "/.config/karabiner/karabiner.json";
        }

        const content = await Deno.readTextFile(configPath);

        const config: KarabinerConfig | undefined = JSON.parse(content);

        const profile = config?.profiles?.find((profile) => {
            return profile.name === profileName;
        });

        const availableProfiles =
            config?.profiles
                ?.map((profile) => {
                    return `"${profile.name}"`;
                })
                .join(", ") ?? "No profiles available";

        if (!profile) {
            throw new Error(
                `Could not find Karabiner profile profile "${profileName}". Available profiles: ${availableProfiles}`,
            );
        }

        if (!profile.complex_modifications) {
            profile.complex_modifications = {};
        }

        profile.complex_modifications.rules = this.getRules();

        await Deno.writeTextFile(
            configPath,
            JSON.stringify(config, null, "  "),
        );
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
    config: HyperKeyConfig;
    bindings: HyperKeyBinding[];

    constructor(name: string, manipulator: HyperKeyConfig) {
        this.id = manipulator.id;
        this.name = name;
        this.config = manipulator;
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
            description: `${this.id}: "${this.name}"`,
            manipulators: [
                {
                    type: "basic",
                    from: this.config.from,
                    to: [
                        {
                            set_variable: {
                                name: this.id,
                                value: 1,
                            },
                        },
                    ],
                    to_after_key_up: [
                        {
                            set_variable: {
                                name: this.id,
                                value: 0,
                            },
                        },
                    ],
                    to_if_alone: this.config.to_if_alone,
                },
            ],
        };
    }

    getKeyBindingRules(): Rule[] {
        return this.bindings.map((bin) => {
            return {
                description: `${this.id}: "${bin.from}" to ${bin.description}`,
                manipulators: [
                    {
                        type: "basic",
                        from: {
                            key_code: bin.from,
                        },
                        conditions: [
                            {
                                type: "variable_if",
                                name: this.id,
                                value: 1,
                            },
                        ],
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
