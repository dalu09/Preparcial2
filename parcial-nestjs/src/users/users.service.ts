import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, username: 'lucy', password: '1234', roles: ['admin'] },
  ];

  async validateUser(username: string, password: string) {
    const user = this.users.find(
      u => u.username === username && u.password === password,
    );
    return user || null;
  }
}
