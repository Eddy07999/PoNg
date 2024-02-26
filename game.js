// Obtenez une référence à l'élément canvas et définissez sa largeur et sa hauteur
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
canvas.width = 1200 - 20;
canvas.height = 650;

//ajoute un écouteur d'événements pour le bouton start

const startButton = document.getElementById("start-btn");
console.log(startButton);
startButton.addEventListener("click", () => {
  console.log("Le jeu commence");

  animate();
});

// Définir la raquette 1
let paddle1 = {
  position: { x: 20, y: 100 },
  velocity: { x: 0, y: 0 },
  width: 10,
  height: 100,
  // Dessine la raquette sur le canvas
  draw: function () {
    ctx.fillStyle = "white";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  },
  // Met à jour la position de la raquette et la dessine
  update: function () {
    this.draw();
    if (
      this.position.y + this.velocity.y > 0 &&
      this.position.y + this.height + this.velocity.y < canvas.height
    )
      this.position.y += this.velocity.y;
  },
};

// Définir la raquette 2
let paddle2 = {
  position: { x: canvas.width - 10 * 3, y: 100 },
  velocity: { x: 0, y: 0 },
  width: 10,
  height: 100,
  // Utilise les mêmes méthodes que la raquette 1
  draw: paddle1.draw,
  update: paddle1.update,
};

// Définir la balle
let ball = {
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  velocity: {
    x: (Math.random() - 0.5 >= 0 ? -1 : 1) * 4, // Multiplié par 2
    y: (Math.random() - 0.5 >= 0 ? -1 : 1) * 4, // Multiplié par 2
  },
  radius: 10,
  // Dessine la balle sur le canvas
  draw: function () {
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
  },
  // Met à jour la position de la balle et la dessine
  update: function () {
    this.draw();

    // ...
    if (this.position.y + this.radius + this.velocity.y > canvas.height) {
      this.velocity.y *= -1;
    } else if (this.position.y - this.radius < 0) {
      this.velocity.y *= -1;
    }

    // if (this.position.x + this.radius > canvas.width) {
    //   this.velocity.x *= -1;
    // } else if (this.position.x - this.radius < 0) {
    //   this.velocity.x *= -1;
    // }

    ////////////////////////////////
    ////////CODE QUI MARCHE PAS ////
    // if (
    //   this.position.y + this.height + this.velocity.y > canvas.height ||
    //   this.position.y + this.velocity.y < 0
    // ) {
    //   this.velocity.y = -this.velocity.y;
    // }
    // this.position.x += this.velocity.x;
    // this.position.y += this.velocity.y;

    //////////////////////////////
    ////////

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Si la balle touche la raquette 1
    if (
      this.position.x - this.radius < paddle1.position.x + paddle1.width &&
      this.position.y > paddle1.position.y &&
      this.position.y < paddle1.position.y + paddle1.height
    ) {
      this.velocity.x = -this.velocity.x;
    }

    // Si la balle touche la raquette 2
    if (
      this.position.x + this.radius > paddle2.position.x &&
      this.position.y > paddle2.position.y &&
      this.position.y < paddle2.position.y + paddle2.height
    ) {
      this.velocity.x = -this.velocity.x;
    }

    // Si la balle sort du canvas
    if (this.position.x - this.radius < 0) {
      this.position.x = canvas.width / 2;
      this.position.y = canvas.height / 2;
      this.velocity.x = (Math.random() - 0.5 >= 0 ? -1 : 1) * 4;
      this.velocity.y = (Math.random() - 0.5 >= 0 ? -1 : 1) * 4;
    } else if (this.position.x + this.radius > canvas.width) {
      this.position.x = canvas.width / 2;
      this.position.y = canvas.height / 2;
      this.velocity.x = (Math.random() - 0.5 >= 0 ? -1 : 1) * 4;
      this.velocity.y = (Math.random() - 0.5 >= 0 ? -1 : 1) * 4;
    }
  },
};

// Fonction pour animer le jeu
function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Dessinez le côté en haut
  // ctx.beginPath();
  // ctx.moveTo(0, 0);
  // ctx.lineTo(canvas.width, 0);
  // ctx.strokeStyle = "white";
  // ctx.stroke();

  // Dessinez le côté en bas
  // ctx.beginPath();
  // ctx.moveTo(0, canvas.height);
  // ctx.lineTo(canvas.width, canvas.height);
  // ctx.strokeStyle = "white";
  // ctx.stroke();

  // Dessinez le milieu
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.strokeStyle = "white";
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();
  ctx.closePath();

  // Met à jour et dessine les raquettes et la balle
  paddle1.update();
  paddle2.update();
  ball.update();
}

// Commence l'animation du jeu
// animate();

const stopButton = document.getElementById("stop-btn");

stopButton.addEventListener("click", () => {
  console.log("Le jeu s'arrête");
  cancelAnimationFrame(animate);
});

// Ajoute un écouteur d'événements pour les touches du clavier pour déplacer les raquettes
addEventListener("keydown", (e) => {
  const speed = 10;
  switch (e.key) {
    case "s":
      paddle1.velocity.y = -speed;
      break;
    case "w":
      paddle1.velocity.y = speed;
      break;
    case "ArrowUp":
      paddle2.velocity.y = -speed;
      break;
    case "ArrowDown":
      paddle2.velocity.y = speed;
      break;
  }
});
addEventListener("keyup", (e) => {
  switch (e.key) {
    case "s":
      paddle1.velocity.y = null;
      break;
    case "w":
      paddle1.velocity.y = null;
      break;
    case "ArrowUp":
      paddle2.velocity.y = -null;
      break;
    case "ArrowDown":
      paddle2.velocity.y = null;
      break;
  }
});
