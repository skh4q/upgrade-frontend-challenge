import { createBrowserRouter } from "react-router-dom";
  
import SignUp from './components/SignUp';
import MoreInfo from './components/MoreInfo';
import Confirmation from './components/Confirmation';
import Result from './components/Result';

// Enum
const PATH = {
    SIGN_UP: 'sign-up',
    MORE_INFO: 'more-info',
    CONFIRMATION: 'confirmation',
    SUCCESS: 'success',
    ERROR: 'error'
};

// Path Component map
const router = createBrowserRouter([
    {
      path: "/",
      element: <SignUp />,
    },
    {
      path: `/${PATH.SIGN_UP}`,
      element: <SignUp />,
    },
    {
      path: `/${PATH.MORE_INFO}`,
      element: <MoreInfo />,
    },
    {
      path: `/${PATH.CONFIRMATION}`,
      element: <Confirmation />,
    },
    {
      path: `/${PATH.SUCCESS}`,
      element: <Result status='success' />,
    },
    {
      path: `/${PATH.ERROR}`,
      element: <Result status='error' />,
    },
  ]);
  
  // Navigation map
  const navigationPathMap = {
    '': {
      next: `/${PATH.MORE_INFO}`
    },
    [PATH.SIGN_UP]: {
      next: `/${PATH.MORE_INFO}`
    },
    [PATH.MORE_INFO]: {
      back: `/${PATH.SIGN_UP}`,
      next: `/${PATH.CONFIRMATION}`,
    },
    [PATH.CONFIRMATION]: {
      back: `/${PATH.MORE_INFO}`,
      success: `/${PATH.SUCCESS}`,
      error: `/${PATH.ERROR}`
    },
    [PATH.SUCCESS]: {
      next: `/${PATH.SIGN_UP}`
    },
    [PATH.ERROR]: {
      back: `/${PATH.CONFIRMATION}`
    }
  
  }

  export { router, navigationPathMap };