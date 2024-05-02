// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);
    //% fixedInstance jres blockIdentity=images._tile
    export const tile1 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "test":
            case "test1":return tiles.createTilemap(hex`0c000c00010101010101010101010101010000000000000000000001010000000000000000000001010001010000000000000001010000000000000000000001010000000000000000000001010000000001010000000001010000000000000000000001010000000000000001010001010000000000000000000001010000000000000000000001010101010101010101010101`, img`
2 2 2 2 2 2 2 2 2 2 2 2 
2 . . . . . . . . . . 2 
2 . . . . . . . . . . 2 
2 . 2 2 . . . . . . . 2 
2 . . . . . . . . . . 2 
2 . . . . . . . . . . 2 
2 . . . . 2 2 . . . . 2 
2 . . . . . . . . . . 2 
2 . . . . . . . 2 2 . 2 
2 . . . . . . . . . . 2 
2 . . . . . . . . . . 2 
2 2 2 2 2 2 2 2 2 2 2 2 
`, [myTiles.transparency16,myTiles.tile1], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "transparency16":return transparency16;
            case "stone1":
            case "tile1":return tile1;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
