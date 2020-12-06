import { HyperKey } from "./karabiner.ts";

interface BindingData {
    bindings: {
        hyperKeyId: string;
        keyCode: string;
        symbol: string;
    }[];
}

/**
 * Just get help from vscode and prettier
 */
export function html(strings: TemplateStringsArray, ...expr: string[]) {
    let str = "";
    strings.forEach((string, i) => {
        str += string + (expr[i] || "");
    });
    return str;
}

function clientCode() {
    let doc: any;

    // @ts-ignore Deno wtf? How to use dom types?
    doc = document;

    const data: BindingData = JSON.parse(doc.getElementById("data").innerHTML);

    const textEls = doc.getElementsByTagName("text");
    for (const el of textEls) {
        if (el.innerHTML === "todo") {
            el.innerHTML = "";
        }
    }

    for (const binding of data.bindings) {
        const key = `${binding.hyperKeyId}-${binding.keyCode}`;
        const el = doc.getElementById(key);

        if (el) {
            el.innerHTML = binding.symbol;
        }
    }

    doc.getElementById("svg").style.display = "block";
}

function htmlTemplate(ctx: { svg: string; script: string; data: BindingData }) {
    return html`
        <!DOCTYPE html>
        <html>
            <head>
                <title>Karabiner: Hyper Key Bingings</title>
                <style>
                    #svg,
                    h1 {
                        margin: 1rem;
                    }
                </style>
            </head>
            <body>
                <h1>Karabiner: Hyper Key Bindings</h1>
                <div id="svg" style="display: none">${ctx.svg}</div>
                <script id="data" type="application/json">
                    ${JSON.stringify(ctx.data)}
                </script>
                <script>
                    (${ctx.script})();
                </script>
            </body>
        </html>
    `;
}

export async function writeHyperKeyImage(options: {
    hyperKeys: HyperKey[];
    inputSVGPath: string;
    ouputHTMLPath: string;
}) {
    const svg = await Deno.readTextFile(options.inputSVGPath);

    const bindings = options.hyperKeys.flatMap((hyper) => {
        return hyper.getBindings().map((binding) => {
            return {
                hyperKeyId: hyper.id,
                keyCode: binding.from,
                symbol: binding.symbol ?? binding.description.slice(0, 5),
            };
        });
    });

    await Deno.writeTextFile(
        options.ouputHTMLPath,
        htmlTemplate({
            svg,
            script: clientCode.toString(),
            data: {
                bindings,
            },
        }),
    );
}
