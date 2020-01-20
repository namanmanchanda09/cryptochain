const redis = require('redis');

const CHANNELS = {
    TEST:'TEST'
};


class PubSub{
    constructor(){
        this.pusblisher = redis.createClient();
        this.subscriber = redis.createClient();
        this.subscriber.subscribe(CHANNELS.TEST);
        this.subscriber.on('message',(channel,message)=>this.handleMessage(channel,message))
    }
    handleMessage(channel,message){
        console.log(`Message received. Channel ${channel}. Message:${message}.`);
    }
}

const testPubSub = new PubSub();
setTimeout(()=>testPubSub.pusblisher.publish(CHANNELS.TEST,'foo'),1000);











