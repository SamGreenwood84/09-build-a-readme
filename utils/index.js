const fs = require("fs");
const inquirer = require("inquirer");
const { webAppInput } = require("./input");

const isValidEmail = (email) => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
};

console.log("Hello Coders! Let's build-a-readme! Skip the boring part and just input your answers to our developer-approved questionnaire. Let's gooooo!");

// Function to dynamically load cliInput based on user input
function loadCliInput() {
  return require("./input").cliInput;
}

const InputQuestions = [
  {
    type: "list",
    name: "projectType",
    message: "Is your project a Command-line Input Tool or a Web Application?",
    choices: ["Command-line Input tool", "Web application"],
  },
  {
    type: "input",
    name: "title",
    message: "Add project title",
  },
  {
    type: "input",
    name: "description",
    message: "Add project description",
  },
  {
    type: "input",
    name: "installationInstructions",
    message: "Add detailed instructions for user install",
  },
  {
    type: "input",
    name: "usageInformation",
    message: "Add user experience and expectations",
    when: (answers) => answers.projectType === "Web application",
  },
  {
    type: "input",
    name: "commandUsage",
    message: "Add command-line usage examples for your application",
    when: (answers) => answers.projectType === "Command-line Input tool",
  },
  {
    type: "input",
    name: "collaboration",
    message: "Add collaboration parameters, instructions and contributors",
  },
  {
    type: "list",
    name: "license",
    message: "Add a license for your project:",
    choices: ["MIT", "Apache 2.0", "GPLv3", "BSD 3-Clause", "None"],
  },
  {
    type: "input",
    name: "githubUsername",
    message: "Add GitHub username, add a comma for more than one contributor",
  },
  {
    type: "input",
    name: "email",
    message: "Add Email Address:",
    validate: (input) => {
      return isValidEmail(input) || "Enter valid email address.";
    },
  },
  {
    type: "input",
    name: "projectUrl",
    message: "Add project URL",
    when: (answers) => answers.projectType === "Web application",
  },
  {
    type: "input",
    name: "additionalInformation",
    message: "Add any additional information",
  },
];

function generateReadme(answers) {
  const cliInput = loadCliInput();
  
  const readmeContent = answers.projectType === "Command-line Input tool"
    ? cliInput(answers)
    : webAppInput(answers);

  // Ensure readmeContent is a string
  return readmeContent ? readmeContent.toString() : '';
}

function writeToFile(filename, data) {
  const filePath = `${process.cwd()}/${filename}`;

  fs.writeFile(filePath, data, "utf8", (err) => {
    if (err) {
      console.log("Failed to create README.md");
      console.error(err);
    }
  });
}

function confirmAndGenerateReadme(answers) {
  console.log("Confirm your input:");
  console.log(JSON.stringify(answers, null, "  "));

  inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirmGeneration",
        message: "Have you confirmed the details? Ready?",
        default: true,
      },
    ])
    .then(({ confirmGeneration }) => {
      if (confirmGeneration) {
        const readmeContent = generateReadme(answers);
        writeToFile("README.md", readmeContent);
      } else {
        console.log("Unable to generate README. Try again from the beginning.");
      }
    });
}

function startQuestions() {
  inquirer.prompt(InputQuestions).then(confirmAndGenerateReadme);
}

startQuestions();

