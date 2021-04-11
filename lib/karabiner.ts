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
    | "insert"
    | "pause"
    | "home"
    | "end"
    | "scroll_lock"
    | "print_screen"
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
        optional?: (Key | "any")[];
    };
}

export interface KeyPressTo {
    key_code?: Key;
    shell_command?: string;
    modifiers?: Key[];
    lazy?: boolean;
    halt?: boolean;
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

/**
 * https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/conditions/
 */
export type Condition =
    | FrontmostApplicationCondition
    | DeviceCondition
    | VariableCondition;

export interface AltCondition {
    disable: Condition[];
    enable: Condition[];
}

/**
 * https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/
 */
export interface Manipulator {
    type: "basic";
    from: KeyPressFrom;
    to?: KeyPressTo[];
    to_if_alone?: KeyPressTo[];
    to_after_key_up?: KeyPressTo[];
    to_if_held_down?: KeyPressTo[];

    /**
     * https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to-delayed-action/
     */
    to_delayed_action?: {
        to_if_invoked?: KeyPressTo[];
        to_if_canceled?: KeyPressTo[];
    };

    conditions?: Condition[];
}

export interface HyperKeyConfig {
    id: string;
    description: string;
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
    /**
     * Key to bind the hyper key to
     */
    key: Key;

    /**
     * Emit these
     */
    to: KeyPressTo | KeyPressTo[];

    conditions?: Condition[];

    /**
     * Allow duplicate defition for the same key. Set to true if you want
     * different behaviour using the conditions
     */
    allowDuplicate?: boolean;
}

/**
 * https://karabiner-elements.pqrs.org/docs/json/extra/virtual-modifier/
 */
export class VirtualModifier {
    id: string;
    from: KeyPressFrom;

    constructor(id: string, from: KeyPressFrom) {
        this.id = id;
        this.from = from;
    }

    getManipulator(extensions: Partial<Manipulator>): Manipulator {
        return {
            ...extensions,
            type: "basic",
            from: this.from,
            to: [
                {
                    set_variable: {
                        name: this.id,
                        value: 1,
                    },
                },
                ...(extensions.to ?? []),
            ],
            to_after_key_up: [
                {
                    set_variable: {
                        name: this.id,
                        value: 0,
                    },
                },
                ...(extensions.to_after_key_up ?? []),
            ],
        };
    }

    getCondition(): VariableCondition {
        return {
            type: "variable_if",
            name: this.id,
            value: 1,
        };
    }
}

export class HyperKey {
    config: HyperKeyConfig;
    bindings: HyperKeyBinding[];
    virtualModifier: VirtualModifier;
    id: string;

    constructor(config: HyperKeyConfig) {
        this.config = config;
        this.id = config.id;
        this.virtualModifier = new VirtualModifier(this.id, config.from);
        this.bindings = [];
    }

    bindKey(newBinding: HyperKeyBinding) {
        let existing;

        if (!newBinding.allowDuplicate) {
            existing = this.bindings.find((bin) => {
                return newBinding.key === bin.key;
            });
        }

        if (existing) {
            throw new Error(
                `Cannot bind "${newBinding.description}" "${newBinding.key}" is already defined for hyper key "${this.config.description}" with "${existing.description}"`,
            );
        }

        this.bindings.push(newBinding);

        return {
            binding: newBinding,
            alt: this.bindAlt.bind(this, newBinding),
        };
    }

    bindAlt(
        existing: HyperKeyBinding,
        options: AltCondition,
        alt: Partial<HyperKeyBinding>,
    ) {
        const existingConditions = [...(existing.conditions ?? [])];

        if (existing.conditions) {
            existing.conditions.push(...options.disable);
        } else {
            existing.conditions = options.disable;
        }

        const newBinding: HyperKeyBinding = {
            ...existing,
            ...alt,
            conditions: [...existingConditions, ...options.enable],
        };

        this.bindings.push(newBinding);
    }

    getBindings() {
        return this.bindings;
    }

    getHyperKeyRule(): Rule {
        return {
            description: `${this.config.id}: "${this.config.description}"`,
            manipulators: [
                this.virtualModifier.getManipulator({
                    to_if_alone: this.config.to_if_alone,
                }),
            ],
        };
    }

    getKeyBindingRules(): Rule[] {
        return this.bindings.map((bin) => {
            const customConditions = bin.conditions || [];

            return {
                description: `${this.id}: "${bin.key}" to ${bin.description}`,
                manipulators: [
                    {
                        type: "basic",
                        from: {
                            key_code: bin.key,
                            modifiers: this.config.from.modifiers,
                        },
                        conditions: [
                            this.virtualModifier.getCondition(),
                            ...customConditions,
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

let sequence = 0;
export function doubleTap(options: {
    description: string;
    key_code: Key;
    to: KeyPressTo[];
}): Rule {
    // const varName = "dtap-" + String(++sequence);

    const varName = "dtap";

    return {
        description: options.description,
        manipulators: [
            {
                type: "basic",
                conditions: [
                    {
                        type: "variable_if",
                        name: varName,
                        value: 1,
                    },
                ],
                from: {
                    key_code: options.key_code,
                },
                to: [
                    ...options.to,
                    {
                        halt: true,
                        set_variable: {
                            name: varName,
                            value: 0,
                        },
                    },
                ],
            },

            {
                type: "basic",
                from: {
                    key_code: options.key_code,
                },
                to: [
                    {
                        set_variable: {
                            name: varName,
                            value: 1,
                        },
                    },
                ],
                to_delayed_action: {
                    to_if_invoked: [
                        {
                            set_variable: {
                                name: varName,
                                value: 0,
                            },
                        },
                        {
                            key_code: options.key_code,
                        },
                    ],
                    to_if_canceled: [
                        {
                            set_variable: {
                                name: varName,
                                value: 0,
                            },
                        },
                        // {
                        //     key_code: options.key_code,
                        // },
                    ],
                },
            },
        ],
    };
}
