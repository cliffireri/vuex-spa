import Axios from "axios"

export function login(credentials) {
    return new Promise((res, rej) => {
        Axios.post('api/login', credentials)
        .then((response) => {
            res(response.data)
        })
        .catch((error) => {
            rej("Wrong email password")
        })
    })
} 

export function getLocalUser(){
    const userStr = localStorage.getItem('user');

    if(!userStr){
        return null;
    }

    return JSON.parse(userStr);
}