import React, { useContext}  from 'react';
import { 
    Button, 
    Grid,
    Typography, capitalize } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { navigationPathMap } from '../../routerConfig';
import { FormContext } from '../FormProvider';
import { PageContainer, GroupContainer, ActionContainer } from '../Layout';

const Result = ({ status }) => {
    const formik = useContext(FormContext);
    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname ? location.pathname.substring(1) : '';
    const errorReason = location.state?.reason;

    const isError = status === 'error';

    const handleRestart = () => {
        formik.handleReset();
        navigate(navigationPathMap[currentPath].next);
    }

    return (
        <PageContainer>
            <GroupContainer>    
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">{capitalize(status)}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1">
                            {isError ? `Uh oh, something went wrong. Please, try again later. ${errorReason}` : 'You should receive a confirmation email soon.'}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ActionContainer>
                            {isError 
                                ? (
                                    <Link to={navigationPathMap[currentPath].back}>
                                        <Button variant="contained">Back</Button>
                                    </Link>
                                ) : (
                                    <Button variant="contained" onClick={handleRestart}>Restart</Button>
                                ) 
                            }
                        </ActionContainer>
                    </Grid>
                </Grid>
            </GroupContainer>
        </PageContainer>
    )
}

export default Result;