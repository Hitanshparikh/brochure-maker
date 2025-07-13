import { fabric } from 'fabric';

    let canvas = null;

    function initializeCanvas(canvasId = 'canvas', width = 800, height = 600) {
      canvas = new fabric.Canvas(canvasId, {
        width: width,
        height: height,
        backgroundColor: '#ffffff',
      });
      return canvas;
    }

    function addShape(type) {
      let shape;
      switch (type) {
        case 'rect':
          shape = new fabric.Rect({
            left: 100,
            top: 100,
            width: 100,
            height: 100,
            fill: '#0ea5e9',
          });
          break;
        case 'circle':
          shape = new fabric.Circle({
            left: 100,
            top: 100,
            radius: 50,
            fill: '#0ea5e9',
          });
          break;
        default:
          console.warn('Unknown shape type:', type);
          return;
      }
      canvas.add(shape);
      canvas.setActiveObject(shape);
    }

    function addText(text = 'Double click to edit') {
      const textObj = new fabric.IText(text, {
        left: 100,
        top: 100,
        fontSize: 20,
        fill: '#000000',
      });
      canvas.add(textObj);
      canvas.setActiveObject(textObj);
    }

    function addImage(url) {
      fabric.Image.fromURL(url, (img) => {
        img.scaleToWidth(200);
        canvas.add(img);
        canvas.setActiveObject(img);
      });
    }

    function clearCanvas() {
      canvas.clear();
      canvas.backgroundColor = '#ffffff';
    }

    export { initializeCanvas, addShape, addText, addImage, clearCanvas };
