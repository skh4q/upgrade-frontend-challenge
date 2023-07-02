import React, { useContext} from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import { navigationPathMap } from '../../routerConfig';
import { FormContext } from '../FormProvider';
import { PageContainer, GroupContainer, ActionContainer } from '../Layout';

const SignUp = () => {    
    const formik = useContext(FormContext);
    const location = useLocation();
    const currentPath = location.pathname ? location.pathname.substring(1) : '';

    const shouldDisableNext = formik.touched.name && Boolean(formik.errors.name)
        || formik.touched.email && Boolean(formik.errors.email)
        || formik.touched.password && Boolean(formik.errors.password)
        || !formik.values.name 
        || !formik.values.email 
        || !formik.values.password 

    return (
        <PageContainer>
            <GroupContainer>        
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Sign Up</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="nameInput"
                            label="First Name"
                            placeholder='First Name'
                            name='name'
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}

                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="emailInput"
                            label="Email"
                            placeholder='Email'
                            name='email'
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="passwordInput"
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            fullWidth
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            />
                    </Grid>
                    <Grid item xs={12} justifyContent='flex-end'>
                        <ActionContainer>
                            <Link to={shouldDisableNext ? undefined : navigationPathMap[currentPath].next}>
                                <Button variant="contained" disabled={shouldDisableNext}>Next</Button>
                            </Link>
                        </ActionContainer>
                    </Grid>
                </Grid>
            </GroupContainer>
        </PageContainer>
    )
}

export default SignUp;