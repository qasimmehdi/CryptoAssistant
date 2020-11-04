/* eslint-disable quotes */
import SQLite from 'react-native-sqlite-storage';
import * as queries from './queries';

export function dbSetup() {
  SQLite.openDatabase({name: 'CryptoAssistant'}).then(DB => {
    DB.executeSql(queries.createTables)
      .then(res => console.log('setup', res))
      .catch(err => console.log('setup', err));
  });
}

export function getTables() {
  SQLite.openDatabase({name: 'CryptoAssistant'}).then(DB => {
    DB.executeSql(`SELECT * FROM Transactions;`)
      .then(resp => {
        var len = resp[0].rows.length;
        for (let i = 0; i < len; i++) {
          let row = resp[0].rows.item(i);
          console.log(row);
        }
      })
      .catch(err => console.log(err));
  });
}

export function saveTransaction(
  exchange,
  base,
  quote,
  price,
  type,
  quantity,
  fee,
  date,
  time,
  notes,
) {
  SQLite.openDatabase({name: 'CryptoAssistant'}).then(DB => {
    const data = `('${exchange}', '${base}', '${quote}', '${price}', '${type}', '${quantity}', '${fee}', '${date}', '${time}', '${notes}')`;
    DB.executeSql(queries.saveTransaction + data)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  });
}
