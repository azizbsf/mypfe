import https from 'https';
import fs from 'fs';
import path from 'path';
import { createWriteStream } from 'fs';

const MODEL_URL = 'https://alphacephei.com/vosk/models/vosk-model-small-en-us-0.15.zip';
const MODEL_DIR = path.join(__dirname, '../../models');

export const downloadModel = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Create models directory if it doesn't exist
    if (!fs.existsSync(MODEL_DIR)) {
      fs.mkdirSync(MODEL_DIR, { recursive: true });
    }

    const modelPath = path.join(MODEL_DIR, 'vosk-model-small-en-us-0.15.zip');
    const file = createWriteStream(modelPath);

    https.get(MODEL_URL, (response) => {
      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log('Model downloaded successfully');
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(modelPath, () => {}); // Delete the file if download fails
      reject(err);
    });
  });
}; 