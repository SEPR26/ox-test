import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    root: {
        width: '900px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        '& div.card-container': {
            width: '500px'
        },
        '& div.MuiCardContent-root': {
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center'
        },
        '& div.text-input': {
            marginBottom: '20px',
            '&:last-child': {
                marginBottom: 0
            }
        },
        '& .MuiCardActions-root': {
            display: 'flex',
            justifyContent: 'end'
        }
    }
});