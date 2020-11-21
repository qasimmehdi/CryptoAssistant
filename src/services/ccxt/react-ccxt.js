/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
import ccxt from 'ccxt';
import {pairs} from './pairs';
import {saveTransaction} from '../../db/methods';

export default class CCXT {
  constructor() {
    this.certifiedEx = [
      {imp: new ccxt.binance(), name: 'Binance'},
      {imp: new ccxt.bitfinex(), name: 'Bitfinex'},
      {imp: new ccxt.bittrex(), name: 'Bittrex'},
      {imp: new ccxt.bitvavo(), name: 'Bitvavo'},
      {imp: new ccxt.bytetrade(), name: 'ByteTrade'},
      {imp: new ccxt.currencycom(), name: 'Currency.com'},
      {imp: new ccxt.eterbase(), name: 'Eterbase'},
      {imp: new ccxt.ftx(), name: 'FTX'},
      {imp: new ccxt.idex(), name: 'IDEX'},
      {imp: new ccxt.kraken(), name: 'Kraken'},
      {imp: new ccxt.upbit(), name: 'Upbit'},
      {imp: new ccxt.wavesexchange(), name: 'Waves.Exchange'},
      {imp: new ccxt.xena(), name: 'Xena Exchange'},
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
        .fetchBalance()
        .then(x => {
          this.saveTransactionstodb(name);
          resolve(x);
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
}
