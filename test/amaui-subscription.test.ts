/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { equalDeep } from '@amaui/utils';

import { evaluate } from '../utils/js/test/utils';

import AmauiSubscription from '../src';

group('@amaui/subscription', () => {

  to('value', async () => {
    const values_ = [
      new AmauiSubscription().value,
      new AmauiSubscription('a').value,
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        new window.AmauiSubscription().value,
        new window.AmauiSubscription('a').value,
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      undefined,
      'a',
    ]));
  });

  to('length', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauisubscription = new window.AmauiSubscription();

      const method = (v: any) => v + 1;
      const method1 = (v: any) => v + 1;
      const method2 = (v: any) => v + 1;

      amauisubscription.subscribe(method);
      amauisubscription.subscribe(method1);
      amauisubscription.subscribe(method2);

      return amauisubscription.length;
    });

    const amauisubscription = new AmauiSubscription();

    const method = (v: any) => v + 1;
    const method1 = (v: any) => v + 1;
    const method2 = (v: any) => v + 1;

    amauisubscription.subscribe(method);
    amauisubscription.subscribe(method1);
    amauisubscription.subscribe(method2);

    const valueNode = amauisubscription.length;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(3));
  });

  to('subscribe', async () => {
    const amauisubscription = new AmauiSubscription();

    const method = () => { };
    const method1 = () => { };

    amauisubscription.subscribe(method);
    amauisubscription.subscribe(method);
    amauisubscription.subscribe(method);
    amauisubscription.subscribe(method1);
    amauisubscription.subscribe(method1);

    const values_ = [
      amauisubscription.methods.length,
      amauisubscription.methods[0] === method && amauisubscription.methods[1] === method1,
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const amauisubscription = new window.AmauiSubscription();

      const method = () => { };
      const method1 = () => { };

      amauisubscription.subscribe(method);
      amauisubscription.subscribe(method);
      amauisubscription.subscribe(method);
      amauisubscription.subscribe(method1);
      amauisubscription.subscribe(method1);

      const values_ = [
        amauisubscription.methods.length,
        amauisubscription.methods[0] === method && amauisubscription.methods[1] === method1,
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      2,
      true,
    ]));
  });

  to('unsubscribe', async () => {
    const amauisubscription = new AmauiSubscription();

    const method = () => { };
    const method1 = () => { };
    const method4 = () => { };

    amauisubscription.subscribe(method);
    amauisubscription.subscribe(method);
    amauisubscription.subscribe(method);

    amauisubscription.subscribe(method4);

    amauisubscription.unsubscribe(method);
    amauisubscription.unsubscribe(method1);

    const values_ = [
      amauisubscription.methods.length,
      amauisubscription.methods[0] === method4,
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const amauisubscription = new window.AmauiSubscription();

      const method = () => { };
      const method1 = () => { };
      const method4 = () => { };

      amauisubscription.subscribe(method);
      amauisubscription.subscribe(method);
      amauisubscription.subscribe(method);

      amauisubscription.subscribe(method4);

      amauisubscription.unsubscribe(method);
      amauisubscription.unsubscribe(method1);

      const values_ = [
        amauisubscription.methods.length,
        amauisubscription.methods[0] === method4,
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      1,
      true,
    ]));
  });

  to('emit', async () => {
    const amauisubscription = new AmauiSubscription();

    const value = [];
    const value1 = [];

    const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);
    const method1 = (...v: any) => value1.push(v.length <= 1 ? v[0] : v);

    amauisubscription.subscribe(method);
    amauisubscription.subscribe(method1);

    amauisubscription.emit();
    amauisubscription.emit([1, 4, 'a']);
    amauisubscription.emit(4);
    amauisubscription.emit(1, 4, 40);

    const values_ = [
      value,
      equalDeep(value, value1),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const amauisubscription = new window.AmauiSubscription();

      const value = [];
      const value1 = [];

      const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);
      const method1 = (...v: any) => value1.push(v.length <= 1 ? v[0] : v);

      amauisubscription.subscribe(method);
      amauisubscription.subscribe(method1);

      amauisubscription.emit();
      amauisubscription.emit([1, 4, 'a']);
      amauisubscription.emit(4);
      amauisubscription.emit(1, 4, 40);

      const values_ = [
        value,
        window.AmauiUtils.equalDeep(value, value1),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [
        undefined,
        [
          1,
          4,
          'a'
        ],
        4,
        [
          1,
          4,
          40
        ],
      ],
      true,
    ]));
  });

  to('forEach', async () => {
    const amauisubscription = new AmauiSubscription();

    const value = [1];

    const method = (v: any) => v[0]++;
    const method1 = (v: any) => v[0]++;

    amauisubscription.subscribe(method);
    amauisubscription.subscribe(method1);

    const forEach = amauisubscription.forEach(value);

    const values_ = [
      value,
      forEach
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const amauisubscription = new window.AmauiSubscription();

      const value = [1];

      const method = (v: any) => v[0]++;
      const method1 = (v: any) => v[0]++;

      amauisubscription.subscribe(method);
      amauisubscription.subscribe(method1);

      const forEach = amauisubscription.forEach(value);

      const values_ = [
        value,
        forEach
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [3],
      undefined
    ]));
  });

  to('map', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const amauisubscription = new window.AmauiSubscription();

      const method = (v: any) => v + 1;
      const method1 = (v: any) => v + 1;

      amauisubscription.subscribe(method);
      amauisubscription.subscribe(method1);

      const values_ = amauisubscription.map(1);

      return values_;
    });

    const amauisubscription = new AmauiSubscription();

    const method = (v: any) => v + 1;
    const method1 = (v: any) => v + 1;

    amauisubscription.subscribe(method);
    amauisubscription.subscribe(method1);

    const values_ = amauisubscription.map(1);

    const valueNode = values_;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(3));
  });

  group('method error throw', () => {

    to('forEach', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauisubscription = new window.AmauiSubscription();

        const value = [1];

        const method = (v: any) => v[0]++;
        const method1 = () => { throw new Error('a'); };

        amauisubscription.subscribe(method);
        amauisubscription.subscribe(method1);

        const forEach = amauisubscription.forEach(value);

        const values_ = [
          value,
          forEach
        ];

        return values_;
      });

      const amauisubscription = new AmauiSubscription();

      const value = [1];

      const method = (v: any) => v[0]++;
      const method1 = () => { throw new Error('a'); };

      amauisubscription.subscribe(method);
      amauisubscription.subscribe(method1);

      const forEach = amauisubscription.forEach(value);

      const values_ = [
        value,
        forEach
      ];

      const valueNode = values_;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        [2],
        undefined
      ]));
    });

    to('map', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const amauisubscription = new window.AmauiSubscription();

        const method = (v: any) => v + 1;
        const method1 = () => { throw new Error('a'); };

        amauisubscription.subscribe(method);
        amauisubscription.subscribe(method1);

        const values_ = amauisubscription.map(1);

        return values_;
      });

      const amauisubscription = new AmauiSubscription();

      const method = (v: any) => v + 1;
      const method1 = () => { throw new Error('a'); };

      amauisubscription.subscribe(method);
      amauisubscription.subscribe(method1);

      const values_ = amauisubscription.map(1);

      const valueNode = values_;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(undefined));
    });

  });

  group('options', () => {

    group('emit', () => {

      to('priorValue', async () => {
        const amauisubscription = new AmauiSubscription(undefined, { emit: { priorValue: false } });

        const value = [];

        const v = [1, 4, 1];

        const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);

        amauisubscription.subscribe(method);

        amauisubscription.emit(v);

        const values_ = [];

        values_.push(amauisubscription.value === undefined);

        amauisubscription.options.emit.priorValue = true;

        amauisubscription.emit(v);

        values_.push(amauisubscription.value === v);

        const valueBrowsers = await evaluate((window: any) => {
          const amauisubscription = new window.AmauiSubscription(undefined, { emit: { priorValue: false } });

          const value = [];

          const v = [1, 4, 1];

          const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);

          amauisubscription.subscribe(method);

          amauisubscription.emit(v);

          const values_ = [];

          values_.push(amauisubscription.value === undefined);

          amauisubscription.options.emit.priorValue = true;

          amauisubscription.emit(v);

          values_.push(amauisubscription.value === v);

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          true,
          true,
        ]));
      });

      to('copy', async () => {
        const amauisubscription = new AmauiSubscription(undefined, { emit: { copy: true } });

        const value = [];

        const v = [1, 4, 1];

        const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);

        amauisubscription.subscribe(method);

        amauisubscription.emit(v);

        amauisubscription.options.emit.copy = false;

        amauisubscription.emit(v);

        const values_ = [
          value[0] !== v,
          value[1] === v,
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const amauisubscription = new window.AmauiSubscription(undefined, { emit: { copy: true } });

          const value = [];

          const v = [1, 4, 1];

          const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);

          amauisubscription.subscribe(method);

          amauisubscription.emit(v);

          amauisubscription.options.emit.copy = false;

          amauisubscription.emit(v);

          const values_ = [
            value[0] !== v,
            value[1] === v,
          ];

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          true,
          true,
        ]));
      });

    });

    group('pre', () => {

      to('method', async () => {
        const amauisubscription = new AmauiSubscription();

        const value = [];

        const v = [1, 4, 1];

        const preMethod = (...v: any) => value.push(4, v.length <= 1 ? v[0] : v);
        const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);

        amauisubscription.options.emit.pre.method = preMethod;

        amauisubscription.subscribe(method);

        amauisubscription.emit(v);

        const values_ = [
          equalDeep([
            4,
            v,
            v,
          ], value),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const amauisubscription = new window.AmauiSubscription();

          const value = [];

          const v = [1, 4, 1];

          const preMethod = (...v: any) => value.push(4, v.length <= 1 ? v[0] : v);
          const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);

          amauisubscription.options.emit.pre.method = preMethod;

          amauisubscription.subscribe(method);

          amauisubscription.emit(v);

          const values_ = [
            window.AmauiUtils.equalDeep([
              4,
              v,
              v,
            ], value),
          ];

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          true,
        ]));
      });

    });

    group('post', () => {

      to('method', async () => {
        const amauisubscription = new AmauiSubscription();

        const value = [];

        const v = [1, 4, 1];

        const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);
        const postMethod = (...v: any) => value.push(v.length <= 1 ? v[0] : v, 4);

        amauisubscription.options.emit.post.method = postMethod;

        amauisubscription.subscribe(method);

        amauisubscription.emit(v);

        const values_ = [
          equalDeep([
            v,
            v,
            4,
          ], value),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const amauisubscription = new window.AmauiSubscription();

          const value = [];

          const v = [1, 4, 1];

          const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);
          const postMethod = (...v: any) => value.push(v.length <= 1 ? v[0] : v, 4);

          amauisubscription.options.emit.post.method = postMethod;

          amauisubscription.subscribe(method);

          amauisubscription.emit(v);

          const values_ = [
            window.AmauiUtils.equalDeep([
              v,
              v,
              4,
            ], value),
          ];

          return values_;
        });
        const valueNode = values_;
        const values = [valueNode, ...valueBrowsers];

        values.forEach(value => assert(value).eql([
          true,
        ]));
      });

    });

  });

});
