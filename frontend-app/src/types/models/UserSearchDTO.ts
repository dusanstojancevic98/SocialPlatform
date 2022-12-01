export type Kind = true | false | null;

export interface UserSearchDTO {
  id: number;
  username: string;
  email: string;
  fristName: string;
  lastName: string;
  gender?: string;
  age?: number;
  phoneNumber?: number;
  image?: string;
  friends: Kind;
}
