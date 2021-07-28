import axios from "axios";

// const API_HOST = "https://api.sahlabusiness.com";

const API_HOST = "http://localhost:1337";


export const contact_us = async (title, email, content, recaptcha) => {
    let response = await axios({
        method: "POST",
        url: API_HOST + "/contacts",
        data: {
            title,
            email,
            content,
            recaptcha
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        res => {
            let obj = {};
            switch (res.status) {
                case 200:
                    obj.error = false;
                    obj.data = res.data
                    break
                case 501:
                    obj.error = true;
                    obj.message = res.error
                    break
                default:
                    obj.error = true;
                    obj.message = "Somehing went wrong!"
                    break;
            }

            return obj;
        }
    ).catch(err => {
        return {
            error: true,
            message: err.response.data.message
        }
    })
    
    return response;
}

export const signup = async (username, email, passwd, secret) => {
    let response = await axios({
        method: "POST",
        url: API_HOST + "/auth/local/register",
        data: {
            username,
            email,
            password: passwd,
            recaptcha: secret,
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        res => {
            let obj = {};
            switch (res.status) {
                case 200:
                    obj.error = false;
                    obj.data = res.data
                    break
                case 501:
                    obj.error = true;
                    obj.message = res.error
                    break
                default:
                    obj.error = true;
                    obj.message = "Somehing went wrong!"
                    break;
            }

            return obj;
        }
    ).catch(err => {
        return {
            error: true,
            message: err.response.data.message
        }
    })
    
    return response;
}

export const login = async (email, password) => {
    let response = await axios(API_HOST + "/auth/local", {
        method: "POST",
        // url: "/api/login",
        data: {
            identifier: email,
            password,
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(
        res => {
            let obj = {};
            console.log("res", res);
            switch (res.status) {
                case 200:
                    obj.error = false;
                    obj.data = res.data
                    break
                case 501:
                    obj.error = true;
                    obj.message = res.error
                    break
                default:
                    obj.error = true;
                    obj.message = "Somehing went wrong!"
                    break;
            }

            return obj;
        }
    ).catch(err => {
        return {
            error: true,
            message: err.response.data.message
        }
    })
    
    return response;
}

export const get_user = async (token) => {
    let response = axios.get(API_HOST + "/users/me",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    ).then(
        res => {
            let obj = {};
            switch (res.status) {
                case 200:
                    obj.error = false;
                    obj.data = res.data
                    break
                case 501:
                    obj.error = true;
                    obj.message = res.error
                    break
                default:
                    obj.error = true;
                    obj.message = "Somehing went wrong!"
                    break;
            }

            return obj;
        }
    ).catch(err => {
        return {
            error: true,
            message: err.response.data.message
        }
    })

    return response
}