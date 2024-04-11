import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';
function getUserInput() {
    return inquirer.prompt([
        {
            name: 'url',
            type: 'input',
            message: 'Enter the URL you want to generate a QR code for:',
            validate: function(value) {
                if (value.length) {
                    return true;
                } else {
                    return 'Please enter a URL.';
                }
            }
        }
    ]);
}
function generateQRCode(url) {
    const qrCode = qr.image(url, { type: 'png' });
    const output = fs.createWriteStream('QRCode.png');

    qrCode.pipe(output); // Save the QR code image as PNG

    fs.writeFile('URL.txt', url, (err) => {
        if (err) {
            console.error('Error saving the URL to a file:', err);
            return;
        }
        console.log('URL saved to URL.txt');
    });

    console.log('QR code generated and saved as QRCode.png');
}

async function main() {
    const userInput = await getUserInput();
    generateQRCode(userInput.url);
}
main(); 
