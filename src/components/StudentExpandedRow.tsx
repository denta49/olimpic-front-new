import { TableCell, TableRow } from "@/components/ui/table";

interface StudentDetails {
  email: string;
  phoneNumber: string;
  address: string;
  notes: string;
}

interface StudentExpandedRowProps {
  details: StudentDetails;
}

export function StudentExpandedRow({ details }: StudentExpandedRowProps) {
  return (
    <TableRow className="bg-slate-900/50">
      <TableCell colSpan={8}>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Email:</p>
              <p>{details.email}</p>
            </div>
            <div>
              <p className="font-semibold">Telefon:</p>
              <p>{details.phoneNumber}</p>
            </div>
            <div>
              <p className="font-semibold">Adres:</p>
              <p>{details.address}</p>
            </div>
            <div>
              <p className="font-semibold">Uwagi:</p>
              <p>{details.notes}</p>
            </div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}
