import axios from "axios";
import { API_HOST, LOCAL_API_HOST } from "./constants";

// const API_HOST = "https://api.sahlabusiness.com";


export const get_products = async (start=0, limit=32, sort="_sort=orders:desc,rating:desc") => {
    let response = await axios.get(API_HOST+`/products?_start=${start}&_limit=${limit}&${sort}`)
                    .then(res => {
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
                            message: err?.response?.data?.message
                        }
                    })
    return response;
}

export const get_services = async (start=0, limit=32, sort="_sort=orders:desc,rating:desc") => {
    let response = await axios.get(API_HOST+`/services?_start=${start}&_limit=${limit}&${sort}`)
                    .then(res => {
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
                            message: err?.response?.data?.message
                        }
                    })
    return response;
}

export const get_categories = async (type, locale=false) => {
    let response = await axios.get(API_HOST+`/categories?_where[_or][0][type]=both&_where[_or][1][type]=${type}${locale?`&_locale=${locale}`:""}`)
                    .then(res => {
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
                            message: err?.response?.data?.message
                        }
                    })
    return response;
}


export const get_products_user = async (user_id, start=0, limit=32, sort="_sort=created_at:desc,orders:desc,rating:desc") => {
    let response = await axios.get(API_HOST+`/products?user_id=${user_id}&_start=${start}&${sort}`)
                    .then(res => {
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
                            message: err?.response?.data?.message
                        }
                    })
    return response;
}

export const get_services_user = async (user_id, start=0, limit=32, sort="_sort=created_at:desc,orders:desc,rating:desc") => {
    let response = await axios.get(API_HOST+`/services?user_id=${user_id}&_start=${start}&${sort}`)
                    .then(res => {
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
                            message: err?.response?.data?.message
                        }
                    })
    return response;
}

export const get_product = async (id) => {
    let response = await axios.get(API_HOST+`/products/${id}`)
                    .then(res => {
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
                            message: err?.response?.data?.message
                        }
                    })
    return response;
}

export const get_service = async (id) => {
    let response = await axios.get(API_HOST+`/services/${id}`)
                    .then(res => {
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
                            message: err?.response?.data?.message
                        }
                    })
    return response;
}

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
            message: err?.response?.data?.message
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
            message: err?.response?.data?.message
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
            message: err?.response?.data?.message
        }
    })
    
    return response;
}

export const get_me = async (token) => {
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
            message: err?.response?.data?.message
        }
    })

    return response
}

export const get_user = async (token, id) => {
    let response = axios.get(API_HOST + "/users/"+id,
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
            message: err?.response?.data?.message
        }
    })

    return response
}

export const upload_image = async(formData, config) => {
    const response = await axios.post(API_HOST + '/upload', formData, config).then(
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
            message: err?.response?.data?.message
        }
    })
    
    return response;;
}


export const upload_avatar = async(data, config, user_id) => {
    const response = await axios.put(API_HOST + '/users/' + user_id, data, config).then(
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
            message: err?.response?.data?.message
        }
    })
    
    return response;;
}

export const update_profile = async (data, token, id) => {
    let response = await axios({
        method: "PUT",
        url: API_HOST +"/users/"+id,
        data,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
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
            message: err?.response?.data?.message
        }
    })
    
    return response;
}


export const add_product = async(data, config) => {
    const response = await axios.post(API_HOST + "/products", data, config).then(
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
            message: err?.response?.data?.message
        }
    })
    
    return response;;
}

export const add_service = async(data, config) => {
    const response = await axios.post(API_HOST + "/services", data, config).then(
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
            message: err?.response?.data?.message
        }
    })
    
    return response;;
}

export const place_order = async(data, config) => {
    const response = await axios.post(API_HOST + "/orders", data, config).then(
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
            message: err?.response?.data?.message
        }
    })
    
    return response;;
}

export const get_orders = async (token, type="") => {
    let response = axios.get(LOCAL_API_HOST + `/orders${type?.length?`?type=${type}`:""}`,
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    )
        .then(
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
                message: err?.response?.data?.message
            }
    })

    return response
}

export const delete_product = async (token, id) => {
    let response = axios.delete(API_HOST + "/products/"+id,
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
            message: err?.response?.data?.message
        }
    })

    return response
}

export const delete_service = async (token, id) => {
    let response = axios.delete(API_HOST + "/services/"+id,
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
            message: err?.response?.data?.message
        }
    })

    return response
}

export const get_language = async (page, lang=false) => {
    let response = axios.get(LOCAL_API_HOST + `/${page}${lang?`?_locale=${lang}`:""}`)
        .then(
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
                message: err?.response?.data?.message
            }
    })

    return response
}

export const get_best_products = async () => {
    let response = axios.get(LOCAL_API_HOST + `/best_products`)
        .then(
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
                message: err?.response?.data?.message
            }
    })

    return response
}

export const get_best_services = async () => {
    let response = axios.get(LOCAL_API_HOST + `/best_services`)
        .then(
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
                message: err?.response?.data?.message
            }
    })

    return response
}