// Enemies our player must avoid

//
class TopGirl {
  constructor() {
    this.step = 101;
    this.jump = 83;
    this.startX = this.step * 2;
    this.startY = (this.jump * 4) + 55;
    this.x = this.startX;
    this.y = this.startY;
    this.sprite = 'images/char-horn-girl.png';
    this.victory = false;
  }
  restart() {
    this.y = this.startY;
    this.x = this.startX;
  }
  update(){
    //check collision here
    for(let enemy of allEnemies){
      console.log(enemy);
      if(this.y === enemy.y && (enemy.x + enemy.step/2 > this.x
        && enemy.x < this.x + this.step/2)){
        this.restart();
      }
      //check win here;
      if(this.y < 55){
        this.victory = true;
      }
    }

  }

// draw TopGirl's sprite on random x and y coord position
  render(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
    // update TopGirl's x and y cooord according to input

  handleInput(input){
    switch(input){
      case 'left':
        if(this.x > 0){
        this.x -= this.step;
      }
        break;
      case 'up':
        if(this.y > 0){
        this.y -= this.jump;
      }
        break;
      case 'right':
        if(this.x < this.step * 4){
        this.x += this.step;
      }
        break;
      case 'down':
        if(this.y < this.jump * 4){
        this.y += this.jump;
      }
        break;

    }

  }

}


const player = new TopGirl();


var Enemy = function(x,y, speed) {
    this.x = 0;
    this.y = y +55; //to center the bug
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

const bug1 = new Enemy(-101, 0, 200);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy((-101 * 2.5), 173, 250);
//const bug4 = new Enemy((-101 * 3.5), 173, 300);
const allEnemies = [];
allEnemies.push(bug1,bug2,bug3,);
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //if enemy is on game board
    if(this.x < this.boundary) {
      //move forward
      //increase x by speed  * dt
      this.x += this.speed * dt;
    }
    else {
      this.x = this.resetPos;
    }


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
