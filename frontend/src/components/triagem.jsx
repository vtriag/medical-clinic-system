import { useEffect, useState } from "react";
import Modal from "react-modal";
import { showPacientes } from "../services/paciente";
import { iniciarAten, finallizar } from "../services/atendimento";

Modal.setAppElement("#root");

export default function Triagem() {
  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Carregar pacientes na fila
  useEffect(() => {
    async function fetchPacientes() {
      try {
        const data = await showPacientes();
        setPacientes(data);
      } catch (err) {
        console.error("Erro ao buscar pacientes:", err);
      }
    }
    fetchPacientes();
  }, []);

  // Ao clicar em "Atender"
  const openModal = async (paciente) => {
    try {
      // Inicia atendimento no backend
      const data = await iniciarAten({ pacienteId: paciente.id });

      // Extrai o id do atendimento
      const atendimentoId = data.atendimento.id;

      // Guarda paciente + atendimentoId
      setSelectedPaciente({ ...paciente, atendimentoId });

      setModalIsOpen(true);
    } catch (err) {
      console.error("Erro ao iniciar atendimento:", err);
    }
  };

  const closeModal = () => {
    setSelectedPaciente(null);
    setModalIsOpen(false);
  };

  const handleFinalizar = async () => {
    if (!selectedPaciente) return;

    try {
      await finallizar(selectedPaciente.atendimentoId); // usa o id do atendimento
      setPacientes((prev) => prev.filter((p) => p.id !== selectedPaciente.id));
      closeModal();
    } catch (err) {
      console.error("Erro ao finalizar atendimento:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Triagem</h1>

      <ul className="space-y-3">
        {pacientes.length === 0 && <p className="text-gray-500">Nenhum paciente na fila</p>}
        {pacientes.map((paciente) => (
          <li
            key={paciente.id}
            className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
          >
            <span className="font-medium">{paciente.nome}</span>
            <button
              onClick={() => openModal(paciente)}
              className="px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-700"
            >
              Atender
            </button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmar Atendimento"
        className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow-lg outline-none"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-start z-50"
      >
        <h2 className="text-xl font-bold mb-4">Confirmar Atendimento</h2>
        <p>
          Atendimento iniciado para <strong>{selectedPaciente?.nome}</strong>.
        </p>
        <div className="flex justify-end mt-6 space-x-2">
          <button
            onClick={closeModal}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            onClick={handleFinalizar}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Finalizar Atendimento
          </button>
        </div>
      </Modal>
    </div>
  );
}
