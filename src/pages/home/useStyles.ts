import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles({
    root: {
        '& .MuiPaper-root': {
            background: '#fff',
            '& div.MuiToolbar-root': {
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            },
            '& input': {
                padding: '10px 100px 10px 10px'
            }
        },
        '& .table-container': {
            margin: '70px 0 20px',
            '& svg': {
                marginTop: '200px'
            }
        },
        '& .pagination': {
            display: 'flex',
            justifyContent: 'center',
            margin: '10px 0 10px'
        }
    }
});