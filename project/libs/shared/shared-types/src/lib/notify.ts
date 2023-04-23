export interface Subscriber {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
}

export enum RabbitRouting {
  AddSubscriber = 'notify.addSubscriber'
}
