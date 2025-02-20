import { TableCell, TableRow } from "@/components/ui/table";
import { Student } from "@/api/students";

interface StudentExpandedRowProps {
  student: Student;
}

export function StudentExpandedRow({ student }: StudentExpandedRowProps) {
  return (
    <TableRow className="bg-slate-900/50">
      <TableCell colSpan={8}>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Email:</p>
              <p>{student.email}</p>
            </div>
            <div>
              <p className="font-semibold">Telefon:</p>
              <p>{student.phoneNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Adres:</p>
              <p>
                {student.address.street}, {student.address.postalCode}{" "}
                {student.address.city}
              </p>
            </div>
            <div>
              <p className="font-semibold">Szkoła:</p>
              <p>
                {student.school.name} (klasa {student.school.class})
                <br />
                {student.school.address.street}
                <br />
                {student.school.address.postalCode}{" "}
                {student.school.address.city}
              </p>
            </div>
            <div>
              <p className="font-semibold">Nauczyciel:</p>
              <p>{student.teachersName}</p>
            </div>
            <div>
              <p className="font-semibold">Status:</p>
              <p>{student.state}</p>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
