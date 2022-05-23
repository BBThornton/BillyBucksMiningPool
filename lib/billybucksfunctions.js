const api = require('./api')

const Threshold = 10;

function getShareDiff(){
    /**
     * BillyBucks: 
     * This set of functionallity sets the share difficulty according to the hardware inequality balancing mining pools
     * Shared difficulty equation
     * NewDiff = NetworkDiff/Threshold*numMiners 
     */
    const stats = api.getStats();
    const networkDifficulty = stats.network.difficulty;
    let num_miners = stats.pool.miners;
    // This should only be called if there are miners in the system but due to async miner information collection its possible that the miner hasnt been counted yet
    if(num_miners == 0){
        num_miners = 1
    }
    return networkDifficulty/((num_miners)*Threshold*2);
}

function setLowestHashrateMiner(coin){
    /**
     * BillyBucks: 
     * Set the lowset hashrate miner based on an estimate of the miners hashrates
     */
    
    const hr = api.getHashRate();
    console.log("HRates");
    console.log(hr);

    redisClient.hget(`${coin}:hashrateMiners`, "lowest", function (err, result) {
        if (err) {
            console.log('error');
            
        }else{
            console.log("LOWEST: %s", result);
            var [lowestItems] = Object.entries(hr["minersHashrate"]).sort(([ ,v1], [ ,v2]) => v1 - v2);

           
            redisClient.hset(`${coin}:hashrateMiners`, "lowest", lowestItems[0], function (error, value) {
                if (error) {
                    console.log("Error updating hashrate");
                    return;
                }
    
                console.log("Updated Lowest hashrate miner");
            });
            
            return lowestItems[0];

        }
    });

    
}

function getLowestHashrateMiner(coin){
    console.log("GET LOWEST: %s", coin)
    redisClient.hget(`${coin}:hashrateMiners`, "lowest", function (err, result) {
        if (err) {
            console.log('error');
            
        }else{
            console.log("LOWEST: %s", result);
            if(result == null){
                return setLowestHashrateMiner(coin);
            }
            return result;

        }
    });
}



function getNumMiners(){
    /**
     * BillyBucks: 
     * Get the current number of miners, 
     * Due to a delay in data collection miners may not show up if this function is called to soon after miner login
     */
}




module.exports = {getShareDiff,setLowestHashrateMiner,getLowestHashrateMiner, Threshold};
