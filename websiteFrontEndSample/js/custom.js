/* Insert your pool's unique Javascript here */

global.hash = function(text){
    var turtle = require('turtlecoin-crypto').Crypto
    const TurtleCoinCrypto = new turtle()
    TurtleCoinCrypto.chukwa_slow_hash_v2(text)
    

}

module.exports = hash