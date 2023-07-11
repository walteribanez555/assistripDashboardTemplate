import { User } from "src/app/Shared/models/Data/User";



export interface CheckTokenResponse{

  user : User,
  token : string,

}
