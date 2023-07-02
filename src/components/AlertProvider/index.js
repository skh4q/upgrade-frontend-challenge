import React, { createContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const AlertContext = createContext();

const AlertProvider = ({children}) => {

    const [isOpened, setIsOpened] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const triggerAlert = (msg) => {
        setErrorMessage(msg);
        setIsOpened(true);
    }

    return (
        <AlertContext.Provider value={{
            triggerAlert
        }}>
            <Snackbar open={isOpened} autoHideDuration={6000} onClose={() => setIsOpened(false)}>
                <Alert severity="error" onClose={() => setIsOpened(false)}>{errorMessage}</Alert>
            </Snackbar>     
            {children}    
        </AlertContext.Provider>
    )
}

export { AlertContext };
export default AlertProvider;