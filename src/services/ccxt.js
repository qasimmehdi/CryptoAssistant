import ccxt from 'ccxt';

export default class CCXT {
    constructor(symbol,exchange){
        this.exchange = new ccxt[exchange]({ enableRateLimit:true });
        this.symbol = symbol;
    }

    run(){
        return new Promise((resolve,reject) => {
            this.exchange.fetchTicker(this.symbol)
            .then(resp => resolve(
                {
                    last: resp.last,
                    change: resp.change,
                    other:resp
                }
            ))
            .catch(err => reject(err))
        })
    }

    batchExchanges(exchanges){
            return new Promise((resolve,reject) => {
                for(let i of exchanges){
                this.exchange = new ccxt[i]({ enableRateLimit:true });
                this.exchange.fetchTicker(this.symbol)
                .then(resp =>
                    resolve(
                    {
                        last: resp.last,
                        change: resp.change,
                        other:resp
                    }
                 ))
                 .catch(err => {
                     if(i === exchanges[exchanges.length - 1]){
                         reject(err);
                     }
                 })
                }
            })
    }
}

/* const obj = new CCXT('BTC/USD','kraken');
obj.run()
.then(data => console.log(data))
.catch(err => console.log('yaha error aya'))

obj.batchExchanges(["binance","kraken"])
.then(data => console.log(data))
.catch(err => console.log(err)) */