/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { equalDeep } from '@onesy/utils';

import { evaluate } from '../utils/js/test/utils';

import OnesySubscription from '../src';

group('OnesySubscription', () => {

  to('value', async () => {
    const values_ = [
      new OnesySubscription().value,
      new OnesySubscription('a').value,
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        new window.OnesySubscription().value,
        new window.OnesySubscription('a').value,
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
      const onesysubscription = new window.OnesySubscription();

      const method = (v: any) => v + 1;
      const method1 = (v: any) => v + 1;
      const method2 = (v: any) => v + 1;

      onesysubscription.subscribe(method);
      onesysubscription.subscribe(method1);
      onesysubscription.subscribe(method2);

      return onesysubscription.length;
    });

    const onesysubscription = new OnesySubscription();

    const method = (v: any) => v + 1;
    const method1 = (v: any) => v + 1;
    const method2 = (v: any) => v + 1;

    onesysubscription.subscribe(method);
    onesysubscription.subscribe(method1);
    onesysubscription.subscribe(method2);

    const valueNode = onesysubscription.length;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(3));
  });

  to('subscribe', async () => {
    const onesysubscription = new OnesySubscription();

    const method = () => { };
    const method1 = () => { };

    onesysubscription.subscribe(method);
    onesysubscription.subscribe(method);
    onesysubscription.subscribe(method);
    onesysubscription.subscribe(method1);
    onesysubscription.subscribe(method1);

    const values_ = [
      onesysubscription.methods.length,
      onesysubscription.methods[0] === method && onesysubscription.methods[1] === method1,
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const onesysubscription = new window.OnesySubscription();

      const method = () => { };
      const method1 = () => { };

      onesysubscription.subscribe(method);
      onesysubscription.subscribe(method);
      onesysubscription.subscribe(method);
      onesysubscription.subscribe(method1);
      onesysubscription.subscribe(method1);

      const values_ = [
        onesysubscription.methods.length,
        onesysubscription.methods[0] === method && onesysubscription.methods[1] === method1,
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
    const onesysubscription = new OnesySubscription();

    const method = () => { };
    const method1 = () => { };
    const method4 = () => { };

    onesysubscription.subscribe(method);
    onesysubscription.subscribe(method);
    onesysubscription.subscribe(method);

    onesysubscription.subscribe(method4);

    onesysubscription.unsubscribe(method);
    onesysubscription.unsubscribe(method1);

    const values_ = [
      onesysubscription.methods.length,
      onesysubscription.methods[0] === method4,
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const onesysubscription = new window.OnesySubscription();

      const method = () => { };
      const method1 = () => { };
      const method4 = () => { };

      onesysubscription.subscribe(method);
      onesysubscription.subscribe(method);
      onesysubscription.subscribe(method);

      onesysubscription.subscribe(method4);

      onesysubscription.unsubscribe(method);
      onesysubscription.unsubscribe(method1);

      const values_ = [
        onesysubscription.methods.length,
        onesysubscription.methods[0] === method4,
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
    const onesysubscription = new OnesySubscription();

    const value = [];
    const value1 = [];

    const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);
    const method1 = (...v: any) => value1.push(v.length <= 1 ? v[0] : v);

    onesysubscription.subscribe(method);
    onesysubscription.subscribe(method1);

    onesysubscription.emit();
    onesysubscription.emit([1, 4, 'a']);
    onesysubscription.emit(4);
    onesysubscription.emit(1, 4, 40);

    const values_ = [
      value,
      equalDeep(value, value1),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const onesysubscription = new window.OnesySubscription();

      const value = [];
      const value1 = [];

      const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);
      const method1 = (...v: any) => value1.push(v.length <= 1 ? v[0] : v);

      onesysubscription.subscribe(method);
      onesysubscription.subscribe(method1);

      onesysubscription.emit();
      onesysubscription.emit([1, 4, 'a']);
      onesysubscription.emit(4);
      onesysubscription.emit(1, 4, 40);

      const values_ = [
        value,
        window.OnesyUtils.equalDeep(value, value1),
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
    const onesysubscription = new OnesySubscription();

    const value = [1];

    const method = (v: any) => v[0]++;
    const method1 = (v: any) => v[0]++;

    onesysubscription.subscribe(method);
    onesysubscription.subscribe(method1);

    const forEach = onesysubscription.forEach(value);

    const values_ = [
      value,
      forEach
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const onesysubscription = new window.OnesySubscription();

      const value = [1];

      const method = (v: any) => v[0]++;
      const method1 = (v: any) => v[0]++;

      onesysubscription.subscribe(method);
      onesysubscription.subscribe(method1);

      const forEach = onesysubscription.forEach(value);

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
      const onesysubscription = new window.OnesySubscription();

      const method = (v: any) => v + 1;
      const method1 = (v: any) => v + 1;

      onesysubscription.subscribe(method);
      onesysubscription.subscribe(method1);

      const values_ = onesysubscription.map(1);

      return values_;
    });

    const onesysubscription = new OnesySubscription();

    const method = (v: any) => v + 1;
    const method1 = (v: any) => v + 1;

    onesysubscription.subscribe(method);
    onesysubscription.subscribe(method1);

    const values_ = onesysubscription.map(1);

    const valueNode = values_;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(3));
  });

  group('method error throw', () => {

    to('forEach', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const onesysubscription = new window.OnesySubscription();

        const value = [1];

        const method = (v: any) => v[0]++;
        const method1 = () => { throw new Error('a'); };

        onesysubscription.subscribe(method);
        onesysubscription.subscribe(method1);

        const forEach = onesysubscription.forEach(value);

        const values_ = [
          value,
          forEach
        ];

        return values_;
      });

      const onesysubscription = new OnesySubscription();

      const value = [1];

      const method = (v: any) => v[0]++;
      const method1 = () => { throw new Error('a'); };

      onesysubscription.subscribe(method);
      onesysubscription.subscribe(method1);

      const forEach = onesysubscription.forEach(value);

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
        const onesysubscription = new window.OnesySubscription();

        const method = (v: any) => v + 1;
        const method1 = () => { throw new Error('a'); };

        onesysubscription.subscribe(method);
        onesysubscription.subscribe(method1);

        const values_ = onesysubscription.map(1);

        return values_;
      });

      const onesysubscription = new OnesySubscription();

      const method = (v: any) => v + 1;
      const method1 = () => { throw new Error('a'); };

      onesysubscription.subscribe(method);
      onesysubscription.subscribe(method1);

      const values_ = onesysubscription.map(1);

      const valueNode = values_;

      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(undefined));
    });

  });

  group('options', () => {

    group('emit', () => {

      to('priorValue', async () => {
        const onesysubscription = new OnesySubscription(undefined, { emit: { priorValue: false } });

        const value = [];

        const v = [1, 4, 1];

        const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);

        onesysubscription.subscribe(method);

        onesysubscription.emit(v);

        const values_ = [];

        values_.push(onesysubscription.value === undefined);

        onesysubscription.options.emit.priorValue = true;

        onesysubscription.emit(v);

        values_.push(onesysubscription.value === v);

        const valueBrowsers = await evaluate((window: any) => {
          const onesysubscription = new window.OnesySubscription(undefined, { emit: { priorValue: false } });

          const value = [];

          const v = [1, 4, 1];

          const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);

          onesysubscription.subscribe(method);

          onesysubscription.emit(v);

          const values_ = [];

          values_.push(onesysubscription.value === undefined);

          onesysubscription.options.emit.priorValue = true;

          onesysubscription.emit(v);

          values_.push(onesysubscription.value === v);

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
        const onesysubscription = new OnesySubscription(undefined, { emit: { copy: true } });

        const value = [];

        const v = [1, 4, 1];

        const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);

        onesysubscription.subscribe(method);

        onesysubscription.emit(v);

        onesysubscription.options.emit.copy = false;

        onesysubscription.emit(v);

        const values_ = [
          value[0] !== v,
          value[1] === v,
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const onesysubscription = new window.OnesySubscription(undefined, { emit: { copy: true } });

          const value = [];

          const v = [1, 4, 1];

          const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);

          onesysubscription.subscribe(method);

          onesysubscription.emit(v);

          onesysubscription.options.emit.copy = false;

          onesysubscription.emit(v);

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
        const onesysubscription = new OnesySubscription();

        const value = [];

        const v = [1, 4, 1];

        const preMethod = (...v: any) => value.push(4, v.length <= 1 ? v[0] : v);
        const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);

        onesysubscription.options.emit.pre.method = preMethod;

        onesysubscription.subscribe(method);

        onesysubscription.emit(v);

        const values_ = [
          equalDeep([
            4,
            v,
            v,
          ], value),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const onesysubscription = new window.OnesySubscription();

          const value = [];

          const v = [1, 4, 1];

          const preMethod = (...v: any) => value.push(4, v.length <= 1 ? v[0] : v);
          const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);

          onesysubscription.options.emit.pre.method = preMethod;

          onesysubscription.subscribe(method);

          onesysubscription.emit(v);

          const values_ = [
            window.OnesyUtils.equalDeep([
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
        const onesysubscription = new OnesySubscription();

        const value = [];

        const v = [1, 4, 1];

        const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);
        const postMethod = (...v: any) => value.push(v.length <= 1 ? v[0] : v, 4);

        onesysubscription.options.emit.post.method = postMethod;

        onesysubscription.subscribe(method);

        onesysubscription.emit(v);

        const values_ = [
          equalDeep([
            v,
            v,
            4,
          ], value),
        ];

        const valueBrowsers = await evaluate((window: any) => {
          const onesysubscription = new window.OnesySubscription();

          const value = [];

          const v = [1, 4, 1];

          const method = (...v: any) => value.push(v.length <= 1 ? v[0] : v);
          const postMethod = (...v: any) => value.push(v.length <= 1 ? v[0] : v, 4);

          onesysubscription.options.emit.post.method = postMethod;

          onesysubscription.subscribe(method);

          onesysubscription.emit(v);

          const values_ = [
            window.OnesyUtils.equalDeep([
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
