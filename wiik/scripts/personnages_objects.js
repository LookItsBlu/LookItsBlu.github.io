function Character(name, img, pickups, items, trinket, cardpill, health, stats, completion) {
    this.name= name;
    this.img = img;
    
    this.pickups = pickups;
    //in-game IDs
    this.items = items;
    //nom de l'image (sans .png)
    this.trinket = trinket;
    //[x] ou x: 0=pillule ou 1=carte, si x=1, alors [x,y] ou y: numero de carte
    this.cardpill = cardpill;
    
    this.health = health;
    
    this.stats = stats;
    
    //[x, y] ou x: 0=item, 1=trinket, 2=baby et y: nom de l'image (sans .png)
    this.completion = completion;
}

var isaac = new Character(
    'Isaac',                            //nom
    'ressources/Personnages/isaac.png', //image source
    [0, 1, 0],                          //pickups
    [105],                              //items
    0,                                 //trinkets
    [],                                 //cartes / pillules
    [[0, 3]],                           //vie
    [2, 1, 2, 2, 2, 1],
    [[1, 54],[2, 14],[0, 111],[0, 318],[1, 23],[0, 163],[0, 357],[0, 399],[2, 418],[2, 393]] //Completion
    );

var magdalene = new Character(
    'Magdalene',
    'ressources/Personnages/magdalene.png',
    [0, 0, 0],
    [45],
    0,
    [],
    [[0, 4]],
    [1, 1, 2, 2, 2, 1],
    [[0, 307],[2, 25],[0, 109],[0, 95],[1, 55],[0, 159],[0, 382],[0, 402],[2, 298],[2, 407]]
    );

var cain = new Character(
    'Cain',
    'ressources/Personnages/cain.png',
    [0, 0, 1],
    [],
    19,
    [],
    [[0, 2]],
    [2, 1, 2, 1, 2, 1],
    [[0, 314],[2, 58],[0, 132],[0, 91],[0, 185],[1, 59],[0, 405],[0, 381],[2, 214],[2, 270]]
    );

var judas = new Character(
    'Judas',
    'ressources/Personnages/judas.png',
    [3, 0, 0],
    [34],
    0,
    [],
    [[0, 1]],
    [2, 1, 3, 2, 2, 1],
    [[0, 306],[2, 47],[1, 56],[0, 203],[1, 35],[1, 61],[0, 428],[0, 386],[2, 389],[2, 262]]
    );

var blue_baby = new Character(
    'Blue Baby',
    'ressources/Personnages/blue_baby.png',
    [3, 0, 0],
    [36],
    0,
    [],
    [[1, 3]],
    [2, 1, 2, 2, 2, 1],
    [[0, 315],[2, 120],[0, 124],[0, 102],[1, 57],[0, 176],[1, 69],[0, 361],[2, 376],[2, 221]]
    );

var eve = new Character(
    'Eve',
    'ressources/Personnages/eve.png',
    [0, 0, 0],
    [122, 117, 126],
    0,
    [],
    [[0, 2]],
    [2, 1, 1, 2, 2, 1],
    [[0, 305],[2, 36],[0, 123],[1, 60],[1, 17],[0, 169],[1, 62],[0, 403],[2, 236],[2, 359]]
    );

var samson = new Character(
    'Samson',
    'ressources/Personnages/samson.png',
    [0, 0, 0],
    [157],
    0,
    [],
    [[0, 3]],
    [2, 1, 2, 4, 2, 1],
    [[0, 316],[2, 121],[0, 183],[0, 154],[1, 58],[1, 49],[0, 406],[1, 64],[2, 296],[2, 304]]
    );

var azazel = new Character(
    'Azazel',
    'ressources/Personnages/azazel.png',
    [0, 0, 0],
    [],
    0,
    [1, 0],
    [[2, 3]],
    [2, 1, 3, 1, 2, 1],
    [[0, 80],[2, 118],[1, 22],[0, 287],[0, 110],[0, 227],[3, 'lilith'],[0, 394],[2, 318],[2, 335]]
    );

var eden = new Character(
    'Eden',
    'ressources/Personnages/eden.png',
    [-1, -1, -1],
    [-1, -1],
    -1,
    [-1],
    [[-1, 1]],
    [-1, -1, -1, -1, -1, -1],
    [[0, 319],[2, 123],[0, 282],[0, 281],[0, 266],[1, 21],[0, 400],[0, 376],[2, 370],[2, 416]]
    );

var lazarus = new Character(
    'Lazarus',
    'ressources/Personnages/lazarus.png',
    [0, 0, 0],
    [],
    0,
    [0],
    [[0, 3]],
    [2, 1, 2, 1, 2, 1],
    [[0, 254],[2, 119],[1, 28],[0, 327],[0, 292],[1, 13],[0, 383],[0, 404],[2, 238],[2, 435]]
    );

var the_lost = new Character(
    'The Lost',
    'ressources/Personnages/the_lost.png',
    [1, 0, 0],
    [284, 313],
    0,
    [],
    [],
    [2, 1, 2, 2, 2, 1],
    [[0, 278],[2, 122],[0, 271],[0, 329],[0, 328],[0, 330],[0, 326],[0, 387],[0, 358],[2, 358]]
    );

var lilith = new Character(
    'Lilith',
    'ressources/Personnages/lilith.png',
    [0, 0, 0],
    [416, 357],
    0,
    [],
    [[0, 1], [2, 2]],
    [2, 1, 2, 2, 2, 1],
    [[0, 408],[2, 211],[0, 388],[0, 384],[0, 412],[0, 407],[0, 352],[0, 355],[2, 295],[2, 425]]
    );

var keeper = new Character(
    'Keeper',
    'ressources/Personnages/keeper.png',
    [1, 1, 0],
    [349],
    87,
    [],
    [[3, 2]],
    [1, 1, 2, 2, 2, 1],
    [[4, 'Sticky Nickels'],[2, 337],[4, 'Keeper now holds Store Key'],[4, 'Keeper now holds Wooden Nickel'],[1, 74],[0, 411],[1, 82],[4, 'Keeper now holds a penny'],[2, 259],[2, 311]]
    );

var CharacterList = [
    isaac, magdalene, cain, judas,
    blue_baby, eve, samson, azazel,
    eden, lazarus, the_lost, lilith,
    keeper];