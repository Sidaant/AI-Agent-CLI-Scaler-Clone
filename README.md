# Assignment 02 — AI Agent CLI Tool

This is a conversational CLI agent similar to Cursor or Windsurf that accepts natural language instructions and produces real output files by reasoning through tasks in a loop.

## Setup Instructions

1. **Configure Environment Variables**:
   Open the `.env` file in the root directory and paste your Gemini API Key.
   *Note: You can get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).*
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   ```

2. **Run the CLI Agent**:
   Ensure you have Node.js installed, then open your terminal in this directory and run:
   ```bash
   node index.js
   ```

## How to Test the Scaler Clone Assignment

1. Start the CLI by running `node index.js`.
2. When prompted (`You:`), type the following instruction:
   > "Clone the Scaler Academy website by generating a fully working webpage using HTML, CSS, and JavaScript. Include a Header, Hero Section, and Footer. Make it look beautiful and visually resemble the Scaler website."
3. Watch the agent `THINK` and use the `writeFile` tool to create your `index.html`, `style.css`, and `script.js` files.
4. Once the agent is done, it will say `OUTPUT` and return control to you.
5. Open the generated `index.html` file in your browser to verify it works and looks good.

## Submission Checklist

### 1. GitHub Repository (2 Marks)
- Create a public GitHub repository.
- Commit all the files in this folder (except `node_modules` and `.env`) to the repository.
- Provide the public link on the course portal.

### 2. YouTube Demo Video (2 Marks)
- Record your screen for **2 to 3 minutes**.
- Start by showing the code structure briefly.
- Run `node index.js` in your terminal.
- Type the prompt asking the agent to clone the Scaler website.
- Show the agent actively generating the code (the THINK, TOOL, OBSERVE loop).
- Once completed, open the generated `.html` file in the browser to show the final result.
- Upload this video to YouTube as **Public** or **Unlisted** and submit the link.

### Marking Scheme Review (10 Points Total)
- GitHub Repository: 2
- YouTube Demo Video: 2
- Agent Loop & Reasoning (implemented via the JSON state machine loop): 2
- Quality of Cloned Website: 2 (Ensure the generated output looks like Scaler!)
- Code Quality & Documentation (Code is modularized and documented): 2
