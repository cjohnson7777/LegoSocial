import axios from "axios"

const rebrick_url = 'https://rebrickable.com/api/v3/lego/sets/?page=1&min_parts=2014'
const key = '012535ebae0227cee00bc3205c83f64c'

const r_api = axios.create({
    baseURL:rebrick_url,
    headers: {
        Authorization: `key ${key}`
    }
})

export const get_lego_sets = async () =>{
    const response = await r_api.get()
    return response.data
}