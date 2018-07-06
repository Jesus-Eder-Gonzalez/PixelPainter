function pixelPainter(width, height) {
  //function variables
  let color = colorShades();
  let size = 40;
  let row = height;
  let col = width;
  let mousedown = false;
  let fill = false;
  let tableRowsArray;

  //function created DOM elements
  let pixelPaint = document.getElementById('pixelPainter');
  let pixelCanvas = document.createElement('Table');
  pixelCanvas.id = 'pixelCanvas';
  let canvasContainer = document.createElement('div');
  canvasContainer.id = 'tableContainer';
  let paletteContainer = document.createElement('div');
  paletteContainer.id = 'paletteContainer';
  let palette = document.createElement('Table');

  //call my event listeners
  eventHandlers();

  //create and attach the palette
  makeTable(palette, 20, 6, 15, getColor, undefined, colorShades);
  paletteContainer.append(palette);

  //calls the function that makes all the buttons in pixel painter
  makeButtons();

  //create and attach the pixels
  makeTable(pixelCanvas, row, col, size, setColor, eventColor, undefined, 'pixels');

  pixelPaint.append(paletteContainer);
  canvasContainer.append(pixelCanvas);
  pixelPaint.append(canvasContainer);

  //function methods to create the tables, modify the background color, and event handlers
  function makeTable(tableToAppend, rows, cols, size, onclick, onhover, background, tdClass) {

    //This double for loop creates the rows and then the columns in the table, it also assigns id, class, and other attributes
    for (let i = 0; i < rows; i++) {

      let tempRow = document.createElement('tr');
      tempRow.id = i;

      for (let j = 0; j < cols; j++) {

        let temp = document.createElement('td');
        temp.style.width = size;
        temp.style.height = size;
        temp.style.border = 'thin solid black';
        temp.id = j;

        //Optional parameters
        if (tdClass) {
          temp.setAttribute('class', tdClass);
        }

        if (onclick) {
          temp.addEventListener('click', onclick);
        }

        if (onhover) {
          temp.addEventListener('mouseover', onhover);
        }

        if (background) {
          temp.style.backgroundColor = background();
        } else {
          temp.style.backgroundColor = 'white';
        }

        tempRow.append(temp);
      }
      tableToAppend.appendChild(tempRow);
    }
  }

  function makeButtons() {
    let currentColor = document.createElement('div');
    currentColor.id = 'currentColor';
    currentColor.style.border = 'thick solid white';
    currentColor.style.padding = '10px';
    currentColor.innerHTML = color.toString();
    currentColor.style.background = color;

    let erase = document.createElement('button');
    erase.innerText = 'ERASE';
    erase.addEventListener('click', function () {
      color = 'white'
      currentColor.style.background = color;
      currentColor.innerHTML = color.toString();
      currentColor.style.color = oppositeColor(color);

    });
    erase.addEventListener('dblclick', function () {
      color = 'transparent'
      currentColor.style.background = color;
      currentColor.innerHTML = color.toString();
      currentColor.style.color = 'black';
    });


    let clear = document.createElement('button');
    clear.innerText = 'CLEAR';
    clear.addEventListener('click', function () {

      let clearCells = pixelCanvas.getElementsByTagName('td');

      for (let i = 0; i < clearCells.length; i++) {
        if (clearCells[i].style.backgroundColor !== 'white') {
          clearCells[i].style.backgroundColor = 'white';
        }
      }
    });

    let fillBut = document.createElement('button');
    fillBut.innerText = 'FILL';
    fillBut.addEventListener('click', function () {
      fill = true;
    });

    paletteContainer.append(currentColor);
    paletteContainer.append(fillBut);
    paletteContainer.append(erase);
    paletteContainer.append(clear);
  }

  function setColors() {

    let red = parseInt(Math.random() * 255);
    let green = parseInt(Math.random() * 255);
    let blue = parseInt(Math.random() * 255);

    return 'rgb(' + red + ',' + green + ',' + blue + ')';

  }

  function eventHandlers() {

    document.addEventListener('mousedown', e => {

      if (e.type === 'mousedown') {
        mousedown = true;

        if (e.target.className === 'pixels' && !fill) {
          setColor(e);
        }

      }
    }, false);

    document.addEventListener('mouseup', e => {
      if (e.type === 'mouseup') {
        mousedown = false;
      }
    }, false);
  }

  function eventColor(event) {
    if (!fill && mousedown) {
      setColor(event);
    }
  }

  function setColor(element) {

    if (fill) {

      fillPixels(element);
      fill = false;

    } else if (element.target) {

      element.target.style.backgroundColor = color;

    }


  }

  function fillPixels(element) {

    let targetColor = element.target.style.backgroundColor;

    let fillCells = pixelCanvas.getElementsByTagName('td');

    for (let i = 0; i < fillCells.length; i++) {
      if (element.target === fillCells[i]) {
        findCells(targetColor, i, fillCells);
      }
    }


  }

  function findCells(targetBackgroundColor, currentPosition, tableArray) {
    let above = currentPosition - width;
    let current = currentPosition;
    let below = currentPosition + width;
    let edgeCaseStart = -1;
    let edgeCaseEnd = 2;

    if (currentPosition%width === 0){
      edgeCaseStart++;
    } else if(currentPosition%width === width-1) {
      edgeCaseEnd--;
    }

    let tempArray = [above, current, below];

    for (let temp of tempArray) {
      for (let i = temp + edgeCaseStart; i < temp + edgeCaseEnd; i++) {


        if ((i > -1)
          && (i < tableArray.length)
          && (targetBackgroundColor === tableArray[i].style.backgroundColor)) {
            
          tableArray[i].style.backgroundColor = color;
          findCells(targetBackgroundColor, i, tableArray);

        }
      }
    }

  }

  function getColor() {
    let colorDiv = document.getElementById('currentColor');
    color = this.style.backgroundColor;
    colorDiv.style.background = color;
    colorDiv.style.color = oppositeColor(color);

  }

  function oppositeColor(colorToChange) {
    let colors = colorToChange.substring(4, colorToChange.length - 1).split(',');
    return 'rgb(' + (255 - colors[0]) + ',' + (255 - colors[1]) + ',' + (255 - colors[2]) + ')';
  }

  function colorShades(){
    let hue =  parseInt(Math.random()*360);
    const saturation = parseInt(Math.random()*40)+60;
    let light = parseInt(Math.random()*50)+25;
    return 'hsl(' + hue+','+saturation+'%,'+light+'%)';
  }

  // function colorShades(color) {
  //   // console.log(color);
  //   let colorShade;
  //   // let gradient = parseInt((150/height))*step;
  //   // console.log(gradient);
  //   switch (color) {
  //     case 0:
  //     colorShade = 'transparent';
  //     break;
  //     case 1:
  //     colorShade = [255,0,0];
  //     break;
  //     case 2:
  //     colorShade = [255,128,0];
  //     break;
  //     case 3:
  //     colorShade = [255,255,0];
  //     break;
  //     case 4:
  //     colorShade = [128,255,0];
  //     break;
  //     default:
  //     colorShade = setColors();
  //     console.log(colorShade);
  //     break;
  //   }

  //   return 'rgb(' + colorShade[0] + ',' + colorShade[1] + ',' + colorShade[2] + ')';
  // }
}

pixelPainter(25, 20);