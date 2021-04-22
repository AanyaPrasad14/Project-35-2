class Food{
   constructor(){
       this.foodStock = 15;
       this.lastFed;
       this.image = loadImage("virtual pet images/milk.png");
    } 

   updatefoodStock(foodStock){
       this.foodStock = foodStock;
    }

   getFedTime(lastFed){
       this.lastFed = lastFed;
    }

   deductFood(){
       if(this.foodStock > 0){
           this.foodStock = this.foodStock - 1;
        }
       return this.foodStock;
    }

   getfoodStock(){
       return this.foodStock;
    }

  display(){
      this.x = 80;
      this.y = 100;

      imageMode(CENTER);
      image(this.image, 720, 220, 70, 70);

      if(this.foodStock != 0){
          for(var i = 0; i < this.foodStock; i++){
              if(i % 10 === 0){
                  this.x = 80;
                  this.y = this.y + 50;
              }
              image(this.image, this.x, this.y, 50, 50);
              this.x = this.x + 30;
            }
        }
    }
}