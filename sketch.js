//Game States
var PLAY=1;
var END=0;
var gameState=1;

var sword,gameoverImage,swordImage,fruitGroup,enemyGroup,enemyAnimation,fruit1,r,fruit2,fruit3,fruit4,knifeSwooshSound,gameover,gameoverSound;

var score;

function preload(){
  swordImage=loadImage("sword.png");
  gameoverImage=loadImage("gameover.png");
  enemyAnimation=loadAnimation("alien1.png","alien2.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  knifeSwooshSound=loadSound("knifeSwooshSound.mp3");
  gameoverSound=loadSound("gameover.mp3");
  
}

function setup(){
  createCanvas(600,500);
  
  //creating sword
  sword=createSprite(300,250,20,20);
  sword.addImage("sword",swordImage);
  sword.addImage("gameover",gameoverImage);
  sword.scale=0.7;
  //sword.debug=true;
  sword.setCollider("rectangle",0,0,40,40);
  
  score=0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
}


function draw(){
  background("lightblue");
  
  if(gameState===PLAY){
    Enemy();
    fruits();
    
    sword.y=World.mouseY;
    sword.x=World.mouseX;
    
    if(fruitGroup.isTouching(sword)){
       fruitGroup.destroyEach();
       score=score+2;
       knifeSwooshSound.play();
    }
    if(sword.isTouching(enemyGroup)){
      gameState=END;
      gameoverSound.play(); 
    }
  } else if(gameState===END){
    sword.changeImage("gameover",gameoverImage);
    sword.x=300;
    sword.y=250;  
    fruitGroup.destroyEach();
    enemyGroup.destroyEach();
    fruitGroup.setVelocityXEach(0);
    enemyGroup.setVelocityXEach(0);
     
} 
  
  

  drawSprites();  
  text("score:"+score,300,30);
}

function Enemy(){
  if(World.frameCount%200===0){
    monster=createSprite(500,200,20,20);
    monster.addAnimation("moving",enemyAnimation);
    //monster.debug=true;
    monster.y=Math.round(random(100,300));
    monster.velocityX=-(8+(score/10));
    monster.setlifetime=50;
    enemyGroup.add(monster);
  }
}

function fruits(){
  position=Math.round(random(1,2))
  if(World.frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.addImage(fruit1,fruit2,fruit3,fruit4);
    fruit.scale=0.2;
    //fruit.debug=true;
    r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(fruit1);
    }else if(r==2){
      fruit.addImage(fruit2);
    }else if(r==3){
      fruit.addImage(fruit3);
    }else if(r==4){
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
    
    if(position===1){
      fruit.x=400;
    fruit.velocityX=-(7+(score/4));
    } 
    else if(position===2){
      fruit.x=400;
      fruit.velocityX=-(7+(score/10));
    }
    fruit.setlifetime=100;
    
    fruitGroup.add(fruit);
  }
}




