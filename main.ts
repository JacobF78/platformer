namespace SpriteKind{
export const Collectible = SpriteKind.create()
export const Box = SpriteKind.create()
export const GrowPower = SpriteKind.create()
export const Tile = SpriteKind.create()
export const ShootPower = SpriteKind.create()
export const ShrinkPower = SpriteKind.create()
export const BatPower = SpriteKind.create()
export const EnemyProjectile = SpriteKind.create()
export const SpinningEnemy = SpriteKind.create()
}
let level:number = 0
let jumps: number = 1
let playerSprite:Sprite = null 
let isFalling: boolean = false
let isFlying: boolean = false
info.setScore(0)
let groundEnemyObject = {
    "image":[
        img`
            . . . e e e e e e . . . . . . . . .
            . . e e e e e e e e . . . . . . . .
            . e e e e e e e e e e . . . . . . .
            e e e e e e e e e e e e . . . . . .
            e e e 4 4 4 e e e e e e . . . . . .
            e e e 4 4 4 4 e e e e e . . . . . .
            f 4 e 4 4 4 4 4 4 e 4 f . . . . . .
            f 4 4 f f 4 4 f f 4 4 f . . . . . .
            f e 4 d d d d d d 4 e f . . e . . .
            . f e d d b b d d e f . . e . e . .
            . f 3 e 4 4 4 4 e f f . e . . e . .
            e 4 f b 1 1 1 1 b f 4 e . e . . e .
            4 d f 1 1 1 1 1 1 f d e . . e e . .
            4 4 f 6 6 6 6 6 6 f 4 4 . . . . . .
            . . . f f f f f f . . . . . . . . .
            . . . f f . . f f . . . . . . . . .
        `],
    "health":[
        1
    ],
    "animation":[[
        img`
            . . . e e e e e . . . .
            . . e e e e e e e e . .
            . e e e e e e e e e e .
            e e e e e e e e e e e e
            f e e 4 e e e e e e e e
            f e e 4 4 e e e f f f f
            f f e 4 4 4 4 4 f f f f
            f f e 4 4 f f 4 e 4 f f
            . f f d d d d 4 d 4 f .
            . . f b b d d 4 f f f .
            . . f e 4 4 4 e e f . .
            . . f e e e e d d 4 . .
            . . f e 1 e e d d e . .
            . . f e e e f e e f . .
            . . . f f f f f f . . .
            . . . . . f f f . . . .
        `
        ,img`
            . . . . . . . . . . . .
            . . . e e e e e e . . .
            . . e e e e e e e e e .
            . e e e e e e e e e e e
            e e e e e e e e e e e e
            e e e 4 e e e e e e e e
            e e e 4 4 e e e e e e e
            f f e 4 4 4 4 4 f f f f
            . f e 4 4 f f 4 e 4 f f
            . . f d d d d 4 d 4 f .
            . . f b b d e e f f f .
            . . f e 4 e d d 4 f . .
            . e e e e e d d e f . .
            . e f 6 e f e e f f f .
            . e e e e f f f f f f .
            . . f f f . . . f f . .
        `
        ,img`
            . . . . . . . . . . . .
            . . . e e e e e e . . .
            . . e e e e e e e e e .
            . e e e e e e e e e e e
            e e e e e e e e e e e e
            f e e 4 e e e e e e e e
            f e e 4 4 e e e f f f f
            f f e 4 4 4 4 4 f f f f
            . f e 4 4 f f 4 e 4 f f
            . . f d d d d 4 d 4 f f
            . . f b b d d 4 f f f .
            . . f e e e e e d d 4 .
            . . f e 1 e 1 e d d e .
            . f f e e e 6 f e e f .
            . f f f f f f f f f f .
            . . f f f . . . f f . .
        `],[
        img`
            . . . . e e e e e . . .
            . . e e e e e e e e . .
            . e e e e e e e e e e .
            e e e e e e e e e e e e
            e e e e e e e e 4 e e f
            f f f f e e e 4 4 e e f
            f f f f 4 4 4 4 4 e f f
            f f 4 e 4 f f 4 4 e f f
            . f 4 d 4 d d d d f f .
            . f f f 4 d d b b f . .
            . . f e e 4 4 4 e f . .
            . . 4 d d e e e e f . .
            . . e d d e e 1 e f . .
            . . f e e f e e e f . .
            . . . f f f f f f . . .
            . . . . f f f . . . . .
        `
        , img`
            . . . . . . . . . . . .
            . . . e e e e e e . . .
            . e e e e e e e e e . .
            e e e e e e e e e e e .
            e e e e e e e e e e e e
            e e e e e e e e 4 e e e
            e e e e e e e 4 4 e e e
            f f f f 4 4 4 4 4 e f f
            f f 4 e 4 f f 4 4 e f .
            . f 4 d 4 d d d d f . .
            . f f f e e d b b f . .
            . . f 4 d d e 4 e f . .
            . . f e d d e e e e e .
            . f f f e e f e 6 f e .
            . f f f f f f e e e e .
            . . f f . . . f f f . .
        `
        , img`
            . . . . . . . . . . . .
            . . . e e e e e e . . .
            . e e e e e e e e e . .
            e e e e e e e e e e e .
            e e e e e e e e e e e e
            e e e e e e e e 4 e e f
            f f f f e e e 4 4 e e f
            f f f f 4 4 4 4 4 e f f
            f f 4 e 4 f f 4 4 e f .
            f f 4 d 4 d d d d f . .
            . f f f 4 d d b b f . .
            . 4 d d e e e e e f . .
            . e d d e 1 e 1 e f . .
            . f e e f 6 e e e f f .
            . f f f f f f f f f f .
            . . f f . . . f f f . .
        `
        ]]
    
}
let airEnemyObject = {
   "image" : [
       assets.image`drone`,
   ],"health": [1,],
    "animation":[
        [
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
            `
        ],
        [
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
            `
        ],
    ]
}
let spinThingObject = {
    "image":[
        img`
            . . . . . . . . . . . . . . . .
            . . . 2 2 2 2 2 4 4 . . . . . .
            . . 2 5 5 5 5 4 4 4 4 . . . . .
            . 2 5 4 4 4 4 4 4 4 4 4 . . . .
            . 2 5 4 4 4 4 4 4 4 4 4 . . . .
            . 2 5 4 4 4 4 4 4 4 4 4 . . . .
            . 2 4 4 4 4 4 4 4 4 4 4 . . . .
            . 4 4 4 4 4 4 4 4 4 4 4 . . . .
            . 4 4 4 4 4 4 4 4 4 4 4 . . . .
            . 4 4 4 4 4 4 4 4 4 4 4 . . . .
            . . 4 4 4 4 4 4 4 4 4 . . . . .
            . . . 4 4 4 4 4 4 4 . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `
    ]
}
function createSpinThing(tileLocation:tiles.Location,amount:number){
    let enemySprite = sprites.create(spinThingObject["image"][0],SpriteKind.SpinningEnemy)
    tiles.placeOnTile(enemySprite,tileLocation)
    let orbitingSpritesList: Sprite [] = []

    for(let i  = 0; i < amount; i ++){
        let orbitingSprite: Sprite = sprites.create(spinThingObject["image"][0], SpriteKind.SpinningEnemy)
        orbitingSprite.setFlag(SpriteFlag.GhostThroughWalls,true)
        orbitingSpritesList.push(orbitingSprite)

    }
    let angle:number = spriteutils.degreesToRadians(Math.randomRange(0,360))
    let distance:number = 20

    spriteutils.onSpriteUpdateInterval(enemySprite,100,function(sprite){
        let count:number = 0
        for(let orbitingSprite of orbitingSpritesList){
            spriteutils.placeAngleFrom(orbitingSprite,angle,distance*(count+1),sprite)
            count++

        }
        angle += 0.395
    })


}

