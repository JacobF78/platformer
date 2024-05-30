// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile2 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile3 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile4 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile5 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile6 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile8 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile9 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile10 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile7 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile11 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile12 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile13 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile14 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile15 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile16 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "test":
            case "test1":return tiles.createTilemap(hex`0c000c000b0b0b0b0b0b0b0b0b0b0b0b0b000000070000000000000b0b000200000000000003000b0b000101000003000002000b0b000000000000000000000b0b000400000900000000060b0b000000030101000000000b0b000000000000000002000b0b000000000000000101000b0b080000000000000000000b0b0002000005050000000a0b0b0b0b0b0b0b0b0b0b0b0b0b`, img`
2 2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . . . 2 
2 . . . . . . . . 2 . 2 
2 . 2 2 . . 2 . . . . 2 
2 . . . . . . . . . . 2 
2 . . . . . . . . . . 2 
2 . . . 2 2 2 . . . . 2 
2 . . . . . . . . . . 2 
2 . . . . . . . 2 2 . 2 
2 . . . . . . . . . . 2 
2 . . . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile2,myTiles.tile3,myTiles.tile5,myTiles.tile6,myTiles.tile8,myTiles.tile9,myTiles.tile10,myTiles.tile7,myTiles.tile11,sprites.dungeon.floorLight0], TileScale.Sixteen);
            case "test2":
            case "test2":return tiles.createTilemap(hex`1e0010000a00000000000000090000000000000000000000000000000000000000000a00000000000000090000000000000000000000000000000000000000000a00000000000000090000000000000000000000000000000000000000000a00000000000000090000000000000000000000000000000000000000000a000000000000000900000b0300000100000000000000000000000000000a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a00000000000000000000000a00000000000000000000000000000000000000000a00000000000000000a00000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000a000000000a00000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000a000000010201000000000000000000000000000000000000000000000a0a00000000000000000000000000000000000000000000000000000000000a03000000000005000000000000050000000006060000080808080000000a0a0a0a0a0a0a0a0a0000000001010000000101010100070707070000000a0a0a0a0a0a0a0a0a040404040404040404040404040404040404040404`, img`
........2.....................
2.......2.....................
2.......2.....................
2.......2.....................
2.......2......2..............
2222222222222222222...........
2....................2........
2.............................
2........................2....
2.............................
2.............................
2...222......................2
2.............................
2.............................
222222222....22...2222.2222...
222222222.....................
`, [myTiles.transparency16,myTiles.tile1,myTiles.tile3,myTiles.tile7,myTiles.tile12,myTiles.tile2,myTiles.tile6,myTiles.tile13,myTiles.tile14,myTiles.tile15,sprites.dungeon.floorLight0,myTiles.tile16], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "stone1":
            case "tile1":return tile1;
            case "collectibleSpawn":
            case "tile2":return tile2;
            case "luckyTile":
            case "tile3":return tile3;
            case "unluckyTile":
            case "tile4":return tile4;
            case "backGroundTile":
            case "tile5":return tile5;
            case "hazardTile":
            case "tile6":return tile6;
            case "rightHazardTile":
            case "tile8":return tile8;
            case "topHazardTile":
            case "tile9":return tile9;
            case "leftHazardTile":
            case "tile10":return tile10;
            case "door":
            case "tile7":return tile7;
            case "spawnTile":
            case "tile11":return tile11;
            case "lava":
            case "tile12":return tile12;
            case "conveyer":
            case "tile13":return tile13;
            case "conveyerMove":
            case "tile14":return tile14;
            case "vineTile":
            case "tile15":return tile15;
            case "enemySpawnTile":
            case "tile16":return tile16;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
