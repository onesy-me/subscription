
</br >
</br >

<p align='center'>
  <a target='_blank' rel='noopener noreferrer' href='#'>
    <img src='utils/images/logo.svg' alt='amaui logo' />
  </a>
</p>

<h1 align='center'>amaui Subscription</h1>

<p align='center'>
  Subscription methods management
</p>

<br />

<h3 align='center'>
  <sub>MIT license&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Production ready&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>UMD 2.7kb gzipped&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>100% test cov&nbsp;&nbsp;&nbsp;&nbsp;</sub>
  <sub>Browser and Nodejs</sub>
</h3>

<p align='center'>
    <sub>Very simple code&nbsp;&nbsp;&nbsp;&nbsp;</sub>
    <sub>Modern code&nbsp;&nbsp;&nbsp;&nbsp;</sub>
    <sub>Junior friendly&nbsp;&nbsp;&nbsp;&nbsp;</sub>
    <sub>Typescript&nbsp;&nbsp;&nbsp;&nbsp;</sub>
    <sub>Made with :yellow_heart:</sub>
</p>

<br />

## Getting started

### Add

```sh
  yarn add @amaui/subscription
```

### Use

```javascript
  import AmauiSubscription from '@amaui/subscription';

  // Make a new subscription instance
  // with an optional initial value
  const amauiSub = new AmauiSubscription('🙂');

  // Value
  amauiSub.value;

  // '🙂'

  const method = (...value) => console.log('Yup, I got it ', ...value);

  const method1 = value => console.log('Yup, I got it as well ', value);

  // Methods subscribe
  amauiSub.subscribe(method);

  amauiSub.subscribe(method1);

  // Emit a value to all subscribed methods
  // a value always emitted as arguments received by emit method
  amauiSub.emit('🌱', '🌱', '🌱', '🌱');

  // method, log:
  // Yup, I got it 🌱 🌱 🌱 🌱

  // method1, log:
  // Yup, I got it as well 🌱

  // Methods unsubscribe
  amauiSub.unsubscribe(method);

  amauiSub.unsubscribe(method1);

  // or with anonymous method
  const subscription = amauiSub.subscribe(value => console.log(value));

  subscription.unsubscribe();
```

### Dev

Install

```sh
  yarn
```

Test

```sh
  yarn test
```

### Prod

Build

```sh
  yarn build
```
