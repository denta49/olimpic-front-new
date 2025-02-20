import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { StudentExpandedRow } from "./StudentExpandedRow";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  school: string;
  district: string;
  stageOne: string;
  stageTwo: string;
  stageThree: string;
  // Additional details for expanded view
  details: {
    email: string;
    phoneNumber: string;
    address: string;
    notes: string;
  };
}

// Updated mock data with details
const mockStudents: Student[] = [
  {
    id: "1",
    firstName: "Jan",
    lastName: "Kowalski",
    school: "LO im. Mickiewicza",
    district: "Warszawa",
    stageOne: "Zakwalifikowany",
    stageTwo: "Oczekuje",
    stageThree: "Oczekuje",
    details: {
      email: "jan.kowalski@example.com",
      phoneNumber: "+48 123 456 789",
      address: "ul. Szkolna 1, Warszawa",
      notes: "Laureat poprzedniej edycji",
    },
  },
  {
    id: "2",
    firstName: "Anna",
    lastName: "Nowak",
    school: "LO im. Słowackiego",
    district: "Kraków",
    stageOne: "W trakcie",
    stageTwo: "-",
    stageThree: "-",
    details: {
      email: "anna.nowak@example.com",
      phoneNumber: "+48 987 654 321",
      address: "ul. Długa 5, Kraków",
      notes: "Pierwsza olimpiada",
    },
  },
];

export function StudentsTable() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="font-bold">Imię</TableHead>
            <TableHead className="font-bold">Nazwisko</TableHead>
            <TableHead className="font-bold">Szkoła</TableHead>
            <TableHead className="font-bold">Okręg</TableHead>
            <TableHead className="font-bold">Etap I</TableHead>
            <TableHead className="font-bold">Etap II</TableHead>
            <TableHead className="font-bold">Etap III</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockStudents.map((student) => (
            <>
              <TableRow
                key={student.id}
                className="cursor-pointer border-t border-slate-700 hover:bg-slate-900"
                onClick={() => toggleRow(student.id)}
              >
                <TableCell>
                  {expandedRows.has(student.id) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </TableCell>
                <TableCell>{student.firstName}</TableCell>
                <TableCell>{student.lastName}</TableCell>
                <TableCell>{student.school}</TableCell>
                <TableCell>{student.district}</TableCell>
                <TableCell>{student.stageOne}</TableCell>
                <TableCell>{student.stageTwo}</TableCell>
                <TableCell>{student.stageThree}</TableCell>
              </TableRow>
              {expandedRows.has(student.id) && (
                <StudentExpandedRow details={student.details} />
              )}
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
