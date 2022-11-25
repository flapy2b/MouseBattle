// importer
var config = require('./config.json');
// a utiliser sous "config.____"


//  custom | config.nomOriginal
var custom = config.parm2;
// a utiliser sous "custom" (sans le "config."")

// vérifier
console.log(config.parm1, custom, config.parm3);