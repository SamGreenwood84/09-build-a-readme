// Created a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {
  if (license) {
    // Implement logic to generate license badge based on the license
    return `[![License](https://img.shields.io/badge/License-${license}-blue.svg)](LICENSE)`;
  } else {
    return "";
  }
}

// Created a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license) {
    // Implement logic to generate license link based on the license
    return `[License](LICENSE)`;
  } else {
    return "";
  }
}

// Created a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license) {
    // Implement logic to generate license section based on the license
    return `## License\nThis project is licensed under the ${license} license.\n`;
  } else {
    return "";
  }
}

// Created a function to generate markdown for README
function generateMarkdown(data) {
  const licenseBadge = renderLicenseBadge(data.license);
  const licenseSection = renderLicenseSection(data.license);

  return `# ${data.title}
  ${licenseBadge}

  ## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [Collaboration](#collaborating)
  - [Contact](#contact)
  - [License](#license)
  
  ## Description
  ${data.description}
  
  ## Installation
  \`\`\`
  npm install ${data.title.toLowerCase().split(" ").join("-")}
  \`\`\`
  
  ## Usage
  ${
    data.commandUsage || "Provide examples of how to use the Command-line Input tool."
  }
  
  ## Features
  List the features of your Command-line Input tool.
  
  ## Collaboration
  ${data.collaboration}
  
  ## Contact
  - GitHub: [${data.githubUsername}](https://github.com/${data.githubUsername})
  - Email: [${data.email}](mailto:${data.email})
  
  ${licenseSection}
  
  ## Notes 
  ${data.additionalInformation || "No additional notes provided."}
`;
}

module.exports = generateMarkdown;

