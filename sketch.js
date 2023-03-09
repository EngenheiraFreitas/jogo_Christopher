var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girlImg, zoombiegirl;
var zoombie,zoombieImg, zoombie2, zoombieGroup;
var floresta, florestaImg;
var score=0;

var invisibleGround;
var resetar, resetarImg, gameOver, gameOverImg;

function preload(){
    girlImg = loadImage("garota_correndo.jpg");
    zoombiegirl = loadImage("garota_zumbi.png");
    zoombieImg = loadImage("zumbi.png");
    zoombie2 = loadImage("zumbi_2.jpg");
    florestaImg = loadImage("floresta_sombria1.jpg");
    resetarImg = loadImage("reset.png");
    gameOverImg = loadImage("game_Over.png");
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    floresta = createSprite(width-200,400,200,10,10);
    floresta.addImage(florestaImg);

    girl = createSprite(200,height-400,200,10,10);
    girl.scale = 0.5;
    girl.addImage(girlImg)

    invisibleGround = createSprite(width/2,height-10,width,125);
    invisibleGround.visible = false;

    resetar = createSprite(300,140);
    resetar.addImage(resetarImg);

    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);

    gameOver.scale = 0.5;
    resetar.scale = 0.5;

    gameOver.visible = false;
    resetar.visible = false;

    score = 0;

    zoombieGroup = new Group();
}

function draw() {
    background("black");
    text("Pontuação: "+ score, 500,50);

    if(gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        floresta.velocityX = -(6 + 3*score/100);
    }
    if(touches.length > 0 || keyDown("space") && girl.y >= 159){
        girl.velocityY = -12;
        touches = [];
    }

    girl.velocityY = girl.velocityY + 0.8

    if(floresta.x < 200){
        floresta.x = floresta.width/4;
    }

    girl.collide(invisibleGround);
    spawnZoombie();

    if(zoombieGroup.isTouching(girl)){
        gameState = END;
    }

    else if (gameState === END){
        resetar.visible = true;
        gameOver.visible = true;  

        floresta.velocityX = 0;
        girl.velocityY = 0;
        zoombie.velocityX = 0;

        girl.changeAnimation(zoombiegirl);

        zoombie.setLifeTime(-1);
        
        if(mousePresedOver(resetar)){
        reset();
        }
        
    }

    drawSprites();
}

function spawnZoombie(){
    if(frameCount % 80 === 0){
        zoombie = createSprite(400,height-150,10,10);
        zoombie.x = Math.round(random(20,400));
        zoombie.addImage(zoombieImg);
        zoombie.scale = 0.5;
        zoombie.velocityX = 3;
        zoombie.lifetime = 200

        zoombieGroup.add(zoombie);
    }
}

function reset(){
    gameState = PLAY;
    resetar.visible = false;
    gameOver.visible = false;

    zoombie.destroy();

    girl.changeAnimation("girl")


    score = 0;

}