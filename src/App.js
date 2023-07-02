import React from "react";
import { RouterProvider } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import { router } from './routerConfig';
import FormProvider from './components/FormProvider';
import AlertProvider from "./components/AlertProvider";

const App = () => {  
  return (
      <>
        <CssBaseline />
        <AlertProvider>
          <FormProvider >
            <RouterProvider router={router} />
          </FormProvider>
        </AlertProvider>
      </>
      
  )
}

export default App;
