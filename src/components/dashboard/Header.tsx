import { Bell, Calendar, Search, Settings, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import * as XLSX from 'xlsx';
import { transformExcelData, TransformedData } from '@/utils/tranformExcelData';

interface HeaderProps {
  onDataUpload: (data: TransformedData) => void;
}

export const Header = ({ onDataUpload }: HeaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        
        if (transformedData) {
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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-primary text-primary-foreground">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <span className="text-lg font-bold">ओ</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold leading-tight">Housing & Urban Development</h1>
              <p className="text-xs text-primary-foreground/80">Government of Odisha</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 lg:gap-4">
          <div className="hidden md:flex items-center gap-2 bg-primary-foreground/10 rounded-lg px-3 py-1.5">
            <Calendar className="h-4 w-4 text-primary-foreground/70" />
            <span className="text-sm">52nd Dashboard Meeting</span>
            <span className="text-xs bg-accent text-accent-foreground px-2 py-0.5 rounded-full">29 Dec 2025</span>
          </div>

          <div className="hidden lg:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary-foreground/50" />
            <Input
              placeholder="Search schemes, KPIs..."
              className="w-64 pl-9 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:bg-primary-foreground/20"
            />
          </div>

          <Button variant="outline" size="sm" className="text-primary border-primary-foreground/30 hover:bg-primary-foreground/10 gap-2" onClick={handleClick}>
            <Upload className="h-4 w-4" />
            <span>Upload Data</span>
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".xlsx"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />

          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
            <Settings className="h-5 w-5" />
          </Button>

          <div className="hidden sm:flex items-center gap-2 ml-2 pl-4 border-l border-primary-foreground/20">
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
              <span className="text-sm font-semibold text-accent-foreground">PS</span>
            </div>
            <div className="hidden lg:block text-right">
              <p className="text-sm font-medium">Principal Secretary</p>
              <p className="text-xs text-primary-foreground/70">HUDD, Odisha</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
