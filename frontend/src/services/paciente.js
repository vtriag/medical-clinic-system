import { api } from "../api"

export async function createPacient(payload) {
    const {data} = await api.post('/pacientes', payload)
    return data
}

export async function showPacientes() {
    const {data} = await api.get('/pacientes/fila',)
    return data
}
export async function editar(id,) {
    const {data} = await api.patch(`/pacientes/${id}/status`)
    return data
}
// router.get("/fila",  listFilaPacientes);

// // Atualiza status de um paciente
// router.patch("/:id/status", protect,  updateStatusPaciente);