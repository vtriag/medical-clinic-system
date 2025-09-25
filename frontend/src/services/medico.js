import { api } from "../api"

export async function createMed(payload) {
    const {data} = await api.post('/medicos', payload)
    return data
}

export async function showMed() {
    const {data} = await api.get('/medicos',)
    return data
}
export async function logiMedico(payload){
    const {data} = await api.post("/medicos/login", payload)
    return data
}