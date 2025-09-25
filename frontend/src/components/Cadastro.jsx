import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CadastroPaciente() {
  const [paciente, setPaciente] = useState("");
  const [motivo, setMotivo] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    if (paciente.trim() && motivo.trim()) {
      setLoading(true);
      
      try {
        // API:
        const response = await fetch('/api/pacientes', {
           method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            nome: paciente.trim(), 
            motivo: motivo.trim() 
          })
        });
        
       
        sessionStorage.setItem("paciente", paciente.trim());
        sessionStorage.setItem("motivo", motivo.trim());
        
        // Limpar campos
        setPaciente("");
        setMotivo("");
        
        // Navegar 
        navigate("/triagem");
        
      } catch (error) {
        console.error('Erro ao cadastrar:', error);
        alert("Erro ao cadastrar paciente. Tente novamente.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Preenchimento obrigatório dos campos nome do paciente e motivo do atendimento");
    }
  };

  return (
    <div class="cadastro">
      <h2>Cadastro do Paciente</h2>
      <form onSubmit={handleSubmit} id="cadastro">
        <div>
          <label htmlFor="paciente">Nome do Paciente:</label>
          <input
            id="paciente"
            type="text"
            value={paciente}
            onChange={(e) => setPaciente(e.target.value)}
            disabled={loading}
            required
          />
        </div>
        <div class="cadastro2">
          <label htmlFor="motivo">Motivo do Atendimento:</label>
          <textarea
            id="motivo"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            disabled={loading}
            required
            rows={3}
          />
        </div>
        <button 
          id="btn-cadastro" 
          type="submit"
          disabled={loading || !paciente.trim() || !motivo.trim()}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </form>
    </div>
  );
}

export default CadastroPaciente;