let shootingEnemyObject = {
    "image":[
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . c c c c . . . .
            . . . . . . c c d d d d c . . .
            . . . . . c c c c c c d c . . .
            . . . . c c 4 4 4 4 d c c . . .
            . . . c 4 d 4 4 4 4 4 1 c . c c
            . . c 4 4 4 1 4 4 4 4 d 1 c 4 c
            . c 4 4 4 4 1 4 4 4 4 4 1 c 4 c
            f 4 4 4 4 4 1 4 4 4 4 4 1 4 4 f
            f 4 4 4 f 4 1 c c 4 4 4 1 f 4 f
            f 4 4 4 4 4 1 4 4 f 4 4 d f 4 f
            . f 4 4 4 4 1 c 4 f 4 d f f f f
            . . f f 4 d 4 4 f f 4 c f c . .
            . . . . f f 4 4 4 4 c d b c . .
            . . . . . . f f f f d d d c . .
            . . . . . . . . . . c c c . . .
        `,img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `
    ],
}
function createAirEnemy(tileLocation:tiles.Location){
    let enemySprite = sprites.create(airEnemyObject["image"][0],SpriteKind.Enemy)
    sprites.setDataString(enemySprite, "type", "air")
    tiles.placeOnTile(enemySprite, tileLocation)
    spriteutils.onSpriteUpdateInterval(enemySprite, 399,function(sprite){
        let playerSpriteReference = spriteutils.getSpritesWithin(SpriteKind.Player, 64, sprite)
        if(playerSpriteReference.length > 0){
            sprite.follow(playerSpriteReference[0],99)
        }else {
            spriteutils.moveTo(sprite, spriteutils.pos(sprite.x + Math.randomRange(-50, 50), sprite.y), 400)
        }

    })

}
function createShootingEnemy(tileLocation:tiles.Location){
    let enemySprite = sprites.create(shootingEnemyObject["image"][0],SpriteKind.Enemy)
    sprites.setDataString(enemySprite,"type", "air")
    tiles.placeOnTile(enemySprite,tileLocation)
    spriteutils.onSpriteUpdateInterval(enemySprite,100,function(sprite){
        let playerSpriteReference = spriteutils.getSpritesWithin(SpriteKind.Player,124,sprite)
        if(playerSpriteReference.length > 0){
            let enemyProjectile:Sprite = sprites.create(img`
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
                1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
            `,SpriteKind.EnemyProjectile)
            enemyProjectile.setPosition(sprite.x,sprite.y)
            enemyProjectile.setFlag(SpriteFlag.DestroyOnWall,true)
            spriteutils.setVelocityAtAngle(enemyProjectile,spriteutils.angleFrom(sprite, playerSpriteReference[0]) , 90)

        }
    })
}
function createEnemyAnimations(animationList:Image[][],sprite:Sprite){
    // for loop thats sets animations 
    let animationDirection = [Predicate.MovingLeft,Predicate.MovingRight,Predicate.MovingUp,Predicate.MovingDown]
    let count: number = 0 
    for(let currentAniamtion of animationList){
        characterAnimations.loopFrames(sprite, currentAniamtion, 50, animationDirection[count])
        count++
    }
}
function createGroundEnemy(tileLocation:tiles.Location){
    
      
    
    let enemySprite = sprites.create(groundEnemyObject["image"][0],SpriteKind.Enemy)
    enemySprite.ay = 300
    let directionx:number = 0
    if(Math.randomRange(-1,1)< 0){
        directionx = -1
    }else{
        directionx = 1
    }
    enemySprite.setVelocity(directionx*Math.randomRange(25,40),0)
    sprites.setDataNumber(enemySprite,"speed", enemySprite.vx)
    sprites.setDataString(enemySprite,"type","ground")
    tiles.placeOnTile(enemySprite, tileLocation)
    createEnemyAnimations(groundEnemyObject["animation"],enemySprite)
}
function generateEnemyOnTileMap(){
    for(let tileLocation of tiles.getTilesByType(assets.tile`groundEnemySpawnTile`)){
        createGroundEnemy(tileLocation)
        tiles.setTileAt(tileLocation,img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `)
    }
    for (let tileLocation of tiles.getTilesByType(assets.tile`airEnemySpawnTile`)) {
        createAirEnemy( tileLocation)
        tiles.setTileAt(tileLocation, img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `)
    }
    for (let tileLocation of tiles.getTilesByType(assets.tile`shootingEnemySpawn`)) {
        createShootingEnemy(tileLocation)
        tiles.setTileAt(tileLocation, img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `)
    }
    for (let tileLocation of tiles.getTilesByType(assets.tile`spinEnemyTile`)) {
        createSpinThing(tileLocation,3)
        tiles.setTileAt(tileLocation, img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `)
    }
}

