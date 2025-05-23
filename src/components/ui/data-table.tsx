
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface DataTableProps {
  data: any[] | null;
  description: string | null;
}

const DataTable: React.FC<DataTableProps> = ({ data, description }) => {
  if (!data || data.length === 0) {
    return null;
  }

  // Get headers from the first object's keys
  const headers = Object.keys(data[0]).filter(key => key !== 'attributes');

  return (
    <Card className="w-full overflow-hidden mb-6 animate-fade-in">
      {description && (
        <div className="p-3 bg-accent/50 border-b text-sm font-medium">
          {description}
        </div>
      )}
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                {headers.map((header) => (
                  <th key={header} className="text-left p-3 text-sm font-medium">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr 
                  key={rowIndex}
                  className="border-t border-muted hover:bg-muted/20 transition-colors"
                >
                  {headers.map((header) => (
                    <td key={`${rowIndex}-${header}`} className="p-3 text-sm">
                      {String(row[header] !== null ? row[header] : '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTable;
