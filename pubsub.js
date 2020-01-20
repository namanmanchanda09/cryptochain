const redis = require('redis');

class PubSub{
    constructor(){
        this.pusblisher = redis.createClient();
        this.subscriber = redis.createClient();
    }
}





