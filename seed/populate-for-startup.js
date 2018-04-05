const Product = require('../models/product');
const User = require('../models/user');
const mongoose = require('mongoose');

// CONNECT TO DATABASE
mongoose.connect('mongodb://localhost/shoppingApp').then(() => { mongoose.disconnect(); });

// REMOVE USERS
User.remove({}, function(err) {
  if(err) {
    console.log('ERROR: User remove failed');
    throw err;
  }
});

// REMOVE PRODUCTS
Product.remove({}, function(err) {
  if(err) {
    console.log('ERROR: Product remove failed')
    throw err;
  }
});

// CREATE PRODUCTS
var products = [
  new Product({
    imagePath   : 'https://images-na.ssl-images-amazon.com/images/I/51UvtqYLj%2BL._SS500.jpg',
    title       : 'Dead Legs',
    artist      : 'Active Bird Community',
    description : `Dead Legs is one of Active Bird Community most renouned hit singles. Released in 2016, it has proven to be one of New York's best selling tracks.`,
    price       : 0.99
  }),
  new Product({
    imagePath   : 'https://images-na.ssl-images-amazon.com/images/I/71Cf2vPnnWL._SL1500_.jpg',
    title       : 'The Wall',
    artist      : 'Pink Floyd',
    description : `The Wall is a rock opera that explores abandonment and isolation, symbolised by a metaphorical wall. The songs create an approximate storyline of events in the life of the protagonist, Pink (who is introduced in the songs "In the Flesh?" and "The Thin Ice"), a character based on Syd Barrett as well as Roger Waters, whose father was killed during the Second World War. Pink's father also dies in a war ("Another Brick in the Wall (Part 1)"), which is where Pink starts to build a
    metaphorical "wall" around him. Pink is oppressed by his overprotective mother ("Mother") and tormented at school by tyrannical, abusive teachers ("The Happiest Days of Our Lives"). All of these traumas become metaphorical "bricks in the wall" ("Another Brick in the Wall (Part 2)").`,
    price       : 23.95
  }),
  new Product({
    imagePath   : 'https://images-na.ssl-images-amazon.com/images/I/71rKwfGTc-L._SX466_.jpg',
    title       : "Tell Me I'm Pretty",
    artist      : 'Cage the Elephant',
    description : 'On their fourth album, Kentucky band Cage the Elephant refurbish mid-Sixties retro-rock with a 21st-century studio vividness – creating something akin to watching old footage of Sandy Koufax or Bill Russell in crisp hi-def with modern camera angles.',
    price       : 15.96
  }),
  new Product({
    imagePath   : 'https://images-na.ssl-images-amazon.com/images/I/71KkhyFgrwL._SL1500_.jpg',
    title       : 'Harry Styles',
    artist      : 'Harry Styles',
    description : `The 2017 solo debut from the One Direction kingpin himself, Harry Styles. The album features chart-topping single 'Sign of the Times'.`,
    price       : 19.02
  }),
  new Product({
    imagePath   : 'https://images-na.ssl-images-amazon.com/images/I/91LRAcFosbL._SL1500_.jpg',
    title       : 'The Ride',
    artist      : 'Catfish And The Bottlemen',
    description : `The most exciting new band to burst through in the UK, Catfish And The Bottlemen are poised for a breakthrough stateside with their new forthcoming D. Sardy produced album, The Ride. The band's debut album The Balcony is headed towards platinum in the UK and recently earned them a 2016 Brit Award for Best British Breakthrough Act.`,
    price       : 14.29
  }),
  new Product({
    imagePath   : 'https://images-na.ssl-images-amazon.com/images/I/61qIGn7zGuL.jpg',
    title       : 'Mellon Collie And The Infinite Sadness',
    artist      : 'The Smashing Pumpkins',
    description : `Mellon Collie and the Infinite Sadness is the third studio album by American alternative rock band The Smashing Pumpkins, `,
    price       : 17.86
  }),
  new Product({
    imagePath   : 'https://images-na.ssl-images-amazon.com/images/I/61GDs7S6lLL.jpg',
    title       : 'Morning Report',
    artist      : 'Arkells',
    description : `The New Album From Multi-Juno Award Winning band, Arkells!`,
    price       : 18.24
  }),
  new Product({
    imagePath   : 'https://images-na.ssl-images-amazon.com/images/I/71nYpz%2B%2BVCL._SX466_.jpg',
    title       : 'Blue Album',
    artist      : 'Weezer',
    description : `Weezer, known better to fans as The Blue Album, is Weezer’s first and most successful studio album. It was released on May 10, 1994. Three strong singles (“Undone – The Sweater Song,” “Say It Ain’t So,” and “Buddy Holly”) pushed both the album and the band to the front of the post-Kurt Cobain alternative scene, and then even further into mainstream success.`,
    price       : 13.05
  }),
  new Product({
    imagePath   : 'https://images-na.ssl-images-amazon.com/images/I/91yyPwrN4yL._SL1500_.jpg',
    title       : 'Man Machine Poem',
    artist      : 'The Tragically Hip',
    description : `The Tragically Hip, among Canada’s most acclaimed and beloved bands, today announce the June 17 release of Man Machine Poem via Universal Music Canada, the country’s leading music company. The band’s 14th studio album takes its name from a track on their Gold-selling 2012 release, Now For Plan A, and was produced at The Hip’s home studio The Bathouse by Kevin Drew (Broken Social Scene, Andy Kim, Arts & Crafts label co-founder) and Dave Hamelin. `,
    price       : 14.49
  }),
  new Product({
    imagePath   : 'https://images-na.ssl-images-amazon.com/images/I/81ni71zIxIL._SL1406_.jpg',
    title       : 'OK Computer',
    artist      : 'Radiohead',
    description : `Radiohead's third album got compared to Pink Floyd a lot when it came out, and its slow drama and conceptual sweep certainly put it in that category. OK Computer, though, is a complicated and difficult record: an album about the way machines dehumanize people that's almost entirely un-electronic.`,
    price       : 19.97
  }),
  new Product({
    imagePath   : 'https://images-na.ssl-images-amazon.com/images/I/51GDVd7DRzL.jpg',
    title       : 'In Loving Memory Of',
    artist      : 'Big Wreck',
    description : `In Loving Memory Of... is the debut studio album by American-Canadian rock band, Big Wreck. Released in 1997, the album features the single "The Oaf," which became a Top Ten hit in the U.S. Subsequent singles, "That Song" and "Blown Wide Open", found airplay in the United States but experienced greater success in Canada where they both reached the Top Ten on the country's alternative chart. "Under the Lighthouse" was released as a single exclusively in Canada.`,
    price       : 13.92
  }),
  new Product({
    imagePath   : 'https://images-na.ssl-images-amazon.com/images/I/711oFKG8vUL._SX466_.jpg',
    title       : 'Screaming Bloody Murder',
    artist      : 'Sum 41',
    description : `Screaming Bloody Murder is the fifth studio album by Canadian rock band Sum 41, released on March 29, 2011, after many delays. It is the band's second album produced by frontman Deryck Whibley. It is the first album to be released on Island Records since the band left Aquarius Records in 2010.`,
    price       : 12.34
  }),
  new Product({
    imagePath   : 'https://images-na.ssl-images-amazon.com/images/I/91aGEMiCMYL._SL1500_.jpg',
    title       : 'Bleed American',
    artist      : 'Jimmy Eat World',
    description : `Bleed American is the fourth studio album by American rock band Jimmy Eat World, released on July 24, 2001.`,
    price       : 12.99
  }),
  new Product({
    imagePath   : 'https://images-na.ssl-images-amazon.com/images/I/71CmHa75FfL._SL1064_.jpg',
    title       : 'Hot Fuss',
    artist      : 'The Killers',
    description : `Hot Fuss is the debut studio album by American rock band The Killers. It was released on June 7, 2004 in the United Kingdom and on June 15, 2004 in the United States.[1] The album is mostly influenced by new wave music and post-punk. Hot Fuss produced several commercially and critically successful singles: "Mr. Brightside", "Somebody Told Me", "All These Things That I've Done" and "Smile Like You Mean It".`,
    price       : 15.29
  }),
  new Product({
    imagePath   : 'https://images-na.ssl-images-amazon.com/images/I/81VmSzLOUqL._SL1500_.jpg',
    title       : 'The Lord Of The Rings: The Fellowship Of The Rings-The Complete Recordings',
    artist      : 'Howard Shore',
    description : `The Lord Of The Rings: The Fellowship Of The Ring: The Complete Recordings

    The Lord of the Rings is one of most successful trilogies in film history earning 17 Academy Awards ® including three for its music. Beyond critical acclaim, the music from the films also enjoyed wide commercial success, collectively selling 7 million copies. Directed by Peter Jackson, The Lord of the Rings films are based on the popular J.R.R. Tolkien novel of the same name.

    Rhino is returning to Middle-earth on April 6 with the first soundtrack from the Trilogy, THE FELLOWSHIP OF THE RING: THE COMPLETE RECORDINGS, available on 3-CD disc set plus 1 Blu-ray audio disc containing high-resolution 5.1 and Stereo mixes of the entire score, a reactivation of the 2005 box set featuring the entire score from the extended versions of the film. This includes extensive liner notes from author Doug Adams who analyses many of the themes and motifs used throughout the score.

    The music for all three films was composed, orchestrated and conducted by Howard Shore. The music he wrote for The Fellowship of the Ring was performed by the London Philharmonic Orchestra, with contributions by the New Zealand Symphony Orchestra, the London Voices and the London Oratory School Schola. The soundtrack also highlights two original songs written and performed by Enya: “May It Be” and “Aníron (Theme for Aragorn and Arwen).” The Soundtrack won the Academy Award ® for Best Original Score, as well as the Grammy ® for Best Score Soundtrack Album.`,
    price       : 89.99
  }),
  new Product({
    imagePath   : 'https://images-na.ssl-images-amazon.com/images/I/81LyX9v9ZVL._SL1425_.jpg',
    title       : 'Jagged Little Pill',
    artist      : 'Alanis Morissette',
    description : `You could argue that Jagged Little Pill is the commercialised face of grunge. You could argue that Morrisette is just a cynical businesswoman, courting controversy with a few carefully placed, risqué references. You could even argue that this whole angst-rock is just a comfort-blanket for the therapy-generation. But it's still hard to argue that Jagged Little Pill isn't a great album. After all, it's the perfect alternative/mainstream crossover. There's "You Oughta Know", which marries its vitriolic, explicit narrative to thunderous, airbrushed grunge. With references to oral sex, Middle America were shocked, but not quite offended: it sold by the truckload. There's "Ironic", where Morrisette laments the trials that face every housewife ("there's ten thousand spoons / when all you need is a knife") to a scream-along, mosh-friendly chorus. The simple truth is, on Jagged Little Pill, the Canadian-born Alanis Morrisette does a very good job of being America's Everywoman. --Louis Pattison --This text refers to the Audio CD edition.`,
    price       : 14.99
  })
];

