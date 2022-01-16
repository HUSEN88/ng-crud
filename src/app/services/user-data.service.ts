import {InMemoryDbService} from 'angular-in-memory-web-api';
import { User } from '../model/user.model';


export class UserData implements InMemoryDbService {
  createDb(){
    const users:User[] = [
      { id: 1, name: 'Ram', email: 'ram@gmail.com', phone: '0000000000', location: 'Mumbai'  },
      { id: 2, name: 'Shyam', email: 'sh@gmail.com', phone: '1111111111', location: 'Shimla'  },
      { id: 3, name: 'Mohan', email: 'moh@live.in', phone: '2222222222', location: 'Channai'  },
      { id: 4, name: 'Rohan', email: 'rohan@gmail.com', phone: '6666666666', location: 'Kullumanali' },
      { id: 5, name: 'Sumit', email: 'sumit@live.in', phone: '9909999999', location: 'Ajmer'  }
    ];
    return {users};
  }
}
