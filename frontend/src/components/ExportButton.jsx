import React from 'react';
import { Download } from 'lucide-react';

const ExportButton = ({ format, onExport, disabled = false }) => {
  return (
    <button
      onClick={() => onExport(format)}
      disabled={disabled}
      className={`
        flex items-center space-x-2 px-4 py-2 text-sm font-semibold rounded-lg transition duration-200
        ${disabled 
          ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
          : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'
        }
      `}
    >
      <Download size={18} />
      <span>Exportar para {format.toUpperCase()}</span>
    </button>
  );
};

export default ExportButton;