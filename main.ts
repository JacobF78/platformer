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
export const MysteryEnemy = SpriteKind.create()
export const ShellEnemy = SpriteKind.create()
export const Chest = SpriteKind.create()
export const EmptyChest = SpriteKind.create()
export const Key = SpriteKind.create()
export const Shop = SpriteKind.create()
export const HeartPower = SpriteKind.create()
export const Switch = SpriteKind.create()
export const UpJumpPad = SpriteKind.create()
export const InvinciblePower = SpriteKind.create()
export const WallJumpPower = SpriteKind.create()
export const LeftJumpPad = SpriteKind.create()
export const RightJumpPad = SpriteKind.create()
export const TeleportPad = SpriteKind.create()
export const TeleportLocationPad = SpriteKind.create()
export const GravityPower = SpriteKind.create()
}
let keysAmount: number = 0
let level:number = 2
let menuSprite:miniMenu.MenuSprite = null
let jumps: number = 1
let isTeleporting = false
let playerSprite:Sprite = null 
let isUpSideDown = false
let playerLastGroundLocation:tiles.Location
let isFalling: boolean = false
let powerUpTileCountList = [
    {
        "asset": assets.tile`growTile`,
        "max_count":0,
    },
    {
        "asset": assets.tile`shootTile`,
        "max_count": 0,
    },
    {
        "asset": assets.tile`shrinkTile`,
        "max_count": 0,
    },
    {
        "asset": assets.tile`batTile`,
        "max_count": 0,
    },
    {
        "asset": assets.tile`heartTile`,
        "max_count": 0,
    },
    {
        "asset": assets.tile`wallJumpTile`,
        "max_count": 0,
    },
    {
        "asset": assets.tile`invincibleTile`,
        "max_count": 0,
    },
    {
        "asset": assets.tile`gravityTile`,
        "max_count": 0,
    },
    {
        "asset": assets.tile`luckyTile`,
        "max_count": 0,
    },
    

    
]
let isFlying: boolean = false
let playerInvintoryList: Sprite[] = []
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

function createMysteryEnemy(tileLocation:tiles.Location){
    let enemySpriteAnimations: Image[][] = [
        [
            img`
                . . . . . . . . . . . c c . . .
                . . . . . . . c c c c 6 3 c . .
                . . . . . . c 6 3 3 3 3 6 c . .
                . . c c . c 6 c c 3 3 3 3 3 c .
                . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c
                . f f 5 c 6 c 5 f f 3 3 3 3 3 c
                . f f 5 c 6 c 5 f f 6 3 3 3 c c
                . b 5 5 3 c 3 5 5 c 6 6 6 6 c c
                . . b 5 5 3 5 5 c 3 3 3 3 3 3 c
                . . c 5 5 5 5 b c c 3 3 3 3 3 c
                . . c 4 5 5 4 b 5 5 c 3 3 3 c .
                . c 5 b 4 4 b b 5 c c b b b . .
                . c 4 4 b 5 5 5 4 c 4 4 4 5 b .
                . c 5 4 c 5 5 5 c 4 4 4 c 5 c .
                . c 5 c 5 5 5 5 c 4 4 4 c c c .
                . . c c c c c c c . . . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . c c . . . .
                . . . . . . c c c c 6 3 c . . .
                . . . . . c 6 6 3 3 3 6 c . . .
                . . . . c 6 6 3 3 3 3 3 3 c . .
                b c c c 6 6 c c 3 3 3 3 3 3 c .
                b 5 5 c 6 c 5 5 c 3 3 3 3 3 c .
                f f 5 c 6 c 5 f f 6 3 3 3 c c .
                f f 5 c c c 5 f f 6 6 6 6 c c .
                . b 5 5 3 5 5 c 3 3 3 3 3 3 c .
                . c 5 5 5 5 4 c c c 3 3 3 3 c .
                . c 4 5 5 4 4 b 5 5 c 3 3 c . .
                . c 5 b 4 4 b b 5 c b b c . . .
                . c c 5 4 c 5 5 5 c c 5 c . . .
                . . . c c 5 5 5 5 c c c c . . .
                . . . . c c c c c c . . . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . c c . . .
                . . . . . . . c c c c 6 3 c . .
                . . . . . . c 6 6 3 3 3 6 c . .
                . . . . . c 6 6 3 3 3 3 3 3 c .
                . b c c c 6 6 c c 3 3 3 3 3 3 c
                . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c
                . f f 5 c 6 c 5 f f 6 3 3 3 c c
                . f f 5 c c c 5 f f 6 6 6 6 c c
                . . b 5 5 3 5 5 c c c 3 3 3 3 c
                . . c 5 5 5 5 5 b 5 5 c 3 3 3 c
                . c 4 4 5 5 4 4 b b 5 c 3 3 c .
                . c 5 5 b 4 4 4 b 5 5 5 b c . .
                . c 5 5 5 4 4 4 c 5 5 5 c b . .
                . . c c c c 4 c 5 5 5 5 c c . .
                . . . . c c c c c c c c c c . .
            `,
            img`
                . . . . . . . . . . . c c . . .
                . . . . . . . c c c c 6 3 c . .
                . . . . . . c 6 3 3 3 3 6 c . .
                . . c c . c 6 c c 3 3 3 3 3 c .
                . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c
                . f f 5 c 6 c 5 f f 3 3 3 3 3 c
                . f f 5 c 6 c 5 f f 6 3 3 3 c c
                . b 5 5 3 c 3 5 5 c 6 6 6 6 c c
                . . b 5 5 3 5 5 c 3 3 3 3 3 3 c
                . c c 5 5 5 5 4 c c 3 3 3 3 3 c
                c 5 5 4 5 5 4 c 5 5 c 3 3 3 c .
                b 5 4 b 4 4 4 c 5 5 5 b c c . .
                c 4 5 5 b 4 4 c 5 5 5 c b b . .
                c 5 5 5 c 4 c 5 5 5 5 c c 5 b .
                c 5 5 5 5 c 4 c c c c c c 5 c .
                . c c c c c c . . . . . c c c .
            `,
        ],
        [
            img`
                . . . c c . . . . . . . . . . .
                . . c 3 6 c c c c . . . . . . .
                . . c 6 3 3 3 3 6 c . . . . . .
                . c 3 3 3 3 3 c c 6 c . c c . .
                c 3 3 3 3 3 c 5 5 c 6 c 5 5 b .
                c 3 3 3 3 3 f f 5 c 6 c 5 f f .
                c c 3 3 3 6 f f 5 c 6 c 5 f f .
                c c 6 6 6 6 c 5 5 3 c 3 5 5 b .
                c 3 3 3 3 3 3 c 5 5 3 5 5 b . .
                c 3 3 3 3 3 c c b 5 5 5 5 c . .
                . c 3 3 3 c 5 5 b 4 5 5 4 c . .
                . . b b b c c 5 b b 4 4 b 5 c .
                . b 5 4 4 4 c 4 5 5 5 b 4 4 c .
                . c 5 c 4 4 4 c 5 5 5 c 4 5 c .
                . c c c 4 4 4 c 5 5 5 5 c 5 c .
                . . . . . . . c c c c c c c . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . . c c . . . . . . . . . .
                . . . c 3 6 c c c c . . . . . .
                . . . c 6 3 3 3 6 6 c . . . . .
                . . c 3 3 3 3 3 3 6 6 c . . . .
                . c 3 3 3 3 3 3 c c 6 6 c c c b
                . c 3 3 3 3 3 c 5 5 c 6 c 5 5 b
                . c c 3 3 3 6 f f 5 c 6 c 5 f f
                . c c 6 6 6 6 f f 5 c c c 5 f f
                . c 3 3 3 3 3 3 c 5 5 3 5 5 b .
                . c 3 3 3 3 c c c 4 5 5 5 5 c .
                . . c 3 3 c 5 5 b 4 4 5 5 4 c .
                . . . c b b c 5 b b 4 4 b 5 c .
                . . . c 5 c c 5 5 5 c 4 5 c c .
                . . . c c c c 5 5 5 5 c c . . .
                . . . . . . c c c c c c . . . .
            `,
            img`
                . . . . . . . . . . . . . . . .
                . . . c c . . . . . . . . . . .
                . . c 3 6 c c c c . . . . . . .
                . . c 6 3 3 3 6 6 c . . . . . .
                . c 3 3 3 3 3 3 6 6 c . . . . .
                c 3 3 3 3 3 3 c c 6 6 c c c b .
                c 3 3 3 3 3 c 5 5 c 6 c 5 5 b .
                c c 3 3 3 6 f f 5 c 6 c 5 f f .
                c c 6 6 6 6 f f 5 c c c 5 f f .
                c 3 3 3 3 c c c 5 5 3 5 5 b . .
                c 3 3 3 c 5 5 b 5 5 5 5 5 c . .
                . c 3 3 c 5 b b 4 4 5 5 4 4 c .
                . . c b 5 5 5 b 4 4 4 b 5 5 c .
                . . b c 5 5 5 c 4 4 4 5 5 5 c .
                . . c c 5 5 5 5 c 4 c c c c . .
                . . c c c c c c c c c c . . . .
            `,
            img`
                . . . c c . . . . . . . . . . .
                . . c 3 6 c c c c . . . . . . .
                . . c 6 3 3 3 3 6 c . . . . . .
                . c 3 3 3 3 3 c c 6 c . c c . .
                c 3 3 3 3 3 c 5 5 c 6 c 5 5 b .
                c 3 3 3 3 3 f f 5 c 6 c 5 f f .
                c c 3 3 3 6 f f 5 c 6 c 5 f f .
                c c 6 6 6 6 c 5 5 3 c 3 5 5 b .
                c 3 3 3 3 3 3 c 5 5 3 5 5 b . .
                c 3 3 3 3 3 c c 4 5 5 5 5 c c .
                . c 3 3 3 c 5 5 c 4 5 5 4 5 5 c
                . . c c b 5 5 5 c 4 4 4 b 4 5 b
                . . b b c 5 5 5 c 4 4 b 5 5 4 c
                . b 5 c c 5 5 5 5 c 4 c 5 5 5 c
                . c 5 c c c c c c 4 c 5 5 5 5 c
                . c c c . . . . . c c c c c c .
            `,
        ],
    ]
    let enemySprite:Sprite = sprites.create(img`
        . . . . . . . . . . . c c . . .
        . . . . . . . c c c c 6 3 c . .
        . . . . . . c 6 3 3 3 3 6 c . .
        . . c c . c 6 c c 3 3 3 3 3 c .
        . b 5 5 c 6 c 5 5 c 3 3 3 3 3 c
        . f f 5 c 6 c 5 f f 3 3 3 3 3 c
        . f f 5 c 6 c 5 f f 6 3 3 3 c c
        . b 5 5 3 c 3 5 5 c 6 6 6 6 c c
        . . b 5 5 3 5 5 c 3 3 3 3 3 3 c
        . . c 5 5 5 5 b c c 3 3 3 3 3 c
        . . c 4 5 5 4 b 5 5 c 3 3 3 c .
        . c 5 b 4 4 b b 5 c c b b b . .
        . c 4 4 b 5 5 5 4 c 4 4 4 5 b .
        . c 5 4 c 5 5 5 c 4 4 4 c 5 c .
        . c 5 c 5 5 5 5 c 4 4 4 c c c .
        . . c c c c c c c . . . . . . .
    `,SpriteKind.MysteryEnemy)
    createEnemyAnimations(enemySpriteAnimations, enemySprite,150 )

    enemySprite.ay = 300
    let directionx: number = 0
    if (Math.randomRange(-1, 1) < 0) {
        directionx = -1
    } else {
        directionx = 1
    }
    enemySprite.setVelocity(directionx * Math.randomRange(25, 40), 0)
    sprites.setDataNumber(enemySprite, "speed", enemySprite.vx)

    tiles.placeOnTile(enemySprite,tileLocation)

}

