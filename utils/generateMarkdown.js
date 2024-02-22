// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}
if (license) {
  // Implement logic to generate license badge based on the license
  return `[![License](https://img.shields.io/badge/License-${license}-blue.svg)](LICENSE)`;
} else {
  return "";
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {
  if (license) {
    // Implement logic to generate license section based on the license
    return `## License\nThis project is licensed under the ${license} license.\n`;
  } else {
    return "";
  }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {
  if (license) {
    // Implement logic to generate license section based on the license
    return `## License\nThis project is licensed under the ${license} license.\n`;
  } else {
    return "";
  }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const licenseBadge = renderLicenseBadge(data.license);
  const licenseSection = renderLicenseSection(data.license);

  return `# ${data.title}

`;
}

module.exports = generateMarkdown;
