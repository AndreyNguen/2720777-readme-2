import { Injectable } from '@nestjs/common';
import { AuthUser } from '@project/shared/app/types';
import { randomUUID } from 'node:crypto';

@Injectable()
export class UserRepository {
  private readonly users = new Map<string, AuthUser>();

  findById(id: string) {
    return this.users.get(id) ?? null;
  }

  findByEmail(email: string) {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async createUser(
    user: Omit<AuthUser, 'id' | 'createdAt'>,
  ): Promise<AuthUser> {
    const created: AuthUser = {
      ...user,
      id: randomUUID(),
      createdAt: new Date(),
    };
    this.users.set(created.id, created);
    return created;
  }
}
