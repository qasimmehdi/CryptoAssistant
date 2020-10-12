import axios from 'axios';


const getData = (pair) => {
    const data = {
        symbol: pair,
        exchange: "KRAKEN",
        type: "single"
    }
    return new Promise((resolve, reject) => {
        axios.post('https://mighty-peak-85653.herokuapp.com/ccxt', data)
            .then((response) => {
                console.log(response);
                resolve(response);
            }).catch(err => reject(err))
    })
}

export default getData;