// CREATE USERS
var users =[
  new User({
    username    : 'admin@admin.com',
    password    : 'admin',
    fullname    : 'Cuneyt Celebican',
    admin       : true
  }),
  new User({
    username    : 'trevor@gmail.com',
    password    : 'password',
    fullname    : 'Trevor Johns',
    admin       : false,
  }),
  new User({
    username    : 'michael@gmail.com',
    password    : 'password',
    fullname    : 'Michael Kazman',
    admin       : false,
  })
];

// COUNTERS
var numProducts = 0;
var numUsers = 0;
// GO THROUGH USERS/PRODUCTS
while(numProducts < products.length || numUsers < users.length) {
  // ADD PRODUCTS
  if(numProducts < products.length) {
    products[numProducts].save(function(err, result) {
      if(err) {
        console.log("Error adding product!");
        throw err;
      }
    });
    console.log("Product added!");
    numProducts++;
  }
  if(numUsers < users.length) {
    // ADD USERS
    User.createUser(users[numUsers], function(err, user) {
      if(err) {
        console.log("Error adding user!");
        throw err;
      }
    });
    console.log("User added!");
    numUsers++;
  }
  // ALL OBJECTS ADDED
  if(numUsers === users.length && numProducts === products.length)
  console.log("All users & products added!");
}
