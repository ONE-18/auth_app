import { v4 as uuidv4 } from 'uuid'; // uuid -> generate unique identifiers

class SessionService {
  // A Map to store session tokens and associated email addresses
  private sessions: Map<string, string> = new Map();

  // Method to create a new session for a given email
  createSession(email: string): string {
    const token = uuidv4();
    this.sessions.set(token, email);
    return token;
  }

  // Method to validate if a session token exists in the sessions map
  validateSession(token: string): boolean {
    return this.sessions.has(token);
  }

  // Method to delete a session token
  deleteSession(token: string): void {
    this.sessions.delete(token);
  }
}

export const sessionService = new SessionService();