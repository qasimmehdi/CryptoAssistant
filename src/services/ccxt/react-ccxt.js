/* eslint-disable handle-callback-err */
/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
import ccxt from 'ccxt';
import {pairs} from './pairs';
import {
  saveTransaction,
  saveExchange,
  getExchange,
  getAllExchanges,
} from '../../db/methods';

export default class CCXT {
  constructor() {
    this.certifiedEx = [
      {imp: new ccxt.binance({enableRateLimit: true}), name: 'Binance'},
      {imp: new ccxt.bitfinex({enableRateLimit: true}), name: 'Bitfinex'},
      {imp: new ccxt.bittrex({enableRateLimit: true}), name: 'Bittrex'},
      {imp: new ccxt.bitvavo({enableRateLimit: true}), name: 'Bitvavo'},
      {imp: new ccxt.bytetrade({enableRateLimit: true}), name: 'ByteTrade'},
      {
        imp: new ccxt.currencycom({enableRateLimit: true}),
        name: 'Currency.com',
      },
      {imp: new ccxt.eterbase({enableRateLimit: true}), name: 'Eterbase'},
      {imp: new ccxt.ftx({enableRateLimit: true}), name: 'FTX'},
      {imp: new ccxt.idex({enableRateLimit: true}), name: 'IDEX'},
      {imp: new ccxt.kraken({enableRateLimit: true}), name: 'Kraken'},
      {imp: new ccxt.upbit({enableRateLimit: true}), name: 'Upbit'},
      {
        imp: new ccxt.wavesexchange({enableRateLimit: true}),
        name: 'Waves.Exchange',
      },
      {imp: new ccxt.xena({enableRateLimit: true}), name: 'Xena Exchange'},
    ];
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

  getAllExchangeAndLogo() {
    return this.certifiedEx.map(x => ({name: x.name, logo: x.imp.urls.logo}));
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
    const index = this.certifiedEx.findIndex(x => x.name === name);
    this.certifiedEx[index].imp.apiKey = publickey;
    this.certifiedEx[index].imp.secret = secretkey;
    return new Promise((resolve, reject) => {
      this.certifiedEx[index].imp
        .fetchBalance({recvWindow: 59000})
        .then(balance => {
          saveExchange(name, publickey, secretkey);
          this.getTradeData(name)
            .then(tradedata => {
              tradedata.forEach(resp => {
                resp.forEach(x => {
                  saveTransaction(
                    name,
                    x?.symbol?.split('/')[0],
                    x?.symbol?.split('/')[1],
                    x?.price,
                    x?.side,
                    x?.amount,
                    x?.fee?.cost ?? '',
                    x?.timestamp,
                    x?.timestamp,
                    'N/A',
                  );
                });
                resolve(balance);
              });
            })
            .catch(err => {
              console.log(err);
              reject(err);
            });
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    });
  }

  saveTransactionstodb(exname) {
    const exchange = this.certifiedEx.find(x => x.name === exname).imp;
    return new Promise((resolve, reject) => {
      if (exchange && exchange.checkRequiredCredentials()) {
        if (exchange.hasFetchTransactions) {
          exchange
            .fetchTransactions()
            .then(data => {
              console.log(data);
              data.forEach(x => {
                saveTransaction(
                  exname,
                  x?.currency,
                  '',
                  x?.amount,
                  x?.type,
                  '',
                  x?.fee?.cost,
                  x?.datetime,
                  x?.timestamp,
                  x?.comment,
                );
              });

              resolve('Data saved');
            })
            .catch(err => {
              reject(err);
            });
        } else if (exchange.hasFetchWithdrawals && exchange.hasFetchDeposits) {
          exchange
            .fetchDeposits()
            .then(deposits => {
              deposits.forEach(x => {
                saveTransaction(
                  exname,
                  x?.currency,
                  '',
                  x?.amount,
                  x?.type,
                  '',
                  x?.fee?.cost,
                  x?.datetime,
                  x?.timestamp,
                  x?.comment,
                );
              });

              resolve('Data saved');
            })
            .catch(err => {
              reject(err);
            });
          exchange
            .fetchWithdrawals()
            .then(withdrawal => {
              withdrawal.forEach(x => {
                saveTransaction(
                  exname,
                  x?.currency,
                  '',
                  x?.amount,
                  x?.type,
                  '',
                  x?.fee?.cost,
                  x?.datetime,
                  x?.timestamp,
                  x?.comment,
                );
              });

              resolve('Data saved');
            })
            .catch(err => {
              reject(err);
            });
        } else {
          reject('exchange not supported');
        }
      } else {
        reject('Api key not found');
      }
    });
  }

  getTradeData(exname) {
    const exchange = this.certifiedEx.find(x => x.name === exname).imp;
    const symbols = pairs.find(x => x.exchange === exname.toLowerCase())
      .symbols;
    const promises = [];
    symbols.forEach(x => {
      if (exchange.hasFetchMyTrades) {
        promises.push(
          new Promise((resolve, reject) => {
            exchange
              .fetchMyTrades(x, undefined, undefined, {recvWindow: 59000})
              .then(resp => {
                resolve(resp);
              })
              .catch(err => {
                resolve([]);
              });
          }),
        );
      }
    });

    return Promise.all(promises);
  }

  async createOrder(exname, symbol, side, amount, price) {
    const exchange = this.certifiedEx.find(x => x.name === exname).imp;
    const resp = await getExchange(exname);

    if (resp.length > 0) {
      exchange.apiKey = resp[0].rows.item(0).public;
      exchange.secret = resp[0].rows.item(0).secret;
      console.log(exchange.apiKey, exchange.secret);
    }

    let type = 'market';
    if (!exchange.hasCreateMarketOrder) {
      type = 'limit';
    }
    return new Promise((resolve, reject) => {
      if (exchange && exchange.checkRequiredCredentials()) {
        if (exchange.hasCreateOrder) {
          exchange
            .createOrder(
              symbol.toUpperCase(),
              type,
              side.toLowerCase(),
              amount,
              price,
            )
            .then(x => {
              resolve(`${side.toUpperCase()} Order successfully placed`);
            })
            .catch(err => {
              console.log(err.message);
              reject(err?.message ? err.message : 'Something Went Wrong');
            });
        } else {
          reject('Exchange Not Supported');
        }
      } else {
        reject('No Api Keys Founded');
      }
    });
  }

  async fetchBalances() {
    let responses = [];
    const resp = await getAllExchanges();
    let tempArray = [];
    const len = resp.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < resp[i].rows.length; j++) {
        let item = resp[i].rows.item(j);
        console.log(item);
        tempArray.push(item);
      }
    }
    console.log(tempArray);
    console.log('Exchnages added', tempArray);

    for (let ex of tempArray) {
      const Exchange = this.certifiedEx.find(
        x => x.name.toLowerCase() === ex.exchange.toLowerCase(),
      ).imp;
      Exchange.apiKey = ex.public;
      Exchange.secret = ex.secret;
      if (Exchange.hasFetchBalance) {
        responses.push(Exchange.fetchBalance());
      }
    }
    return Promise.all(responses);
  }

  async fetchBalancesByExchange(exname) {
    const exchange = this.certifiedEx.find(x => x.name === exname).imp;
    const resp = await getExchange(exname);

    if (resp.length > 0) {
      exchange.apiKey = resp[0].rows.item(0).public;
      exchange.secret = resp[0].rows.item(0).secret;
      console.log(exchange.apiKey, exchange.secret);
      if (exchange.hasFetchBalance) {
        const balance = await exchange.fetchBalance();
        //return balance;
        return 10; //for now not sure about reponse model
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  async getExchangeObj(exname) {
    console.log('getExchangeObj', exname);
    const exchange = this.certifiedEx.find(x => x.name === exname).imp;
    const resp = await getExchange(exname);

    if (resp.length > 0) {
      exchange.apiKey = resp[0].rows.item(0).public;
      exchange.secret = resp[0].rows.item(0).secret;
      console.log(exchange.apiKey, exchange.secret);
      return exchange;
    } else {
      return undefined;
    }
  }
}
