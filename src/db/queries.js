export const createTables = `CREATE TABLE IF NOT EXISTS "Transactions" (
	"id"	INTEGER NOT NULL,
	"exchange"	TEXT,
	"base"	TEXT,
	"quote"	TEXT,
	"price"	TEXT,
	"type"	TEXT,
	"quantity"	TEXT,
	"fee"	TEXT,
	"date"	TEXT,
	"time"	TEXT,
	"notes"	TEXT,
	PRIMARY KEY("id" AUTOINCREMENT)
);`;

export const saveTransaction =
  'INSERT INTO Transactions (exchange, base, quote, price, type, quantity, fee, date, time, notes) VALUES ';