function createShellEnemy(spriteLocation:Sprite){


    let enemySprite: Sprite = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . c c . .
        . . . . . . . c c c c c 6 3 c .
        . . . . . . c 6 6 3 3 3 6 6 c .
        . . . . . c 6 6 6 3 3 3 3 3 3 c
        . . . . c 6 6 6 6 3 3 3 3 3 3 c
        . . c c c 6 6 6 6 6 3 3 3 3 3 c
        . c 3 3 3 c 6 6 6 6 6 3 3 3 3 c
        c 3 c c c 3 c 6 6 6 6 6 3 3 c c
        c 6 c c c c 3 c 6 6 6 6 6 6 c c
        c 6 c c c c 6 6 c 6 6 3 3 3 3 c
        . c 6 c c c c 6 c 6 3 3 3 3 6 c
        . . c 6 c c c c c 6 3 3 3 6 c .
        . . . c c c c c c c c c c c . .
    `, SpriteKind.ShellEnemy)

    enemySprite.ay = 300
    enemySprite.setPosition(spriteLocation.x,spriteLocation.y)
    enemySprite.setFlag(SpriteFlag.AutoDestroy,true)
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
function createEnemyAnimations(animationList:Image[][],sprite:Sprite,animationInterval:number){
    // for loop thats sets animations 
    let animationDirection = [Predicate.MovingLeft,Predicate.MovingRight,Predicate.MovingUp,Predicate.MovingDown]
    let count: number = 0 
    for(let currentAniamtion of animationList){
        characterAnimations.loopFrames(sprite, currentAniamtion, animationInterval, animationDirection[count])
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
    createEnemyAnimations(groundEnemyObject["animation"],enemySprite,50)
}
function generateTileMapEnemys(){
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
    for(let tileLocation of tiles.getTilesByType(assets.tile`mysteryEnemySpawn`)) {
        createMysteryEnemy(tileLocation)
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

function createShopSprite(tileLocation: tiles.Location){
    let shopSprite = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . b 5 5 b . . .
        . . . . . . b b b b b b . . . .
        . . . . . b b 5 5 5 5 5 b . . .
        . b b b b b 5 5 5 5 5 5 5 b . .
        . b d 5 b 5 5 5 5 5 5 5 5 b . .
        . . b 5 5 b 5 d 1 f 5 d 4 f . .
        . . b d 5 5 b 1 f f 5 4 4 c . .
        b b d b 5 5 5 d f b 4 4 4 4 b .
        b d d c d 5 5 b 5 4 4 4 4 4 4 b
        c d d d c c b 5 5 5 5 5 5 5 b .
        c b d d d d d 5 5 5 5 5 5 5 b .
        . c d d d d d d 5 5 5 5 5 d b .
        . . c b d d d d d 5 5 5 b b . .
        . . . c c c c c c c c b b . . .
    `,SpriteKind.Shop)
    tiles.placeOnTile(shopSprite,tileLocation)
    animation.runImageAnimation(shopSprite,[
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . b 5 b . . .
            . . . . . . . . . b 5 b . . . .
            . . . . . . b b b b b b . . . .
            . . . . . b b 5 5 5 5 5 b . . .
            . b b b b b 5 5 5 5 5 5 5 b . .
            . b d 5 b 5 5 5 5 5 5 5 5 b . .
            . . b 5 5 b 5 d 1 f 5 d 4 f . .
            . . b d 5 5 b 1 f f 5 4 4 c . .
            b b d b 5 5 5 d f b 4 4 4 4 4 b
            b d d c d 5 5 b 5 4 4 4 4 4 b .
            c d d d c c b 5 5 5 5 5 5 5 b .
            c b d d d d d 5 5 5 5 5 5 5 b .
            . c d d d d d d 5 5 5 5 5 d b .
            . . c b d d d d d 5 5 5 b b . .
            . . . c c c c c c c c b b . . .
        `,
        img`
            . . . . . . . . . . b 5 b . . .
            . . . . . . . . . b 5 b . . . .
            . . . . . . . . . b c . . . . .
            . . . . . . b b b b b b . . . .
            . . . . . b b 5 5 5 5 5 b . . .
            . . . . b b 5 d 1 f 5 5 d f . .
            . . . . b 5 5 1 f f 5 d 4 c . .
            . . . . b 5 5 d f b d d 4 4 . .
            b d d d b b d 5 5 5 4 4 4 4 4 b
            b b d 5 5 5 b 5 5 4 4 4 4 4 b .
            b d c 5 5 5 5 d 5 5 5 5 5 b . .
            c d d c d 5 5 b 5 5 5 5 5 5 b .
            c b d d c c b 5 5 5 5 5 5 5 b .
            . c d d d d d d 5 5 5 5 5 d b .
            . . c b d d d d d 5 5 5 b b . .
            . . . c c c c c c c c b b . . .
        `,
        img`
            . . . . . . . . . . b 5 b . . .
            . . . . . . . . . b 5 b . . . .
            . . . . . . b b b b b b . . . .
            . . . . . b b 5 5 5 5 5 b . . .
            . . . . b b 5 d 1 f 5 d 4 c . .
            . . . . b 5 5 1 f f d d 4 4 4 b
            . . . . b 5 5 d f b 4 4 4 4 b .
            . . . b d 5 5 5 5 4 4 4 4 b . .
            . . b d d 5 5 5 5 5 5 5 5 b . .
            . b d d d d 5 5 5 5 5 5 5 5 b .
            b d d d b b b 5 5 5 5 5 5 5 b .
            c d d b 5 5 d c 5 5 5 5 5 5 b .
            c b b d 5 d c d 5 5 5 5 5 5 b .
            . b 5 5 b c d d 5 5 5 5 5 d b .
            b b c c c d d d d 5 5 5 b b . .
            . . . c c c c c c c c b b . . .
        `,
        img`
            . . . . . . . . . . b 5 b . . .
            . . . . . . . . . b 5 b . . . .
            . . . . . . b b b b b b . . . .
            . . . . . b b 5 5 5 5 5 b . . .
            . . . . b b 5 d 1 f 5 d 4 c . .
            . . . . b 5 5 1 f f d d 4 4 4 b
            . . . . b 5 5 d f b 4 4 4 4 b .
            . . . b d 5 5 5 5 4 4 4 4 b . .
            . b b d d d 5 5 5 5 5 5 5 b . .
            b d d d b b b 5 5 5 5 5 5 5 b .
            c d d b 5 5 d c 5 5 5 5 5 5 b .
            c b b d 5 d c d 5 5 5 5 5 5 b .
            c b 5 5 b c d d 5 5 5 5 5 5 b .
            b b c c c d d d 5 5 5 5 5 d b .
            . . . . c c d d d 5 5 5 b b . .
            . . . . . . c c c c c b b . . .
        `,
        img`
            . . . . . . . . . . b 5 b . . .
            . . . . . . . . . b 5 b . . . .
            . . . . . . b b b b b b . . . .
            . . . . . b b 5 5 5 5 5 b . . .
            . . . . b b 5 d 1 f 5 5 d f . .
            . . . . b 5 5 1 f f 5 d 4 c . .
            . . . . b 5 5 d f b d d 4 4 . .
            . b b b d 5 5 5 5 5 4 4 4 4 4 b
            b d d d b b d 5 5 4 4 4 4 4 b .
            b b d 5 5 5 b 5 5 5 5 5 5 b . .
            c d c 5 5 5 5 d 5 5 5 5 5 5 b .
            c b d c d 5 5 b 5 5 5 5 5 5 b .
            . c d d c c b d 5 5 5 5 5 d b .
            . . c b d d d d d 5 5 5 b b . .
            . . . c c c c c c c c b b . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . b 5 b . . . .
            . . . . . . . . . b 5 b . . . .
            . . . . . . b b b b b b . . . .
            . . . . . b b 5 5 5 5 5 b . . .
            . . . . b b 5 b c 5 5 d 4 c . .
            . b b b b 5 5 5 b f d d 4 4 4 b
            . b d 5 b 5 5 b c b 4 4 4 4 b .
            . . b 5 5 b 5 5 5 4 4 4 4 b . .
            . . b d 5 5 b 5 5 5 5 5 5 b . .
            . b d b 5 5 5 d 5 5 5 5 5 5 b .
            b d d c d 5 5 b 5 5 5 5 5 5 b .
            c d d d c c b 5 5 5 5 5 5 5 b .
            c b d d d d d 5 5 5 5 5 5 5 b .
            . c d d d d d d 5 5 5 5 5 d b .
            . . c b d d d d d 5 5 5 b b . .
            . . . c c c c c c c c b b . . .
        `
    ],100,true)

    spriteutils.onSpriteUpdateInterval(shopSprite, 100,function(sprite){
        if(menuSprite == null){
            return
        }
        let distanceToPlayer = spriteutils.distanceBetween(shopSprite,playerSprite)
        if(distanceToPlayer > 48){
            menuSprite.close()
            menuSprite = null
        }
    })
    
}

let tileMapLevels = [
    tilemap`level1`,
    tilemap`level2`,
    tilemap`level3`
]

function onStart(){
    
    info.setLife(5)
    
    createPlayer()
    createLevel()
    
}
function createLevel(){


    scroller.setLayerImage(scroller.BackgroundLayer.Layer0, img`
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
        9999999999999999999999111199999999999999999999999999999999999999999999999999999999999999999999999999999911119999999999999999999999999999999999999999999999999999
        9999999999999999999991111119999999999999999999999999999999999999999999999999999999999999999999999999999111111999999999999999999999999999999999999999999999999999
        9999999999999999999991111119911999999999999999999999999999999999999999999999999999999999999999999999999111111991199999999999999999999999999999999999999999999999
        9999999999999999991111111119111119999999999999999999999999999999999999999999999999999999999999999999111111111911111999999999999999999999999999999999999999999999
        9999999999999999911111111111111119999999999999999999999999999999999999999999999999999999999999999991111111111111111999999999999999999999999999999999999999999999
        9999999999999999111111111111111111199999999999999999999999999999999999999999999999999999999999999911111111111111111119999999999999999999999999999999999999999999
        9999999999999999111111111111111111119999999999999999999999999999999999999999999999999999999999999911111111111111111111999999999999999999999999999999999999999999
        9999999999999999911111111111111111119991199999999999999999999999999999999999999999999999999999999991111111111111111111999119999999999999999999999999999999999999
        9999999999999111191111111111111111119911111999999999999999999999999999999999999999999999999999911119111111111111111111991111199999999999999999999999999999999999
        9999999999991111119111111111111111199911111999999999999999999999999999999999999999999999999999111111911111111111111119991111199999999999999999999999999999999999
        9999999999991111111111111111111111911111111199999999999999999999999999999999999999999999999999111111111111111111111191111111119999999999999999999999999999999999
        9999999999991111111111111111111111111111111199999999999999999999999999999999999999999999999999111111111111111111111111111111119999999999999999999999999999999999
        9999999999999111111111111111111111111111111199999999999999999999999999999999999999999999999999911111111111111111111111111111119999999999999999999999999999999999
        9911199991111911111111111111111111111111111991199999999999991111999999999999999999991119999111191111111111111111111111111111199119999999999999111199999999999999
        9111119911111111111111111111111111111111111911119999999999911111199999999999999999911111991111111111111111111111111111111111191111999999999991111119999999999999
        9111119111111111111111111111111111111111111911119999999999911111191119999999999999911111911111111111111111111111111111111111191111999999999991111119111999999999
        9911111111111111111111111111111111111111111111119999999999999111111111999999999999991111111111111111111111111111111111111111111111999999999999911111111199999999
        9111111111111111111111111111111111111111111111199999999911119111111111999999999999911111111111111111111111111111111111111111111119999999991111911111111199999999
        1111111111111111111111111111111111111111111111119999999111111111111119999999999199111111111dd1111111111111111111111111111111111111999999911111111111111999999999
        1111111111111111111111111111111111111111111111111911199111111111111111111999999ddd111111111ddd111111111111111111111111111111111111191119911111111111111111199999
        1111111111111111111111111111111111111111111111111111111111111111111111111199991ddd111111111ddd111111111111111111111111111111111111111111111111111111111111119999
        11111111111111111111111111111111111111111111111111111111111111111111111111999ddddddd111111ddddd11111111111111111111111111111111111111111111111111111111111119999
        11111111111111111111111111111111111111111ddddddddd111111111111111111111111111ddddddd111111ddddd111111111111111111111111111111111111111111dddddddddd1111111111111
        11111111111111111111111111111111111111111ddddddddd111111111111111111111111111ddddddd111111ddddd111111111111111111111111111111111111111111dddddddddd1111111111111
        1111111111111111111ddd1111111111111111111d11dddddd111111111111111111111111111d11dddd11111ddddddd11111111111111111111dd1111111111111111111dd1d1ddddd1111111111111
        111111111111111111ddddd111111111111111111ddddddd1d111111111111111111111111111ddddddd11111ddddddd1111111111111111111dddd111111111111111111dddddd11dd1111111111111
        11111111111111111dddddd111111111111111111ddddddddd1111111111d11111111ddddd111d1ddddd11111ddddddd11111111111111111dddddd111111111111111111dddddddddd1111111111111
        11111111111111111ddd1d111111d111111111111ddddddddd111111111dd11111111ddddd111ddddddd11111ddddddd11111111111111111ddd1d111111dd11111111111dddd1ddddd11111111dd111
        11111111111111111dddddd11111d111111111111ddddddd1d111111111dd11111111ddddd111ddddddd11111ddddddd11111111111111111dddddd11111dd11111111111ddddddd1dd11111111dd111
        11111111ddd111111dd11d11111ddd11111111111ddddddddd11dddddd1dd11111111ddddd111ddddddd11111ddddddd111111111dd111111ddd1d11111ddd11111111111dddddddddd1ddddddddd111
        d1dd1111ddddddddddd1ddd111ddddd1111111111ddddddd1d11d11ddd1dd111111111dd1dd11ddddddd111dddddddddd1dd1111ddddddddddddd1d1111dddd1111111111dddddd11dd1d11dddddd111
        dddd11111d1dd1ddddddddd111ddddd1111111111ddddddddd11dddd1d1dd11111111dddddd11dd1dddd111ddddddddddddd1111dd1ddd1dddddddd1111dddd1111111111dddddddddd1dddd1dddd111
        dd1d11111ddd1111ddddddd111ddddd1111111111ddddddddd11dddd1dddd11111111dddddd11ddddddd111ddddddddddd1d1111dddd1d11ddddddd1111dddd1111111111dddddddddd1dddd1dddd111
        dddd1111dddddddddddddddd11dddddd11dd1dd1ddddddddddd1d11dddddd11111111dddddd11ddddddd111ddddddddddddd1111dddddddddddddddd11dddddd111d11ddddddddddddd1d11dddddd111
        dd1d1111dddddddddddddddd11dddddd11ddddddddddddddddd1ddddddddd11d11d11dddddd11ddddddd111ddddddddddd1d1111dddddddddddddddd11dddddd111dddddddddddddddd1ddddddddd111
        ddddd1dd1d1ddddddddddddd11ddddddd1dddd11ddddddddddddd11bbddddddd1ddd11dd1dd11ddddddd111ddddddddddddddd1ddd1ddddddddddddd11ddddddd111d11ddddddbddddddd11bbbddd1dd
        ddddd1dddddddddddddddddddd1dddddd1dddddddddbbbdddddddddbbbdddddd1ddd1dddddd11ddddddd111ddddddddddddddd1dddddddddddddddddddddddddd1ddddddddddbbdddddddddbbbddd1dd
        ddddd1ddddddddddddddddddddddddddd1dddddddddbbbdddddddddbbbdddddddddddddddddddddddddd111ddddddddddddddd1dddddddddddddddddddddddddd1ddddddddddbbdddddddddbbbdddddd
        ddddd1ddddddddddddddddddddddddddd1dddddddbbbbbbbddddddbbbbbddddddddddddddddddddddddddd1ddddddddddddddd1dddddddddddddddddddddddddd1d1ddddddbbbbbbbdddddbbbbbddddd
        dddddbbbbbbbbbddddddddddddddddddd1dddddddbbbbbbbddddddbbbbbddddddddddddddddddddddddddd1ddddddddddddddbbbbbbbbbbdddddddddddddddddd1ddddddddbbbbbbbdddddbbbbbddddd
        dddddbbbbbbbbbddddddddddddddddddd1dddddddbbbbbbbddddddbbbbbddddddddddddddddddddddddddd1ddddddddddddddbbbbbbbbbbdddddddddddddddddd1ddddddddbbbbbbbdddddbbbbbddddd
        dddddbddbbbbbbddddddddddddddddddd1dddddddbddbbbbdddddbbbbbbbdd111dddddddddddddddbbdddd1ddddddddddddddbbdbdbbbbbdddddddddddddddddd1ddddddddbbbbbbbddddbbbbbbbb11d
        dddddbbbbbbbdbddddddddddddddddddd1dddddddbbbbbbbdddddbbbbbbbddd11ddddddddddddddbbbbddd1ddddddddddddddbbbbbbddbbdddddddddddddddddd1ddddddddbbbbbbbddddbbbbbbbbddd
        dddddbbbbbbbbbddddddddddbddddddddbbbbbdddbdbbbbbdddddbbbbbbbddddddddddd1dddddbbbbbbddd1ddddddddddddddbbbbbbbbbbdddddddddddddddddddbbbbddddbbbdbbbddddbbbbbbbbddd
        dddddbbbbbbbbbdddddddddbbddddddddbbbbbdddbbbbbbbdddddbbbbbbbdd1ddddddddddddddbbbdbddddddbbdddddddddddbbbbdbbbbbddddddddbbdddddddddbbbbddddbbbdbbbddddbbbbbbbbd1d
        dddddbbbbbbbdbdddddddddbbddddddddbbbbbdddbbbbbbbdddddbbbbbbbdd111ddddddddddddbbbbbbdddddbbdddddddddddbbbbbbbdbbddddddddbbddddddddbbbbbbdddbbbbbbbddddbbbbbbbb11d
        dddddbbbbbbbbbddbbbbbbdbbddddddddbbbbbdddbbbbbbbdddddbbbbbbbdddddddddbb1dddddbbbdbdddddbbbdddddddddddbbbbbbbbbbdbbbbbbbbbddddddddbbbbbbdddbbbdbbbddddbbbbbbbbddd
        dddddbbbbbbbdbddbddbbbdbbdddddddddbbdbbddbbbbbbbdddbbbbbbbbbbdbbddddbbbbbbbbbbbbbdbddddbbbbddddddddddbbbbbbddbbdbddbbbbbbddddddddbbbbbbbddbbbbbbbddbbbbbbbbbbbbb
        dddddbbbbbbbbbddbbbbdbdbbddddddddbbbbbbddbbdbbbbdddbbbbbbbbbbbbbddddbbdbbbdbbbbbbbbddddbbbbddddddddddbbbbbbbbbbdbbbbdbbbbddddddddbbbbbbbddbbbbdbbddbbbbbbbbbbbbb
        dddddbbbbbbbbbddbbbbdbbbbddddddddbbbbbbddbbbbbbbdddbbbbbbbbbbbdbddddbbbbdbddbbbbbbbddddbbbbddddddddddbbbbbbbbbbdbbbbdbbbbddddddddbbbbbbbddbbbbbbbddbbbbbbbbbbbbb
        dbbdbbbbbbbbbbbdbddbbbbbbddddddddbbbbbbddbbbbbbbdddbbbbbbbbbbbbbddddbbbbbbbbbbbbbbbbddbbbbbbdddbddbbbbbbbbbbbbbdbddbbbbbbddddddddbbbbbbbddbbbbbbbddbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbdbbbbbbbbbddbddbddbbbbbbddbbbbbbbdddbbbbbbbbbbbdbddddbbbbbbbbbbbbbbbbddbbbbbbdddbbbbbbbbbbbbbbbbdbbbbbbbbbdddddbddbbbbbbbddbbbbbbbddbbbbbbbbbbbbb
        bbddbbbbbbbbbbbbbddddbbbbbbbdbbbddbbdbbddbbbbbbbdddbbbbbbbbbbbbbbbdbbbdbbbbbbbbbbbbbddbbbbbbbdddbddbbbbbbbbbbbbbbddbdbbbbdbbdbbbdbbbbbbbddbbbbbbbddbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbdbbbbbbddbbbbbbbdddbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbdbbbbbbbbbbbddbbbbdbbddbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdddbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbddbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbdbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbdddbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbddbdbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbddbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbdddbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbddbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbdbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
        bbbbbbbbbbbbbbbbb7bbbbbbbbbbbbbbbb7bbbbbbbbbbbbbbbbbbbbbb7bbbbbbbbbbbbbbbb7bbbbbbbbbbbbbbbbbbbbbb7bbbbbbbbbbbbbbbb7bbbbbbbbbbbbbbbbbbbbbb7bbbbbbbbbbbbbbbb7bbbbb
        bbbbbb7bbb77bbbbb77bbbb7bbb7bbbb7b77bbb7bbbbbb7bbb77bbbbb77bbbb7bbb7bbbb7b77bbb7bbbbbb7bbb77bbbbb77bbbb7bbb7bbbb7b77bbb7bbbbbb7bbb77bbbbb77bbbb7bbb7bbbb7b77bbb7
        bb7bbb77b77bb7bbb77bbb77bbb77bbb7bb77b77bb7bbb77b77bb7bbb77bbb77bbb77bbb7bb77b77bb7bbb77b77bb7bbb77bbb77bbb77bbb7bb77b77bb7bbb77b77bb7bbb77bbb77bbb77bbb7bb77b77
        bb77bb77b77bb77bbb77b77bbbb77b7b77b7777bbb77bb77b77bb77bbb77b77bbbb77b7b77b7777bbb77bb77b77bb77bbb77b77bbbb77b7b77b7777bbb77bb77b77bb77bbb77b77bbbb77b7b77b7777b
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    `)

    keysAmount = 0
    let allSpriteKindList = [
        SpriteKind.Collectible,
        SpriteKind.EnemyProjectile,
        SpriteKind.SpinningEnemy,
        SpriteKind.MysteryEnemy,
        SpriteKind.ShellEnemy,
        SpriteKind.EmptyChest,
        SpriteKind.Key,
        SpriteKind.Shop,
        SpriteKind.Switch,
        SpriteKind.Enemy,
        SpriteKind.GrowPower,
        SpriteKind.ShootPower,
        SpriteKind.ShrinkPower,
        SpriteKind.BatPower,
        SpriteKind.HeartPower,
        SpriteKind.UpJumpPad,
        SpriteKind.RightJumpPad,
        SpriteKind.LeftJumpPad,
        SpriteKind.TeleportPad,
        SpriteKind.TeleportLocationPad,
        SpriteKind.Tile
        ]
    for(let spriteType of allSpriteKindList){
        sprites.destroyAllSpritesOfKind(spriteType)
    }
   if(level >= 0 && level < tileMapLevels.length) {
        tiles.setTilemap(tileMapLevels[level])
        createCollectiblesOnTileMap()

    }else {
        tiles.setTilemap(tilemap`test2`)
        //tiles.setTilemap(tilemap`test`)
        createCollectiblesOnTileMap()
    }
    

    generateTileMapEnemys()
    generateTileMapChest()
    generateTileMapkeys()
    generateTileMapShop()
    generateTileMapSwitchWall()
    placePlayerOnTileMap()
    generateTileMapJumpPad()
    generateTileMapTeleportPad()
    generateTileMapTeleportLocationPad()
    
    powerUpTileCountList[0]["max_count"] = tiles.getTilesByType(assets.tile`growTile`).length
    powerUpTileCountList[1]["max_count"] = tiles.getTilesByType(assets.tile`shootTile`).length
    powerUpTileCountList[2]["max_count"] = tiles.getTilesByType(assets.tile`shrinkTile`).length
    powerUpTileCountList[3]["max_count"] = tiles.getTilesByType(assets.tile`batTile`).length
    powerUpTileCountList[4]["max_count"] = tiles.getTilesByType(assets.tile`heartTile`).length
    powerUpTileCountList[5]["max_count"] = tiles.getTilesByType(assets.tile`wallJumpTile`).length
    powerUpTileCountList[6]["max_count"] = tiles.getTilesByType(assets.tile`invincibleTile`).length
    powerUpTileCountList[7]["max_count"] = tiles.getTilesByType(assets.tile`gravityTile`).length
    powerUpTileCountList[8]["max_count"] = tiles.getTilesByType(assets.tile`luckyTile`).length
    
    scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal)

}
function placePlayerOnTileMap() {
    tiles.placeOnRandomTile(playerSprite, assets.tile`door`)
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
    playerSprite.z = 100
    
    
    
    
    resetPlayerPowerUps()
    
}
function resetPlayerPowerUps(){
    isFlying = false
    info.stopCountdown()
    playerSprite.scale = 1
    isUpSideDown = false
    sprites.setDataBoolean(playerSprite,"GrowPower",false)
    sprites.setDataBoolean(playerSprite,"ShootPower",false)
    sprites.setDataBoolean(playerSprite,"ShrinkPower",false)
    sprites.setDataBoolean(playerSprite,"BatPower",false)
    sprites.setDataBoolean(playerSprite, "InvinciblePower", false)
    sprites.setDataBoolean(playerSprite, "WallJumpPower", false)
    sprites.setDataBoolean(playerSprite, "GravityPower", false)
    controller.moveSprite(playerSprite, 100, 0)
    playerSprite.ay = 300
    characterAnimations.setCharacterAnimationsEnabled(playerSprite, true)
    createPlayerAnimations()
}

sprites.onOverlap(SpriteKind.Player,SpriteKind.Switch,function(sprite,othersprite){
    let wallSprite = sprites.readDataSprite(othersprite,"myWall")
    tiles.setWallAt(wallSprite.tilemapLocation(),false)
    
    othersprite.setImage(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . 2 2 2 . . . . . . . . . . . .
        . 2 2 2 . . . . . . . . . . . .
        . 2 2 2 b . . . . . . . . . . .
        . . . b b b . . . . . . . . . .
        . . . . b b b . . . . . . . . .
        . . . . . b b b . . . . . . . .
        . . . . . . b b b . . . . . . .
        . . . b b b b b b b b b . . . .
        . . . b b b b b b b b b . . . .
        . . . b b b b b b b b b . . . .
    `)
    othersprite.setFlag(SpriteFlag.Ghost,true)
    wallSprite.lifespan = 400 
    animation.runImageAnimation(wallSprite,[
        img`
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f c c c c c c c c c c c c f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f c c c c c c c c c c c c f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f c c c c c c c c c c c c f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f c c c c c c c c c c c c f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f c c c c c c c c c c c c f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f c c c c c c c c c c c c f f
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f c c c c c c c c c c c c f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f c c c c c c c c c c c c f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f c c c c c c c c c c c c f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f c c c c c c c c c c c c f f
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f c c c c c c c c c c c c f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
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
        `,
        img`
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
            f f c c c c c c c c c c c c f f
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
        `,
        img`
            f f b b b b b b b b b b b b f f
            f f b b b b b b b b b b b b f f
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
        `,
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
    ],50,false)

})
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
    placePlayerOnTileMap()
    
   info.changeLifeBy(-1)

})

