import { downloadModel } from '../utils/downloadModel';

console.log('Starting model download...');
downloadModel()
  .then(() => {
    console.log('Model download completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error downloading model:', error);
    process.exit(1);
  }); 