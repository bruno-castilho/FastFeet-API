type RoleOptions = 'ADMIN' | 'DELIVERY_PERSON'

export class Role {
  public value: RoleOptions

  private constructor(value: RoleOptions) {
    this.value = value
  }

  static create(value: RoleOptions) {
    return new Role(value)
  }
}
