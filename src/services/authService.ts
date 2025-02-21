import fs from 'fs';
import path from 'path';
import { User } from '../User';

const usersFilePath = path.join(__dirname, '../../config/users.json');

export class AuthService {
  private users: User[];

  constructor() {
    const fileContent = fs.readFileSync(usersFilePath, 'utf-8');
    this.users = JSON.parse(fileContent);
  }

  authenticate(email: string, password: string): boolean {
    return this.users.some(user => user.email === email && user.password === password);
  }
}

export const authService = new AuthService();
