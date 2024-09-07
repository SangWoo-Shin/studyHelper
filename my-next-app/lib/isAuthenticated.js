import { jwtDecode } from 'jwt-decode';
import { gettingUser } from './gettingUser';

const readToken = () => {
    try {
        const token = gettingUser().token;
        return token ? jwtDecode(token) : null;
    } catch (err) {
        return null;
    }
} 

const isAuthenticated = () => {
    const token = readToken();
    return token ? true : false;
}   

export default { readToken, isAuthenticated };
