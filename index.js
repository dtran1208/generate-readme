import inquirer from 'inquirer';
import fs from 'fs/promises';

function generateReadme(answers) {
    return `# ${answers.title}

${renderLicenseBadge(answers.license)}

## Description

${answers.description}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation

${answers.installation}

## Usage

${answers.usage}

## License

This project is covered under the ${answers.license} license.

## Contributing

${answers.contributing}

## Tests

${answers.tests}

## Questions

For any questions, please reach out to [${answers.github}](https://github.com/${answers.github}) or send an email to ${answers.email}.
`;
}

function renderLicenseBadge(license) {
    if (license === "MIT") {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else if (license === "GPLv3") {
        return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (license === "Apache 2.0") {
        return "[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else {
        return "";
    }
}

inquirer
    .prompt([
        {
            type: "input",
            name: "title",
            message: "What is your project title?",
        },
        {
            type: "input",
            name: "description",
            message: "Enter a description for your project:",
        },
        {
            type: "input",
            name: "installation",
            message: "Enter installation instructions:",
        },
        {
            type: "input",
            name: "usage",
            message: "Enter usage information:",
        },
        {
            type: "input",
            name: "contributing",
            message: "Enter contribution guidelines:",
        },
        {
            type: "input",
            name: "tests",
            message: "Enter test instructions:",
        },
        {
            type: "list",
            name: "license",
            message: "Choose a license for your application:",
            choices: ["MIT", "GPLv3", "Apache 2.0", "None"],
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub username:",
        },
        {
            type: "input",
            name: "email",
            message: "Enter your email address:",
        },
    ])
    .then((answers) => {
        const readmeContent = generateReadme(answers);
        fs.writeFile("README.md", readmeContent)
          .then(() => {
              console.log("README.md file generated successfully!");
          })
          .catch((err) => {
              console.error("Error writing README file: ", err);
          });
    });
