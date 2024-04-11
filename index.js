import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';

// Your code using ES module syntax


// Function to get the URL from the user
function getUserInput() {
    return inquirer.prompt([
        {
            name: 'url',
            type: 'input',
            message: 'Enter the URL you want to generate a QR code for:',
            validate: function(value) {
                // Basic validation to check if the input is not empty
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter a URL.';
                }
            }
        }
    ]);
}

// Function to generate the QR code and save it
function generateQRCode(url) {
    const qrCode = qr.image(url, { type: 'png' });
    const output = fs.createWriteStream('QRCode.png');

    qrCode.pipe(output); // Save the QR code image as PNG

    // Also save the URL to a txt file
    fs.writeFile('URL.txt', url, (err) => {
        if (err) {
            console.error('Error saving the URL to a file:', err);
            return;
        }
        console.log('URL saved to URL.txt');
    });

    console.log('QR code generated and saved as QRCode.png');
}

// Main function to run the program
async function main() {
    const userInput = await getUserInput();
    generateQRCode(userInput.url);
}

main(); // Execute the program
