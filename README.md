# CodeQuiz CLI 🎯

*Turn your code and notes into interactive quizzes with AI.*

## 📌 Problem

When we learn programming, we usually write code, run it, and move on.
But there’s no quick way to test our understanding of the concepts we just coded.

## 🚀 Solution

**CodeQuiz** is a command-line tool that takes your file (code, notes, or documentation), predicts the topic, and instantly generates multiple-choice quiz questions using **Gemini AI**.
It makes learning **interactive, fun, and personalized**.

## ✨ Features

* 🎨 Beautiful CLI interface with colors, animations, and ASCII art
* 🔑 Save and manage your Gemini API key securely
* 📂 Read any file (e.g., `.js`, `.py`, `.txt`, `.md`, `.pdf`*)
* 🧠 Predicts the **main topic + language** of your file
* ❓ Generates interactive multiple-choice quizzes (1–10 questions)
* 🏆 Real-time scoring with a celebratory end screen

*Currently best for text/code files.

## 🛠️ Installation

Clone the repo:

```bash
git clone https://github.com/your-username/codequiz-cli.git
cd codequiz-cli
```

Install dependencies:

```bash
npm install
```

Make it executable:

```bash
chmod +x codequiz.js
```

Run the tool:

```bash
./codequiz.js
```

Or with Node:

```bash
node codequiz.js
```

## 🔑 API Key Setup

CodeQuiz uses the **Gemini API**.

When you first run the tool, it will ask for your API key and save it securely in:

```
~/.gemini_config.json
```

You can also reset it anytime through the menu.

## 📖 Usage

Run the CLI:

```bash
node codequiz.js
```

Example flow:

1. Enter your name
2. Choose number of questions (1–10)
3. Provide or reuse your API key
4. Enter the file path (e.g., `loops.js`)
5. Solve the generated quiz right inside your terminal

Example command:

```bash
node codequiz.js
```

Output:

```
Welcome to CodeQuiz 🎉
What is your name? → Alice
How many questions? → 5
Enter your Gemini API key → ****
What is your file name? → loops.js
📂 Reading file and predicting topic...
📝 Predicted topic: Loops in JavaScript
🎯 Generating quiz questions...
```

Then you’ll get interactive questions like:

```
Q1: Which loop runs at least once, even if the condition is false?
→ do...while loop
```

And at the end:

```
Congrats, Alice! 🎉
Your Score → 4/5
```

## 📦 Project Structure

```
codequiz-cli/
├── codequiz.js      # Main CLI tool
├── gemini.js        # Gemini API integration
├── config.js        # API key save/load/remove
├── package.json
└── README.md
```

## 🎯 Use Cases

* Students testing concepts from their own code
* Educators creating quick quizzes from lecture notes
* Developers practicing from documentation
* Teams generating training questions on the fly

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

## 📜 License

[MIT](LICENSE)

---

💡 *CodeQuiz CLI — Where your files become your quiz.*
