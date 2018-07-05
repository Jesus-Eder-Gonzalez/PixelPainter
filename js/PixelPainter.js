function pixelPainter(width, height) {
  //function variables
  let color = 0;
  let size = 40;
  let row = height;
  let col = width;
  let mousedown = false;
  let fill = false;

  //function created DOM elements
  let pixel = document.getElementById('pixelPainter');
  let table = document.createElement('Table');
  table.id = 'pixelCanvas';
  let tableDiv = document.createElement('div');
  tableDiv.id = 'tableDiv';
  let paletteDiv = document.createElement('div');
  paletteDiv.id = 'paletteDiv';
  let palette = document.createElement('Table');

  //call my event listeners
  eventHandlers();

  //create and attach the palette
  makeTable(palette, 20, 6, 15, getColor, undefined, setColors);
  paletteDiv.append(palette);

  //calls the function that makes all the buttons in pixel painter
  makeButtons();



  //create and attach the pixels
  makeTable(table, row, col, size, setColor, eventColor, undefined, 'pixels');

  pixel.append(paletteDiv);
  tableDiv.append(table);
  pixel.append(tableDiv);

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
          temp.style.backgroundColor = background();
        }
        tempRow.append(temp);
      }
      tableToAppend.appendChild(tempRow);
    }
  }

  function makeButtons() {
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

    paletteDiv.append(fillBut);
    paletteDiv.append(erase);
    paletteDiv.append(clear);
  }

  function setColors() {
    let red = parseInt(Math.random() * 255);
    let green = parseInt(Math.random() * 255);
    let blue = parseInt(Math.random() * 255);
    const color = red.toString(16) + green.toString(16) + blue.toString(16);
    return color;
  }

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
    let tempArray = [];
    let searchArray = [];
    if (!(currentPosition - width < 1) && !(currentPosition - width > tableArray.length - 2)) {
      let above = currentPosition - width;
      tempArray.push(above);
    }
    if (!(currentPosition < 2) && !(currentPosition > tableArray.length - 2)) {
      let current = currentPosition;
      tempArray.push(current);
    }

    if (!currentPosition + width < 2 && !currentPosition + width > tableArray.length - 1) {
      let below = currentPosition;
      tempArray.push(below);
    }

    if (tempArray) {

      for (let temp of tempArray) {
        for (let i = temp - 1; i < temp + 2; i++) {

          if (tColor === tableArray[i].style.backgroundColor && tableArray[i].style.backgroundColor) {
            tableArray[i].style.backgroundColor = color;
            findCells(tColor, i, tableArray);




          } else if (!tableArray[i].style.backgroundColor && tColor === 'white') {
            tableArray[i].style.backgroundColor = color;
            findCells(tColor, i, tableArray);


          }
        }
      }

    }

  }

  function getColor() {
    color = this.style.backgroundColor;
  }
}

pixelPainter(25, 20);