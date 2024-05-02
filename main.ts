let level:number = -1
let jumps: number = 1
let playerSprite:Sprite = null 
function selectLevel(){
    if(level == -1 ){
        tiles.setTilemap(tilemap`test`)

        
    }
    playerSprite = sprites.create(img`
        . . . . f f f f f . . . . . . .
        . . . f e e e e e f . . . . . .
        . . f d d d d e e e f . . . . .
        . c d f d d f d e e f f . . . .
        . c d f d d f d e e d d f . . .
        c d e e d d d d e e b d c . . .
        c d d d d c d d e e b d c . f f
        c c c c c d d d e e f c . f e f
        . f d d d d d e e f f . . f e f
        . . f f f f f e e e e f . f e f
        . . . . f e e e e e e e f f e f
        . . . f e f f e f e e e e f f .
        . . . f e f f e f e e e e f . .
        . . . f d b f d b f f e f . . .
        . . . f d d c d d b b d f . . .
        . . . . f f f f f f f f f . . .
    `,SpriteKind.Player)
    scene.cameraFollowSprite(playerSprite)
    controller.moveSprite(playerSprite, 100, 0)
    playerSprite.ay = 300
    createPlayerAnimations()
}
selectLevel()

controller.A.onEvent(ControllerButtonEvent.Pressed, function(){
   if(jumps > 0){
       playerSprite.vy = -200
       jumps = 0
   }
})

scene.onHitWall(SpriteKind.Player, function(sprite,location){
    if(sprite.isHittingTile(CollisionDirection.Bottom)){
        jumps += 1
    }
   
})
function createPlayerAnimations(){

    characterAnimations.loopFrames(playerSprite, [img`
        . . . . . . . f f f f f . . . .
        . . . . . . f e e e e e f . . .
        . . . . . f e e e d d d d f . .
        . . . . f f e e d f d d f d c .
        . . . f d d e e d f d d f d c .
        . . . c d b e e d d d d e e d c
        f f . c d b e e d d c d d d d c
        f e f . c f e e d d d c c c c c
        f e f . . f f e e d d d d d f .
        f e f . f e e e e f f f f f . .
        f e f f e e e e e e e f . . . .
        . f f e e e e f e f f e f . . .
        . . f e e e e f e f f e f . . .
        . . . f e f f b d f b d f . . .
        . . . f d b b d d c d d f . . .
        . . . f f f f f f f f f . . . .
    `
    ,img`
        . . . . . . . f f f f f . . . .
        . . . . . . f e e e e e f . . .
        . . . . . f e e e d d d d f . .
        . . . . . f e e d f d d f d c .
        . . . . f f e e d f d d f d c .
        . . . f d d e e d d d d e e d c
        . . . c d b e e d d c d d d d c
        f f . c d b e e e d d c c c c c
        f e f . c f f e e e d d d d f .
        f e f . f e e e e f f f f f f .
        f e f f e e e e e e e f f f f .
        . f f e e e e f e f d d f d d f
        . . f e e e e f e f b d f b d f
        . . f e f f f f f f f f f f f f
        . . f d d c f . . . . . . . . .
        . . f f f f . . . . . . . . . .
    `,
    img`
        . . . . . . . f f f f f . . . .
        . . . . . . f e e e e e f . . .
        . . . . f f e e e d d d d f . .
        . . . f d d e e d d d d d d c .
        . . . c d b e e d f d d f d c .
        f f . c d b e e d f d d f d d c
        f e f . c f e e d d d d e e d c
        f e f . . f e e e d c d d d d c
        f e f . . f f e e e d c c c f .
        f e f . f e e e e f f f f f . .
        . f f f e e e e e e e f . . . .
        . . f e e e e f e e f e f f . .
        . . f e e e f f f e e f f e f .
        . f b f f f f f f c d d b d d f
        . f d d c f . . f d d d c d d f
        . . f f f . . . f f f f f f f .
    `,img`
        . . . . . . . f f f f f . . . .
        . . . . f f f e e e e e f . . .
        . . . f d d e e e e d d d f . .
        . . . c d b e e e d d d d d c .
        . . . c d b e e d d d d d d c .
        . f f . c f e e d f d d f d d c
        f e f . . f e e d f d d f d d c
        f e f . . f e e d d d d e e d c
        f e f . . f f e e d c d d d f .
        f e f . f e e e e e d f f f . .
        . f f f e e e e e e e f . . . .
        . . f f b e e e e e f f . . . .
        . . f f d d c e e f f e f . . .
        . . . . f f f c d d b d d f . .
        . . . . . f f d d d c d d f . .
        . . . . . . f f f f f f f . . .
    `
    ], 100, characterAnimations.rule(Predicate.FacingRight,Predicate.MovingRight))
}