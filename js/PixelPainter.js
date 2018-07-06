function pixelPainter(width, height) {
  //function variables
  let color = 'white';
  let size = 40;
  let row = height;
  let col = width;
  let mousedown = false;
  let fill = false;
  let tableCellsArray;

  //function created DOM elements
  let pixel = document.getElementById('pixelPainter');
  let table = document.createElement('Table');
  table.id = 'pixelCanvas';

  let tableContainer = document.createElement('div');
  tableContainer.id = 'tableContainer';
  let paletteContainer = document.createElement('div');
  paletteContainer.id = 'paletteContainer';
  let palette = document.createElement('Table');

  //call my event listeners
  eventHandlers();

  //create and attach the palette
  makeTable(palette, 20, 12, 15, getColor, undefined, colorShades);
  paletteContainer.append(palette);

  //calls the function that makes all the buttons in pixel painter
  makeButtons();



  //create and attach the pixels
  makeTable(table, row, col, size, setColor, eventColor, undefined, 'pixels');


  pixel.append(paletteContainer);
  tableContainer.append(table);
  pixel.append(tableContainer);

  tableCellsArray = table.getElementsByTagName('td');


  //function methods to create the tables, modify the background color, and event handlers
  function makeTable(tableToAppend, rows, cols, size, onclick, onhover, background, tdClass) {
    for (let i = 0; i < rows; i++) {
      let tempRow = document.createElement('tr');
      for (let j = 0; j < cols; j++) {
        let temp = document.createElement('td');
        temp.style.width = size;
        temp.style.height = size;
        temp.style.border = 'thin solid black';
        if (tdClass) {
          temp.setAttribute('id', tdClass);
        }
        if (onclick) {
          temp.addEventListener('click', onclick);
          temp.addEventListener('mouseover', onhover);
        }
        if (background) {
          temp.style.backgroundColor = background(i+j);
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
    currentColor.style.border = 'thin solid black';
    currentColor.style.padding = '10px';
    currentColor.innerText = 'CURRENT';
    currentColor.style.background = 'white';

    let erase = document.createElement('button');
    erase.innerText = 'ERASE';
    erase.addEventListener('click', function () {
      color = 'white'
    });

    let clear = document.createElement('button');
    clear.innerText = 'CLEAR';
    clear.addEventListener('click', function () {

      let clearCells = table.getElementsByTagName('td');

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
    // const color = red.toString(16) + green.toString(16) + blue.toString(16);
    return [red,green,blue];
  }
  
  function colorShades(color){
    let colorShade;
    let hue =  parseInt(Math.random()*360);
    const saturation = parseInt(Math.random()*10)+90;
    let light = parseInt(Math.random()*40)+25;
    return 'hsl(' + hue+','+saturation+'%,'+light+'%)';
  }
  // function colorShades(color) {
  //   // console.log(color);
  //   let colorShade;
  //   // let gradient = parseInt((150/height))*step;
  //   // console.log(gradient);
  //   switch (color) {
  //     case 0:
  //     colorShade = 'HelloWorld';
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

  function eventHandlers() {

    document.addEventListener('mousedown', e => {
      if (e.type === 'mousedown') {
        mousedown = true;

        if (e.target.id == 'pixels' && !fill) {
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
    if (!fill) {
      if (mousedown) {
        setColor(event);
      }
    }
  }

  function setColor(element) {

    if (fill) {
      fillPixels(element);
      fill = false;
    } else {
      if (element.target) {
        element.target.style.backgroundColor = color;
      }
    }


  }

  function fillPixels(element) {
    let targetColor;

    if (element.target.style.backgroundColor) {
      targetColor = element.target.style.backgroundColor;
    } else {
      targetColor = 'white';
    }

    let fillCells = table.getElementsByTagName('td');

    for (let i = 0; i < fillCells.length; i++) {
      if (element.target === fillCells[i]) {
        findCells(targetColor, i, fillCells);
      }
    }


  }

  function findCells(tColor, currentPosition, tableArray) {
    let above = currentPosition - width;
    let current = currentPosition;
    let below = currentPosition + width;


    let tempArray = [above, current, below];

    for (let temp of tempArray) {
      for (let i = temp - 1; i < temp + 2; i++) {


        if ((i > -1) && (i < tableArray.length)) {

          if (tColor === tableArray[i].style.backgroundColor && tableArray[i].style.backgroundColor) {
            tableArray[i].style.backgroundColor = color;
            if ((!(i % width === 0)) && (!(i % width === width - 1))) {
              findCells(tColor, i, tableArray);
            }


          } else if (!tableArray[i].style.backgroundColor && tColor === 'white') {
            tableArray[i].style.backgroundColor = color;
            if ((!(i % width === 0)) && (!(i % width === width - 1))) {
              findCells(tColor, i, tableArray);
            }
          }

        }
      }
    }

  }

  function getColor() {
    let colorStatusBox = document.getElementById('currentColor');
    color = this.style.backgroundColor;
    colorStatusBox.style.background = color;
    colorStatusBox.style.color = oppositeColor(color);

  }

  function oppositeColor(colorToChange) {
    let colors = colorToChange.substring(4, colorToChange.length - 1).split(',');
    return 'rgb(' + (255 - colors[0]) + ',' + (255 - colors[1]) + ',' + (255 - colors[2]) + ')';
  }
}

pixelPainter(25, 20);