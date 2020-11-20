/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
import ccxt from 'ccxt';
import {pairs} from './pairs';

export default class CCXT {
  constructor() {
    this.tradeexchange = null;
  }

  batchExchanges(symbols) {
    let proms = [];
    for (let symbol of symbols) {
      proms.push(
        new Promise(async (resolve, reject) => {
          let exchange = null;
          let resolved = false;
          let all = pairs.filter(
            x => x.symbols.findIndex(x => x === symbol) > -1,
          );
          if (all.length < 1) {
            resolve({[symbol.replace('/', '-')]: 'not found'});
          }
          for (let i of all) {
            if (!resolved) {
              console.log(i.exchange, symbol);
              exchange = new ccxt[i.exchange]({enableRateLimit: true});
              try {
                let resp = await exchange.fetchTicker(symbol.toUpperCase());
                if (resp && resp.last) {
                  resolve({
                    [symbol.replace('/', '-')]: {
                      last: resp.last ? resp.last : '',
                      change: resp.change ? resp.change : '',
                      perChange: resp.percentage ? resp.percentage : '',
                      //other: resp,
                    },
                  });
                  resolved = true;
                } else {
                  if (i === all[all.length - 1]) {
                    resolve({
                      [symbol.replace('/', '-')]: 'not found',
                    });
                  }
                }
              } catch (e) {}
            }
          }
        }),
      );
    }

    return Promise.all(proms);
  }

  Candles(symbol, hr) {
    let date = new Date();
    let interval = '';
    if (hr === '1y') {
      date.setFullYear(date.getFullYear() - 1);
      interval = '1w';
    } else if (hr === '1h') {
      date.setHours(date.getHours() - 1);
      interval = '1m';
    } else if (hr === '12h') {
      date.setHours(date.getHours() - 12);
      interval = '1m';
    } else if (hr === '1w') {
      date.setDate(date.getDate() - 7);
      interval = '1h';
    } else if (hr === '1d') {
      date.setDate(date.getDate() - 1);
      interval = '15m';
    } else if (hr === '1m') {
      date.setMonth(date.getMonth() - 1);
      interval = '1d';
    } else if (hr === 'all') {
      interval = '1M';
      date = '';
    }
    return new Promise(async (resolve, reject) => {
      let all = pairs.filter(x => x.symbols.findIndex(y => y === symbol) > -1);

      try {
        let exchange = new ccxt['kraken']({enableRateLimit: true});
        console.log('timeframes', exchange.timeframes);
        if (exchange.has.fetchOHLCV) {
          let res = await exchange.fetchOHLCV(symbol, interval, date);
          if (res.length > 0) {
            resolve(res);
          } // milliseconds
        }
      } catch (e) {}
    });
  }

  coinDetails(symbols) {
    return new Promise((resolve, reject) => {
      console.log(symbols);
      this.batchExchanges(symbols).then(resp => {
        if (resp.length < 1) {
          reject('no data found');
        } else {
          let response = {};
          resp.forEach(x => {
            Object.assign(response, x);
          });
          resolve(response);
        }
      });
    });
  }

  addExchange(name, publickey, secretkey) {
    this.tradeexchange = ccxt[name];
    this.tradeexchange.apiKey = publickey;
    this.tradeexchange.secret = secretkey;
  }
}
