
var SerialPort = require("serialport");
var serialPort = new SerialPort('/dev/ttyUSB0', {
    baudRate: 9600
});

serialPort.on('open', function () {
    setColor('#A30');
});

function setColor(color, close) {
    serialPort.write(hexColorToDec(color) + '\n', function (err, results) {
        if (err) {
            console.log('failed write to serialPort: ' + err);
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
