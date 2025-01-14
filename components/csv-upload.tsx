"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Upload } from 'lucide-react'
import Papa from 'papaparse'

interface CSVUploadProps {
  onDataParsed: (data: any[]) => void
}

export function CSVUpload({ onDataParsed }: CSVUploadProps) {
  const [file, setFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          onDataParsed(result.data)
        },
        header: true,
        skipEmptyLines: true,
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="csv">Select CSV File</Label>
        <Input id="csv" type="file" accept=".csv" onChange={handleFileChange} />
      </div>
      <Button onClick={handleUpload} disabled={!file}>
        <Upload className="mr-2 h-4 w-4" /> Upload and Parse
      </Button>
    </div>
  )
}

