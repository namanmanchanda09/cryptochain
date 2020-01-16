const Blockchain = require('./blockchain')
const Block = require('./block')

describe('Blockahin', () => {
    let blockchain, newChain, originalChain;
    beforeEach(()=>{
        blockchain = new Blockchain();
        newChain = new Blockchain();
        originalChain = blockchain.chain;
    });

    it('contains a `chain` Array instance',()=>{
        expect(blockchain.chain instanceof Array).toBe(true);
    });
    it('starts with the genesis block',()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });
    it('adds new block to the chain',()=>{
        const newData = 'foo bar';
        blockchain.addBlock({data:newData});
        expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
    })

    describe('isValidChain()',()=>{
        describe('when the chain doesnt start with the genesis block',()=>{
            it('returns false',()=>{
                blockchain.chain[0] = {data:'fake-data'};
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            })
        });

        describe('when the chain starts with the genesis block and has multiple blocks', () => {
            beforeEach(()=>{
                blockchain.addBlock({data:'beatles'});
                blockchain.addBlock({data:'bears'});
                blockchain.addBlock({data:'BattleStar Galactica'});

            })
            describe('and a lastHash reference has changed', () => {
                it('returns false',()=>{

                    blockchain.chain[2].lastHash = 'broken-lastHash';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe('and the chain contains a block with an invalid field', () => {
                it('returns false',()=>{
                 
                    blockchain.chain[2].data = 'some bad and evil data';
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                })
            });

            describe('and the chain doesnt contain any invalid block', () => {
                it('returns true',()=>{
                   

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
                })
            })
            
            
            
        });
        
    })

    describe('replaceChain()', () => {
        describe('when the chain is not longer', () => {
            it('does not replace the chain',()=>{
                newChain.chain[0] = {new:'chain'}
                blockchain.replaceChain(newChain.chain);
                expect(blockchain.chain).toEqual(originalChain);
            });
        })

        describe('when the new chain is longer', () => {
            beforeEach(()=>{
                newChain.addBlock({data:'beatles'});
                newChain.addBlock({data:'bears'});
                newChain.addBlock({data:'BattleStar Galactica'});

            })
            describe('and the chain is invalid', () => {
                it('does not replace the chain',()=>{
                    newChain.chain[2].hash = 'fake-hash';
                    blockchain.replaceChain(newChain.chain);
                    expect(blockchain.chain).toEqual(originalChain);
                })
            })
            describe('and the chain is valid', () => {
                it('does replace the chain',()=>{
                    blockchain.replaceChain(newChain.chain);
                    expect(blockchain.chain).toEqual(originalChain);

                })
            })
            
            
            
        })
        
        
        
    })
    
    


})


