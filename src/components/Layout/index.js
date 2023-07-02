import { styled } from  '@mui/material';

export const PageContainer = styled('div')({
    display: 'flex',
    height: '100vh',
    width: '100vw',
    justifyContent: 'center',
});

export const GroupContainer = styled('div')({
    display: 'flex',
    alignItems: 'center',
    width: '400px'
});

export const ActionContainer = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
});

export const Spacer = styled('div')({
    width: '8px'
})

export const ModalContainer = styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    backgroundColor: 'white',
    boxShadow: '24px',
    padding: '16px',
    borderRadius: '16px'
})