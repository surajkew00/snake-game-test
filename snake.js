// snake.js

// Game constants
const GAME_WIDTH = 400; // width of the game canvas
const GAME_HEIGHT = 400; // height of the game canvas
const GRID_SIZE = 10; // size of each grid cell
const SNAKE_COLOR = 'green'; // color of the snake
const FOOD_COLOR = 'ed'; // color of the food
const BACKGROUND_COLOR = 'black'; // color of the background

// Game variables
let snake = [ // initial snake position
  { x: GAME_WIDTH / 2, y: GAME_HEIGHT / 2 },
  { x: GAME_WIDTH / 2 - GRID_SIZE, y: GAME_HEIGHT / 2 },
  { x: GAME_WIDTH / 2 - 2 * GRID_SIZE, y: GAME_HEIGHT / 2 }
];
let food = { // initial food position
  x: Math.floor(Math.random() * (GAME_WIDTH / GRID_SIZE)) * GRID_SIZE,
  y: Math.floor(Math.random() * (GAME_HEIGHT / GRID_SIZE)) * GRID_SIZE
};
let score = 0; // initial score
let direction = 'right'; // initial direction of the snake
let gameOver = false; // game over flag

// Game functions
function update() {
  // Move the snake
  for (let i = snake.length - 1; i > 0; i--) {
    snake[i] = { x: snake[i - 1].x, y: snake[i - 1].y }; // move each segment to the previous one
  }
  switch (direction) {
    case 'up':
      snake[0].y -= GRID_SIZE; // move the head up
      break;
    case 'down':
      snake[0].y += GRID_SIZE; // move the head down
      break;
    case 'left':
      snake[0].x -= GRID_SIZE; // move the head left
      break;
    case 'right':
      snake[0].x += GRID_SIZE; // move the head right
      break;
  }

  // Check for collisions with the wall or itself
  if (snake[0].x < 0 || snake[0].x > GAME_WIDTH - GRID_SIZE || snake[0].y < 0 || snake[0].y > GAME_HEIGHT - GRID_SIZE) {
    gameOver = true; // game over if snake hits the wall
  }
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      gameOver = true; // game over if snake hits itself
    }
  }

  // Check for food collision
  if (snake[0].x === food.x && snake[0].y === food.y) {
    score++; // increment score if snake eats food
    snake.push({ x: snake[snake.length - 1].x, y: snake[snake.length - 1].y }); // add new segment to the snake
    food = { // generate new food position
      x: Math.floor(Math.random() * (GAME_WIDTH / GRID_SIZE)) * GRID_SIZE,
      y: Math.floor(Math.random() * (GAME_HEIGHT / GRID_SIZE)) * GRID_SIZE
    };
  }
}

function draw(ctx) {
  // Clear the canvas
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Draw the background
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Draw the snake
  ctx.fillStyle = SNAKE_COLOR;
  for (let i = 0; i < snake.length; i++) {
    ctx.fillRect(snake[i].x, snake[i].y, GRID_SIZE, GRID_SIZE); // draw each segment of the snake
  }

  // Draw the food
  ctx.fillStyle = FOOD_COLOR;
  ctx.fillRect(food.x, food.y, GRID_SIZE, GRID_SIZE); // draw the food

  // Draw the score
  ctx.font = '24px Arial';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`Score: ${score}`, 10, 10); // draw the score

  // Draw the game over message
  if (gameOver) {
    ctx.font = '48px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'iddle';
    ctx.fillText('Game Over!', GAME_WIDTH / 2, GAME_HEIGHT / 2); // draw the game over message
  }
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp':
      if (direction!== 'down') direction = 'up';// change direction to up if not already down
      break;
    case 'ArrowDown':
      if (direction!== 'up') direction = 'down'; // change direction to down if not already up
      break;
    case 'ArrowLeft':
      if (direction!== 'right') direction = 'left'; // change direction to left if not already right
      break;
    case 'ArrowRight':
      if (direction!== 'left') direction = 'right'; // change direction to right if not already left
      break;
  }
});

// Main game loop
function loop(ctx) {
  update(); // update the game state
  draw(ctx); // draw the game
  if (!gameOver) requestAnimationFrame(() => loop(ctx)); // loop again if the game is not over
}

// Initialize the game
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
loop(ctx); // start the game loop