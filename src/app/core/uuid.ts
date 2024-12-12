import {v4 as uuid} from 'uuid';

export class UUID {
  get value(): string {
    return this._value;
  }
  private _value = uuid();

  constructor(value: string | number | null = null) {
    if (value) {
      this._value = String(value);
    }
  }
}
