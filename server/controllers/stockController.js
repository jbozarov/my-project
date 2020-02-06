const stocks = require('../data/symbolList.json')

module.exports = {
    getStocks: (req, res) => {
        res.status(200).send(stocks)
    }
}