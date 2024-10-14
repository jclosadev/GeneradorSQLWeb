import React, { useState } from 'react';
import { FileSpreadsheet, Database, AlertCircle, ArrowLeft } from 'lucide-react';
import FileUpload from './components/FileUpload';
import FieldMapping from './components/FieldMapping';
import SQLGenerator from './components/SQLGenerator';
import ManualSQLGenerator from './components/ManualSQLGenerator';
import { readExcelFile } from './utils/excelReader';

function App() {
  const [excelData, setExcelData] = useState<any[] | null>(null);
  const [mappedFields, setMappedFields] = useState<Record<string, string> | null>(null);
  const [isManualMode, setIsManualMode] = useState(false);

  const handleFileUpload = async (file: File) => {
    try {
      const data = await readExcelFile(file);
      setExcelData(data);
    } catch (error) {
      console.error('Error al leer el archivo Excel:', error);
      alert('Error al leer el archivo Excel. Por favor, intente de nuevo.');
    }
  };

  const handleFieldMapping = (mapping: Record<string, string>) => {
    setMappedFields(mapping);
  };

  const handleBack = () => {
    if (mappedFields) {
      setMappedFields(null);
    } else if (excelData) {
      setExcelData(null);
    }
    setIsManualMode(false);
  };

  const handleManualMode = () => {
    setIsManualMode(true);
    setExcelData(null);
    setMappedFields(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Generador d'Instruccions SQL</h1>
      
      {(excelData || mappedFields || isManualMode) && (
        <button
          onClick={handleBack}
          className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out"
        >
          <ArrowLeft className="mr-2" />
          Tornar
        </button>
      )}

      {!excelData && !isManualMode && (
        <div className="flex flex-col items-center space-y-4">
          <FileUpload onFileUpload={handleFileUpload} />
          <button
            onClick={handleManualMode}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Generar SQL Manualment
          </button>
        </div>
      )}

      {excelData && !mappedFields && (
        <FieldMapping excelData={excelData} onFieldMapping={handleFieldMapping} />
      )}

      {excelData && mappedFields && (
        <SQLGenerator excelData={excelData} mappedFields={mappedFields} />
      )}

      {isManualMode && (
        <ManualSQLGenerator />
      )}

      <div className="mt-8 flex space-x-4">
        <div className="flex items-center">
          <FileSpreadsheet className="text-green-500 mr-2" />
          <span className="text-sm text-gray-600">Cargar Excel</span>
        </div>
        <div className="flex items-center">
          <Database className="text-blue-500 mr-2" />
          <span className="text-sm text-gray-600">Generar SQL</span>
        </div>
        <div className="flex items-center">
          <AlertCircle className="text-yellow-500 mr-2" />
          <span className="text-sm text-gray-600">Ayuda</span>
        </div>
      </div>
    </div>
  );
}

export default App;