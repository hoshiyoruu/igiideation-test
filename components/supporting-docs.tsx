import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface Document {
  id: number;
  title: string;
  fileId: string;
}

interface SupportingDocumentsProps {
  documents: Document[];
}

const SupportingDocuments: React.FC<SupportingDocumentsProps> = ({ documents }) => {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/3 space-y-2">
        {documents.map((doc) => (
          <Button
            key={doc.id}
            onClick={() => setSelectedDoc(doc)}
            variant="outline"
            className={`w-full justify-between text-left ${
              selectedDoc?.id === doc.id ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground'
            }`}
          >
            {doc.title}
            <ChevronRight className="h-4 w-4" />
          </Button>
        ))}
      </div>
      <div className="w-full md:w-2/3">
        {selectedDoc ? (
          <div className="p-4 border rounded-md">
            <h3 className="text-lg font-semibold mb-2">{selectedDoc.title}</h3>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={`https://drive.google.com/file/d/${selectedDoc.fileId}/preview`}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ) : (
          <div className="p-4 border rounded-md text-muted-foreground">
            Select a document to view its content.
          </div>
        )}
      </div>
    </div>
  );
};

export default SupportingDocuments;