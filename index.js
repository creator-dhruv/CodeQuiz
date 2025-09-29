#!/usr/bin/node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import { saveApiKey, loadApiKey, removeApiKey } from "./config.js";
import { getTopicFromFile, generateQuestions } from "./gemini.js";
import { fileURLToPath } from "url";
import path from "path";

let playerName;
let score = 0;
let QuestionNumberFlag = false;
let QuestionNumber = 0
let ApiFlag = false;
let fileName;

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
    const rainbowTitle = chalkAnimation.rainbow('Welcome to CodeQuiz \n');
    rainbowTitle.stop();
    console.log(`
    I am a ${chalk.blue('Quiz Generator')} for your code related question.
    After ending the quiz, you get your ${chalk.green('Score')}

  `);
}

async function handleAnswer(isCorrect, answer) {
    const spinner = createSpinner('Checking answer...').start();
    await sleep(400);
    if (isCorrect) { score++ };
    spinner.stop()
}

async function askName() {
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player';
        },
    });
    playerName = answers.player_name;
}

async function askFileName() {
    const answers = await inquirer.prompt({
        name: 'file_name',
        type: 'input',
        message: 'What is your file name?',

    });
    fileName = answers.file_name;
}

async function numberOfQues() {
    const answers = await inquirer.prompt({
        name: 'question',
        type: 'input',
        message: 'How many questions you want (1-10)?',
        default() {
            return 5;
        },
    });
    if (answers.question < 1 || answers.question > 10) {
        QuestionNumberFlag = false
    } else {
        QuestionNumberFlag = true
    }
    QuestionNumber = answers.question;
}

async function getApiKey() {
    let apiKey = loadApiKey();

    if (!apiKey) {
        // Ask user only if not stored before
        const answer = await inquirer.prompt({
            type: "input", // hides input
            name: "apiKey",
            message: "Enter your Gemini API key:",
        });
        apiKey = answer.apiKey;
        saveApiKey(apiKey);
    } else {
        ApiFlag = true;
        console.log("Your API key is:", apiKey);
        const apiFlag = await inquirer.prompt({
            name: 'Change',
            type: 'list',
            message: 'Want to change API Key\n',
            choices: [
                'No',
                'Yes'
            ],
        });
        if (apiFlag.Change === 'Yes') {
            removeApiKey()
            ApiFlag = false;
        }
    }
    return;
}

// Example run


function winner() {
    console.clear();
    figlet(`Congrats , ${playerName?.split(" ")[0]} !\n \n Your  Score  ->   ${score}`, (err, data) => {
        console.log(gradient.pastel.multiline(data) + '\n');
        console.log(`${chalk.green(`Score -> ${score}`)}`);
        process.exit(1);
    });
}

async function dynamicQuestionsFlow(filePath) {
    console.log("📂 Reading file and predicting topic...");
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fullFileName = path.join(__dirname, filePath);
    const topic = await getTopicFromFile(fullFileName);
    console.log("📝 Predicted topic:", topic);
    console.log(`🎯 Generating quiz questions... \n \n `);
    const questions = await generateQuestions(topic, QuestionNumber);
    return questions;
}


async function codequiz() {
    console.clear();
    await welcome();
    await askName();
    while (!QuestionNumberFlag) { await numberOfQues() };
    while (!ApiFlag) { await getApiKey() };
    while (!fileName) { await askFileName() };
    const questions = await dynamicQuestionsFlow(fileName);
    for (const q of questions) {
        const answers = await inquirer.prompt({
            name: "answer",
            type: "list",
            message: q.question,
            choices: q.choices,
        });
        await handleAnswer(answers.answer === q.answer, q.answer);
    }
    if (questions.length > 0) { winner() };
}
codequiz();