var suncalc = require('suncalc');
var moment = require('moment');
var d = new Date();
var longitude = 43.5283000;
var latitude = 5.4497300;

var info = suncalc.getTimes(d, longitude, latitude);
console.log(info);

moment.locale('fr');

function rad2deg(radians) {
  return Math.round(10 * (radians * 180 / Math.PI), 2) / 10;
};

function display(date) {
    var tmp = suncalc.getPosition(date, longitude, latitude);
    console.log(moment(date).format('HH:mm'), ' ', Math.round(100 * Math.sin(tmp.azimuth), 2) / 100 + '\t' + Math.round(100 * Math.sin(tmp.altitude), 2) / 100);
    // console.log(moment(date).format('HH:mm'), ' ', rad2deg(tmp.azimuth) + '\t' + rad2deg(tmp.altitude));
}

function getValue(date) {
	var tmp = suncalc.getPosition(date, longitude, latitude);
	return {
		x: Math.round(100 * Math.sin(tmp.azimuth), 2) / 100,
		y: Math.round(100 * Math.sin(tmp.altitude), 2) / 100,
	};
}

console.log(moment(d).format('LL'));
// display(info.sunrise);
// display(info.solarNoon);
// display(info.sunset);

// console.log(moment(new Date(2017, 7, 24, 10, 0)).format('LL'));
// display(new Date(2017, 7, 24, 10, 20));
var values = [];

for (var h = 0; h<24; h++) {
    for(var min=0; min<60; min+=30) {
        var date = new Date(d.getFullYear(), d.getMonth() + 1, d.getDate(), h, min);
        var position = suncalc.getPosition(date, longitude, latitude);

        var value = getValue(date);
        if (value.y > -0.1) {
        	values.push(value);
        }
    }
}


function normalizeValues(values) {
	return values.map((value) => {
		return {
			x: Math.round(100 * ((value.x + 1) / 2), 2) / 100,
			y: Math.round(100 * (1 - value.y), 2) / 100,
		};
	})
}

// console.log(values);
console.log(normalizeValues(values));
