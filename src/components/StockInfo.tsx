import React, { useState,useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box,TextField,Container,Button,Table,TableBody,TableRow,TableCell } from '@material-ui/core';
import API from '../DAL/StockAPI'



const useStyles = makeStyles({
    SearchBarStyle : {
        display : "flex",
        justifyContent:"center"
    },
    ContainerStyle : {
    },
    StockTableStyle : {
        justifyContent:"center"
    }
});

function StockInfo(): JSX.Element{

    const styles = useStyles();

    const tickerInputRef = useRef<HTMLInputElement>(null);
    const [stockPrices,setStockPrices] = useState<PriceList>(
        {
            "Current Price" : 0,
            "Low Price" : 0,
            "High Price" : 0
        }
    );

    type PriceList = Record<string,number>; 

    async function LookUpStock(){
        if(!tickerInputRef.current){
            console.log('No stock input');
            return;
        }
        let result = await API.GetCurrentPrice(tickerInputRef.current.value);
        setStockPrices(
            {
                "Current Price" : result.c,
                "Today's Low Price" : result.l,
                "Today's High Price" : result.h    
            }
        )
    }

    function buildPriceTable(args:PriceList):JSX.Element{
        var rows = [];
        for(var key in args){
            rows.push(
                <TableRow>
                    <TableCell>{key}</TableCell>
                    <TableCell>{args[key]}</TableCell>
                </TableRow>
            )
        }   
        return <Table><TableBody>{rows}</TableBody></Table>

    }


    return (
        <Box className={styles.ContainerStyle}>
            <Container className={styles.SearchBarStyle}>
                <TextField fullWidth={true} inputRef={tickerInputRef} label="Stock Ticker" variant="outlined"/>
                <Button variant="contained" color="primary" onClick={LookUpStock}>Search</Button>
            </Container>
            <Container className={styles.StockTableStyle}>
                {buildPriceTable(stockPrices)}
            </Container>
        </Box>

    )
}

export default StockInfo;
