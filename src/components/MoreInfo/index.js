import React, { useContext, useEffect, useState } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Autocomplete, 
    CircularProgress, 
    Grid, 
    Checkbox, 
    Link as MuiLink,
    Modal,
    Typography } from '@mui/material';

import { FormContext } from '../FormProvider';
import { AlertContext } from '../AlertProvider';
import { Link, useLocation } from 'react-router-dom';
import { navigationPathMap } from '../../routerConfig';
import { PageContainer, GroupContainer, ActionContainer, Spacer, ModalContainer } from '../Layout';
import getColors from '../../actions/getColors';

const MoreInfo = () => {
    const { triggerAlert } = useContext(AlertContext);
    const formik = useContext(FormContext);
    const location = useLocation();
    const currentPath = location.pathname ? location.pathname.substring(1) : '';
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [hasError, setHasError] = useState(false);

    const shouldDisableNext = !formik.values.terms || !formik.values.color;

    const loadOptions = async () => {
        setIsLoading(true);
        try {
            const options = await getColors();
            setOptions(options);
        } catch(e) {
            setHasError(true);
            triggerAlert('Network error while fetching color options. Please try again.')
        }
        setIsLoading(false);
        
    }

    useEffect(() => {
        loadOptions();
    }, []);

    return (
        <PageContainer>
            <Modal open={isTermsOpen} onClose={() => setIsTermsOpen(false)} >
                <ModalContainer>
                    <Typography variant="h6">
                        Terms and Condition
                    </Typography>
                    <Typography variant="body1">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum eu ligula sit amet feugiat. Donec in scelerisque ante. Vivamus porttitor nec orci quis fringilla. Donec ac nisl facilisis, interdum justo at, eleifend ligula. Nulla quam orci, tincidunt vel vulputate vel, lobortis quis nibh. Pellentesque cursus commodo cursus. Phasellus varius, nibh ut porta porta, enim magna ornare sem, vel accumsan libero ligula et tellus. Nunc fermentum luctus hendrerit. Suspendisse ullamcorper gravida sapien, luctus laoreet turpis facilisis in.
                    </Typography>
                </ModalContainer>
            </Modal>
            <GroupContainer>    
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Additional Information</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            loading
                            id="colorInput"
                            name='color'
                            fullWidth
                            options={options}
                            value={formik.values.color}
                            renderInput={(params) => <TextField {...params} label={isLoading ? <CircularProgress size={24} /> : "favorite color"} error={hasError} />}
                            onChange={(e, option) => formik.setFieldValue('color', option)}
                            />     
                    </Grid>
                    <Grid item xs={12}>
                        <Box display='flex' alignItems='center' >
                            <Checkbox name='terms' checked={formik.values.terms} onChange={(e, value) => formik.setFieldValue('terms', value)} />
                            <Box>I agree to <MuiLink onClick={() => setIsTermsOpen(true)}>Terms and Conditions</MuiLink></Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <ActionContainer>
                            <Link to={navigationPathMap[currentPath].back}>
                                <Button variant="contained">Back</Button>
                            </Link>
                            <Spacer />
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

export default MoreInfo;