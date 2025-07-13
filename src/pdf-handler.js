import * as pdfjsLib from 'pdf-parse';

    async function extractTextFromPdf(file) {
      try {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);

        return new Promise((resolve, reject) => {
          fileReader.onload = async () => {
            try {
              const typedArray = new Uint8Array(fileReader.result);
              const pdf = await pdfjsLib(typedArray);
              let text = '';
              for (let i = 1; i <= pdf.numpages; i++) {
                const page = await pdf.getPage(i);
                text += await page.getTextContent().then(content => {
                  return content.items.map(item => item.str).join(' ');
                });
              }
              resolve(text);
            } catch (error) {
              reject(error);
            }
          };

          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      } catch (error) {
        console.error("Error reading PDF:", error);
        throw error;
      }
    }

    export { extractTextFromPdf };
