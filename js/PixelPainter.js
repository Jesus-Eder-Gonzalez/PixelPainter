(function() {
    let pixel = document.getElementById('pixelPainter');
    let size = 50;
    let row = 10;
    let col = 10;
    let table = document.createElement('TABLE');

    for(let i = 0; i < row; i++){
        let tempRow = document.createElement('tr');
        tempRow.style.border = 'thin solid black';
        for(let j = 0; j < col; j++){
            let temp = document.createElement('td');
            temp.style.width=size;
            console.log(temp.width);
            temp.style.height=size;
            temp.style.border = 'thin solid black';
            tempRow.append(temp);
        }
        table.appendChild(tempRow);
    }
    pixel.append(table);
})()