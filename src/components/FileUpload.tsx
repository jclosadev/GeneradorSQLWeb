import React from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="file-upload" className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300 ease-in-out">
        <Upload className="mr-2" />
        <span>Seleccionar Fitxer Excel</span>
      </label>
      <input id="file-upload" type="file" accept=".xlsx" onChange={handleFileChange} className="hidden" />
      <p className="mt-2 text-sm text-gray-600">Només s'accepten fitxers .xlsx</p>
    </div>
  );
};

export default FileUpload;