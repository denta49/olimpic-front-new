import { config } from "@/config";

export interface Address {
  street: string;
  postalCode: string;
  city: string;
}

export interface School {
  class: string;
  name: string;
  address: Address;
}

export interface District {
  "@id": string;
  "@type": string;
  name: string;
  address: {
    "@context": string;
    "@id": string;
    "@type": string;
    street: string;
    postalCode: string;
    city: string;
  };
  id: string;
}

export interface ApplicationFile {
  // Add properties as needed
  id: string;
  name: string;
  url: string;
}

export interface Application {
  "@id": string;
  district: string;
  files: ApplicationFile[];
  recentFile: ApplicationFile;
  student: string;
  gradeFirstStage: number;
  gradeSecondStage?: {
    firstGrade: number;
    secondGrade: number;
    thirdGrade: number;
  };
  gradeThirdStage?: {
    firstGrade: number;
    comment: string;
  };
  comment?: string;
}

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  fathersFirstName: string;
  birthCity: string;
  county: string;
  teachersName: string;
  patronName: string;
  birthDate: Date;
  district: District;
  address: Address;
  school: School;
  state: string;
  UUID: string;
  application: Application;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

export const studentsApi = {
  getStudents: async (
    search: string,
    districtId?: string,
  ): Promise<ApiResponse<Student[]>> => {
    try {
      const searchParams = new URLSearchParams();

      if (search) {
        searchParams.append("firstName", search);
        searchParams.append("lastName", search);
        searchParams.append("school.name", search);
      }

      if (districtId && districtId !== "all") {
        searchParams.append("district.id", districtId);
      }

      const response = await fetch(
        `${config.API_URL}/students?${searchParams.toString()}`,
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data: data["hydra:member"] };
    } catch (error) {
      console.error("Błąd pobierania uczniów:", error);
      return { error: "Nie udało się pobrać listy uczniów" };
    }
  },
};
