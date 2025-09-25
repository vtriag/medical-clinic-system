import { useState } from "react";
import { createPacient } from "../services/paciente";
import { createMed } from "../services/medico";

export default function CriarPaciente() {
  const [tipo, setTipo] = useState("paciente"); // paciente ou medico
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    especialidade: "",
    motivo: "",
    prioridade: "VERDE",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTipoChange = (e) => {
    setTipo(e.target.value);
    setMessage("");
    // resetar campos específicos
    setFormData((prev) => ({
      ...prev,
      email: "",
      senha: "",
      especialidade: "",
      motivo: "",
      prioridade: "VERDE",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (tipo === "medico") {
        const { nome, email, senha, especialidade } = formData;
        const payload = { nome, email, senha, especialidade };
        await createMed(payload);
        setMessage("Médico cadastrado com sucesso!");
      } else {
        const { nome, motivo, prioridade } = formData;
        const payload = { nome, motivo, prioridade };
        await createPacient(payload);
        setMessage("Paciente cadastrado com sucesso!");
      }

      // resetar formulário
      setFormData({
        nome: "",
        email: "",
        senha: "",
        especialidade: "",
        motivo: "",
        prioridade: "VERDE",
      });
    } catch (err) {
      console.error(err);
      setMessage("Erro ao cadastrar. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Cadastro de {tipo === "paciente" ? "Paciente" : "Médico"}</h1>

      {/* Seleção de tipo */}
      <div className="mb-4">
        <label className="block mb-2 font-medium">Tipo de cadastro</label>
        <select
          value={tipo}
          onChange={handleTipoChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="paciente">Paciente</option>
          <option value="medico">Médico</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Campos comuns */}
        <div>
          <label className="block mb-1 font-medium">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        {/* Campos específicos */}
        {tipo === "medico" ? (
          <>
            <div>
              <label className="block mb-1 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Senha</label>
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Especialidade</label>
              <input
                type="text"
                name="especialidade"
                value={formData.especialidade}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block mb-1 font-medium">Motivo</label>
              <input
                type="text"
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Prioridade</label>
              <select
                name="prioridade"
                value={formData.prioridade}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="VERDE">Verde</option>
                <option value="AMARELO">Amarelo</option>
                <option value="VERMELHO">Vermelho</option>
              </select>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-900 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
}
