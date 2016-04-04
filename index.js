
var SerialPort = require("serialport").SerialPort;

function LedReporter(helper, logger, config) {

    var DEFAULT_CONFIG = {
        serialport: '/dev/ttyUSB0',
        baudrate: '9600',
        error: '#F00',
        success: '#0F0',
        loading: '#A30'
    };

    var config = helper.merge(DEFAULT_CONFIG, config);
    var log = logger.create('reporter.led');
    var serialPort = new SerialPort(config.serialport, {
        baudrate: config.baudrate
    });

    serialPort.on('open', function () {
        setColor(config.loading);
    });

    this.onBrowserComplete = function (browser) {
        var results = browser.lastResult;
        if (results.disconnected || results.error || results.failed) {
            setColor(config.error);
        } else {
            setColor(config.success);
        }
        serialPort.close();
    };

    function setColor(color, close) {
        serialPort.write(hexColorToDec(color) + '\n', function (err, results) {
            if (err) {
                log.warn('failed write to serialPort: ' + err);
            }
        });
    }

    function hexColorToDec(input) {
        if (typeof input !== 'string') return;
        var chars = input.split(''), step, output='';
        chars.shift();
        if (chars.length === 3) step = 1;
        else if (chars.length === 6) step = 2;
        else return;
        for (var i=0; i<3; i++) {
            var charsPart = chars.slice(i*step, i*step+step).join('');
            if (charsPart.length === 1) charsPart += charsPart;
            if (i) output += ',';
            output += parseInt(charsPart, 16);
        }
        return output;
    }

}

LedReporter.$inject = ['helper', 'logger', 'config.led'];

// PUBLISH DI MODULE
module.exports = {
    'reporter:led': ['type', LedReporter]
};
