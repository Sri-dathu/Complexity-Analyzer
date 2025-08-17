import Tesseract from 'tesseract.js';

export async function processOCR(file: File): Promise<string> {
  try {
    const result = await Tesseract.recognize(file, 'eng', {
      logger: m => console.log(m)
    });
    
    return result.data.text;
  } catch (error) {
    console.error('OCR processing failed:', error);
    throw new Error('Failed to extract text from image');
  }
}