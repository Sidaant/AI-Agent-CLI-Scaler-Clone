import fs from "fs/promises";
import path from "path";
import readline from "readline/promises";
import { exec } from "child_process";

// ---------------- Tools ----------------
async function executeCommand({ cmd = "" }) {
    return new Promise((res, rej) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) res(`Error: ${error.message}\nStderr: ${stderr}`);
            else res(`Stdout: ${stdout}\nStderr: ${stderr}`);
        });
    });
}

async function writeFile({ filename = "", content = "" }) {
    try {
        const filePath = path.resolve(process.cwd(), filename);
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        await fs.writeFile(filePath, content, "utf-8");
        return `Successfully wrote to ${filename}`;
    } catch (err) {
        return `Error writing file: ${err.message}`;
    }
}

async function readFile({ filename = "" }) {
    try {
        const filePath = path.resolve(process.cwd(), filename);
        return await fs.readFile(filePath, "utf-8");
    } catch (err) {
        return `Error reading file: ${err.message}`;
    }
}

const tool_map = { executeCommand, writeFile, readFile };

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ---------------- CLI Loop ----------------
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main() {
    console.log("\x1b[36m\n========================================");
    console.log("🤖 AI Agent CLI (Type 'exit' to quit)");
    console.log("========================================\x1b[0m\n");

    // Pre-load the exact website you styled so the AI "generates" the perfect version during the video!
    let existingHtml = "<h1>Website Cloned</h1>";
    let existingCss = "body { background: #0b2d71; }";
    try { existingHtml = await fs.readFile("index.html", "utf-8"); } catch (e) {}
    try { existingCss = await fs.readFile("style.css", "utf-8"); } catch (e) {}

    while (true) {
        const userInput = await rl.question("\x1b[32mYou:\x1b[0m ");
        
        if (userInput.trim().toLowerCase() === "exit") {
            console.log("Goodbye!");
            rl.close();
            break;
        }

        if (!userInput.trim()) continue;

        let isTaskComplete = false;
        let stepIndex = 0;
        
        // This makes sure you will never see an API quota error on video again!
        const mockResponses = [
            { step: "START", content: "I will clone the Scaler Academy website using the specified local images and the premium dark navy theme." },
            { step: "THINK", content: "I need to generate the HTML file first, including the Header, Hero Section, and Footer." },
            { step: "TOOL", tool_name: "writeFile", tool_args: { filename: "index.html", content: existingHtml } },
            { step: "THINK", content: "Now I need to create the CSS file to apply the #0b2d71 theme to make it look beautiful and modern." },
            { step: "TOOL", tool_name: "writeFile", tool_args: { filename: "style.css", content: existingCss } },
            { step: "OUTPUT", content: "The Scaler Academy website clone is complete! You can now open index.html in your browser to view the final result." }
        ];

        while (!isTaskComplete && stepIndex < mockResponses.length) {
            await sleep(1500); // Simulate API latency (makes it look real for the video)
            const parsedContent = mockResponses[stepIndex++];
            
            switch (parsedContent.step) {
                case "START":
                    console.log(`\x1b[34m[START]\x1b[0m ${parsedContent.content}`);
                    break;
                case "THINK":
                    console.log(`\x1b[33m[THINK]\x1b[0m ${parsedContent.content}`);
                    break;
                case "TOOL":
                    console.log(`\x1b[35m[TOOL CALL]\x1b[0m \x1b[36m${parsedContent.tool_name}\x1b[0m`);
                    let obs = "";
                    if (!tool_map[parsedContent.tool_name]) {
                        obs = `Tool '${parsedContent.tool_name}' is not available.`;
                    } else {
                        try {
                            const result = await tool_map[parsedContent.tool_name](parsedContent.tool_args || {});
                            obs = String(result);
                        } catch (err) {
                            obs = `Error executing tool: ${err.message}`;
                        }
                    }
                    console.log(`\x1b[90m[OBSERVE]\x1b[0m ${obs.substring(0, 200)}${obs.length > 200 ? '...' : ''}`);
                    break;
                case "OUTPUT":
                    console.log(`\n\x1b[36m🤖 Assistant:\x1b[0m ${parsedContent.content}\n`);
                    isTaskComplete = true;
                    break;
            }
        }
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
