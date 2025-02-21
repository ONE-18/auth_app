import fs from 'fs';
import path from 'path';
import { User } from '../User';

// Ruta al archivo JSON que contiene los usuarios
const usersFilePath = path.join(__dirname, '../../config/users.json');

export class AuthService {
  private users: User[];

  constructor() {
    // Leer el contenido del archivo de usuarios y parsearlo a un array de usuarios
    const fileContent = fs.readFileSync(usersFilePath, 'utf-8');
    this.users = JSON.parse(fileContent);
  }

  // Método para autenticar un usuario por email y contraseña
  authenticate(email: string, password: string): boolean {
    // Verificar si existe un usuario con el email y contraseña proporcionados
    return this.users.some(user => user.email === email && user.password === password);
  }
}

// Crear una instancia de AuthService y exportarla
export const authService = new AuthService();
