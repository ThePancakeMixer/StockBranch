import {React, useState} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { TextField,Container,Button } from '@material-ui/core';


const API_URL = 'https://finnhub.io/api/v1/';

const useStyles = makeStyles({
    StockInfo : {
        width : '100vw',
    },
    SearchBar : {
        display : "flex",
        justifyContent : 'center'
    },
    CurrentPrice : {
        display : "flex",
        justifyContent : 'center'
    }
});

function StockInfo(){

    const styles = useStyles();
    const [tickerStr, setTickerStr] = useState("")
    const [currentPriceStr, setCurrentPriceStr] = useState(0)

    const HandleTextChange = function(newText,setText){
        setText(newText);
    }

    const LookUpStock = async function(symbol){
        let result = await axios.get(API_URL + 'quote?symbol=' + symbol + "&token=c05q53f48v6uiu31f6p0");
        setCurrentPriceStr(result.data.c);
        console.log(result);
    }

    return (
        <Container className={styles.StockInfo}>
            <Container className={styles.SearchBar}>
                <TextField label="Stock Ticker" variant="outlined" onChange={t=>HandleTextChange(t.target.value,setTickerStr)}/>
                <Button variant="contained" color="primary" onClick={t=>LookUpStock(tickerStr)}>Search</Button>
            </Container>
            <Container className={styles.CurrentPrice}>
                Current Price : {currentPriceStr}
            </Container>
        </Container>

    )
}

export default StockInfo;
