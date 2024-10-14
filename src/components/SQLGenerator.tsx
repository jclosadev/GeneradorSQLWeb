import React, { useState } from 'react';
import { Download, Clipboard } from 'lucide-react';

interface SQLGeneratorProps {
  excelData: any[];
  mappedFields: Record<string, string>;
}

const SQLGenerator: React.FC<SQLGeneratorProps> = ({ excelData, mappedFields }) => {
  const [sqlStatements, setSqlStatements] = useState<string>('');

  const generateSQL = () => {
    const statements = excelData.map(row => {
      const niu = row[mappedFields['NIU']];
      const dni = row[mappedFields['DNI']];
      const cognom1 = row[mappedFields['Cognom1']];
      const cognom2 = row[mappedFields['Cognom2']] || '';
      const nom = row[mappedFields['Nom']];
      const mail = row[mappedFields['Mail']];

      return `Insert into GESPER_LOAD_DP_EXTERNOS (NIU, NOMBRE, APELLIDO1, APELLIDO2, AZ, EMAIL, F_ALTA, ESTADO, ALFA1, ALFA2, ALFA3, ALFA4, NUM1, NUM2, NUM3, NUM4) values ('${niu}', '${nom}', '${cognom1}', '${cognom2}', null, '${mail}', TO_DATE(SYSDATE), null, '${niu}', '${dni}', null, null, null, null, null, null);`;
    }).join('\n');

    setSqlStatements(statements);
  };

  const downloadSQL = () => {
    const blob = new Blob([sqlStatements], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'instrucciones_sql.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlStatements).then(() => {
      alert('SQL copiado al portapapeles');
    }, (err) => {
      console.error('Error al copiar: ', err);
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Generar Instrucciones SQL</h2>
      <button
        onClick={generateSQL}
        className="mb-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
      >
        Generar SQL
      </button>
      {sqlStatements && (
        <>
          <textarea
            value={sqlStatements}
            readOnly
            className="w-full h-64 p-2 border border-gray-300 rounded mb-4"
          />
          <div className="flex space-x-2">
            <button
              onClick={downloadSQL}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out"
            >
              <Download className="mr-2" />
              Descargar SQL
            </button>
            <button
              onClick={copyToClipboard}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out"
            >
              <Clipboard className="mr-2" />
              Copiar al Portapapeles
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default SQLGenerator;