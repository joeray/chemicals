const Chemicals = require('../Models/chemicals');

const csv = require('csvtojson');

const dataSources = [
  { file: 'chemical_type_1.csv', lastProperty: 'chemical type 1' },
  { file: 'chemical_type_2.csv', lastProperty: 'chemical type 2' },
];

// reset DB
Chemicals.deleteMany({}, err => {});

let data = [];
const setData = source =>
  csv({
    noheader: false,
    headers: ['patent no', 'patent title', source.lastProperty],
    delimiter: [';'],
  })
    .fromFile(`src/Backend/Data/${source.file}`)
    .then(csvData => {
      data = [...data, csvData];
    });

const processArray = async dataSources => {
  for (const source in dataSources) {
    await setData(dataSources[source]);
  }
  let merged = await [].concat.apply([], data);

  const chemicalsArray = await merged.map(item => {
    item.group = item.hasOwnProperty('chemical type 1') ? 1 : 2;
    item.type = item.hasOwnProperty('chemical type 1')
      ? item['chemical type 1']
      : item['chemical type 2'];
    return item;
  });

  Chemicals.insertMany(chemicalsArray, err => {
    if (err) console.log('error retrieving csvData  ', err, chemicalsArray);
  });
};

processArray(dataSources);

//GET - Return all Chemicals in the DB
exports.findAllChemicals = function (req, res) {
  Chemicals.find((err, chemicals) => {
    if (err) res.send(500, err.message);
    res.status(200).jsonp(chemicals);
  });
};

//GET - Return Chemicals filtered by patent title in the DB
exports.findChemicals = function (req, res) {
  const { value } = req.query;
  Chemicals.find()
    .$where(`this["patent title"].toUpperCase().indexOf('${value}') !== -1`)
    .exec((err, docs) => {
      if (err) res.status(500).send(err.message);
      res.status(200).jsonp(docs);
    });
};
