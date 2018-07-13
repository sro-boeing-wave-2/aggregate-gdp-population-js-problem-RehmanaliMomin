/**
 * Aggregates GDP and Population Data by Continents
 * @param {*} filePath
 */

const aggregate = filePath => {

  var fs = require('fs');

  var array_of_countries = [];

  var country_data = fs.readFileSync('data/datafile.csv', 'utf-8');

  var split_data = country_data.split('\n');

  var country_details_map = new Map();


  for (var i = 1; i < split_data.length-2; i++) {
    var comma_sep_arr = split_data[i].split(',');
    array_of_countries.push(comma_sep_arr[0]);

    var arr_of_details = [];
    for (var j = 1; j < comma_sep_arr.length; j++) {
      arr_of_details.push(comma_sep_arr[j].replace(/['"]+/g, ''));
    }

    country_details_map.set(comma_sep_arr[0].replace(/['"]+/g, ''), arr_of_details);
  }
  //console.log(array_of_countries);
  //console.log(country_details_map);

  var array_of_continents = [];

  var continent_data = fs.readFileSync('data/continent-country.csv', 'utf-8');

  var split_continent_country = continent_data.split('\n');

  var continents_set = new Set();
  var country_continenet_map = new Map();

  var split_continent_comma = [];
  for (var i = 0; i < split_continent_country.length; i++) {
    var temp = split_continent_country[i].split(',');
    continents_set.add(temp[1]);
    country_continenet_map.set(temp[0], temp[1]);
  }



  var map3 = new Map();


  continents_set.forEach(item => {
    map3.set(item, new Array());
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
    item = item.replace(/['"]+/g, '');
    var continent = country_continenet_map.get(item);
    var temp = map3.get(continent);
    temp.push(item);
    map3.set(continent, temp);
  });


  // map3 is the map with key as continent and value as the array of its respective country.

  var map1 = new Map();

  map3.forEach(function (value, key) {
    var map2 = new Map();

    var gdp = 0;
    var pop = 0;

    value.forEach(item => {
      gdp = gdp + parseFloat(country_details_map.get(item)[6]);
      pop = pop + parseFloat(country_details_map.get(item)[3]);

    });


    map2.set("GDP_2012", gdp);
    map2.set("POPULATION_2012", pop);

    map1.set(key, map2);
  });

  map1.delete(undefined);

  //fs.writeFileSync('output/output.json',map1);
  //console.log(map1);

  //console.log(maptoObj(map1));
  var obj = maptoObj(map1)
  var str = JSON.stringify(obj)
  fs.writeFileSync('output/output.json',str,'utf-8');


  function maptoObj(map) {
    let obj = Object.create(null);
    for (let [k, v] of map) {
      var o = maptoObj1(v);
      obj[k] = o;
    }
    return obj;
  }

  function maptoObj1(map) {

    let obj1 = Object.create(null);
    for (let [i, j] of map) {
      obj1[i] = j;
    }
    return obj1;
  }




};


aggregate('data/datafile.csv');
module.exports = aggregate;
