import { Student } from '../model/student.schema';

export interface CreateStudentResponse {
  status: number;
  result?: any;
  message?: string;
  error?: string;
}

export interface StudentsResponse {
  status: number;
  result?: Student[];
  message?: string;
  error?: string;
}

export interface StudentResponse {
  status: number;
  result?: Student;
  message?: string;
  error?: string;
}
