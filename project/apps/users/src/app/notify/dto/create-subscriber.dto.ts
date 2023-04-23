export class CreateSubscriberDto {
  public email: string;
  public name: string;

  constructor(user: CreateSubscriberDto) {
    this.email = user.email;
    this.name = user.name;
  }
}