function selectLevel(){
    
    if(level == -1 ){
        tiles.setTilemap(tilemap`test`)
        createCollectiblesOnTileMap()
        
        
    }else if(level == 0){
        tiles.setTilemap(tilemap`test2`)
        createCollectiblesOnTileMap()
    }

    
    createPlayer()
    generateEnemyOnTileMap()
}
function createPlayer() {
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
    `, SpriteKind.Player)
    scene.cameraFollowSprite(playerSprite)
    
    
    tiles.placeOnRandomTile(playerSprite, assets.tile`door`)
    resetPlayerPowerUps()
    
}
function resetPlayerPowerUps(){
    isFlying = false
    info.stopCountdown()
    playerSprite.scale = 1
    sprites.setDataBoolean(playerSprite,"GrowPower",false)
    sprites.setDataBoolean(playerSprite,"ShootPower",false)
    sprites.setDataBoolean(playerSprite,"ShrinkPower",false)
    sprites.setDataBoolean(playerSprite,"BatPower",false)
    controller.moveSprite(playerSprite, 100, 0)
    playerSprite.ay = 300
    characterAnimations.setCharacterAnimationsEnabled(playerSprite, true)
    createPlayerAnimations()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Collectible, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    info.changeScoreBy(50)

    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
})
//update checkpoint once player overlaps
scene.onOverlapTile(SpriteKind.Player, assets.tile`spawnTile`,function(sprite,location){
    for(let tileLocation of tiles.getTilesByType(assets.tile`door`)){
        tiles.setTileAt(tileLocation,assets.tile`spawnTile`)

    }
    tiles.setTileAt(location, assets.tile`door`)
}) 
//Player destroys after touching hazardTiles
scene.onOverlapTile(SpriteKind.Player, assets.tile`hazardTile`,function(sprite,location){
    sprites.destroy(sprite)
    scene.cameraShake(99,500)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`rightHazardTile`, function (sprite, location) {
    sprites.destroy(sprite)
    scene.cameraShake(99, 500)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`leftHazardTile`, function (sprite, location) {
    sprites.destroy(sprite)
    scene.cameraShake(99, 500)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`topHazardTile`, function (sprite, location) {
    sprites.destroy(sprite)
    scene.cameraShake(99, 500)
})
sprites.onDestroyed(SpriteKind.Player, function(sprite){
   createPlayer()

})

function hitPowerBox(tileImage:Image, location: tiles.Location){
    tiles.setTileAt(location, assets.tile`backGroundTile`)
    let powerBoxSprite = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . 2 2 2 . . . . . .
    . . . . . . 2 2 2 2 . . . . . .
    . . . . . 2 2 2 . 2 . . . . . .
    . . . . . 2 2 2 . 2 . . . . . .
    . . . . . 2 2 2 2 2 . . . . . .
    . . . . 2 2 2 2 2 2 . . . . . .
    . . . 2 2 . 2 2 2 2 . . . . . .
    . . 2 2 2 2 2 . 2 2 . . . . . .
    . 2 2 . 2 . . . . . . . . . . .
    2 2 . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    `, SpriteKind.Box)
    tiles.placeOnTile(powerBoxSprite,location)
    powerBoxSprite.y -= 16
    if(tileImage.equals(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `)){
        animation.runImageAnimation(powerBoxSprite, [
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                e55555555555555e
                e55555555555555e
                e55555555555555e
                e55555111555555e
                e55555555155555e
                e55555555155555e
                e55555511155555e
                e55555515555555e
                e55555515555555e
                e55555555555555e
                e55555515555555e
                e55555555555555e
                e55555555555555e
                e55555555555555e
                eeeeeeeeeeeeeeee
            `,
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                e55555555555555e
                e55555555555555e
                e55555555555555e
                e55555111555555e
                e55555555155555e
                e55555555155555e
                e55555511155555e
                e55555515555555e
                e55555515555555e
                e55555555555555e
                e55555515555555e
                e55555555555555e
                e55555555555555e
                e55555555555555e
                eeeeeeeeeeeeeeee
                ................
                ................
            `,
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                e55555555555555e
                e55555555555555e
                e55555555555555e
                e55555111555555e
                e55555555155555e
                e55555555155555e
                e55555511155555e
                e55555515555555e
                e55555515555555e
                e55555555555555e
                e55555515555555e
                e55555555555555e
                e55555555555555e
                e55555555555555e
                eeeeeeeeeeeeeeee
                ................
                ................
                ................
                ................
            `,
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                e55555555555555e
                e55555555555555e
                e55555555555555e
                e55555111555555e
                e55555555155555e
                e55555555155555e
                e55555511155555e
                e55555515555555e
                e55555515555555e
                e55555555555555e
                e55555515555555e
                e55555555555555e
                e55555555555555e
                e55555555555555e
                eeeeeeeeeeeeeeee
                ................
                ................
                ................
                ................
                ................
                ................
            `,
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                e55555555555555e
                e55555555555555e
                e55555555555555e
                e55555111555555e
                e55555555155555e
                e55555555155555e
                e55555511155555e
                e55555515555555e
                e55555515555555e
                e55555555555555e
                e55555515555555e
                e55555555555555e
                e55555555555555e
                e55555555555555e
                eeeeeeeeeeeeeeee
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
            `,
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                e55555555555555e
                e55555555555555e
                e55555555555555e
                e55555111555555e
                e55555555155555e
                e55555555155555e
                e55555511155555e
                e55555515555555e
                e55555515555555e
                e55555555555555e
                e55555515555555e
                e55555555555555e
                e55555555555555e
                e55555555555555e
                eeeeeeeeeeeeeeee
                ................
                ................
                ................
                ................
                ................
                ................
            `,
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                e55555555555555e
                e55555555555555e
                e55555555555555e
                e55555111555555e
                e55555555155555e
                e55555555155555e
                e55555511155555e
                e55555515555555e
                e55555515555555e
                e55555555555555e
                e55555515555555e
                e55555555555555e
                e55555555555555e
                e55555555555555e
                eeeeeeeeeeeeeeee
                ................
                ................
                ................
                ................
            `,
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                e55555555555555e
                e55555555555555e
                e55555555555555e
                e55555111555555e
                e55555555155555e
                e55555555155555e
                e55555511155555e
                e55555515555555e
                e55555515555555e
                e55555555555555e
                e55555515555555e
                e55555555555555e
                e55555555555555e
                e55555555555555e
                eeeeeeeeeeeeeeee
                ................
                ................
            `,
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
            `
        ],40, false)
    }else{
        animation.runImageAnimation(powerBoxSprite, [
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
            `,
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                ................
                ................
            `,
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                ................
                ................
                ................
                ................
            `,
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                ................
                ................
                ................
                ................
                ................
                ................
            `,
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
            `,
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                ................
                ................
                ................
                ................
                ................
                ................
            `,
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                ................
                ................
                ................
                ................
            `,
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                ................
                ................
            `,
            img`
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                ................
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
                eeeeeeeeeeeeeeee
            `
        ], 40, false)
    }
    powerBoxSprite.lifespan = 361
    
}
sprites.onDestroyed(SpriteKind.Box,function(sprite){
    tiles.setTileAt(sprite.tilemapLocation(),assets.tile`unluckyTile`)
})
function createCollectiblesOnTileMap() {
    for (let tileLocation of tiles.getTilesByType(assets.tile`collectibleSpawn`)) {
        createCollectible(tileLocation)
            tiles.setTileAt(tileLocation,img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
            `)
    }

}
function createCollectible(tileLocation: tiles.Location){
    let collectible: Sprite = sprites.create(img`
            . . b b b b . .
            . b 5 5 5 5 b .
            b 5 d 3 3 d 5 b
            b 5 3 5 5 1 5 b
            c 5 3 5 5 1 d c
            c d d 1 1 d d c
            . f d d d d f .
            . . f f f f . .
        `, SpriteKind.Collectible)
    animation.runImageAnimation(collectible, [img`
                . . b b b b . .
                . b 5 5 5 5 b .
                b 5 d 3 3 d 5 b
                b 5 3 5 5 1 5 b
                c 5 3 5 5 1 d c
                c d d 1 1 d d c
                . f d d d d f .
                . . f f f f . .
            `,
    img`
                . . b b b . . .
                . b 5 5 5 b . .
                b 5 d 3 d 5 b .
                b 5 3 5 1 5 b .
                c 5 3 5 1 d c .
                c 5 d 1 d d c .
                . f d d d f . .
                . . f f f . . .
            `,
    img`
                . . . b b . . .
                . . b 5 5 b . .
                . b 5 d 1 5 b .
                . b 5 3 1 5 b .
                . c 5 3 1 d c .
                . c 5 1 d d c .
                . . f d d f . .
                . . . f f . . .
            `,
    img`
        . . . b b . . .
        . . b 5 5 b . .
        . . b 1 1 b . .
        . . b 5 5 b . .
        . . b d d b . .
        . . c d d c . .
        . . c 3 3 c . .
        . . . f f . . .
    `,
    img`
                . . . b b . . .
                . . b 5 5 b . .
                . b 5 1 d 5 b .
                . b 5 1 3 5 b .
                . c d 1 3 5 c .
                . c d d 1 5 c .
                . . f d d f . .
                . . . f f . . .
            `,
    img`
                . . . b b b . .
                . . b 5 5 5 b .
                . b 5 d 3 d 5 b
                . b 5 1 5 3 5 b
                . c d 1 5 3 5 c
                . c d d 1 d 5 c
                . . f d d d f .
                . . . f f f . .
            `], Math.randomRange(75, 125), true)
    tiles.placeOnTile(collectible, tileLocation)

}
selectLevel()

controller.A.onEvent(ControllerButtonEvent.Pressed, function(){
   if(jumps > 0&& !isFalling&&!isFlying){
       isFalling = true
       jumps = 0
       if(sprites.readDataBoolean(playerSprite,"ShrinkPower")){
           playerSprite.vy = -250
           return
       }
       playerSprite.vy = -200
       
       
   }
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function(){
    if(sprites.readDataBoolean(playerSprite, "ShootPower")){
        let projectileSprite:Sprite = sprites.create(img`
            . . . . 8 8 8 8 8 8 8 . . . . .
            . . . 8 8 8 8 8 8 8 8 8 . . . .
            . . 8 8 6 6 6 6 6 6 6 8 8 . . .
            . 8 8 6 6 6 6 6 6 6 6 6 8 8 . .
            . 8 8 6 6 9 9 9 9 9 6 6 8 8 . .
            . 8 8 6 6 9 9 9 9 9 6 6 8 8 . .
            . 8 8 6 6 9 9 2 9 9 6 6 8 8 . .
            . 8 8 6 6 9 9 9 9 9 6 6 8 8 . .
            . 8 8 6 6 9 9 9 9 9 6 6 8 8 . .
            . 8 8 6 6 6 6 6 6 6 6 6 8 8 . .
            . . 8 8 6 6 6 6 6 6 6 8 8 . . .
            . . . 8 8 8 8 8 8 8 8 8 . . . .
            . . . . 8 8 8 8 8 8 8 . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,SpriteKind.Projectile)
        projectileSprite.setPosition(playerSprite.x,playerSprite.y)
        projectileSprite.lifespan = 2500
        projectileSprite.ay = 400
        projectileSprite.vy = -50
        projectileSprite.setBounceOnWall(true)
        if(characterAnimations.matchesRule(playerSprite, Predicate.FacingRight)){
            projectileSprite.vx = 100
        }else if(characterAnimations.matchesRule(playerSprite, Predicate.FacingLeft)){
            projectileSprite.vx = -100
        }
    }
    if(sprites.readDataBoolean(playerSprite,"BatPower")&&!isFlying){
        batPower()
        info.startCountdown(15)
        isFlying = true
    }
    
    
    
})
info.onCountdownEnd(function(){
    resetPlayerPowerUps()
    
    timer.after(10000, function() {
        if(!sprites.readDataBoolean(playerSprite,"GrowPower")&&
            !sprites.readDataBoolean(playerSprite, "ShrinkPower") &&
            !sprites.readDataBoolean(playerSprite, "ShootPower") )
        sprites.setDataBoolean(playerSprite, "BatPower", true)
    })

})
function destroyTile(tileImage: Image,targetLocation :tiles.Location,effectType:effects.ParticleEffect,velocityY:number){
    let tileSprite = sprites.create(tileImage, SpriteKind.Tile)
    tiles.setTileAt(targetLocation,img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `)
    tiles.setWallAt(targetLocation,false)
    tiles.placeOnTile(tileSprite,targetLocation)
    tileSprite.vy = velocityY
    tileSprite.destroy(effectType, 200)

} 
scene.onHitWall(SpriteKind.Projectile,function(sprite,location){
    if(tiles.tileAtLocationEquals(location, assets.tile`vineTile`)){
        destroyTile(assets.tile`vineTile`,location,effects.fire,0)
        sprite.destroy()
    }
})
scene.onHitWall(SpriteKind.Player, function(sprite,location){
    if(sprite.isHittingTile(CollisionDirection.Bottom)){
        jumps += 1
        isFalling = false

    }
    if(sprite.isHittingTile(CollisionDirection.Top)){
        if(tiles.tileAtLocationEquals(location, assets.tile`luckyTile`)){
            let targetLocation: tiles.Location = tiles.getTileLocation(location.column  , location.row-1)
            //createCollectible(targetLocation)
            createPowerUp(randint(0,powerUpObject["image"].length-1),targetLocation)
            // tiles.setTileAt(location,assets.tile`unluckyTile`)
            hitPowerBox(img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
            `,location)
        }
        if(tiles.tileAtLocationEquals(location,assets.tile`unluckyTile`)){
            hitPowerBox(assets.tile`unluckyTile`,location)

        }
        if(tiles.tileAtLocationEquals(location, assets.tile`stone1`)){
            if(sprites.readDataBoolean(sprite, "GrowPower" )){
                destroyTile(assets.tile`stone1`,location,effects.disintegrate,-50)
            }
            else if(Math.randomRange(1,10)<2){
                let targetLocation: tiles.Location = tiles.getTileLocation(location.column, location.row - 1)
                createCollectible(targetLocation)
                hitPowerBox(img`
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                    . . . . . . . . . . . . . . . .
                `,location)
            }
        }
    }
   
})

