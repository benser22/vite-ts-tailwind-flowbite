export interface User {
  id: string;
  role: string;
  name: string;
  email: string;
  phone: null;
  createdAt: Date;
  updatedAt: Date;
  address: null;
  city: string;
  country: string;
  image: string;
  lastName: string;
  postalCode: null;
  username: string;
  verificationCode: null;
  status: string;
  dateOfBirth: Date | string;
  token: string;
}
