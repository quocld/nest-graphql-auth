import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user-input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);

    const valid = await bcrypt.compare(password, user.password);

    if (user && valid) {
      const { password, ...result } = user;
      return result; //{id: 1, username: "quocle2208"}
    }

    return null;
  }

  async login(user: User) {
    return {
      access_token: this.jwtService.sign({
        username: user.username,
        sub: user.id,
      }),
      user: user,
    };
  }

  async signup(loginUserInput: LoginUserInput) {
    const userExisting = await this.userService.findOne(
      loginUserInput.username,
    );

    if (userExisting) {
      throw new Error('Username already exists!');
    }

    const password = await bcrypt.hash(loginUserInput.password, 10);

    return this.userService.createUser({
      username: loginUserInput.username,
      password: password,
    });
  }
}