game.onUpdateInterval(1000,function(){
    spriteJump(SpriteKind.Enemy)
})
game.onUpdate(function(){
    changeDirectionX(SpriteKind.BatPower)
    changeDirectionX(SpriteKind.GrowPower)
    changeDirectionX(SpriteKind.ShootPower)
    changeDirectionX(SpriteKind.ShrinkPower)
    changeDirectionX(SpriteKind.Enemy)
    if(playerSprite.vy > 0){
        isFalling =true
        

    }
    
    if(tiles.getTilesByType(assets.tile`luckyTile`).length <=0){
        tiles.setTileAt(tiles.getTilesByType(assets.tile`unluckyTile`)._pickRandom(),assets.tile`luckyTile`)
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
    ], 100, characterAnimations.rule(Predicate.FacingRight,Predicate.MovingRight,Predicate.HittingWallDown))
    characterAnimations.loopFrames(playerSprite, [img`
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
    `
        , img`
            . . . . f f f f f . . . . . . .
            . . . f e e e e e f . . . . . .
            . . f d d d d e e e f . . . . .
            . c d f d d f d e e f . . . . .
            . c d f d d f d e e f f . . . .
            c d e e d d d d e e d d f . . .
            c d d d d c d d e e b d c . . .
            c c c c c d d e e e b d c . f f
            . f d d d d e e e f f c . f e f
            . f f f f f f e e e e f . f e f
            . f f f f e e e e e e e f f e f
            f d d f d d f e f e e e e f f .
            f d b f d b f e f e e e e f . .
            f f f f f f f f f f f f e f . .
            . . . . . . . . . f c d d f . .
            . . . . . . . . . . f f f f . .
        `,
    img`
        . . . . f f f f f . . . . . . .
        . . . f e e e e e f . . . . . .
        . . f d d d d e e e f f . . . .
        . c d d d d d d e e d d f . . .
        . c d f d d f d e e b d c . . .
        c d d f d d f d e e b d c . f f
        c d e e d d d d e e f c . f e f
        c d d d d c d e e e f . . f e f
        . f c c c d e e e f f . . f e f
        . . f f f f f e e e e f . f e f
        . . . . f e e e e e e e f f f .
        . . f f e f e e f e e e e f . .
        . f e f f e e f f f e e e f . .
        f d d b d d c f f f f f f b f .
        f d d c d d d f . . f c d d f .
        . f f f f f f f . . . f f f . .
    `, img`
        . . . . f f f f f . . . . . . .
        . . . f e e e e e f f f . . . .
        . . f d d d e e e e d d f . . .
        . c d d d d d e e e b d c . . .
        . c d d d d d d e e b d c . . .
        c d d f d d f d e e f c . f f .
        c d d f d d f d e e f . . f e f
        c d e e d d d d e e f . . f e f
        . f d d d c d e e f f . . f e f
        . . f f f d e e e e e f . f e f
        . . . . f e e e e e e e f f f .
        . . . . f f e e e e e b f f . .
        . . . f e f f e e c d d f f . .
        . . f d d b d d c f f f . . . .
        . . f d d c d d d f f . . . . .
        . . . f f f f f f f . . . . . .
    `
    ], 100, characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingLeft,Predicate.HittingWallDown))
    characterAnimations.loopFrames(playerSprite,[img`
        . . . . f f f f f . . . . . . .
        . . . f e e e e e f . . . . . .
        . . f d d d d e e e f . . . . .
        . c d f d d f d e e f . . . . .
        . c d f d d f d e e f f . . . .
        c d e e d d d d e e d d f . . .
        c d d d d c d d e e b d c . . .
        c c c c c d d e e e b d c . f f
        . f d d d d e e e f f c . f e f
        . f f f f f f e e e e f . f e f
        . f f f f e e e e e e e f f e f
        f d d f d d f e f e e e e f f .
        f d b f d b f e f e e e e f . .
        f f f f f f f f f f f f e f . .
        . . . . . . . . . f c d d f . .
        . . . . . . . . . . f f f f . .
    `],1,characterAnimations.rule(Predicate.Moving,Predicate.FacingLeft))

    characterAnimations.loopFrames(playerSprite, [img`
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
    `], 1, characterAnimations.rule(Predicate.Moving, Predicate.FacingRight))

    characterAnimations.loopFrames(playerSprite, [img`
        . . . . f f f f f . . . . . . .
        . . . f e e e e e f . . . . . .
        . . f d d d d e e e f . . . . .
        . c d f d d f d e e f f . . . .
        . c d f d d f d e e d d f . . .
        c d e e d d d d e e b d c . . .
        c d d d d c d d e e b d c . . .
        c c c c c d d e e e f c . . . .
        . f d d d d e e e f f . . . . .
        . . f f f f f e e e e f . . . .
        . . . . f f e e e e e e f . f f
        . . . f e e f e e f e e f . e f
        . . f e e f e e f e e e f . e f
        . f b d f d b f b b f e f f e f
        . f d d f d d f d d b e f f f f
        . . f f f f f f f f f f f f f .
    `,img`
        . . . . f f f f f . . . . . . .
        . . . f e e e e e f . . . . . .
        . . f d d d d e e e f . . . . .
        . c d f d d f d e e f f . . . .
        . c d f d d f d e e d d f . . .
        c d e e d d d d e e b d c . . .
        c d d d d c d d e e b d c . . .
        c c c c c d d e e e f c . . . .
        . f d d d d e e e f f . . . . .
        . . f e e e f f e e e f . . . .
        . . f f f f f e e e e e f . f f
        . . f d b f e e f f e e f . e f
        . f f d d f e f f e e e f . e f
        . f f f f f f e b b f e f f e f
        . f d d f e e e d d b e f f f f
        . . f f f f f f f f f f f f f .
    `,img`
        . . . . . f f f f f . . . . . .
        . . . . f e e e e e f . . . . .
        . . . f d d d d d e e f . . . .
        . . f f f d d f f d e f f . . .
        . c d d e e d d d d e d d f . .
        . c c d d d d c d d e d f f f .
        . c d c c c c d d d e d f b d f
        . . c d d d d d d e e f f d d f
        . . . c d d d d e e f f e f f f
        . . . . f f f e e f e e e f . .
        . . . . f e e e e e e e f f f .
        . . . f e e e e e e f f f e f .
        . . f f e e e e f f f f f e f .
        . f b d f e e f b b f f f e f .
        . f d d f e e f d d b f f f f .
        . f f f f f f f f f f f f f . .
    `,img`
        . . . . . f f f f f . . . . . .
        . . . . f e e e e e f . . . . .
        . . . f d d d d d d e f . . . .
        . . f d f f d d f f d f f . . .
        . c d d d e e d d d d e d f . .
        . c d c d d d d c d d e f f . .
        . c d d c c c c d d d e f f f f
        . . c d d d d d d d e f f b d f
        . . . c d d d d e e f f f d d f
        . . . . f f f e e f e e e f f f
        . . . . f e e e e e e e f f f .
        . . . f e e e e e e f f f e f .
        . . f f e e e e f f f f f e f .
        . f b d f e e f b b f f f e f .
        . f d d f f f f d d b f f f f .
        . f f f f f f f f f f f f f . .
    `,img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . f f f f f . . . . . . .
        . . . f e e e e e f . . . . . .
        . . f d d d d e e e f . . . . .
        . . f d d d d d e e f f . . . .
        . c d d d f f d e e d d f . . .
        c d e e d d d d e e b d c . . .
        c f f d d c d d e e b d c . . .
        f d d f e f f f e e e f . . . .
        f d d f e e e f f f f f . . . .
        f f f f f e e e e e f f . f f .
        . f f f e f f e e e f f . e f .
        . f b d f e f f b b f f f e f .
        . f d d f e e f d d b f f e f .
        . f f f f f f f f f f f f f . .
    `,img`
        . . . . f f f f f . . . . . . .
        . . . f e e e e e f . . . . . .
        . . f d d d d e e e f . . . . .
        . . f d d f d d e e f f . . . .
        . c d d d f d d e e d d f . . .
        c d e e d d d d e e b d c . . .
        c d d d d c d d e e b d c . . .
        c f f f f d d d e e f c f . . .
        . f b d f f f e e e e f . . . .
        . f d d f e f f f e e f . . . .
        . . f f f e e e e f f f . f f .
        . . f e e f e e e e f f . e f .
        . f f e e e f f f f f f f e f .
        . f b d f e e f b b f f f e f .
        . f d d f f e e d d b f f f f .
        . f f f f f f f f f f f f f . .
    `], 100, characterAnimations.rule(Predicate.HittingWallDown, Predicate.NotMoving,Predicate.FacingLeft))
    characterAnimations.loopFrames(playerSprite, [img`
        . . . . . . . f f f f f . . . .
        . . . . . . f e e e e e f . . .
        . . . . . f e e e d d d d f . .
        . . . . f f e e d f d d f d c .
        . . . f d d e e d f d d f d c .
        . . . c d b e e d d d d e e d c
        . . . c d b e e d d c d d d d c
        . . . . c f e e e d d c c c c c
        . . . . . f f e e e d d d d f .
        . . . . f e e e e f f f f f . .
        f f . f e e e e e e f f . . . .
        f e . f e e f e e f e e f . . .
        f e . f e e e f e e f e e f . .
        f e f f e f b b f b d f d b f .
        f f f f e b d d f d d f d d f .
        . f f f f f f f f f f f f f . .
    `, img`
        . . . . . . . f f f f f . . . .
        . . . . . . f e e e e e f . . .
        . . . . . f e e e d d d d f . .
        . . . . f f e e d f d d f d c .
        . . . f d d e e d f d d f d c .
        . . . c d b e e d d d d e e d c
        . . . c d b e e d d c d d d d c
        . . . . c f e e e d d c c c c c
        . . . . . f f e e e d d d d f .
        . . . . f e e e f f e e e f . .
        f f . f e e e e e f f f f f . .
        f e . f e e f f e e f b d f . .
        f e . f e e e f f e f d d f f .
        f e f f e f b b e f f f f f f .
        f f f f e b d d e e e f d d f .
        . f f f f f f f f f f f f f . .
    `, img`
        . . . . . . f f f f f . . . . .
        . . . . . f e e e e e f . . . .
        . . . . f e e d d d d d f . . .
        . . . f f e d f f d d f f f . .
        . . f d d e d d d d e e d d c .
        . f f f d e d d c d d d d c c .
        f d b f d e d d d c c c c d c .
        f d d f f e e d d d d d d c . .
        f f f e f f e e d d d d c . . .
        . . f e e e f e e f f f . . . .
        . f f f e e e e e e e f . . . .
        . f e f f f e e e e e e f . . .
        . f e f f f f f e e e e f f . .
        . f e f f f b b f e e f d b f .
        . f f f f b d d f e e f d d f .
        . . f f f f f f f f f f f f f .
    `, img`
        . . . . . . f f f f f . . . . .
        . . . . . f e e e e e f . . . .
        . . . . f e d d d d d d f . . .
        . . . f f d f f d d f f d f . .
        . . f d e d d d d e e d d d c .
        . . f f e d d c d d d d c d c .
        f f f f e d d d c c c c d d c .
        f d b f f e d d d d d d d c . .
        f d d f f f e e d d d d c . . .
        f f f e e e f e e f f f . . . .
        . f f f e e e e e e e f . . . .
        . f e f f f e e e e e e f . . .
        . f e f f f f f e e e e f f . .
        . f e f f f b b f e e f d b f .
        . f f f f b d d f f f f d d f .
        . . f f f f f f f f f f f f f .
    `, img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . f f f f f . . . .
        . . . . . . f e e e e e f . . .
        . . . . . f e e e d d d d f . .
        . . . . f f e e d d d d d f . .
        . . . f d d e e d f f d d d c .
        . . . c d b e e d d d d e e d c
        . . . c d b e e d d c d d f f c
        . . . . f e e e f f f e f d d f
        . . . . f f f f f e e e f d d f
        . f f . f f e e e e e f f f f f
        . f e . f f e e e f f e f f f .
        . f e f f f b b f f e f d b f .
        . f e f f b d d f e e f d d f .
        . . f f f f f f f f f f f f f .
    `, img`
        . . . . . . . f f f f f . . . .
        . . . . . . f e e e e e f . . .
        . . . . . f e e e d d d d f . .
        . . . . f f e e d d f d d f . .
        . . . f d d e e d d f d d d c .
        . . . c d b e e d d d d e e d c
        . . . c d b e e d d c d d d d c
        . . . f c f e e d d d f f f f c
        . . . . f e e e e f f f d b f .
        . . . . f e e f f f e f d d f .
        . f f . f f f e e e e f f f . .
        . f e . f f e e e e f e e f . .
        . f e f f f f f f f e e e f f .
        . f e f f f b b f e e f d b f .
        . f f f f b d d e e f f d d f .
        . . f f f f f f f f f f f f f .
    `], 100, characterAnimations.rule(Predicate.HittingWallDown, Predicate.NotMoving, Predicate.FacingRight))

}
scene.onOverlapTile(SpriteKind.Player, assets.tile`lava`, function (sprite, location) {
    sprites.destroy(sprite)
    scene.cameraShake(99, 500)
})
scene.onOverlapTile(SpriteKind.GrowPower,assets.tile`lava`, function(sprite,location){
    sprite.destroy()
})
scene.onOverlapTile(SpriteKind.ShootPower, assets.tile`lava`, function (sprite, location) {
    sprite.destroy()
})
scene.onOverlapTile(SpriteKind.BatPower, assets.tile`lava`, function (sprite, location) {
    sprite.destroy()
})
scene.onOverlapTile(SpriteKind.ShrinkPower, assets.tile`lava`, function (sprite, location) {
    sprite.destroy()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`conveyerMove`, function (sprite, location) {
   playerSprite.vx = 40

})
sprites.onOverlap(SpriteKind.Player,SpriteKind.GrowPower,function(sprite,otherSprite){
    otherSprite.destroy()
    resetPlayerPowerUps()
    if(sprites.readDataBoolean(sprite,"GrowPower")){
        return
    }
    sprites.setDataBoolean(sprite, "GrowPower", true)
    sprite.scale = 2
    sprite.vy = -100
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ShootPower, function (sprite, otherSprite) {
    otherSprite.destroy()
    resetPlayerPowerUps()
    if (sprites.readDataBoolean(sprite, "ShootPower")) {
        return
    }
    sprites.setDataBoolean(sprite, "ShootPower", true)
    
    
})
function batPower(){
    createBatAnimations()
    controller.moveSprite(playerSprite, 100,100)
    playerSprite.ay = 0
}
function createBatAnimations(){ 
    //moving animations
    characterAnimations.loopFrames(playerSprite, [
        img`
            f f f . . . . . . . . f f f . .
            c b b c f . . . . . . c c f f .
            . c b b c f . . . . . . c c f f
            . c c c b f . . . . . . c f c f
            . c c b b c f . c c . c c f f f
            . c b b c b f c c 3 c c 3 c f f
            . c b c c b f c b 3 c b 3 b f f
            . . c c c b b c b b b b b b c .
            . . . c c c c b b 1 b b b 1 c .
            . . . . c c b b b b b b b b b c
            . . . . f b b b b c b b b c b c
            . . . c f b b b b 1 f f f 1 b f
            . . c c f b b b b b b b b b b f
            . . . . f c b b b b b b b b f .
            . . . . . f c b b b b b b f . .
            . . . . . . f f f f f f f . . .
        `,
        img`
            . . . . . . . . . . . f f f . .
            f f f . . . . . . . . c c f f f
            c b b c f . . . c c . . c c f f
            . c b b b f f c c 3 c c 3 c f f
            . c c c b b f c b 3 c b 3 b f f
            . c c b c b f c b b b b b b c .
            . c b b c b b c b b b b b b c .
            . c b c c c b b b 1 b b b 1 b c
            . . c c c c c b b b b b b b b c
            . . . c f b b b b c b b b c b f
            . . c c f b b b b 1 f f f 1 b f
            . . . . f c b b b b b b b b f .
            . . . . . f c b b b b b b f . .
            . . . . . . f f f f f f f . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . c c . . c c . .
            . . . . . . c c c 3 c c 3 c . .
            . . . . . c c c b 3 c b 3 b c .
            . . . . f f b b b b b b b b c .
            . . . . f f b b b b b b b b c c
            . . . f f f c b b 1 b b b 1 b c
            . . . f f f f b b b b b b b b c
            . . . b b b c c b c b b b c b f
            . . . c c c c f b 1 f f f 1 b f
            . . . c c b b f b b b b b b f .
            . . . c b b c c b b b b b f c c
            . . c b b c c f f f f f f c c c
            . c c c c c . . . . . . c c c .
            c c c c . . . . . . . c c c . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . f f f . . . . . . . . f f f .
            . c b b c f . . . . . . . c f f
            . . c b b c f . . . . . . c c f
            . . c c c b f . . . . . . . f c
            . . c c b b f f . . . . . f f c
            . . c b b c b f c c . c c f f f
            . . c b c c b f c c c c c f f f
            . . . c c c b c b 3 c c 3 c f .
            . . . c c c c b b 3 c b 3 b c .
            . . . . c c b b b b b b b b c c
            . . . c f b b b b 1 b b b 1 b c
            . . c c f b b b b b b b b b b f
            . . . . f b b b b c b b b c b f
            . . . . f c b b b 1 f f f 1 f .
            . . . . . f c b b b b b b f . .
            . . . . . . f f f f f f f . . .
        `
    ], 100, characterAnimations.rule(Predicate.FacingRight,Predicate.Moving))
    characterAnimations.loopFrames(playerSprite, [
        img`
            . . f f f . . . . . . . . f f f
            . f f c c . . . . . . f c b b c
            f f c c . . . . . . f c b b c .
            f c f c . . . . . . f b c c c .
            f f f c c . c c . f c b b c c .
            f f c 3 c c 3 c c f b c b b c .
            f f b 3 b c 3 b c f b c c b c .
            . c b b b b b b c b b c c c . .
            . c 1 b b b 1 b b c c c c . . .
            c b b b b b b b b b c c . . . .
            c b c b b b c b b b b f . . . .
            f b 1 f f f 1 b b b b f c . . .
            f b b b b b b b b b b f c c . .
            . f b b b b b b b b c f . . . .
            . . f b b b b b b c f . . . . .
            . . . f f f f f f f . . . . . .
        `,
        img`
            . . f f f . . . . . . . . . . .
            f f f c c . . . . . . . . f f f
            f f c c . . c c . . . f c b b c
            f f c 3 c c 3 c c f f b b b c .
            f f b 3 b c 3 b c f b b c c c .
            . c b b b b b b c f b c b c c .
            . c b b b b b b c b b c b b c .
            c b 1 b b b 1 b b b c c c b c .
            c b b b b b b b b c c c c c . .
            f b c b b b c b b b b f c . . .
            f b 1 f f f 1 b b b b f c c . .
            . f b b b b b b b b c f . . . .
            . . f b b b b b b c f . . . . .
            . . . f f f f f f f . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . c c . . c c . . . . . . . .
            . . c 3 c c 3 c c c . . . . . .
            . c b 3 b c 3 b c c c . . . . .
            . c b b b b b b b b f f . . . .
            c c b b b b b b b b f f . . . .
            c b 1 b b b 1 b b c f f f . . .
            c b b b b b b b b f f f f . . .
            f b c b b b c b c c b b b . . .
            f b 1 f f f 1 b f c c c c . . .
            . f b b b b b b f b b c c . . .
            c c f b b b b b c c b b c . . .
            c c c f f f f f f c c b b c . .
            . c c c . . . . . . c c c c c .
            . . c c c . . . . . . . c c c c
            . . . . . . . . . . . . . . . .
        `,
        img`
            . f f f . . . . . . . . f f f .
            f f c . . . . . . . f c b b c .
            f c c . . . . . . f c b b c . .
            c f . . . . . . . f b c c c . .
            c f f . . . . . f f b b c c . .
            f f f c c . c c f b c b b c . .
            f f f c c c c c f b c c b c . .
            . f c 3 c c 3 b c b c c c . . .
            . c b 3 b c 3 b b c c c c . . .
            c c b b b b b b b b c c . . . .
            c b 1 b b b 1 b b b b f c . . .
            f b b b b b b b b b b f c c . .
            f b c b b b c b b b b f . . . .
            . f 1 f f f 1 b b b c f . . . .
            . . f b b b b b b c f . . . . .
            . . . f f f f f f f . . . . . .
        `
    ], 100, characterAnimations.rule(Predicate.FacingLeft, Predicate.Moving))
    characterAnimations.loopFrames(playerSprite, [
        img`
            f f f . . . . . . . . f f f . .
            c b b c f . . . . . . c c f f .
            . c b b c f . . . . . . c c f f
            . c c c b f . . . . . . c f c f
            . c c b b c f . c c . c c f f f
            . c b b c b f c c 3 c c 3 c f f
            . c b c c b f c b 3 c b 3 b f f
            . . c c c b b c b b b b b b c .
            . . . c c c c b b 1 b b b 1 c .
            . . . . c c b b b b b b b b b c
            . . . . f b b b b c b b b c b c
            . . . c f b b b b 1 f f f 1 b f
            . . c c f b b b b b b b b b b f
            . . . . f c b b b b b b b b f .
            . . . . . f c b b b b b b f . .
            . . . . . . f f f f f f f . . .
        `,
        img`
            . . . . . . . . . . . f f f . .
            f f f . . . . . . . . c c f f f
            c b b c f . . . c c . . c c f f
            . c b b b f f c c 3 c c 3 c f f
            . c c c b b f c b 3 c b 3 b f f
            . c c b c b f c b b b b b b c .
            . c b b c b b c b b b b b b c .
            . c b c c c b b b 1 b b b 1 b c
            . . c c c c c b b b b b b b b c
            . . . c f b b b b c b b b c b f
            . . c c f b b b b 1 f f f 1 b f
            . . . . f c b b b b b b b b f .
            . . . . . f c b b b b b b f . .
            . . . . . . f f f f f f f . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . c c . . c c . .
            . . . . . . c c c 3 c c 3 c . .
            . . . . . c c c b 3 c b 3 b c .
            . . . . f f b b b b b b b b c .
            . . . . f f b b b b b b b b c c
            . . . f f f c b b 1 b b b 1 b c
            . . . f f f f b b b b b b b b c
            . . . b b b c c b c b b b c b f
            . . . c c c c f b 1 f f f 1 b f
            . . . c c b b f b b b b b b f .
            . . . c b b c c b b b b b f c c
            . . c b b c c f f f f f f c c c
            . c c c c c . . . . . . c c c .
            c c c c . . . . . . . c c c . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . f f f . . . . . . . . f f f .
            . c b b c f . . . . . . . c f f
            . . c b b c f . . . . . . c c f
            . . c c c b f . . . . . . . f c
            . . c c b b f f . . . . . f f c
            . . c b b c b f c c . c c f f f
            . . c b c c b f c c c c c f f f
            . . . c c c b c b 3 c c 3 c f .
            . . . c c c c b b 3 c b 3 b c .
            . . . . c c b b b b b b b b c c
            . . . c f b b b b 1 b b b 1 b c
            . . c c f b b b b b b b b b b f
            . . . . f b b b b c b b b c b f
            . . . . f c b b b 1 f f f 1 f .
            . . . . . f c b b b b b b f . .
            . . . . . . f f f f f f f . . .
        `
    ], 100, characterAnimations.rule(Predicate.FacingRight, Predicate.MovingRight,Predicate.HittingWallDown))
    characterAnimations.loopFrames(playerSprite, [
        img`
            . . f f f . . . . . . . . f f f
            . f f c c . . . . . . f c b b c
            f f c c . . . . . . f c b b c .
            f c f c . . . . . . f b c c c .
            f f f c c . c c . f c b b c c .
            f f c 3 c c 3 c c f b c b b c .
            f f b 3 b c 3 b c f b c c b c .
            . c b b b b b b c b b c c c . .
            . c 1 b b b 1 b b c c c c . . .
            c b b b b b b b b b c c . . . .
            c b c b b b c b b b b f . . . .
            f b 1 f f f 1 b b b b f c . . .
            f b b b b b b b b b b f c c . .
            . f b b b b b b b b c f . . . .
            . . f b b b b b b c f . . . . .
            . . . f f f f f f f . . . . . .
        `,
        img`
            . . f f f . . . . . . . . . . .
            f f f c c . . . . . . . . f f f
            f f c c . . c c . . . f c b b c
            f f c 3 c c 3 c c f f b b b c .
            f f b 3 b c 3 b c f b b c c c .
            . c b b b b b b c f b c b c c .
            . c b b b b b b c b b c b b c .
            c b 1 b b b 1 b b b c c c b c .
            c b b b b b b b b c c c c c . .
            f b c b b b c b b b b f c . . .
            f b 1 f f f 1 b b b b f c c . .
            . f b b b b b b b b c f . . . .
            . . f b b b b b b c f . . . . .
            . . . f f f f f f f . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . c c . . c c . . . . . . . .
            . . c 3 c c 3 c c c . . . . . .
            . c b 3 b c 3 b c c c . . . . .
            . c b b b b b b b b f f . . . .
            c c b b b b b b b b f f . . . .
            c b 1 b b b 1 b b c f f f . . .
            c b b b b b b b b f f f f . . .
            f b c b b b c b c c b b b . . .
            f b 1 f f f 1 b f c c c c . . .
            . f b b b b b b f b b c c . . .
            c c f b b b b b c c b b c . . .
            c c c f f f f f f c c b b c . .
            . c c c . . . . . . c c c c c .
            . . c c c . . . . . . . c c c c
            . . . . . . . . . . . . . . . .
        `,
        img`
            . f f f . . . . . . . . f f f .
            f f c . . . . . . . f c b b c .
            f c c . . . . . . f c b b c . .
            c f . . . . . . . f b c c c . .
            c f f . . . . . f f b b c c . .
            f f f c c . c c f b c b b c . .
            f f f c c c c c f b c c b c . .
            . f c 3 c c 3 b c b c c c . . .
            . c b 3 b c 3 b b c c c c . . .
            c c b b b b b b b b c c . . . .
            c b 1 b b b 1 b b b b f c . . .
            f b b b b b b b b b b f c c . .
            f b c b b b c b b b b f . . . .
            . f 1 f f f 1 b b b c f . . . .
            . . f b b b b b b c f . . . . .
            . . . f f f f f f f . . . . . .
        `
    ], 100, characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingLeft,Predicate.HittingWallDown))
    //idle animations
    characterAnimations.loopFrames(playerSprite, [
        img`
            . . f f f . . . . . . . . f f f
            . f f c c . . . . . . f c b b c
            f f c c . . . . . . f c b b c .
            f c f c . . . . . . f b c c c .
            f f f c c . c c . f c b b c c .
            f f c 3 c c 3 c c f b c b b c .
            f f b 3 b c 3 b c f b c c b c .
            . c 1 b b b 1 b c b b c c c . .
            . c 1 b b b 1 b b c c c c . . .
            c b b b b b b b b b c c . . . .
            c b 1 f f 1 c b b b b f . . . .
            f f 1 f f 1 f b b b b f c . . .
            f f 2 2 2 2 f b b b b f c c . .
            . f 2 2 2 2 b b b b c f . . . .
            . . f b b b b b b c f . . . . .
            . . . f f f f f f f . . . . . .
        `,
        img`
            . . f f f . . . . . . . . . . .
            f f f c c . . . . . . . . f f f
            f f c c c . c c . . . f c b b c
            f f c 3 c c 3 c c f f b b b c .
            f f c 3 b c 3 b c f b b c c c .
            f c b b b b b b c f b c b c c .
            c c 1 b b b 1 b c b b c b b c .
            c b b b b b b b b b c c c b c .
            c b 1 f f 1 c b b c c c c c . .
            c f 1 f f 1 f b b b b f c . . .
            f f f f f f f b b b b f c . . .
            f f 2 2 2 2 f b b b b f c c . .
            . f 2 2 2 2 2 b b b c f . . . .
            . . f 2 2 2 b b b c f . . . . .
            . . . f f f f f f f . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . c c . c c . . . . . . . .
            . . f 3 c c 3 c c c . . . . . .
            . f c 3 b c 3 b c c c . . . . .
            f c b b b b b b b b f f . . . .
            c c 1 b b b 1 b b b f f . . . .
            c b b b b b b b b c f f f . . .
            c b 1 f f 1 c b b f f f f . . .
            f f 1 f f 1 f b c c b b b . . .
            f f f f f f f b f c c c c . . .
            f f 2 2 2 2 f b f b b c c c . .
            . f 2 2 2 2 2 b c c b b c . . .
            . . f 2 2 2 b f f c c b b c . .
            . . . f f f f f f f c c c c c .
            . . . . . . . . . . . . c c c c
        `,
        img`
            . f f f . . . . . . . . f f f .
            f f c . . . . . . . f c b b c .
            f c c . . . . . . f c b b c . .
            c f . . . . . . . f b c c c . .
            c f f . . . . . f f b b c c . .
            f f f c c . c c f b c b b c . .
            f f f c c c c c f b c c b c . .
            . f c 3 c c 3 b c b c c c . . .
            . c b 3 b c 3 b b c c c c . . .
            c c b b b b b b b b c c . . . .
            c 1 1 b b b 1 1 b b b f c . . .
            f b b b b b b b b b b f c c . .
            f b c b b b c b b b b f . . . .
            . f 1 f f f 1 b b b c f . . . .
            . . f b b b b b b c f . . . . .
            . . . f f f f f f f . . . . . .
        `
    ], 100, characterAnimations.rule(Predicate.NotMoving,Predicate.FacingLeft))
    characterAnimations.loopFrames(playerSprite, [
        img`
            f f f . . . . . . . . f f f . .
            c b b c f . . . . . . c c f f .
            . c b b c f . . . . . . c c f f
            . c c c b f . . . . . . c f c f
            . c c b b c f . c c . c c f f f
            . c b b c b f c c 3 c c 3 c f f
            . c b c c b f c b 3 c b 3 b f f
            . . c c c b b c b 1 b b b 1 c .
            . . . c c c c b b 1 b b b 1 c .
            . . . . c c b b b b b b b b b c
            . . . . f b b b b c 1 f f 1 b c
            . . . c f b b b b f 1 f f 1 f f
            . . c c f b b b b f 2 2 2 2 f f
            . . . . f c b b b b 2 2 2 2 f .
            . . . . . f c b b b b b b f . .
            . . . . . . f f f f f f f . . .
        `,
        img`
            . . . . . . . . . . . f f f . .
            f f f . . . . . . . . c c f f f
            c b b c f . . . c c . c c c f f
            . c b b b f f c c 3 c c 3 c f f
            . c c c b b f c b 3 c b 3 c f f
            . c c b c b f c b b b b b b c f
            . c b b c b b c b 1 b b b 1 c c
            . c b c c c b b b b b b b b b c
            . . c c c c c b b c 1 f f 1 b c
            . . . c f b b b b f 1 f f 1 f c
            . . . c f b b b b f f f f f f f
            . . c c f b b b b f 2 2 2 2 f f
            . . . . f c b b b 2 2 2 2 2 f .
            . . . . . f c b b b 2 2 2 f . .
            . . . . . . f f f f f f f . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . c c . c c . . .
            . . . . . . c c c 3 c c 3 f . .
            . . . . . c c c b 3 c b 3 c f .
            . . . . f f b b b b b b b b c f
            . . . . f f b b b 1 b b b 1 c c
            . . . f f f c b b b b b b b b c
            . . . f f f f b b c 1 f f 1 b c
            . . . b b b c c b f 1 f f 1 f f
            . . . c c c c f b f f f f f f f
            . . c c c b b f b f 2 2 2 2 f f
            . . . c b b c c b 2 2 2 2 2 f .
            . . c b b c c f f b 2 2 2 f . .
            . c c c c c f f f f f f f . . .
            c c c c . . . . . . . . . . . .
        `,
        img`
            . f f f . . . . . . . . f f f .
            . c b b c f . . . . . . . c f f
            . . c b b c f . . . . . . c c f
            . . c c c b f . . . . . . . f c
            . . c c b b f f . . . . . f f c
            . . c b b c b f c c . c c f f f
            . . c b c c b f c c c c c f f f
            . . . c c c b c b 3 c c 3 c f .
            . . . c c c c b b 3 c b 3 b c .
            . . . . c c b b b b b b b b c c
            . . . c f b b b 1 1 b b b 1 1 c
            . . c c f b b b b b b b b b b f
            . . . . f b b b b c b b b c b f
            . . . . f c b b b 1 f f f 1 f .
            . . . . . f c b b b b b b f . .
            . . . . . . f f f f f f f . . .
        `
    ], 100, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight))
    characterAnimations.loopFrames(playerSprite, [
        img`
            . . f f f . . . . . . . . f f f
            . f f c c . . . . . . f c b b c
            f f c c . . . . . . f c b b c .
            f c f c . . . . . . f b c c c .
            f f f c c . c c . f c b b c c .
            f f c 3 c c 3 c c f b c b b c .
            f f b 3 b c 3 b c f b c c b c .
            . c 1 b b b 1 b c b b c c c . .
            . c 1 b b b 1 b b c c c c . . .
            c b b b b b b b b b c c . . . .
            c b 1 f f 1 c b b b b f . . . .
            f f 1 f f 1 f b b b b f c . . .
            f f 2 2 2 2 f b b b b f c c . .
            . f 2 2 2 2 b b b b c f . . . .
            . . f b b b b b b c f . . . . .
            . . . f f f f f f f . . . . . .
        `,
        img`
            . . f f f . . . . . . . . . . .
            f f f c c . . . . . . . . f f f
            f f c c c . c c . . . f c b b c
            f f c 3 c c 3 c c f f b b b c .
            f f c 3 b c 3 b c f b b c c c .
            f c b b b b b b c f b c b c c .
            c c 1 b b b 1 b c b b c b b c .
            c b b b b b b b b b c c c b c .
            c b 1 f f 1 c b b c c c c c . .
            c f 1 f f 1 f b b b b f c . . .
            f f f f f f f b b b b f c . . .
            f f 2 2 2 2 f b b b b f c c . .
            . f 2 2 2 2 2 b b b c f . . . .
            . . f 2 2 2 b b b c f . . . . .
            . . . f f f f f f f . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . c c . c c . . . . . . . .
            . . f 3 c c 3 c c c . . . . . .
            . f c 3 b c 3 b c c c . . . . .
            f c b b b b b b b b f f . . . .
            c c 1 b b b 1 b b b f f . . . .
            c b b b b b b b b c f f f . . .
            c b 1 f f 1 c b b f f f f . . .
            f f 1 f f 1 f b c c b b b . . .
            f f f f f f f b f c c c c . . .
            f f 2 2 2 2 f b f b b c c c . .
            . f 2 2 2 2 2 b c c b b c . . .
            . . f 2 2 2 b f f c c b b c . .
            . . . f f f f f f f c c c c c .
            . . . . . . . . . . . . c c c c
        `,
        img`
            . f f f . . . . . . . . f f f .
            f f c . . . . . . . f c b b c .
            f c c . . . . . . f c b b c . .
            c f . . . . . . . f b c c c . .
            c f f . . . . . f f b b c c . .
            f f f c c . c c f b c b b c . .
            f f f c c c c c f b c c b c . .
            . f c 3 c c 3 b c b c c c . . .
            . c b 3 b c 3 b b c c c c . . .
            c c b b b b b b b b c c . . . .
            c 1 1 b b b 1 1 b b b f c . . .
            f b b b b b b b b b b f c c . .
            f b c b b b c b b b b f . . . .
            . f 1 f f f 1 b b b c f . . . .
            . . f b b b b b b c f . . . . .
            . . . f f f f f f f . . . . . .
        `
    ], 100, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingLeft,Predicate.HittingWallDown))
    characterAnimations.loopFrames(playerSprite, [
        img`
            f f f . . . . . . . . f f f . .
            c b b c f . . . . . . c c f f .
            . c b b c f . . . . . . c c f f
            . c c c b f . . . . . . c f c f
            . c c b b c f . c c . c c f f f
            . c b b c b f c c 3 c c 3 c f f
            . c b c c b f c b 3 c b 3 b f f
            . . c c c b b c b 1 b b b 1 c .
            . . . c c c c b b 1 b b b 1 c .
            . . . . c c b b b b b b b b b c
            . . . . f b b b b c 1 f f 1 b c
            . . . c f b b b b f 1 f f 1 f f
            . . c c f b b b b f 2 2 2 2 f f
            . . . . f c b b b b 2 2 2 2 f .
            . . . . . f c b b b b b b f . .
            . . . . . . f f f f f f f . . .
        `,
        img`
            . . . . . . . . . . . f f f . .
            f f f . . . . . . . . c c f f f
            c b b c f . . . c c . c c c f f
            . c b b b f f c c 3 c c 3 c f f
            . c c c b b f c b 3 c b 3 c f f
            . c c b c b f c b b b b b b c f
            . c b b c b b c b 1 b b b 1 c c
            . c b c c c b b b b b b b b b c
            . . c c c c c b b c 1 f f 1 b c
            . . . c f b b b b f 1 f f 1 f c
            . . . c f b b b b f f f f f f f
            . . c c f b b b b f 2 2 2 2 f f
            . . . . f c b b b 2 2 2 2 2 f .
            . . . . . f c b b b 2 2 2 f . .
            . . . . . . f f f f f f f . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . c c . c c . . .
            . . . . . . c c c 3 c c 3 f . .
            . . . . . c c c b 3 c b 3 c f .
            . . . . f f b b b b b b b b c f
            . . . . f f b b b 1 b b b 1 c c
            . . . f f f c b b b b b b b b c
            . . . f f f f b b c 1 f f 1 b c
            . . . b b b c c b f 1 f f 1 f f
            . . . c c c c f b f f f f f f f
            . . c c c b b f b f 2 2 2 2 f f
            . . . c b b c c b 2 2 2 2 2 f .
            . . c b b c c f f b 2 2 2 f . .
            . c c c c c f f f f f f f . . .
            c c c c . . . . . . . . . . . .
        `,
        img`
            . f f f . . . . . . . . f f f .
            . c b b c f . . . . . . . c f f
            . . c b b c f . . . . . . c c f
            . . c c c b f . . . . . . . f c
            . . c c b b f f . . . . . f f c
            . . c b b c b f c c . c c f f f
            . . c b c c b f c c c c c f f f
            . . . c c c b c b 3 c c 3 c f .
            . . . c c c c b b 3 c b 3 b c .
            . . . . c c b b b b b b b b c c
            . . . c f b b b 1 1 b b b 1 1 c
            . . c c f b b b b b b b b b b f
            . . . . f b b b b c b b b c b f
            . . . . f c b b b 1 f f f 1 f .
            . . . . . f c b b b b b b f . .
            . . . . . . f f f f f f f . . .
        `
    ], 100, characterAnimations.rule(Predicate.NotMoving, Predicate.FacingRight,Predicate.HittingWallDown))
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.BatPower, function (sprite, otherSprite) {
    otherSprite.destroy()
    resetPlayerPowerUps()

    if (sprites.readDataBoolean(sprite, "BatPower")) {
        return
    }
    sprites.setDataBoolean(sprite, "BatPower", true)
    

})
sprites.onOverlap(SpriteKind.Player, SpriteKind.ShrinkPower, function (sprite, otherSprite) {
    otherSprite.destroy()
    resetPlayerPowerUps()
    if (sprites.readDataBoolean(sprite, "ShrinkPower")) {
        return
    }
    sprites.setDataBoolean(sprite, "ShrinkPower", true)
    sprite.scale = 0.8
    sprite.vy = -100
})
function createPowerUp(powerUpType:number,targetLocation: tiles.Location){
let powerUpSprite: Sprite = sprites.create(powerUpObject["image"][powerUpType],powerUpObject["kind"][powerUpType])
    powerUpSprite.ay = 300
    let direction: number = 0
    if(Math.randomRange(-1,1)<0){
        direction = -1
    }else{
        direction = 1
    }
    powerUpSprite.setVelocity(direction*Math.randomRange(25,50), -100)
    tiles.placeOnTile(powerUpSprite,targetLocation)
    sprites.setDataNumber(powerUpSprite,"speed",powerUpSprite.vx)
}
let powerUpObject = {
    "image": [
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . f 5 . . . . . . . . .
            . . . . . 5 5 5 5 . . . . . . .
            . . . . . . 5 5 5 5 . . . . . .
            . . . . . . . . 5 5 . . . . . .
            . . . . . . . . 5 5 . . . . . .
            . . . . . . . 5 5 5 . . . . . .
            . . . . . . 5 5 5 . . . . . . .
            . . . . . 5 5 5 5 . . . . . . .
            . . . . . f 5 . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . e e . . . . . . . . .
            . . . . . . e e e . . . . . . .
            . . . . . . . . e e e . . . . .
            . . . . . . . . . . e e . . . .
            . . . . . . . . . . e e . . . .
            . . . . . . . . . . e . . . . .
            . . . . . . . . . e e . . . . .
            . . . . . . . . e e . . . . . .
            . . . . . . . . e . . . . . . .
            . . . . . . . e e . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            .........bb.........
            ........cccc........
            ........cccc........
            .........ff.........
            .........bf.........
            .........bb.........
            ........b96b........
            .......b9966b.......
            .......c6666c.......
            .......c6666c.......
            .......c6666f.......
            ........cfff........
            ....................
            ....................
        `,
        img`
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            ...f....4eee....f...
            ...ff..eeeeee..ff...
            ...fff...cc...fff...
            ....fff..ec..fff....
            .....fffeeeefff.....
            ......fee4eeef......
            ......ee4eeeee......
            .....ee4eeeeeee.....
            .....eeeeeeeeee.....
            .....eeeeeeeecc.....
            ......eeeeeecc......
            .......eccccc.......
            ....................
            ....................
        `
        ],
    "kind":[SpriteKind.GrowPower,SpriteKind.ShootPower,SpriteKind.ShrinkPower,SpriteKind.BatPower]
}
function changeDirectionX(spriteType:number){
    for (let sprite of sprites.allOfKind(spriteType)) {
        if (sprite.isHittingTile(CollisionDirection.Left) || sprite.isHittingTile(CollisionDirection.Right)) {
            sprite.vx = -sprites.readDataNumber(sprite, "speed")
            sprites.setDataNumber(sprite,"speed",sprite.vx)
        }

    }
}

//enemy stuff
sprites.onOverlap(SpriteKind.Projectile,SpriteKind.Enemy,function(sprite,otherSprite){
    otherSprite.destroy(effects.confetti)
    sprite.destroy()
    otherSprite.vy = -50
})
sprites.onOverlap(SpriteKind.Player,SpriteKind.EnemyProjectile,function(sprite,othersprite){
    sprite.destroy()
    scene.cameraShake(99,500)
    
})
scene.onOverlapTile(SpriteKind.Enemy, assets.tile`lava`,function(sprite){
sprite.destroy(effects.warmRadial)
})
sprites.onOverlap(SpriteKind.Player,SpriteKind.SpinningEnemy,function(sprite,othersprite){
    sprite.destroy()
    scene.cameraShake(99,500)
})
sprites.onOverlap(SpriteKind.Player,SpriteKind.Enemy,function(sprite,otherSprite){ 
    
    if(sprite.bottom < otherSprite.y){

        if(!sprites.readDataNumber(playerSprite,"BatPower")){
            sprite.vy = -100
            otherSprite.destroy(effects.bubbles)
            info.changeScoreBy(50)
        }
        
    }else{

        sprite.destroy()
        scene.cameraShake(99,500)
    }
})
function spriteJump(spriteType: number) {
    for (let sprite of sprites.allOfKind(spriteType)) {
        if(sprites.readDataString(sprite,"type")!= "ground")
        break
        if (Math.randomRange(1, 100) < 10) {
            sprite.vy = Math.randomRange(-50, -250)
        }
    }
}
