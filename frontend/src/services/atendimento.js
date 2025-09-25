// router.post("/iniciar", protect,  iniciarAtendimento);
// router.post("/finalizar/:id", protect,  finalizarAtendimento);

// // Histórico acessível a médicos e atendentes
// router.get("/historico", protect, historicoAtendimentos);

import { api } from "../api"

export async function iniciarAten(payload) {
    const {data} = await api.post('/atendimentos/iniciar', payload)
    return data
}

export async function finallizar(id) {
    const {data} = await api.post(`/atendimentos/finalizar/${id}`,)
    return data
}
export async function historico() {
    const {data} = await api.patch(`/atendimentos/historico`)
    return data
}