/* eslint-disable quotes */
import SQLite from "react-native-sqlite-storage";
import * as queries from "./queries";

export function dbSetup() {
  SQLite.openDatabase({ name: "CryptoAssistant" }).then((DB) => {
    DB.executeSql(queries.createTransactionsTables)
      .then((res) => console.log("setup", res))
      .catch((err) => console.log("setup", err));
    DB.executeSql(queries.createExchangesTable)
      .then((res) => console.log("setup", res))
      .catch((err) => console.log("setup", err));
    DB.executeSql(queries.createFavouritesTable)
      .then((res) => {
        console.log("setup", res);
        DB.executeSql(queries.populateFavouritesTable)
          .then((res2) => console.log("setup", res2))
          .catch((err) => console.log("setup", err));
      })
      .catch((err) => console.log("setup", err));
  });
}

export function getTables() {
  SQLite.openDatabase({ name: "CryptoAssistant" }).then((DB) => {
    DB.executeSql(`SELECT * FROM Transactions;`)
      .then((resp) => {
        var len = resp[0].rows.length;
        for (let i = 0; i < len; i++) {
          let row = resp[0].rows.item(i);
          console.log(row);
        }
      })
      .catch((err) => console.log(err));
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
  notes
) {
  SQLite.openDatabase({ name: "CryptoAssistant" }).then((DB) => {
    const data = `('${exchange}', '${base}', '${quote}', '${price}', '${type}', '${quantity}', '${fee}', '${date}', '${time}', '${notes}')`;
    DB.executeSql(queries.saveTransaction + data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });
}

export function saveFavourites(exchange, base, quote, balance, notification) {
  SQLite.openDatabase({ name: "CryptoAssistant" }).then((DB) => {
    const data = `('${exchange}', '${base}', '${quote}', '${balance}', '${notification}')`;
    DB.executeSql(queries.saveFavourites + data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });
}

export function getFavourites() {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase({ name: "CryptoAssistant" }).then((DB) => {
      DB.executeSql(queries.getFavourites)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  });
}

export function saveExchange(exchange, publickey, secret) {
  SQLite.openDatabase({ name: "CryptoAssistant" }).then((DB) => {
    const data = `('${exchange.toLowerCase()}', '${publickey}', '${secret}')`;
    DB.executeSql(queries.saveExchange + data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  });
}

export function getExchange(exname) {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase({ name: "CryptoAssistant" }).then((DB) => {
      const data = ` where exchange = '${exname.toLowerCase()}'`;
      DB.executeSql(queries.getExchange + data)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  });
}

export function getAllExchanges() {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase({ name: "CryptoAssistant" }).then((DB) => {
      DB.executeSql(queries.getExchange)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  });
}

export function setNotification(value, base, quote) {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase({ name: "CryptoAssistant" }).then((DB) => {
      DB.executeSql(queries.updateNotification(value, base, quote))
        .then((res) => {
          resolve(res);
        })
        .catch((err) => reject(err));
    });
  });
}

export function getAllTransactions(base) {
  return new Promise((resolve, reject) => {
    SQLite.openDatabase({ name: "CryptoAssistant" }).then((DB) => {
      DB.executeSql(`${queries.getAllTransaction.replace('[base]',base)}`)
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  });
}
