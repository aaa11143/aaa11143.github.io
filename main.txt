var time = 0;
var n = 0;
var line = [
  ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
  ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
  ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
  ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
  ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
  ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
  ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
  ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
  ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
  ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□'],
  ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□']
];
var flyingBlock = 0;
var shapes = ['ㅗ', 'ㅣ', 'ㄱ', 'ㅋ', 'ㅁ']
var s;

class Block {
  constructor() {
    this.x = 2;
    this.y = 1;
    this.shape = 'ㅣ';
    this.flying = true;
    this.rotation = 0;
  }

  draw(shape) {
    this.shape = shape;
    if (shape == "ㅗ") {
      if (this.y == 11) {
        this.y = 10;
      }
      switch (this.rotation) {
        case 0:
          line[this.y][this.x] = '■';
          line[this.y - 1][this.x] = '■';
          line[this.y][this.x - 1] = '■';
          line[this.y][this.x + 1] = '■';
          break;
        case 90:
          line[this.y][this.x] = '■';
          line[this.y - 1][this.x] = '■';
          line[this.y][this.x + 1] = '■';
          line[this.y + 1][this.x] = '■';
          break;
        case 180:
          line[this.y][this.x] = '■';
          line[this.y + 1][this.x] = '■';
          line[this.y][this.x - 1] = '■';
          line[this.y][this.x + 1] = '■';
          break;
        case 270:
          line[this.y][this.x] = '■';
          line[this.y - 1][this.x] = '■';
          line[this.y][this.x - 1] = '■';
          line[this.y + 1][this.x] = '■';
          break;
      }
    }
    if(this.shape == 'ㅣ') {
      switch(this.rotation) {
        case 0:
          line[this.y+1][this.x] = '■';
          line[this.y][this.x] = '■';
          line[this.y-1][this.x] = '■';
          line[this.y-2][this.x] = '■';
      }
    }
  }

  check(where) {
    switch (where) {
      case 'left':
        switch (this.rotation) {
          case 0:
            if (this.x != 1 && line[this.y][this.x-2] != "■" && line[this.y-1][this.x-1] != "■") { return true; }
            break;
          case 90:
            if (this.x != 0 && line[this.y][this.x-1] != "■" && line[this.y-1][this.x-1] != "■" &&  line[this.y+1][this.x-1] != "■") { return true; }
            break;
          case 180:
            if (this.x != 1 && line[this.y][this.x-2] != "■" && line[this.y+1][this.x-1] != "■") { return true; }
            break;
          case 270:
            if (this.x != 1 && line[this.y-1][this.x-1] != "■" && line[this.y][this.x-2] != "■" && line[this.y+1][this.x-1] != "■") { return true; }
            break;
        }
        break;
      case 'right':
        switch (this.rotation) {
          case 0:
            if (this.x != 8) { return true; }
            break;
          case 90:
            if (this.x != 8) { return true; }
            break;
          case 180:
            if (this.x != 8) { return true; }
            break;
          case 270:
            if (this.x != 9) { return true; }
            break;
        }
        break
      case 'down' :
        switch (this.rotation) {
          case 0:
            if (this.y == 10 || line[this.y +1][this.x-1]  == "■" || line[this.y +1][this.x+1]  == "■" || line[this.y +1][this.x]  == "■") {  return true  }
            break
          case 90:
            if (this.y == 9 || line[this.y +2][this.x]  == "■" || line[this.y +1][this.x+1]  == "■") {  return true  }  
            break          
          case 180:
            if (this.y == 9 || line[this.y +2][this.x]  == "■" || line[this.y +1][this.x+1]  == "■" || line[this.y +1][this.x-1]  == "■") {  return true  }       
            break     
          case 270:
            if (this.y == 9 || line[this.y +1][this.x-1]  == "■" || line[this.y+2][this.x]  == "■") {  return true  }            
            break
          }
    }
  }
}

var block = new Block();
var blocks = [block];

function iteration() {
  requestAnimationFrame(iteration);
  time = time + 1;
  document.getElementById('pyosee').innerHTML = time;
  document.getElementById('line1').innerHTML = line[1].join('');
  document.getElementById('line2').innerHTML = line[2].join('');
  document.getElementById('line3').innerHTML = line[3].join('');
  document.getElementById('line4').innerHTML = line[4].join('');
  document.getElementById('line5').innerHTML = line[5].join('');
  document.getElementById('line6').innerHTML = line[6].join('');
  document.getElementById('line7').innerHTML = line[7].join('');
  document.getElementById('line8').innerHTML = line[8].join('');
  document.getElementById('line9').innerHTML = line[9].join('');
  document.getElementById('line10').innerHTML = line[10].join('');
  for (let i = 0; i != 11; i++) {
    line[i] = createEmptyLine();
  }

  blocks.forEach((a, i, o) => {
    n++;
    document.getElementById('position').innerHTML = `${a.x}, ${a.y}, ${flyingBlock}, ${blocks.length}`;
    if (time >= 60 && a.flying) {
      if (a.check('down')) {
        a.flying = false;
      }          
      if(a.flying) {
        a.y++;
        time = 0;
      }
    }
    if (a.shape === undefined) {
      s= Math.floor(Math.random() * 6)
      a.shape = shapes[s]
    }
    a.draw(a.shape);
    if (a.flying) {
      flyingBlock++;
    }
    n = 0;
  });

  if (flyingBlock == 0) {
    // block 추가
    var block = new Block();
    blocks.push(block);
    flyingBlock = 0;
  }
  flyingBlock = 0;
}

function createEmptyLine() {
  return ['□', '□', '□', '□', '□', '□', '□', '□', '□', '□'];
}

iteration();

document.getElementById('left').addEventListener('click', () => {
  blocks.forEach((a, i, o) => {
    if (a.check('left') && a.flying) {
      a.x--;
    }
  });
});

document.getElementById('right').addEventListener('click', () => {
  blocks.forEach((a, i, o) => {
    if (a.check('right') && a.flying) {
      a.x++
    }
  });
});

document.getElementById('down').addEventListener('click', () => {
  time = 59;
});

document.getElementById('spin').addEventListener('click', () => {
  blocks.forEach((a, i, o) => {
    if (a.flying == true) {
      if (a.rotation == 270) {
        a.rotation = 0;
      } else {
        a.rotation = a.rotation + 90;
      }
    }
  });
});

/*
만들거
블럭 충돌
블럭 랜덤
ㅁㅣㄱ좌우반전된ㄱㅗ
*/
