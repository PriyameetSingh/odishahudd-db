import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

import * as XLSX from 'xlsx';
import { transformExcelData, TransformedData } from '@/utils/tranformExcelData';

interface UploadBoxProps {
  onDataUpload?: (data: TransformedData) => void;
}

const UploadBox = ({ onDataUpload }: UploadBoxProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) handleFiles(files);
  };

  const handleFiles = (files: FileList) => {
    const file = files[0];
    if (!file) return;

    if (
      file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      file.name.endsWith('.xlsx')
    ) {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);

        const workbook = XLSX.read(data, { type: 'array' });

        const parsedSheets: Record<string, unknown[]> = {};

        workbook.SheetNames.forEach((sheetName) => {
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { defval: null });
          parsedSheets[sheetName] = json;
        });

        console.log("Raw data parsed from Excel:", parsedSheets);
        const transformedData = transformExcelData(parsedSheets, null);
        
        if (onDataUpload && transformedData) {
          onDataUpload(transformedData);
        }

        console.log('Transformed Excel data:', transformedData);
      };

      reader.readAsArrayBuffer(file);
    } else {
      alert('Only .xlsx files are allowed');
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="w-full">
      <CardContent className="p-4">
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragOver ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Drag and drop your .xlsx file here, or click to select
          </p>
          <Button variant="outline" size="sm">
            Choose File
          </Button>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xlsx"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </CardContent>
    </Card>
  );
};

export default UploadBox;