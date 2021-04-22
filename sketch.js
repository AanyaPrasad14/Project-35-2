var dog,happydDog;
var database;
var foodStock,foodS, foodObj;
var feed, addFood;
var fedTime, lastFed;
var gameState = "hungry";
var readstate;

function preload(){
  dogimg = loadImage("virtual pet images/Dog.png");
  dogimg2 = loadImage("virtual pet images/Happy.png");
}

function setup() {
  createCanvas(1000,500);

  database = firebase.database();
  foodStock = database.ref('Food');

  foodObj = new Food;

  dog = createSprite(800,220,150,150);
  dog.addImage(dogimg);
  dog.scale = 0.15;

  feed = createButton("Feed Bruno");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add more Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
 
}


function draw() {  
background("green");

fedTime = database.ref("FeedTime");
fedTime.on("value", function(data){
  lastFed = data.val();
})

readstate = database.ref("GameState");
readstate.on("value", function(data){
  gameState = data.val();
})

fill(255);
textSize(20);

if(lastFed >= 12){
  text("Last Feed : " + lastFed % 12 + " PM", 350, 30);
}else
if(lastFed === 0){
  text("Last Feed = 12 AM", 350, 30);
}
else{text("Last Feed : " + lastFed + " AM", 350, 30);
}

foodObj.display();

drawSprites();
} 


function readStock(data){
  foodS = data.val();
  foodObj.updatefoodStock(foodS);
}

function feedDog(){
  dog.addImage(dogimg2);
  foodObj.updatefoodStock(foodObj.getfoodStock()-1);
  database.ref('/').update({
    Food : foodObj.getfoodStock(),
    FeedTime : hour()
  })
}

function addFoods(){
  foodS ++;
  foodObj.updatefoodStock(foodObj.getfoodStock()+1);
  database.ref('/').update({
    Food : foodObj.getfoodStock
  })
}
