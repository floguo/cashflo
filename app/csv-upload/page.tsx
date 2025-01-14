'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { CSVUpload } from '@/components/csv-upload'
import { DataChart } from '@/components/data-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CSVUploadPage() {
  const [parsedData, setParsedData] = useState<any[]>([])

  const handleDataParsed = (data: any[]) => {
    // Assuming the CSV has 'date' and 'amount' columns
    const processedData = data.map(row => ({
      ...row,
      amount: parseFloat(row.amount)
    }))
    setParsedData(processedData)
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl  ">CSV Upload and Visualization</h1>
        <Card>
          <CardHeader>
            <CardTitle>Upload CSV</CardTitle>
          </CardHeader>
          <CardContent>
            <CSVUpload onDataParsed={handleDataParsed} />
          </CardContent>
        </Card>
        {parsedData.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Data Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <DataChart data={parsedData} />
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}

