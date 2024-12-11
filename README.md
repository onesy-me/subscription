
</br>
</br>

<p align='center'>
  <a target='_blank' rel='noopener noreferrer' href='#'>
    <img src='utils/images/logo.svg' alt='onesy logo' />
  </a>
</p>

<h1 align='center'>onesy Subscription</h1>

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
yarn add @onesy/subscription
```

### Use

```javascript
  import OnesySubscription from '@onesy/subscription';

  // Make a new subscription instance
  // with an optional initial value
  const onesySub = new OnesySubscription('🙂');

  // Value
  onesySub.value;

  // '🙂'

  const method = (...value) => console.log('Yup, I got it ', ...value);

  const method1 = value => console.log('Yup, I got it as well ', value);

  // Methods subscribe
  onesySub.subscribe(method);

  onesySub.subscribe(method1);

  // Emit a value to all subscribed methods
  // a value always emitted as arguments received by emit method
  onesySub.emit('🌱', '🌱', '🌱', '🌱');

  // method, log:
  // Yup, I got it 🌱 🌱 🌱 🌱

  // method1, log:
  // Yup, I got it as well 🌱

  // Methods unsubscribe
  onesySub.unsubscribe(method);

  onesySub.unsubscribe(method1);

  // or with anonymous method
  const subscription = onesySub.subscribe(value => console.log(value));

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
