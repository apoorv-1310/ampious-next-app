export interface IGymOwner {
  fname?: string;
  lname?: string;
  phoneNo: any;
  pincode?: string;
  emailVerified?: boolean;
  gender?: string;
  image?: string;
  email: any;
  password: string;
  avatar?: string;
  bio?: string;
  dob?: string;
  createdOn?: Date;
  updatedOn?: Date;
}

export interface IGymOwnerResponse extends IGymOwner {
  _id: string;
  actions?: any;
}
