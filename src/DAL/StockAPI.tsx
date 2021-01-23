import axios from 'axios';


const Constants = {
    API_URL:'https://finnhub.io/api/v1/',
    API_KEY:'c05q53f48v6uiu31f6p0',
    ENDPOINT_QUOTE:'quote',
}

class API {
    async GetCurrentPrice(tickerStr:string): Promise<number>{
        let result = await axios.get(Constants.API_URL + 'quote?symbol=' + tickerStr + "&token=c05q53f48v6uiu31f6p0");
        if(!result.data){
            console.log('Unable to retrieve ticker information');
        }
        return result.data.c; 
    }
}

export default new API();



