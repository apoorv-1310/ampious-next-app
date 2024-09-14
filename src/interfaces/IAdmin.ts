export interface IAdmin {
  fname: string;
  lname: string;
  phoneNo: any;
  email: any;
  password: string;
  avatar: string;
}

export interface IAdminResponse extends IAdmin {
  _id: string;
}
