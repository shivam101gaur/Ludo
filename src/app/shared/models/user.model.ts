export interface User {
  id: string;
  email?: string;
  name: string;
  gender?: 'male' | 'female' | 'other';
}