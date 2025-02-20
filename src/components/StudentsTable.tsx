import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { studentsApi } from "@/api/students";
import { Skeleton } from "@/components/ui/skeleton";
import { ExpandableRow } from "./ExpandableRow";

export function StudentsTable() {
  const {
    data: studentsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const response = await studentsApi.getStudents();
      if (response.error) throw new Error(response.error);
      return response.data || [];
    },
  });

  if (isLoading) {
    return <LoadingTable />;
  }

  if (error) {
    return (
      <div className="rounded-md bg-destructive/15 p-4 text-destructive">
        {error.message}
      </div>
    );
  }

  if (!studentsData || studentsData.length === 0) {
    return (
      <div className="rounded-md bg-muted p-4 text-muted-foreground">
        Brak studentów do wyświetlenia
      </div>
    );
  }

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
          {studentsData.map((student) => (
            <ExpandableRow key={student.UUID} student={student} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function LoadingTable() {
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
          {[...Array(3)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-4" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-32" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
