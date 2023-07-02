import React, { useContext, useState } from 'react';
import { 
    Button, 
    CircularProgress, 
    Grid,
    Typography } from '@mui/material';

import { AlertContext } from '../AlertProvider';
import { FormContext } from '../FormProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { navigationPathMap } from '../../routerConfig';
import { PageContainer, GroupContainer, ActionContainer, Spacer } from '../Layout';
import postSubmit from '../../actions/postSubmit';


const Confirmation = () => {
    const { triggerAlert } = useContext(AlertContext);
    const formik = useContext(FormContext);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname ? location.pathname.substring(1) : '';
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await postSubmit(formik.values);
            if(response.status === 'success') {
                navigate(navigationPathMap[currentPath].success);
            } else {
                navigate(navigationPathMap[currentPath].error, { state: { reason: response.error}});
            }
        } catch(e) {
            triggerAlert('Network error while submitting. Please try again.')
        }
        setIsSubmitting(false);
    }

    return (
        <PageContainer>
            <GroupContainer>    
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Confirmation</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">First Name : {formik.values.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">Email : {formik.values.email}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">Password : *******</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">Favorite Color : {formik.values.color}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">Terms and Conditions : {formik.values.terms ? 'Agreed' : 'Not Aggreed'}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1"></Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ActionContainer>
                            <Link to={isSubmitting ? undefined : navigationPathMap[currentPath].back}>
                                <Button variant="contained" disabled={isSubmitting}>Back</Button>
                            </Link> 
                            <Spacer />
                            <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
                                {isSubmitting ? <CircularProgress size={24} /> : 'Submit'}
                            </Button>
                        </ActionContainer>
                    </Grid>
                </Grid>
            </GroupContainer>
        </PageContainer>
    )
}

export default Confirmation;