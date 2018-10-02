export class User {
  static id_counter = 0;
  constructor(
    public name: string,
    public readonly id: string = 'user_' + (++User.id_counter)) {
  }
  static isUserObject(obj: Object): boolean {
    return obj instanceof User;
  }
  static fromObject(obj: Object): User {
    if ('id' in obj && 'name' in obj) {
      return new User(obj['name'], obj['id']);
    }
    throw new Error('Can not convert provided object to User instance');
  }
}
