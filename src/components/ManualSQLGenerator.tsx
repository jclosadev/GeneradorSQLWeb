import React, { useState } from 'react';
import { Download, Clipboard } from 'lucide-react';

const ManualSQLGenerator: React.FC = () => {
  const [formData, setFormData] = useState({
    niu: '',
    dni: '',
    cognom1: '',
    cognom2: '',
    nom: '',
    mail: '',
  });
  const [sqlStatement, setSqlStatement] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateSQL = () => {
    const { niu, dni, cognom1, cognom2, nom, mail } = formData;
    const statement = `Insert into GESPER_LOAD_DP_EXTERNOS (NIU, NOMBRE, APELLIDO1, APELLIDO2, AZ, EMAIL, F_ALTA, ESTADO, ALFA1, ALFA2, ALFA3, ALFA4, NUM1, NUM2, NUM3, NUM4) values ('${niu}', '${nom}', '${cognom1}', '${cognom2}', null, '${mail}', TO_DATE(SYSDATE), null, '${niu}', '${dni}', null, null, null, null, null, null);`;
    setSqlStatement(statement);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlStatement).then(() => {
      alert('SQL copiado al portapapeles');
    }, (err) => {
      console.error('Error al copiar: ', err);
    });
  };

  const downloadSQL = () => {
    const blob = new Blob([sqlStatement], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'instruccion_sql_manual.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Generar SQL Manualment</h2>
      <form className="space-y-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <input
              type="text"
              name={key}
              id={key}
              value={value}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={generateSQL}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Generar SQL
        </button>
      </form>
      {sqlStatement && (
        <div className="mt-4">
          <textarea
            value={sqlStatement}
            readOnly
            className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
          />
          <div className="flex space-x-2">
            <button
              onClick={copyToClipboard}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out"
            >
              <Clipboard className="mr-2" />
              Copiar al Portapapeles
            </button>
            <button
              onClick={downloadSQL}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out"
            >
              <Download className="mr-2" />
              Descargar SQL
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualSQLGenerator;