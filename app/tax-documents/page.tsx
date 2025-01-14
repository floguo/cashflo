import { DashboardLayout } from '@/components/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const taxDocuments = [
  { id: 1, type: 'T4', year: 2022, institution: 'Employer Inc.' },
  { id: 2, type: 'T5', year: 2022, institution: 'Bank of Canada' },
  { id: 3, type: 'T3', year: 2022, institution: 'Investment Firm' },
  { id: 4, type: 'T5008', year: 2022, institution: 'Stock Broker' },
]

export default function TaxDocumentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl  ">Tax Documents</h1>
          <Button>Upload Document</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {taxDocuments.map((document) => (
            <Card key={document.id}>
              <CardHeader>
                <CardTitle>{document.type}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Year: {document.year}</p>
                <p>Institution: {document.institution}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

