const fs = require('fs');
const path = require('path');

function printManual() {
  console.log(`
  Usage: node createBoilerplate.js <directoryName> [-f | --font-awesome] [-h | --help]
  
  Creates a basic project boilerplate in the specified directory.
  Optionally, use -f or --font-awesome to include Font Awesome link in the HTML.
  
  Arguments:
    directoryName   Name of the directory to create and generate files.
    
  Options:
    -f, --font-awesome    Include Font Awesome link in the HTML.
    -h, --help            Display this help message.
  `);
}

// ANSI escape codes for text color
const ANSI_RESET = '\x1b[0m';
const ANSI_YELLOW = '\x1b[33m';
const ANSI_GREEN = '\x1b[32m';
const ANSI_BLUE = '\x1b[34m';

function createDirectory(directoryName) {
  if (!fs.existsSync(directoryName)) {
    fs.mkdirSync(directoryName);
    console.log(
      `${ANSI_GREEN}Created directory${ANSI_RESET} : ${ANSI_YELLOW}${directoryName}${ANSI_RESET}`
    );
  } else {
    console.log(`Directory "${directoryName}" already exists.`);
  }
}

function createFile(directoryPath, fileName, content = '') {
  const filePath = path.join(directoryPath, fileName);

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(
      `${ANSI_GREEN}Created file${ANSI_RESET}      : ${ANSI_YELLOW}${fileName}${ANSI_RESET}`
    );
  } else {
    console.log(`File "${fileName}" already exists.`);
  }
}

function createBoilerplate(directoryName, projectTitle, includeFontAwesome) {
  createDirectory(directoryName);

  const fontAwesomeLink = includeFontAwesome
    ? `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />`
    : '';

  const indexHTMLContent = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      ${fontAwesomeLink}
  
      <link rel="stylesheet" href="style.css" />
      <title>${projectTitle}</title>
    </head>
    <body>
      <h1>Project Starter</h1>
  
      <script src="script.js"></script>
    </body>
  </html>
`;

  const styleCSSContent = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

  * {
    box-sizing: border-box;
  }
  
  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
  }
`;

  const scriptJSContent = `
// Add your JavaScript code here
`;

  createFile(directoryName, 'index.html', indexHTMLContent);
  createFile(directoryName, 'style.css', styleCSSContent);
  createFile(directoryName, 'script.js', scriptJSContent);

  if (includeFontAwesome) {
    console.log(`${ANSI_GREEN}Font Awesome link included.${ANSI_RESET}`);
  }

  console.log(`${ANSI_GREEN}Boilerplate created successfully.${ANSI_RESET}`);
}

function formatDirectoryName(directoryName) {
  const withoutNumbersAndHyphen = directoryName.replace(/^\d+-/, '');
  const words = withoutNumbersAndHyphen.split('-');
  const capitalizedWords = words.map(
    word => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(' ');
}

const args = process.argv.slice(2);

if (args.includes('-h') || args.includes('--help')) {
  printManual();
} else if (args.length < 1) {
  console.error(
    'Please provide a directory name. Use -h or --help for usage instructions.'
  );
} else {
  const directoryName = args[0];
  const title = formatDirectoryName(directoryName);
  const includeFontAwesome =
    args.includes('-f') || args.includes('--font-awesome');
  createBoilerplate(directoryName, title, includeFontAwesome);
}
