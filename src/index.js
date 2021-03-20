import Phaser, { Game } from 'phaser';
import deskImg from './assets/Screenshot_3.jpg';
import bun from './assets/bread1.png'
import sausage from './assets/sausage1.png'
import ketchup from './assets/ketchup-bottle.png'
import ketchupFill from './assets/ketchup-bottle-fill.png'
import Point from './points'

class MyGame extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    

    preload ()
    {
        this.load.image('desk', deskImg);
        this.load.image('bun', bun);
        this.load.image('sausage', sausage);
        this.load.image('ketchup', ketchup);
        this.load.image('ketchupFill', ketchupFill);

        //this.load.image('bunSal', 'assets/bread2.png');
        //this.load.image('bunSalKet', 'assets/bread3.png');
        //this.load.image('bunKet', 'assets/bread4.png');
    }
      
    create ()
    {
        const y = 160
        var panCounter = 0;
        var sausageCounter = 0;
        let posPan = [new Point(210,y),new Point(260,y),new Point(310,y)]
        let posSausage = [new Point(460,y),new Point(510,y),new Point(560,y)]
           

        function changeTexture() {
            this.setTexture('ketchupFill');
        }

        function unchange(){
            this.setTexture('ketchup');
        }

        
        
       
        function createEntity(context,type,x,y){
            var entity = context.add.sprite(x, y, type);
            entity.setInteractive(new Phaser.Geom.Rectangle(0, 0, 80, 100), Phaser.Geom.Rectangle.Contains);
            context.input.setDraggable(entity);
            entity.inputEnabled = true;
            return entity
        }

        function collider(context,type,x,x1,y,y1,positions, counter){
            context.button.on('pointerdown',function(){
                //Pan
                if(counter < 3){
                    if(game.input.mousePointer.x > x && game.input.mousePointer.x < x1){
                        if(game.input.mousePointer.y > y && game.input.mousePointer.y < y1){
                            var createdEntity = createEntity(this, type ,positions[counter].getX, positions[counter].getY);
                            counter = counter+1;
                        }
                    }
                }
                return createdEntity;
            },context)
        }

       
        
        //mice position
        this.button = this.add.sprite(300, 200,'desk').setInteractive();

        //ketchup-bottle
        var ket = createEntity(this,'ketchup',40,60);
        ket.on('pointerdown',changeTexture).on('pointerup',unchange);

        
        
        
        //debug
        this.button.on('pointerdown',function(){
            console.log("x: "+  game.input.mousePointer.x + "/" + "y: "+game.input.mousePointer.y);
        },this)
        
        //pan
        var pan = collider(this,'bun', 150,340,220,270,posPan,panCounter);
        //Salchicha
        var salchicha = collider(this,'sausage', 400,600,220,270,posSausage,sausageCounter);


        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
        gameObject.x = dragX;
        gameObject.y = dragY;
        });
        

    }

   
}
 


const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 600,
    height: 300,
    scene: MyGame
};

const game = new Phaser.Game(config);