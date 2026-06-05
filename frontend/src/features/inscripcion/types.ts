export type EnrollmentStatus =
  | 'pending'
  | 'reviewed'
  | 'contacted'
  | 'archived';

export interface EnrollmentRequestInput {
  studentFirstName: string;
  studentLastName: string;
  studentDni: string;
  birthDate: string;
  educationalLevel: string;
  schoolYear: string;
  responsibleFullName: string;
  responsibleRelation: string;
  phone: string;
  email: string;
  notes: string;
}

export interface EnrollmentRequest extends EnrollmentRequestInput {
  id: string;
  createdAt: string;
  status: EnrollmentStatus;
  source: 'public-form';
}
