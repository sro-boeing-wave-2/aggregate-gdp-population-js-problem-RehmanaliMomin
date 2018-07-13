var fs = require('fs');

var array_of_countries = [];

var country_data = fs.readFileSync('data/datafile.csv','utf-8');

var split_data = country_data.split('\n');


for(var i = 1;i<split_data.length;i++){
  var comma_sep_arr = split_data[i].split(',');
  array_of_countries.push(comma_sep_arr[0]);
}
//console.log(array_of_countries);

var array_of_continents = [];

var continent_data = fs.readFileSync('data/continent-country.csv','utf-8');

var split_continent_country = continent_data.split('\n');

var continents_set = new Set();
var country_continenet_map = new Map();

var split_continent_comma = [];
for(var i=0;i<split_continent_country.length;i++){
  var temp = split_continent_country[i].split(',');
  continents_set.add(temp[1]);
  country_continenet_map.set(temp[0],temp[1]);
}

console.log(country_continenet_map);


var map3 = new Map();


continents_set.forEach(item => {
  map3.set(item,new Array());
});

//console.log(map3);
//

// for(var i=0;i<split_continent_country.length;i++){
//   continents_set.add(split_continent_country[1]);
// }

//console.log(continents_set);

// array_of_countries.forEach(item => {

// });



array_of_countries.forEach(item => {
  item = item.replace(/['"]+/g,'');
  var continent = country_continenet_map.get(item);
  console.log(continent);
  var temp = map3.get(continent);
  temp.push(item);
  map3.set(continent,temp);
});

console.log(map3);
