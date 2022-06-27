import {Error, Info, Success, Warning} from '../icons';

export const setType = (type = '') => {
    switch (type.toLowerCase().trim()) {
        case 'error':
            return (<Error/>);
        case 'success':
            return (<Success/>);
        case 'warning':
            return (<Warning/>);
        case 'info':
            return (<Info/>);
        default:
            return;
    }
}