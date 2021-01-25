import axios from 'axios';


const Constants = {
    API_URL:'https://finnhub.io/api/v1/',
    API_KEY:'c05q53f48v6uiu31f6p0',
    ENDPOINT_QUOTE:'quote',
}

interface StockInfo {
    c : number, //current
    h : number, //high 24h
    l : number, //low 24h 
    o : number,
    pc : number,
    t : number
}

class API {
    async GetCurrentPrice(tickerStr:string): Promise<StockInfo>{
        let result = await axios.get(Constants.API_URL + Constants.ENDPOINT_QUOTE + '?symbol=' + tickerStr + "&token=" + Constants.API_KEY);
        if(!result.data){
            console.log('Unable to retrieve ticker information');
        }
        return result.data; 
    }
}

export default new API();



