export interface recruiterInterface {
  _id: string;
  companyName: string;
  userName: string;
  email: string;
  password: string;
}

export interface createRecruiterInterface {
  companyName: string;
  userName: string;
  email: string;
  password?: string;
}
