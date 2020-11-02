import SQLite from 'react-native-sqlite-storage';
import {CreateTables} from './queries';

export function DbSetup() {
  SQLite.openDatabase({name: 'CryptoAssistant'}).then(DB => {
    DB.executeSql(CreateTables);
  });
}

export function GetTables() {
  SQLite.openDatabase({name: 'CryptoAssistant'}).then(DB => {
    DB.executeSql(
      `SELECT name FROM sqlite_master
    WHERE type IN ('table','view')
    AND name NOT LIKE 'sqlite_%'
    ORDER BY 1;`,
    )
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
