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
    searchQuery?: string,
  ): Promise<ApiResponse<Student[]>> => {
    try {
      const url = `${config.API_URL}/students${
        searchQuery ? `?search=${encodeURIComponent(searchQuery)}` : ""
      }`;

      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.json();
        return { error: error.message || "Nie udało się pobrać listy uczniów" };
      }

      const data = await response.json();
      const students = data["hydra:member"] || data;
      return { data: students };
    } catch (error) {
      console.error("Błąd pobierania uczniów:", error);
      return { error: "Wystąpił błąd podczas pobierania listy uczniów" };
    }
  },
};
