# karma-led-reporter

karma-led-reporter uses a [arduino rgb led][1] device to display [Karma][0] test results.

## Usage

1. Assemble arduino circuit and upload [sketch][1]

2. Install [karma-led-reporter][2]

        $ npm install karma-led-reporter --save-dev


3. Add the plugin to reporters

        reporters = ['led'];

4. Run your tests

## Configuration

Settings of the plugin can be changes in the Karma config file by adding the `led` key.

```js
   /* Default vales */
   led = {
       serialport: '/dev/ttyUSB0',
       baudrate: '9600',
       error: '#F00',
       success: '#0F0',
       loading: '#A30'
   },
```

## License

karma-led-reporter is licensed under the [MIT License][3].

  [0]: http://karma-runner.github.com
  [1]: https://github.com/val-/rgb-led-sketch
  [2]: https://github.com/val-/karma-led-reporter
  [3]: http://opensource.org/licenses/MIT
