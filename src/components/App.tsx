import React, { useState,useEffect } from 'react';
import { Box } from '@material-ui/core';

import StockInfo from './StockInfo'
import LoginModal from './LoginModal'

function App(){
    

    return (
        <Box>
            <LoginModal />
            <StockInfo/>
        </Box>
    )
}

export default App;