import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  private readonly users = [
    { id: 1, username: 'quocle2208', password: 'not-secure' },
    { id: 2, username: 'kem2820012', password: 'not-secure' },
  ];

  createUser(createUserInput: CreateUserInput) {
    const user = {
      id: this.users.length + 1,
      ...createUserInput,
    };

    this.users.push(user);
    console.log(user);
    console.log(this.users);
    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
