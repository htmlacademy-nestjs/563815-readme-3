export interface Subscriber {
  id?: string;
  email: string;
  name: string;
}

export enum RabbitRouting {
  AddSubscriber = 'notify.addSubscriber',
}
