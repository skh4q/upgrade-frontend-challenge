import React, { createContext} from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const FormContext = createContext();

const validationSchema = yup.object({
    name: yup.string()
      .min(2, 'Too Short')
      .max(50, 'Too Long')
      .required('Required'),
    email: yup.string().email('Invalid email').required('Required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    })

const FormProvider = ({ children }) => {

    const formik = useFormik({
     initialValues: {
       name: '',
       email: '',
       password: '',
       color: undefined,
       terms: false
     },
     validationSchema,
     validateOnBlur: true,
   });

    return (
        <FormContext.Provider value={formik}>
          {children}
        </FormContext.Provider>
    )

}

export { FormContext };
export default FormProvider;