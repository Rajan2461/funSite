import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  imports: [CommonModule]
})
export class GameComponent implements OnInit {

  score: number = 0;
  characterY: number = 150;       // Vertical position of the character
  characterX: number = 100;       // Horizontal position
  gameOver: boolean = false;
  obstacles: any[] = [];

  // Speed and difficulty variables
  characterSpeed: number = 10;
  obstacleSpeed: number = 5;
  gravity: number = 3;

  ngOnInit() {
    this.startGame();
  }

  // ✅ Character movement
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' || event.key === 'w') {
      this.moveCharacter(-this.characterSpeed);   // Move up
    } else if (event.key === 'ArrowDown' || event.key === 's') {
      this.moveCharacter(this.characterSpeed);    // Move down
    }
  }

  moveCharacter(amount: number) {
    this.characterY += amount;
    if (this.characterY < 0) this.characterY = 0;               // Limit top
    if (this.characterY > 300) this.characterY = 300;           // Limit bottom
  }

  startGame() {
    this.gameOver = false;
    this.score = 0;
    this.obstacles = this.generateObstacles();
    this.gameLoop();
  }

  generateObstacles() {
    return Array.from({ length: 5 }, (_, i) => ({
      x: 500 + i * 200,                  // Obstacle spacing
      y: Math.random() * 300             // Random height
    }));
  }

  gameLoop() {
    if (this.gameOver) return;

    // Move obstacles
    this.obstacles = this.obstacles.map(obs => {
      obs.x -= this.obstacleSpeed;

      // Reset obstacle position when off-screen
      if (obs.x < 0) {
        obs.x = 800;
        this.score++;  // Increase score
      }

      // Collision detection
      if (
        obs.x < this.characterX + 30 &&
        obs.x + 30 > this.characterX &&
        obs.y < this.characterY + 30 &&
        obs.y + 30 > this.characterY
      ) {
        this.gameOver = true;  // Game over on collision
      }

      return obs;
    });

    // Continue game loop
    setTimeout(() => this.gameLoop(), 30);
  }

  restartGame() {
    this.startGame();
  }
}
