export type Kind = true | false | null;

export interface UserSearchDTO {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  age?: number;
  phoneNumber?: number;
  image?: string;
  friends?: Kind;
}
