import { initializeCanvas, addShape, addText, addImage, clearCanvas } from './canvas-handler.js';
    import { extractTextFromPdf } from './pdf-handler.js';
    import * as fabric from 'fabric';

    document.addEventListener('DOMContentLoaded', () => {
      const canvas = initializeCanvas();
      const pdfUpload = document.getElementById('pdf-upload');
      const aiPromptTextarea = document.getElementById('ai-prompt-textarea');
      const generateButton = document.getElementById('generate-button');
      const addShapeButton = document.getElementById('add-shape-button');
      const addTextButton = document.getElementById('add-text-button');
      const exportButton = document.getElementById('export-button');
      const newDesignButton = document.getElementById('new-design-button');

      addShapeButton.addEventListener('click', () => addShape('rect'));
      addTextButton.addEventListener('click', () => addText());

      pdfUpload.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
          try {
            const text = await extractTextFromPdf(file);
            aiPromptTextarea.value = text;
            clearCanvas();
            addText(text);
          } catch (error) {
            console.error('Error extracting text from PDF:', error);
            alert('Failed to extract text from PDF. Please try again.');
          }
        } else {
          alert('Please upload a valid PDF file.');
        }
      });

      generateButton.addEventListener('click', () => {
        const prompt = aiPromptTextarea.value;
        addText(`AI Prompt: ${prompt}`);
      });

      exportButton.addEventListener('click', () => {
        const imageData = canvas.toDataURL({
          format: 'png',
          quality: 0.8
        });

        const link = document.createElement('a');
        link.href = imageData;
        link.download = 'design.png';
        link.click();
      });

      newDesignButton.addEventListener('click', () => {
        clearCanvas();
      });
    });
