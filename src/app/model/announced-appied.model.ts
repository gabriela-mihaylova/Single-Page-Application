import { User } from '../auth/user_model';
import { Announce } from './announce.model';
export interface AnnouncedAppied {

    //id: number;
    //title:string;
    //user: string;
     id:number;
     username: string;
     announce:Announce;

}
