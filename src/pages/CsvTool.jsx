import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Papa from "papaparse";
import { saveAs } from "file-saver";

const CsvTool = () => {
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const result = Papa.parse(text, { header: true });
        setHeaders(result.meta.fields);
        setCsvData(result.data);
      };
      reader.readAsText(file);
    } else {
      toast.error("Please upload a valid CSV file.");
    }
  };

  const handleCellChange = (rowIndex, columnName, value) => {
    const updatedData = [...csvData];
    updatedData[rowIndex][columnName] = value;
    setCsvData(updatedData);
  };

  const handleAddRow = () => {
    const newRow = headers.reduce((acc, header) => ({ ...acc, [header]: "" }), {});
    setCsvData([...csvData, newRow]);
  };

  const handleRemoveRow = (rowIndex) => {
    const updatedData = csvData.filter((_, index) => index !== rowIndex);
    setCsvData(updatedData);
  };

  const handleDownloadCsv = () => {
    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => headers.map((header) => row[header]).join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "edited.csv");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">CSV Upload and Edit Tool</h1>
      <div className="mb-4">
        <Input type="file" accept=".csv" onChange={handleFileUpload} />
        <Button onClick={handleFileUpload} className="ml-2">Upload</Button>
      </div>
      {csvData.length > 0 && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                {headers.map((header) => (
                  <TableHead key={header}>{header}</TableHead>
                ))}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {csvData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {headers.map((header) => (
                    <TableCell key={header}>
                      <Input
                        value={row[header]}
                        onChange={(e) => handleCellChange(rowIndex, header, e.target.value)}
                      />
                    </TableCell>
                  ))}
                  <TableCell>
                    <Button variant="destructive" onClick={() => handleRemoveRow(rowIndex)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4">
            <Button onClick={handleAddRow} className="mr-2">Add Row</Button>
            <Button onClick={handleDownloadCsv}>Download CSV</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CsvTool;