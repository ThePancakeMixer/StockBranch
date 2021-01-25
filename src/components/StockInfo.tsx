import React, { useState,useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField,Container,Button } from '@material-ui/core';
import API from '../DAL/StockAPI'



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

function StockInfo(): JSX.Element{

    const styles = useStyles();
    const [currentPriceStr, setCurrentPriceStr] = useState(0);

    const tickerInputRef = useRef<HTMLInputElement>(null);

    const LookUpStock = async function(){
        if(!tickerInputRef.current){
            console.log('No stock input');
            return;
        }
        let result = await API.GetCurrentPrice(tickerInputRef.current.value);
        setCurrentPriceStr(result)    
    }

    return (
        <Container className={styles.StockInfo}>
            <Container className={styles.SearchBar}>
                <TextField inputRef={tickerInputRef} label="Stock Ticker" variant="outlined"/>
                <Button variant="contained" color="primary" onClick={LookUpStock}>Search</Button>
            </Container>
            <Container className={styles.CurrentPrice}>
                Current Price : {currentPriceStr}
            </Container>
        </Container>

    )
}

export default StockInfo;
