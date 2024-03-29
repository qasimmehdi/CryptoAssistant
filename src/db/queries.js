export const createTransactionsTables = `CREATE TABLE IF NOT EXISTS "Transactions" (
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
);
`;

export const createFavouritesTable = `
CREATE TABLE IF NOT EXISTS "Favourites" (
	"id"	INTEGER,
	"exchange"	TEXT,
	"base"	TEXT,
	"quote"	TEXT,
	"balance"	TEXT,
	"notification"	TEXT,
	PRIMARY KEY("Id" AUTOINCREMENT)
);
`;

export const createExchangesTable = `
CREATE TABLE IF NOT EXISTS "Exchanges" (
	"id"	INTEGER,
	"exchange"	TEXT,
	"public" TEXT,
	"secret" TEXT,
	PRIMARY KEY("Id" AUTOINCREMENT)
);
`;

export const populateFavouritesTable = `
INSERT INTO Favourites (exchange, base, quote, balance, notification)
SELECT 'Binance', 'BTC', 'USD', '0', '0'
WHERE NOT EXISTS (SELECT * FROM Favourites);
`;

export const saveTransaction =
  "INSERT INTO Transactions (exchange, base, quote, price, type, quantity, fee, date, time, notes) VALUES ";

export const saveFavourites =
  "INSERT INTO Favourites (exchange, base, quote, balance, notification) VALUES ";

export const saveExchange =
  "INSERT INTO Exchanges (exchange, public, secret) VALUES ";

export const getFavourites = "SELECT * FROM Favourites";

export const getExchange = "SELECT * FROM Exchanges";

export const getAllTransaction = "SELECT * FROM Transactions where base = '[base]' order by date desc";

export const updateNotification = (value, base, quote) =>
  `UPDATE Favourites SET notification = '${value}' WHERE base = '${base}' AND quote = '${quote}';`;
