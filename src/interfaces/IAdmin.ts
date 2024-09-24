export interface IAdmin {
  fname: string;
  lname: string;
  phoneNo: any;
  email: any;
  password: string;
  avatar: string;
}

export interface IAdminResponse extends IAdmin {
  id: string;
  _id: string;
}
