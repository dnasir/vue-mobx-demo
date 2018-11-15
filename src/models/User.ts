import { observable, computed } from 'mobx';

export default class User {
  id: string = '';

  @observable
  name: string = '';

  @observable
  lastName: string = '';

  @computed
  get fullName() {
    return `${this.name} ${this.lastName}`;
  }
}