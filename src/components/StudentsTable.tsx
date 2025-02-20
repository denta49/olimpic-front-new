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
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState, useCallback } from "react";
import debounce from "lodash/debounce";

export function StudentsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  const {
    data: studentsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["students", searchQuery],
    queryFn: async () => {
      const response = await studentsApi.getStudents(searchQuery);
      if (response.error) throw new Error(response.error);
      return response.data || [];
    },
  });

  const handleSearch = useCallback(
    debounce((value: string) => {
      setSearchQuery(value);
    }, 300),
    [],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handleSearch(value);
  };

  // Search box component extracted for reuse
  const SearchBox = (
    <div className="relative">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Szukaj po imieniu, nazwisku, szkole..."
        className="pl-8"
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );

  if (isLoading) {
    return (
      <div className="space-y-4">
        {SearchBox}
        <LoadingTable />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        {SearchBox}
        <div className="rounded-md bg-destructive/15 p-4 text-destructive">
          {error.message}
        </div>
      </div>
    );
  }

  if (!studentsData || studentsData.length === 0) {
    return (
      <div className="space-y-4">
        {SearchBox}
        <div className="rounded-md bg-muted p-4 text-muted-foreground">
          Brak studentów do wyświetlenia
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {SearchBox}
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
