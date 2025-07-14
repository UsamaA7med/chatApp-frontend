type TUser = {
  _id: string;
  fullname: string;
  email: string;
  profilePic: {
    publicId: string;
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

type TChat = {
  _id: string;
  sender: TUser;
  reciver: TUser;
  content: string;
  image:{
    publicId: string;
    url: string;
  }
  createdAt: string;
  updatedAt: string;
}

export type {TUser, TChat}
