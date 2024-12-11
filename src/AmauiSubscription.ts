import is from '@onesy/utils/is';
import copy from '@onesy/utils/copy';
import Try from '@onesy/utils/try';
import { TMethod } from '@onesy/models';

export interface ISubscribe {
  unsubscribe: () => void;
}

export interface IOptions {
  emit?: {
    priorValue?: boolean;

    copy?: boolean;

    pre?: {
      method?: TMethod;
    };

    post?: {
      method?: TMethod;
    };
  };
}

const optionsDefault: IOptions = {
  emit: {
    priorValue: true,

    copy: false,

    pre: {},

    post: {},
  },
};

export interface IOnesySubscription<T> {
  methods: Array<TMethod>;

  emit(value: T, ...other: any[]): void;
  // alias
  push(value: T, ...other: any[]): void;

  subscribe(method: TMethod): void;
  unsubscribe(method: TMethod): void;

  // Any other new custom properties
  [p: string]: any;
}

class OnesySubscription<T = any> implements IOnesySubscription<T> {
  public methods: Array<TMethod> = [];

  public constructor(
    public value?: T,
    public options: IOptions = {}
  ) {
    this.options = { ...optionsDefault, ...this.options };
  }

  public get length() { return this.methods.length; }

  public emit(value: T, ...other: any[]): void {
    const values = [value, ...other];

    // Important for use cases,
    // to be available pre emit,
    // Save value as last emitted value as a previous state optionally
    if (this.options.emit?.priorValue) this.value = values.length === 1 ? values[0] : values;

    // Pre
    // Value might be of simple type so we have to assign a new value to the value
    if (is('function', this.options.emit.pre?.method)) this.options.emit.pre.method(...values);

    // Whether to send a copied value version or not,
    // it might be useful since if value is of reference type,
    // methods in the beginning might update the value,
    // and other following methods wouldn't get the
    // same value as it was sent to the first method.
    const methodValue = this.options.emit.copy ? copy(values) : values;

    const methods = this.methods.filter(method => is('function', method));

    // Emit to methods
    for (const method of methods) Try(() => method(...methodValue));

    // Post
    // Value might be of simple type so we have to assign a new value to the value
    if (is('function', this.options.emit.post?.method)) this.options.emit.post.method(...values);
  }

  // alias
  public push = this.emit;

  public forEach(...args: any[]): void {
    this.methods.forEach(method => Try(() => method(...args)));
  }

  public map(value_?: any): any {
    if (!this.methods.length) return;

    let value: any = value_;

    for (const method of this.methods) value = Try(() => method(value));

    return value;
  }

  public subscribe(method: TMethod): ISubscribe {
    if (is('function', method) && this.methods.indexOf(method) === -1) this.methods.push(method);

    const instance = this;

    return {
      unsubscribe: () => {
        instance.unsubscribe(method);
      }
    };
  }

  public unsubscribe(method: TMethod): void {
    if (is('function', method) && this.methods.indexOf(method) > -1) {
      const index = this.methods.findIndex(method_ => method_ === method);

      if (index > -1) this.methods.splice(index, 1);
    }
  }
}

export default OnesySubscription;