sprites.onOverlap(SpriteKind.Player,SpriteKind.TeleportPad,function(sprite,othersprite){
    isTeleporting = true
    let destination:Sprite = sprites.allOfKind(SpriteKind.TeleportLocationPad)._pickRandom()
    tiles.placeOnTile(sprite,destination.tilemapLocation())
    timer.after(500, function() {
        isTeleporting = false
    })
})

sprites.onOverlap(SpriteKind.Player,SpriteKind.Shop,function(sprite,othersprite){
    if(menuSprite){
        return
    }
    menuSprite = miniMenu.createMenuFromArray(menuItemList)
    
    menuSprite.setMenuStyleProperty(miniMenu.MenuStyleProperty.Columns,1)
    menuSprite.setMenuStyleProperty(miniMenu.MenuStyleProperty.Rows, 4)
    menuSprite.setStyleProperty(miniMenu.StyleKind.DefaultAndSelected,miniMenu.StyleProperty.IconTextSpacing,1)
    menuSprite.setDimensions(80,90)
    menuSprite.setPosition(scene.cameraProperty(CameraProperty.X), scene.cameraProperty(CameraProperty.Y))
    menuSprite.setTitle("50")
    menuSprite.onSelectionChanged(function(selection,selectedIndex){
        menuSprite.setTitle(menuItemCostList[selectedIndex].toString())       
    })
    menuSprite.setMenuStyleProperty(miniMenu.MenuStyleProperty.Border,2)
    menuSprite.setMenuStyleProperty(miniMenu.MenuStyleProperty.BorderColor,1)
    menuSprite.setMenuStyleProperty(miniMenu.MenuStyleProperty.BackgroundColor,14)
    menuSprite.onButtonPressed(controller.B,function(selection,selectedIndex){
        
        if(info.score() < menuItemCostList[selectedIndex]){
            playerSprite.sayText("MORE MONEY",5000)
            return
        }else if(playerInvintoryList.length >= 3){
            playerSprite.sayText("my invintory is full")
            return
        }
        info.changeScoreBy(-menuItemCostList[selectedIndex])
        playerInvintoryList.push(sprites.create(powerUpObject["image"][selectedIndex],powerUpObject["kind"][selectedIndex]))
        playerSprite.sayText(playerInvintoryList.length,5000)


    
    })

})
controller.player2.A.onEvent(ControllerButtonEvent.Pressed, function() {
    if(playerInvintoryList.length <=0){
        playerSprite.sayText("no items", 5000)
        return
    
    }
    let powerUp:Sprite = playerInvintoryList.removeAt(0)
    powerUp.setPosition(playerSprite.x,playerSprite.y - 25)
    powerUp.ay = 250
    playerSprite.sayText(playerInvintoryList.length,5000)

})
//tiles.setTilemap(assets.tilemap`spriteAssets`)
function hitPowerBox(tileImage:Image, location: tiles.Location){
    let targetLocation: tiles.Location = tiles.getTileLocation(location.column, location.row - 1)
    tiles.setTileAt(location, assets.tile`backGroundTile`)
    let powerBoxSprite = sprites.create(tileImage, SpriteKind.Box)
    tiles.placeOnTile(powerBoxSprite,location)
    powerBoxSprite.ay = 250
    powerBoxSprite.vy = -50
        
    
    powerBoxSprite.lifespan = 390
    if(tileImage == assets.tile`growTile`){
        createPowerUp(0, targetLocation)
    } else if (tileImage == assets.tile`shootTile`){
        createPowerUp(1, targetLocation)
    } else if (tileImage == assets.tile`shrinkTile`){
        createPowerUp(2, targetLocation)
    } else if (tileImage == assets.tile`batTile`){
        createPowerUp(3, targetLocation)
    } else if (tileImage == assets.tile`heartTile`){
        createPowerUp(4, targetLocation)
    } else if (tileImage == assets.tile`invincibleTile`) {
        createPowerUp(5, targetLocation)
    } else if (tileImage == assets.tile`wallJumpTile`) {
        createPowerUp(6, targetLocation)
    } else if (tileImage == assets.tile`gravityTile`) {
        createPowerUp(7, targetLocation)
    } else if (tileImage == assets.tile`unluckyTile`){
        music.play(music.createSoundEffect(WaveShape.Sine, 736, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
        return
    }else{
        createPowerUp(randint(0, powerUpObject["image"].length - 1), targetLocation)
    }
    music.play(music.createSoundEffect(WaveShape.Sine, 736, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
    
    
    
    }
sprites.onDestroyed(SpriteKind.Box,function(sprite){
    
    tiles.setTileAt(sprite.tilemapLocation(),assets.tile`unluckyTile`)
    let sum:number = 0
    for(let value of powerUpTileCountList){
        sum += value["max_count"]
    }
    let currentPowerUpTiles = powerUpTileCountList.filter(function(value,index){
        if(value["max_count"] > 0){
            return true
        }else{
           return false
        }
    })
    let unLuckyTileList: tiles.Location[] = tiles.getTilesByType(assets.tile`unluckyTile`)
    if(unLuckyTileList.length == sum){
        // unLuckyTileList.filter(function(location,index){
        //     if()
        // })
        tiles.setTileAt(tiles.getTilesByType(assets.tile`unluckyTile`)._pickRandom(),currentPowerUpTiles._pickRandom()["asset"])
    } 
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
function generateTileMapkeys(){
    for (let tileLocation of tiles.getTilesByType(assets.tile`key`)) {
        createKey(tileLocation)
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

function createTeleportLocationPad(tileLocation:tiles.Location){
    let teleportLocationPad:Sprite = sprites.create(img`
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
        . . . . . . a a a a . . . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        5 5 5 5 5 5 5 5 5 5 5 5 5 5 5 5
        b b b b b b b b b b b b b b b b
        b b b b b b b b b b b b b b b b
        b b b b b b b b b b b b b b b b
    `,SpriteKind.TeleportLocationPad)
    tiles.placeOnTile(teleportLocationPad,tileLocation)
}
function createTeleportPad(tileLocation:tiles.Location){
    let teleportPad:Sprite = sprites.create(img`
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
        . . . . . . 5 5 5 5 . . . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        a a a a a a a a a a a a a a a a
        b b b b b b b b b b b b b b b b
        b b b b b b b b b b b b b b b b
        b b b b b b b b b b b b b b b b
    `,SpriteKind.TeleportPad)
    tiles.placeOnTile(teleportPad,tileLocation)
}

function createChest(tileLocation:tiles.Location){
    let chest:Sprite = sprites.create(img`
        . . b b b b b b b b b b b b . .
        . b e 4 4 4 4 4 4 4 4 4 4 e b .
        b e 4 4 4 4 4 4 4 4 4 4 4 4 e b
        b e 4 4 4 4 4 4 4 4 4 4 4 4 e b
        b e 4 4 4 4 4 4 4 4 4 4 4 4 e b
        b e e 4 4 4 4 4 4 4 4 4 4 e e b
        b e e e e e e e e e e e e e e b
        b e e e e e e e e e e e e e e b
        b b b b b b b d d b b b b b b b
        c b b b b b b c c b b b b b b c
        c c c c c c b c c b c c c c c c
        b e e e e e c b b c e e e e e b
        b e e e e e e e e e e e e e e b
        b c e e e e e e e e e e e e c b
        b b b b b b b b b b b b b b b b
        . b b . . . . . . . . . . b b .
    `,SpriteKind.Chest)
    tiles.placeOnTile(chest,tileLocation)

    
}
function createKey(tileLocation:tiles.Location){
    let keySprite: Sprite = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . 5 5 5 5 5 5 5 5 5 5 . .
        . . . . 5 . 5 . 5 5 5 . . 5 . .
        . . . . . . . . . . 5 . . 5 . .
        . . . . . . . . . . 5 5 5 5 . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `,SpriteKind.Key)

    
    tiles.placeOnTile(keySprite,tileLocation)
}
function  createChestCollectibles(sprite:Sprite){
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

    collectible.setPosition(sprite.x,sprite.y)
    collectible.setVelocity(Math.randomRange(-100,100),Math.randomRange(-150,-100))
    collectible.setFlag(SpriteFlag.GhostThroughSprites,true)
    collectible.lifespan = 10000
    collectible.ay = 150
    //collectible.fx = 50
    sprites.setDataNumber(collectible,"velocityY",collectible.vy)
    sprites.setDataNumber(collectible, "velocityX", collectible.vx)

    timer.after(500, function() {
        collectible.setFlag(SpriteFlag.GhostThroughSprites, false)
    })
    

}
scene.onHitWall(SpriteKind.Collectible,function(sprite,tileLocation){
    if(sprite.isHittingTile(CollisionDirection.Bottom)){
        if (Math.abs(sprites.readDataNumber(sprite, "velocityY")) < 50) {
            sprite.setVelocity(0,0)
            return
        }
        sprite.vy = (0.75) * sprites.readDataNumber(sprite, "velocityY")
        sprites.setDataNumber(sprite, "velocityY", sprite.vy)
        sprite.vx = (0.75) * sprites.readDataNumber(sprite, "velocityX")
        sprites.setDataNumber(sprite, "velocityX", sprite.vx)
    }
    if(sprite.isHittingTile(CollisionDirection.Left)||sprite.isHittingTile(CollisionDirection.Right)){
        sprites.setDataNumber(sprite, "velocityX", sprite.vx)
        sprite.vx = (-1)*sprites.readDataNumber(sprite,"velocityX")
        
    }


})

function createSwitchAndWall(switchTile:tiles.Location,wallTile:tiles.Location){
    let switchSprite:Sprite = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . 2 2 . . .
        . . . . . . . . . . b 2 2 . . .
        . . . . . . . . . b b b . . . .
        . . . . . . . . b b b . . . . .
        . . . . . . . b b b . . . . . .
        . . . . . . b b b . . . . . . .
        . . . b b b b b b b b b . . . .
        . . . b b b b b b b b b . . . .
        . . . b b b b b b b b b . . . .
    `,SpriteKind.Switch)
    let wallSprite:Sprite = sprites.create(img`
        f f b b b b b b b b b b b b f f
        f f b b b b b b b b b b b b f f
        f f b b b b b b b b b b b b f f
        f f c c c c c c c c c c c c f f
        f f b b b b b b b b b b b b f f
        f f b b b b b b b b b b b b f f
        f f b b b b b b b b b b b b f f
        f f c c c c c c c c c c c c f f
        f f b b b b b b b b b b b b f f
        f f b b b b b b b b b b b b f f
        f f b b b b b b b b b b b b f f
        f f c c c c c c c c c c c c f f
        f f b b b b b b b b b b b b f f
        f f b b b b b b b b b b b b f f
        f f b b b b b b b b b b b b f f
        f f c c c c c c c c c c c c f f
    `,SpriteKind.Tile)
    tiles.placeOnTile(switchSprite,switchTile)
    tiles.placeOnTile(wallSprite,wallTile)

    sprites.setDataSprite(switchSprite,"myWall", wallSprite)
    
}

function generateTileMapSwitchWall(){
    for(let i = 0; i < tiles.getTilesByType(assets.tile`switch`).length;i++){
        let switchTile = tiles.getTilesByType(assets.tile`switch`)[i]
        let doorTile = tiles.getTilesByType(assets.tile`closedDoor`)[i]
        createSwitchAndWall(switchTile,doorTile)
        tiles.setTileAt(switchTile,img`
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
        tiles.setTileAt(doorTile, img`
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
function createJumpPad(tileLocation:tiles.Location,jumpType:string){
    let jumpPadSprite:Sprite = null
    if(jumpType == "up"){
        jumpPadSprite = sprites.create(img`
        b b b b b b b b b b b b b b b b
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        . . . . 1 . . . . . . 1 . . . .
        . . . . . 1 . . . . 1 . . . . .
        . . . . . . 1 . . 1 . . . . . .
        . . . . . . . 1 1 . . . . . . .
        . . . . . . . 1 1 . . . . . . .
        . . . . . . 1 . . 1 . . . . . .
        . . . . . 1 . . . . 1 . . . . .
        . . . . 1 . . . . . . 1 . . . .
        . . . 1 . . . . . . . . 1 . . .
        . . 1 . . . . . . . . . . 1 . .
        . 1 . . . . . . . . . . . . 1 .
        1 . . . . . . . . . . . . . . 1
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        b b b b b b b b b b b b b b b b
    `, SpriteKind.UpJumpPad)
    }else if(jumpType == "right"){
        jumpPadSprite = sprites.create(img`
        b b b b b b b b b b b b b b b b
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        . . . . 1 . . . . . . 1 . . . .
        . . . . . 1 . . . . 1 . . . . .
        . . . . . . 1 . . 1 . . . . . .
        . . . . . . . 1 1 . . . . . . .
        . . . . . . . 1 1 . . . . . . .
        . . . . . . 1 . . 1 . . . . . .
        . . . . . 1 . . . . 1 . . . . .
        . . . . 1 . . . . . . 1 . . . .
        . . . 1 . . . . . . . . 1 . . .
        . . 1 . . . . . . . . . . 1 . .
        . 1 . . . . . . . . . . . . 1 .
        1 . . . . . . . . . . . . . . 1
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        b b b b b b b b b b b b b b b b
    `, SpriteKind.RightJumpPad)
    }else if(jumpType == "left"){
        jumpPadSprite = sprites.create(img`
        b b b b b b b b b b b b b b b b
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        . . . . 1 . . . . . . 1 . . . .
        . . . . . 1 . . . . 1 . . . . .
        . . . . . . 1 . . 1 . . . . . .
        . . . . . . . 1 1 . . . . . . .
        . . . . . . . 1 1 . . . . . . .
        . . . . . . 1 . . 1 . . . . . .
        . . . . . 1 . . . . 1 . . . . .
        . . . . 1 . . . . . . 1 . . . .
        . . . 1 . . . . . . . . 1 . . .
        . . 1 . . . . . . . . . . 1 . .
        . 1 . . . . . . . . . . . . 1 .
        1 . . . . . . . . . . . . . . 1
        7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
        b b b b b b b b b b b b b b b b
    `, SpriteKind.LeftJumpPad)
    }
   
    sprites.setDataString(jumpPadSprite,"type",jumpType)
    tiles.placeOnTile(jumpPadSprite,tileLocation)

}
function generateTileMapJumpPad(){
    for (let tileLocation of tiles.getTilesByType(assets.tile`jumpSpawnTile`)) {
        createJumpPad(tileLocation,"up")
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
    for (let tileLocation of tiles.getTilesByType(assets.tile`jumpRightSpawnTile`)) {
        createJumpPad(tileLocation, "right")
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
    for (let tileLocation of tiles.getTilesByType(assets.tile`jumpLeftSpawnTile`)) {
        createJumpPad(tileLocation, "left")
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

function generateTileMapTeleportLocationPad(){
    for (let tileLocation of tiles.getTilesByType(assets.tile`teleportLocationTile`)) {
        createTeleportLocationPad(tileLocation)
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
function generateTileMapTeleportPad(){
    for (let tileLocation of tiles.getTilesByType(assets.tile`teleportTile`)) {
        createTeleportPad(tileLocation)
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

function generateTileMapShop(){
    for (let tileLocation of tiles.getTilesByType(assets.tile`shopSpawn`)) {
        createShopSprite(tileLocation)
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

function generateTileMapChest(){
    for(let tileLocation of tiles.getTilesByType(assets.tile`CHEST`)){
        createChest(tileLocation)
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
onStart()

controller.A.onEvent(ControllerButtonEvent.Pressed, function(){
   if(jumps > 0&& !isFalling&&!isFlying){
       isFalling = true
       jumps = 0
       if(isUpSideDown){
           playerSprite.vy = 200
           return
       }
       if(sprites.readDataBoolean(playerSprite,"ShrinkPower")){
           playerSprite.vy = -250
           music.play(music.createSoundEffect(WaveShape.Square, 1, 600, 255, 35, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)

           return
       }
       playerSprite.vy = -200
       music.play(music.createSoundEffect(WaveShape.Square, 1, 600, 255, 35, 100, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)


    
       
       
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
        music.play(music.createSoundEffect(WaveShape.Sine, 798, 600, 255, 0, 150, SoundExpressionEffect.None, InterpolationCurve.Linear), music.PlaybackMode.InBackground)

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
    if (sprites.readDataBoolean(playerSprite, "GravityPower")) {
        
        resetPlayerPowerUps()
        return
    }
    if(sprites.readDataBoolean(playerSprite,"InvinciblePower")){
        resetPlayerPowerUps()
        return
    }
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
    let playerTopDirection: CollisionDirection = CollisionDirection.Top
    let playerBottomDirection: CollisionDirection = CollisionDirection.Bottom
    if(isUpSideDown){
        playerTopDirection = CollisionDirection.Bottom
        playerBottomDirection = CollisionDirection.Top

    }
    if (sprite.isHittingTile(playerBottomDirection)){
        playerLastGroundLocation = location
        jumps += 1
        isFalling = false

    }
   if(sprites.readDataBoolean(sprite,"WallJumpPower")){
       if (sprite.isHittingTile(CollisionDirection.Left) || sprite.isHittingTile(CollisionDirection.Right)) {
           
           jumps += 1
           isFalling = false

       }
   }
    if (sprite.isHittingTile(playerTopDirection)){
        if(tiles.tileAtLocationEquals(location, assets.tile`luckyTile`)||
            tiles.tileAtLocationEquals(location, assets.tile`growTile`)||
            tiles.tileAtLocationEquals(location, assets.tile`shootTile`)||
            tiles.tileAtLocationEquals(location, assets.tile`shrinkTile`)||
            tiles.tileAtLocationEquals(location, assets.tile`batTile`)||
            tiles.tileAtLocationEquals(location, assets.tile`heartTile`)||
            tiles.tileAtLocationEquals(location, assets.tile`invincibleTile`)||
            tiles.tileAtLocationEquals(location, assets.tile`wallJumpTile`)||
            tiles.tileAtLocationEquals(location, assets.tile`unluckyTile`)||
            tiles.tileAtLocationEquals(location, assets.tile`gravityTile`)){
            
            //createCollectible(targetLocation)
            
            
            // tiles.setTileAt(location,assets.tile`unluckyTile`)
            hitPowerBox(tiles.tileImageAtLocation(location),location)
            

        }
        
        if(tiles.tileAtLocationEquals(location, assets.tile`stone1`)){
            music.play(music.createSoundEffect(WaveShape.Sine, 736, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

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
let delta:number = 0
game.onUpdateInterval(1000,function(){
    spriteJump(SpriteKind.Enemy)
})
game.onUpdate(function(){


    

    if(playerSprite.isOutOfScreen(game.currentScene().camera)&& !isTeleporting){
        placePlayerOnTileMap()
        resetPlayerPowerUps()
    }
    for(let sprite of sprites.allOfKind(SpriteKind.Key)){
        sprite.y += (0.5)*Math.sin(delta)
    }
    delta +=0.125
    delta = delta % 1000

})
game.onUpdate(function(){
    changeDirectionX(SpriteKind.BatPower)
    changeDirectionX(SpriteKind.GrowPower)
    changeDirectionX(SpriteKind.ShootPower)
    changeDirectionX(SpriteKind.ShrinkPower)
    changeDirectionX(SpriteKind.HeartPower)
    changeDirectionX(SpriteKind.Enemy)
    changeDirectionX(SpriteKind.MysteryEnemy)
    changeDirectionX(SpriteKind.ShellEnemy)
    changeDirectionX(SpriteKind.InvinciblePower)
    changeDirectionX(SpriteKind.WallJumpPower)
    changeDirectionX(SpriteKind.GravityPower)
    if(isUpSideDown){
        if (playerSprite.vy < 0 && !isFalling) {

            timer.after(200 , function () {
                isFalling = true
            })
        }
    } else if(playerSprite.vy > 0 && !isFalling){
        timer.after(200, function() {
            isFalling = true
        })
       
        
    }
    
    
    
})


function createInvertedPlayerAnimation(){
    characterAnimations.loopFrames(playerSprite, [img`
        . . . f f f f f f f f f . . . .
        . . . f d b b d d c d d f . . .
        . . . f e f f b d f b d f . . .
        . . f e e e e f e f f e f . . .
        . f f e e e e f e f f e f . . .
        f e f f e e e e e e e f . . . .
        f e f . f e e e e f f f f f . .
        f e f . . f f e e d d d d d f .
        f e f . c f e e d d d c c c c c
        f f . c d b e e d d c d d d d c
        . . . c d b e e d d d d e e d c
        . . . f d d e e d f d d f d c .
        . . . . f f e e d f d d f d c .
        . . . . . f e e e d d d d f . .
        . . . . . . f e e e e e f . . .
        . . . . . . . f f f f f . . . .
    `
        , img`
            . . f f f f . . . . . . . . . .
            . . f d d c f . . . . . . . . .
            . . f e f f f f f f f f f f f f
            . . f e e e e f e f b d f b d f
            . f f e e e e f e f d d f d d f
            f e f f e e e e e e e f f f f .
            f e f . f e e e e f f f f f f .
            f e f . c f f e e e d d d d f .
            f f . c d b e e e d d c c c c c
            . . . c d b e e d d c d d d d c
            . . . f d d e e d d d d e e d c
            . . . . f f e e d f d d f d c .
            . . . . . f e e d f d d f d c .
            . . . . . f e e e d d d d f . .
            . . . . . . f e e e e e f . . .
            . . . . . . . f f f f f . . . .
        `,
    img`
        . . f f f . . . f f f f f f f .
        . f d d c f . . f d d d c d d f
        . f b f f f f f f c d d b d d f
        . . f e e e f f f e e f f e f .
        . . f e e e e f e e f e f f . .
        . f f f e e e e e e e f . . . .
        f e f . f e e e e f f f f f . .
        f e f . . f f e e e d c c c f .
        f e f . . f e e e d c d d d d c
        f e f . c f e e d d d d e e d c
        f f . c d b e e d f d d f d d c
        . . . c d b e e d f d d f d c .
        . . . f d d e e d d d d d d c .
        . . . . f f e e e d d d d f . .
        . . . . . . f e e e e e f . . .
        . . . . . . . f f f f f . . . .
    `, img`
        . . . . . . f f f f f f f . . .
        . . . . . f f d d d c d d f . .
        . . . . f f f c d d b d d f . .
        . . f f d d c e e f f e f . . .
        . . f f b e e e e e f f . . . .
        . f f f e e e e e e e f . . . .
        f e f . f e e e e e d f f f . .
        f e f . . f f e e d c d d d f .
        f e f . . f e e d d d d e e d c
        f e f . . f e e d f d d f d d c
        . f f . c f e e d f d d f d d c
        . . . c d b e e d d d d d d c .
        . . . c d b e e e d d d d d c .
        . . . f d d e e e e d d d f . .
        . . . . f f f e e e e e f . . .
        . . . . . . . f f f f f . . . .
    `
    ], 100, characterAnimations.rule(Predicate.FacingRight, Predicate.MovingRight, Predicate.HittingWallUp))
    characterAnimations.loopFrames(playerSprite, [img`
        . . . . f f f f f f f f f . . .
        . . . f d d c d d b b d f . . .
        . . . f d b f d b f f e f . . .
        . . . f e f f e f e e e e f . .
        . . . f e f f e f e e e e f f .
        . . . . f e e e e e e e f f e f
        . . f f f f f e e e e f . f e f
        . f d d d d d e e f f . . f e f
        c c c c c d d d e e f c . f e f
        c d d d d c d d e e b d c . f f
        c d e e d d d d e e b d c . . .
        . c d f d d f d e e d d f . . .
        . c d f d d f d e e f f . . . .
        . . f d d d d e e e f . . . . .
        . . . f e e e e e f . . . . . .
        . . . . f f f f f . . . . . . .
    `
        , img`
            . . . . . . . . . . f f f f . .
            . . . . . . . . . f c d d f . .
            f f f f f f f f f f f f e f . .
            f d b f d b f e f e e e e f . .
            f d d f d d f e f e e e e f f .
            . f f f f e e e e e e e f f e f
            . f f f f f f e e e e f . f e f
            . f d d d d e e e f f c . f e f
            c c c c c d d e e e b d c . f f
            c d d d d c d d e e b d c . . .
            c d e e d d d d e e d d f . . .
            . c d f d d f d e e f f . . . .
            . c d f d d f d e e f . . . . .
            . . f d d d d e e e f . . . . .
            . . . f e e e e e f . . . . . .
            . . . . f f f f f . . . . . . .
        `,
    img`
        . f f f f f f f . . . f f f . .
        f d d c d d d f . . f c d d f .
        f d d b d d c f f f f f f b f .
        . f e f f e e f f f e e e f . .
        . . f f e f e e f e e e e f . .
        . . . . f e e e e e e e f f f .
        . . f f f f f e e e e f . f e f
        . f c c c d e e e f f . . f e f
        c d d d d c d e e e f . . f e f
        c d e e d d d d e e f c . f e f
        c d d f d d f d e e b d c . f f
        . c d f d d f d e e b d c . . .
        . c d d d d d d e e d d f . . .
        . . f d d d d e e e f f . . . .
        . . . f e e e e e f . . . . . .
        . . . . f f f f f . . . . . . .
    `, img`
        . . . f f f f f f f . . . . . .
        . . f d d c d d d f f . . . . .
        . . f d d b d d c f f f . . . .
        . . . f e f f e e c d d f f . .
        . . . . f f e e e e e b f f . .
        . . . . f e e e e e e e f f f .
        . . f f f d e e e e e f . f e f
        . f d d d c d e e f f . . f e f
        c d e e d d d d e e f . . f e f
        c d d f d d f d e e f . . f e f
        c d d f d d f d e e f c . f f .
        . c d d d d d d e e b d c . . .
        . c d d d d d e e e b d c . . .
        . . f d d d e e e e d d f . . .
        . . . f e e e e e f f f . . . .
        . . . . f f f f f . . . . . . .
    `
    ], 100, characterAnimations.rule(Predicate.FacingLeft, Predicate.MovingLeft, Predicate.HittingWallUp))
    characterAnimations.loopFrames(playerSprite, [img`
        . . . . . . . . . . f f f f . .
        . . . . . . . . . f c d d f . .
        f f f f f f f f f f f f e f . .
        f d b f d b f e f e e e e f . .
        f d d f d d f e f e e e e f f .
        . f f f f e e e e e e e f f e f
        . f f f f f f e e e e f . f e f
        . f d d d d e e e f f c . f e f
        c c c c c d d e e e b d c . f f
        c d d d d c d d e e b d c . . .
        c d e e d d d d e e d d f . . .
        . c d f d d f d e e f f . . . .
        . c d f d d f d e e f . . . . .
        . . f d d d d e e e f . . . . .
        . . . f e e e e e f . . . . . .
        . . . . f f f f f . . . . . . .
    `], 1, characterAnimations.rule(Predicate.Moving, Predicate.FacingLeft))

    characterAnimations.loopFrames(playerSprite, [img`
        . . f f f f . . . . . . . . . .
        . . f d d c f . . . . . . . . .
        . . f e f f f f f f f f f f f f
        . . f e e e e f e f b d f b d f
        . f f e e e e f e f d d f d d f
        f e f f e e e e e e e f f f f .
        f e f . f e e e e f f f f f f .
        f e f . c f f e e e d d d d f .
        f f . c d b e e e d d c c c c c
        . . . c d b e e d d c d d d d c
        . . . f d d e e d d d d e e d c
        . . . . f f e e d f d d f d c .
        . . . . . f e e d f d d f d c .
        . . . . . f e e e d d d d f . .
        . . . . . . f e e e e e f . . .
        . . . . . . . f f f f f . . . .
    `], 1, characterAnimations.rule(Predicate.Moving, Predicate.FacingRight))

    characterAnimations.loopFrames(playerSprite, [img`
        . . f f f f f f f f f f f f f .
        . f d d f d d f d d b e f f f f
        . f b d f d b f b b f e f f e f
        . . f e e f e e f e e e f . e f
        . . . f e e f e e f e e f . e f
        . . . . f f e e e e e e f . f f
        . . f f f f f e e e e f . . . .
        . f d d d d e e e f f . . . . .
        c c c c c d d e e e f c . . . .
        c d d d d c d d e e b d c . . .
        c d e e d d d d e e b d c . . .
        . c d f d d f d e e d d f . . .
        . c d f d d f d e e f f . . . .
        . . f d d d d e e e f . . . . .
        . . . f e e e e e f . . . . . .
        . . . . f f f f f . . . . . . .
    `, img`
        . . f f f f f f f f f f f f f .
        . f d d f e e e d d b e f f f f
        . f f f f f f e b b f e f f e f
        . f f d d f e f f e e e f . e f
        . . f d b f e e f f e e f . e f
        . . f f f f f e e e e e f . f f
        . . f e e e f f e e e f . . . .
        . f d d d d e e e f f . . . . .
        c c c c c d d e e e f c . . . .
        c d d d d c d d e e b d c . . .
        c d e e d d d d e e b d c . . .
        . c d f d d f d e e d d f . . .
        . c d f d d f d e e f f . . . .
        . . f d d d d e e e f . . . . .
        . . . f e e e e e f . . . . . .
        . . . . f f f f f . . . . . . .
    `, img`
        . f f f f f f f f f f f f f . .
        . f d d f e e f d d b f f f f .
        . f b d f e e f b b f f f e f .
        . . f f e e e e f f f f f e f .
        . . . f e e e e e e f f f e f .
        . . . . f e e e e e e e f f f .
        . . . . f f f e e f e e e f . .
        . . . c d d d d e e f f e f f f
        . . c d d d d d d e e f f d d f
        . c d c c c c d d d e d f b d f
        . c c d d d d c d d e d f f f .
        . c d d e e d d d d e d d f . .
        . . f f f d d f f d e f f . . .
        . . . f d d d d d e e f . . . .
        . . . . f e e e e e f . . . . .
        . . . . . f f f f f . . . . . .
    `, img`
        . f f f f f f f f f f f f f . .
        . f d d f f f f d d b f f f f .
        . f b d f e e f b b f f f e f .
        . . f f e e e e f f f f f e f .
        . . . f e e e e e e f f f e f .
        . . . . f e e e e e e e f f f .
        . . . . f f f e e f e e e f f f
        . . . c d d d d e e f f f d d f
        . . c d d d d d d d e f f b d f
        . c d d c c c c d d d e f f f f
        . c d c d d d d c d d e f f . .
        . c d d d e e d d d d e d f . .
        . . f d f f d d f f d f f . . .
        . . . f d d d d d d e f . . . .
        . . . . f e e e e e f . . . . .
        . . . . . f f f f f . . . . . .
    `, img`
        . f f f f f f f f f f f f f . .
        . f d d f e e f d d b f f e f .
        . f b d f e f f b b f f f e f .
        . f f f e f f e e e f f . e f .
        f f f f f e e e e e f f . f f .
        f d d f e e e f f f f f . . . .
        f d d f e f f f e e e f . . . .
        c f f d d c d d e e b d c . . .
        c d e e d d d d e e b d c . . .
        . c d d d f f d e e d d f . . .
        . . f d d d d d e e f f . . . .
        . . f d d d d e e e f . . . . .
        . . . f e e e e e f . . . . . .
        . . . . f f f f f . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, img`
        . f f f f f f f f f f f f f . .
        . f d d f f e e d d b f f f f .
        . f b d f e e f b b f f f e f .
        . f f e e e f f f f f f f e f .
        . . f e e f e e e e f f . e f .
        . . f f f e e e e f f f . f f .
        . f d d f e f f f e e f . . . .
        . f b d f f f e e e e f . . . .
        c f f f f d d d e e f c f . . .
        c d d d d c d d e e b d c . . .
        c d e e d d d d e e b d c . . .
        . c d d d f d d e e d d f . . .
        . . f d d f d d e e f f . . . .
        . . f d d d d e e e f . . . . .
        . . . f e e e e e f . . . . . .
        . . . . f f f f f . . . . . . .
    `], 100, characterAnimations.rule(Predicate.HittingWallUp, Predicate.NotMoving, Predicate.FacingLeft))
    characterAnimations.loopFrames(playerSprite, [img`
        . f f f f f f f f f f f f f . .
        f f f f e b d d f d d f d d f .
        f e f f e f b b f b d f d b f .
        f e . f e e e f e e f e e f . .
        f e . f e e f e e f e e f . . .
        f f . f e e e e e e f f . . . .
        . . . . f e e e e f f f f f . .
        . . . . . f f e e e d d d d f .
        . . . . c f e e e d d c c c c c
        . . . c d b e e d d c d d d d c
        . . . c d b e e d d d d e e d c
        . . . f d d e e d f d d f d c .
        . . . . f f e e d f d d f d c .
        . . . . . f e e e d d d d f . .
        . . . . . . f e e e e e f . . .
        . . . . . . . f f f f f . . . .
    `, img`
        . f f f f f f f f f f f f f . .
        f f f f e b d d e e e f d d f .
        f e f f e f b b e f f f f f f .
        f e . f e e e f f e f d d f f .
        f e . f e e f f e e f b d f . .
        f f . f e e e e e f f f f f . .
        . . . . f e e e f f e e e f . .
        . . . . . f f e e e d d d d f .
        . . . . c f e e e d d c c c c c
        . . . c d b e e d d c d d d d c
        . . . c d b e e d d d d e e d c
        . . . f d d e e d f d d f d c .
        . . . . f f e e d f d d f d c .
        . . . . . f e e e d d d d f . .
        . . . . . . f e e e e e f . . .
        . . . . . . . f f f f f . . . .
    `, img`
        . . f f f f f f f f f f f f f .
        . f f f f b d d f e e f d d f .
        . f e f f f b b f e e f d b f .
        . f e f f f f f e e e e f f . .
        . f e f f f e e e e e e f . . .
        . f f f e e e e e e e f . . . .
        . . f e e e f e e f f f . . . .
        f f f e f f e e d d d d c . . .
        f d d f f e e d d d d d d c . .
        f d b f d e d d d c c c c d c .
        . f f f d e d d c d d d d c c .
        . . f d d e d d d d e e d d c .
        . . . f f e d f f d d f f f . .
        . . . . f e e d d d d d f . . .
        . . . . . f e e e e e f . . . .
        . . . . . . f f f f f . . . . .
    `, img`
        . . f f f f f f f f f f f f f .
        . f f f f b d d f f f f d d f .
        . f e f f f b b f e e f d b f .
        . f e f f f f f e e e e f f . .
        . f e f f f e e e e e e f . . .
        . f f f e e e e e e e f . . . .
        f f f e e e f e e f f f . . . .
        f d d f f f e e d d d d c . . .
        f d b f f e d d d d d d d c . .
        f f f f e d d d c c c c d d c .
        . . f f e d d c d d d d c d c .
        . . f d e d d d d e e d d d c .
        . . . f f d f f d d f f d f . .
        . . . . f e d d d d d d f . . .
        . . . . . f e e e e e f . . . .
        . . . . . . f f f f f . . . . .
    `, img`
        . . f f f f f f f f f f f f f .
        . f e f f b d d f e e f d d f .
        . f e f f f b b f f e f d b f .
        . f e . f f e e e f f e f f f .
        . f f . f f e e e e e f f f f f
        . . . . f f f f f e e e f d d f
        . . . . f e e e f f f e f d d f
        . . . c d b e e d d c d d f f c
        . . . c d b e e d d d d e e d c
        . . . f d d e e d f f d d d c .
        . . . . f f e e d d d d d f . .
        . . . . . f e e e d d d d f . .
        . . . . . . f e e e e e f . . .
        . . . . . . . f f f f f . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, img`
        . . f f f f f f f f f f f f f .
        . f f f f b d d e e f f d d f .
        . f e f f f b b f e e f d b f .
        . f e f f f f f f f e e e f f .
        . f e . f f e e e e f e e f . .
        . f f . f f f e e e e f f f . .
        . . . . f e e f f f e f d d f .
        . . . . f e e e e f f f d b f .
        . . . f c f e e d d d f f f f c
        . . . c d b e e d d c d d d d c
        . . . c d b e e d d d d e e d c
        . . . f d d e e d d f d d d c .
        . . . . f f e e d d f d d f . .
        . . . . . f e e e d d d d f . .
        . . . . . . f e e e e e f . . .
        . . . . . . . f f f f f . . . .
    `], 100, characterAnimations.rule(Predicate.HittingWallUp, Predicate.NotMoving, Predicate.FacingRight))

}

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
    
    music.play(music.createSoundEffect(WaveShape.Sine, 1048, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

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
scene.onOverlapTile(SpriteKind.ShellEnemy, assets.tile`lava`, function (sprite, location) {
    sprite.destroy()
})
scene.onOverlapTile(SpriteKind.MysteryEnemy, assets.tile`lava`, function (sprite, location) {
    sprite.destroy()
})
scene.onOverlapTile(SpriteKind.Collectible, assets.tile`lava`, function (sprite, location) {
    sprite.destroy()
})
scene.onOverlapTile(SpriteKind.InvinciblePower, assets.tile`lava`, function (sprite, location) {
    sprite.destroy()
})
scene.onOverlapTile(SpriteKind.WallJumpPower, assets.tile`lava`, function (sprite, location) {
    sprite.destroy()
})
scene.onOverlapTile(SpriteKind.GravityPower, assets.tile`lava`, function (sprite, location) {
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
sprites.onOverlap(SpriteKind.Player,SpriteKind.UpJumpPad,function(sprite,othersprite){
    sprite.vy = -300
    animation.runImageAnimation(othersprite, [
            img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            . . . . . . 1 . . 1 . . . . . .
            . . . . . . . 1 1 . . . . . . .
            . . . . . . . 1 1 . . . . . . .
            . . . . . . 1 . . 1 . . . . . .
            . . . . . 1 . . . . 1 . . . . .
            . . . . 1 . . . . . . 1 . . . .
            . . . 1 . . . . . . . . 1 . . .
            . . 1 . . . . . . . . . . 1 . .
            . 1 . . . . . . . . . . . . 1 .
            1 . . . . . . . . . . . . . . 1
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `,
            img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            . . . . . . . 1 1 . . . . . . .
            . . . . . . 1 . . 1 . . . . . .
            . . . . . 1 . . . . 1 . . . . .
            . . . . 1 . . . . . . 1 . . . .
            . . . 1 . . . . . . . . 1 . . .
            . . 1 . . . . . . . . . . 1 . .
            . 1 . . . . . . . . . . . . 1 .
            1 . . . . . . . . . . . . . . 1
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `,
            img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            . . . . . 1 . . . . 1 . . . . .
            . . . . 1 . . . . . . 1 . . . .
            . . . 1 . . . . . . . . 1 . . .
            . . 1 . . . . . . . . . . 1 . .
            . 1 . . . . . . . . . . . . 1 .
            1 . . . . . . . . . . . . . . 1
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `,
            img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            . . . 1 . . . . . . . . 1 . . .
            . . 1 . . . . . . . . . . 1 . .
            . 1 . . . . . . . . . . . . 1 .
            1 . . . . . . . . . . . . . . 1
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `,
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
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            . 1 . . . . . . . . . . . . 1 .
            1 . . . . . . . . . . . . . . 1
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `,
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
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `
    ], 50, false)
    othersprite.setFlag(SpriteFlag.Ghost, true)
    pause(1500)
    othersprite.setFlag(SpriteFlag.Ghost, false)

})
sprites.onOverlap(SpriteKind.Player, SpriteKind.RightJumpPad, function (sprite, othersprite) {
    controller.moveSprite(sprite,0,0)

    sprite.vx = 200
    animation.runImageAnimation(othersprite, [
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            . . . . . . 1 . . 1 . . . . . .
            . . . . . . . 1 1 . . . . . . .
            . . . . . . . 1 1 . . . . . . .
            . . . . . . 1 . . 1 . . . . . .
            . . . . . 1 . . . . 1 . . . . .
            . . . . 1 . . . . . . 1 . . . .
            . . . 1 . . . . . . . . 1 . . .
            . . 1 . . . . . . . . . . 1 . .
            . 1 . . . . . . . . . . . . 1 .
            1 . . . . . . . . . . . . . . 1
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            . . . . . . . 1 1 . . . . . . .
            . . . . . . 1 . . 1 . . . . . .
            . . . . . 1 . . . . 1 . . . . .
            . . . . 1 . . . . . . 1 . . . .
            . . . 1 . . . . . . . . 1 . . .
            . . 1 . . . . . . . . . . 1 . .
            . 1 . . . . . . . . . . . . 1 .
            1 . . . . . . . . . . . . . . 1
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            . . . . . 1 . . . . 1 . . . . .
            . . . . 1 . . . . . . 1 . . . .
            . . . 1 . . . . . . . . 1 . . .
            . . 1 . . . . . . . . . . 1 . .
            . 1 . . . . . . . . . . . . 1 .
            1 . . . . . . . . . . . . . . 1
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            . . . 1 . . . . . . . . 1 . . .
            . . 1 . . . . . . . . . . 1 . .
            . 1 . . . . . . . . . . . . 1 .
            1 . . . . . . . . . . . . . . 1
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `,
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
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            . 1 . . . . . . . . . . . . 1 .
            1 . . . . . . . . . . . . . . 1
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `,
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
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `
    ], 50, false)
    othersprite.setFlag(SpriteFlag.Ghost, true)
    timer.after(200,function(){
        controller.moveSprite(sprite,100,0)
    })
    pause(1500)
    othersprite.setFlag(SpriteFlag.Ghost, false)

})
sprites.onOverlap(SpriteKind.Player, SpriteKind.LeftJumpPad, function (sprite, othersprite) {
    controller.moveSprite(sprite,0,0)
    sprite.vx = -200
    animation.runImageAnimation(othersprite, [
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            . . . . . . 1 . . 1 . . . . . .
            . . . . . . . 1 1 . . . . . . .
            . . . . . . . 1 1 . . . . . . .
            . . . . . . 1 . . 1 . . . . . .
            . . . . . 1 . . . . 1 . . . . .
            . . . . 1 . . . . . . 1 . . . .
            . . . 1 . . . . . . . . 1 . . .
            . . 1 . . . . . . . . . . 1 . .
            . 1 . . . . . . . . . . . . 1 .
            1 . . . . . . . . . . . . . . 1
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            . . . . . . . 1 1 . . . . . . .
            . . . . . . 1 . . 1 . . . . . .
            . . . . . 1 . . . . 1 . . . . .
            . . . . 1 . . . . . . 1 . . . .
            . . . 1 . . . . . . . . 1 . . .
            . . 1 . . . . . . . . . . 1 . .
            . 1 . . . . . . . . . . . . 1 .
            1 . . . . . . . . . . . . . . 1
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            . . . . . 1 . . . . 1 . . . . .
            . . . . 1 . . . . . . 1 . . . .
            . . . 1 . . . . . . . . 1 . . .
            . . 1 . . . . . . . . . . 1 . .
            . 1 . . . . . . . . . . . . 1 .
            1 . . . . . . . . . . . . . . 1
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            . . . 1 . . . . . . . . 1 . . .
            . . 1 . . . . . . . . . . 1 . .
            . 1 . . . . . . . . . . . . 1 .
            1 . . . . . . . . . . . . . . 1
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `,
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
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            . 1 . . . . . . . . . . . . 1 .
            1 . . . . . . . . . . . . . . 1
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `,
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
            b b b b b b b b b b b b b b b b
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            7 7 7 7 7 7 7 7 7 7 7 7 7 7 7 7
            b b b b b b b b b b b b b b b b
            `
    ], 50, false)
    othersprite.setFlag(SpriteFlag.Ghost, true)
    timer.after(200,function(){
        controller.moveSprite(sprite,100,0)
    })
    pause(1500)
    othersprite.setFlag(SpriteFlag.Ghost, false)

})
sprites.onOverlap(SpriteKind.Player,SpriteKind.Chest,function(sprite,othersprite){
    if(keysAmount <=0){
        return
    }

    othersprite.setImage(img`
        . b b b b b b b b b b b b b b .
        b e 4 4 4 4 4 4 4 4 4 4 4 4 4 b
        b e 4 4 4 4 4 4 4 4 4 4 4 4 e b
        b e e 4 4 4 4 4 4 4 4 4 4 e e b
        b b b b b b b d d b b b b b b b
        . b b b b b b c c b b b b b b .
        b c c c c c b c c b c c c c c b
        b c c c c c c b b c c c c c c b
        b c c c c c c c c c c c c c c b
        b c c c c c c c c c c c c c c b
        b b b b b b b b b b b b b b b b
        b e e e e e e e e e e e e e e b
        b e e e e e e e e e e e e e e b
        b c e e e e e e e e e e e e c b
        b b b b b b b b b b b b b b b b
        . b b . . . . . . . . . . b b .
    `)
    othersprite.setKind(SpriteKind.EmptyChest)

    let amount:number = Math.randomRange(4,50)
    while(amount > 0){
        createChestCollectibles(othersprite)
        amount--
    }

    keysAmount--

    checkCollectedChestAmount()
})


function checkCollectedChestAmount(){
    if(sprites.allOfKind(SpriteKind.Chest).length == 0){
        for(let exitLocation of tiles.getTilesByType(assets.tile`closedexit`)){
            tiles.setTileAt(exitLocation,assets.tile`openexit`)
        }
    }
}
sprites.onOverlap(SpriteKind.Player,SpriteKind.Key,function(sprite,othersprite){
    othersprite.destroy()
    keysAmount++
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
sprites.onOverlap(SpriteKind.Player,SpriteKind.InvinciblePower,function(sprite,othersprite){
    othersprite.destroy()
    resetPlayerPowerUps()

    if (sprites.readDataBoolean(sprite, "InvinciblePower")) {
        return
    }
    sprites.setDataBoolean(sprite, "InvinciblePower", true)
    info.startCountdown(30)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.WallJumpPower, function (sprite, othersprite) {
    othersprite.destroy()
    resetPlayerPowerUps()
    if (sprites.readDataBoolean(sprite, "WallJumpPower")) {
        return
    }
    sprites.setDataBoolean(sprite, "WallJumpPower", true)

})
sprites.onOverlap(SpriteKind.Player,SpriteKind.GravityPower,function(sprite,othersprite){
    othersprite.destroy()
    resetPlayerPowerUps()
    if(sprites.readDataBoolean(sprite,"GravityPower")){
        return
    }
    sprites.setDataBoolean(sprite,"GravityPower",true)
    switchGravity()

})
function switchGravity(){
    isUpSideDown = true
    playerSprite.ay = (-300)
    info.startCountdown(10)
    createInvertedPlayerAnimation()
}
sprites.onOverlap(SpriteKind.Player,SpriteKind.HeartPower,function(sprite,othersprite){
    othersprite.destroy()
    info.changeLifeBy(1)
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
        `,
        img`
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
            .......22...22......
            ......2322.2222.....
            ......232222222.....
            ......222222222.....
            .......22222b2......
            ........222b2.......
            .........222........
            ..........2.........
            ....................
            ....................
            ....................
            ....................
            ....................
            ....................
        `,
        img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . b . . . . . . .
            . . . . . . . b d b . . . . . .
            . . . . . . b 5 5 5 b . . . . .
            . . . . . b b 5 5 5 b b . . . .
            . . b b b b 5 5 5 1 1 b b b b .
            . . b 5 5 5 5 5 5 1 1 5 5 5 b .
            . . b d d 5 5 5 5 5 5 5 d d b .
            . . . b d d 5 5 5 5 5 d d b . .
            . . . c b 5 5 5 5 5 5 5 b c . .
            . . . c b 5 5 5 5 5 5 5 b c . .
            . . . c 5 5 d d b d d 5 5 c . .
            . . . c 5 d d c c c d d 5 c . .
            . . . c c c c . . . c c c c . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `,
        img`
            . . . . . . . . . . . 6 6 6 6 6
            . . . . . . . . . 6 6 7 7 7 7 8
            . . . . . . 8 8 8 7 7 8 8 6 8 8
            . . e e e e c 6 6 8 8 . 8 7 8 .
            . e 2 5 4 2 e c 8 . . . 6 7 8 .
            e 2 4 2 2 2 2 2 c . . . 6 7 8 .
            e 2 2 2 2 2 2 2 c . . . 8 6 8 .
            e 2 e e 2 2 2 2 e e e e c 6 8 .
            c 2 e e 2 2 2 2 e 2 5 4 2 c 8 .
            . c 2 e e e 2 e 2 4 2 2 2 2 c .
            . . c 2 2 2 e e 2 2 2 2 2 2 2 e
            . . . e c c e c 2 2 2 2 2 2 2 e
            . . . . . . . c 2 e e 2 2 e 2 c
            . . . . . . . c e e e e e e 2 c
            . . . . . . . . c e 2 2 2 2 c .
            . . . . . . . . . c c c c c . .
        `,
        assets.image`gravityPowerUp`
        ],
    "kind":[SpriteKind.GrowPower,SpriteKind.ShootPower,SpriteKind.ShrinkPower,SpriteKind.BatPower,SpriteKind.HeartPower,SpriteKind.InvinciblePower,SpriteKind.WallJumpPower,SpriteKind.GravityPower]
}

let menuItemList: miniMenu.MenuItem[] = [
    miniMenu.createMenuItem("grow power", powerUpObject["image"][0]),
    miniMenu.createMenuItem("shoot power", powerUpObject["image"][1]),
    miniMenu.createMenuItem("shrink power", powerUpObject["image"][2]),
    miniMenu.createMenuItem("bat power", powerUpObject["image"][3]),
    miniMenu.createMenuItem("health container", powerUpObject["image"][4]),
    miniMenu.createMenuItem("invincible power", powerUpObject["image"][5]),
    miniMenu.createMenuItem("wall jump power", powerUpObject["image"][6])
]

let menuItemCostList:number[] = [
    250,300,150,500,1000,1500,750
    
]
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
    music.play(music.createSoundEffect(WaveShape.Sine, 1181, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

})
scene.onOverlapTile(SpriteKind.Player,assets.tile`closedexit`,function(sprite,location){
    sprite.sayText("i must open all the chests",1000)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`openexit`, function (sprite, location) {
    level += 1
    createLevel()
    //game.game
})

sprites.onOverlap(SpriteKind.Player,SpriteKind.EnemyProjectile,function(sprite,othersprite){
    if (sprites.readDataBoolean(sprite, "InvinciblePower")) {
        othersprite.destroy(effects.bubbles)
        info.changeScoreBy(50)
        music.play(music.createSoundEffect(WaveShape.Triangle, 300, 200, 255, 0, 75, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

        return
    }
    sprite.destroy()
    
    scene.cameraShake(99,500)
    music.play(music.createSoundEffect(WaveShape.Sine, 1048, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

    
})
scene.onOverlapTile(SpriteKind.Enemy, assets.tile`lava`,function(sprite){
sprite.destroy(effects.warmRadial)
})
sprites.onOverlap(SpriteKind.Player,SpriteKind.SpinningEnemy,function(sprite,othersprite){
    if (sprites.readDataBoolean(sprite, "InvinciblePower")) {
       
        info.changeScoreBy(50)
        music.play(music.createSoundEffect(WaveShape.Triangle, 300, 200, 255, 0, 75, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

        return
    }
    sprite.destroy()
    
    music.play(music.createSoundEffect(WaveShape.Triangle, 300, 200, 255, 0, 75, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

    scene.cameraShake(99,500)
    music.play(music.createSoundEffect(WaveShape.Sine, 1048, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

})
sprites.onOverlap(SpriteKind.Player,SpriteKind.Enemy,function(sprite,otherSprite){ 
    if(sprites.readDataBoolean(sprite,"InvinciblePower")){
        otherSprite.destroy(effects.bubbles)
        info.changeScoreBy(50)
        music.play(music.createSoundEffect(WaveShape.Triangle, 300, 200, 255, 0, 75, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

        return
    }
    if(sprite.bottom < otherSprite.y&&!isUpSideDown){

        if(!sprites.readDataNumber(playerSprite,"BatPower")){
            sprite.vy = -100
            otherSprite.destroy(effects.bubbles)
            info.changeScoreBy(50)
            music.play(music.createSoundEffect(WaveShape.Triangle, 300, 200, 255, 0, 75, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)


        }
        
    }else{
        if(isUpSideDown){
            if(sprite.bottom > otherSprite.bottom){
                sprite.vy = 100
                otherSprite.destroy(effects.bubbles)
                info.changeScoreBy(50)
                music.play(music.createSoundEffect(WaveShape.Triangle, 300, 200, 255, 0, 75, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)
                return
            }
        }
        sprite.destroy()
        
        scene.cameraShake(99,500)
        music.play(music.createSoundEffect(WaveShape.Sine, 1048, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

    }
})

sprites.onOverlap(SpriteKind.Player,SpriteKind.MysteryEnemy,function(sprite,otherSprite){
    if (sprites.readDataBoolean(sprite, "InvinciblePower")) {
        otherSprite.destroy(effects.bubbles)
        info.changeScoreBy(50)
        music.play(music.createSoundEffect(WaveShape.Triangle, 300, 200, 255, 0, 75, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

        return
    }
    if(sprite.bottom < otherSprite.y){
        sprite.vy = -100
        otherSprite.destroy()
        
        createShellEnemy(otherSprite)
        music.play(music.createSoundEffect(WaveShape.Triangle, 300, 200, 255, 0, 75, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

    }else{
        sprite.destroy()
        
        music.play(music.createSoundEffect(WaveShape.Sine, 1048, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

        scene.cameraShake(99,500)
    }
})
sprites.onOverlap(SpriteKind.ShellEnemy,SpriteKind.Enemy,function(sprite,otherSprite){
    otherSprite.vy = -100
    otherSprite.destroy()
    info.changeScoreBy(50)
})

sprites.onOverlap(SpriteKind.Player,SpriteKind.ShellEnemy,function(sprite,otherSprite){
    if (sprites.readDataBoolean(sprite, "InvinciblePower")) {
        otherSprite.destroy(effects.bubbles)
        info.changeScoreBy(50)
        music.play(music.createSoundEffect(WaveShape.Triangle, 300, 200, 255, 0, 75, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

        return
    }
    if(Math.abs(otherSprite.vx) > 0 ){
            if(sprite.bottom < otherSprite.bottom){
                
                otherSprite.vx = 0
                music.play(music.createSoundEffect(WaveShape.Triangle, 300, 200, 255, 0, 75, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

                
            }else{
                
                sprite.destroy()
                music.play(music.createSoundEffect(WaveShape.Sine, 1048, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

                scene.cameraShake(99,500)
            }
        
    }else{
        if(characterAnimations.matchesRule(sprite,Predicate.FacingRight)){
            otherSprite.vx = 101
            music.play(music.createSoundEffect(WaveShape.Triangle, 300, 200, 255, 0, 75, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

        }else{
            otherSprite.vx = -101
            music.play(music.createSoundEffect(WaveShape.Triangle, 300, 200, 255, 0, 75, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.InBackground)

        }
        otherSprite.setFlag(SpriteFlag.GhostThroughSprites,true)
        timer.after(100, function() {
            otherSprite.setFlag(SpriteFlag.GhostThroughSprites, false)
        })
    }
    sprites.setDataNumber(otherSprite,"speed",otherSprite.vx)
    sprite.vy = -100
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
