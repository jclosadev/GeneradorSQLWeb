import React, { useState } from 'react';
import { Check } from 'lucide-react';

interface FieldMappingProps {
  excelData: any[];
  onFieldMapping: (mapping: Record<string, string>) => void;
}

const FieldMapping: React.FC<FieldMappingProps> = ({ excelData, onFieldMapping }) => {
  const [mapping, setMapping] = useState<Record<string, string>>({});
  const requiredFields = ['NIU', 'DNI', 'Cognom1', 'Cognom2', 'Nom', 'Mail'];

  const handleMappingChange = (field: string, value: string) => {
    setMapping(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (requiredFields.every(field => mapping[field])) {
      onFieldMapping(mapping);
    } else {
      alert('Por favor, mapea todos los campos requeridos.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Relacionar els Camps del Excel</h2>
      {requiredFields.map(field => (
        <div key={field} className="mb-4">
          <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
          <select
            id={field}
            value={mapping[field] || ''}
            onChange={(e) => handleMappingChange(field, e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            <option value="">Selecciona un campo</option>
            {Object.keys(excelData[0]).map(column => (
              <option key={column} value={column}>{column}</option>
            ))}
          </select>
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out"
      >
        <Check className="mr-2" />
        Confirmar Mapeo
      </button>
    </div>
  );
};

export default FieldMapping;