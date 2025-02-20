import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Student } from "@/api/students";
import { StudentExpandedRow } from "./StudentExpandedRow";

interface ExpandableRowProps {
  student: Student;
}

export function ExpandableRow({ student }: ExpandableRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <TableRow
        className="cursor-pointer border-t border-slate-700 hover:bg-slate-900"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <TableCell>
          {isExpanded ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </TableCell>
        <TableCell>{student.firstName}</TableCell>
        <TableCell>{student.lastName}</TableCell>
        <TableCell>{student.school.name}</TableCell>
        <TableCell>{student.district.name}</TableCell>
        <TableCell>"placeholder"</TableCell>
        <TableCell>"placeholder"</TableCell>
        <TableCell>"placeholder"</TableCell>
      </TableRow>
      {isExpanded && <StudentExpandedRow student={student} />}
    </>
  );
}
