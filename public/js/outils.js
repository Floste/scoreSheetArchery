/*
########################################
# Outils
########################################
*/

var colorJaune = "#FBD400";
var colorRouge = "#D91919";
var colorBleu = "#009ECE";
var colorNoir = "#000000";
var colorBlanc = "#ffffff";
var colorManque = "#cccccc";

var DEFAULT_NB_VOLEES_PAR_SERIE = 10;
var DEFAULT_NB_FLECHES_PAR_VOLEES = 3;
var DEFAULT_DISTANCE= 18;
var DEFAULT_BLASON = "40";

var listeBlasons = [
        {"id":"40","name":"40 cm"},
        {"id":"40t","name":"Trispot 40 cm"},
        {"id":"60","name":"60 cm"},
        {"id":"80","name":"80 cm"},
        {"id":"122","name":"122 cm"}
    ]
function getObjBlasonFromId(idBlason){
    ret = {};
    for (var cptBlason in listeBlasons) {
        objBlason = listeBlasons[cptBlason];
        if(objBlason.id == idBlason){
            return objBlason;
        }
    }
    return ret;
}

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function getStatColors(tabVolees){
    bgColor = "";
    tabFlechesTriees = getTabFlechesColors(tabVolees);
    if(tabFlechesTriees["nbFlechesTirees"]>0){
        
        pctJaune = Math.round((tabFlechesTriees["jaune"] * 100) / tabFlechesTriees["nbFlechesTirees"]);
        pctRouge = Math.round((tabFlechesTriees["rouge"] * 100) / tabFlechesTriees["nbFlechesTirees"]);
        pctBleu = Math.round((tabFlechesTriees["bleu"] * 100) / tabFlechesTriees["nbFlechesTirees"]);
        pctNoir = Math.round((tabFlechesTriees["noir"] * 100) / tabFlechesTriees["nbFlechesTirees"]);
        pctBlanc = Math.round((tabFlechesTriees["blanc"] * 100) / tabFlechesTriees["nbFlechesTirees"]);
        pctManque = Math.round((tabFlechesTriees["manque"] * 100) / tabFlechesTriees["nbFlechesTirees"]);
        
        initPctRouge = pctJaune;
        pctRouge += initPctRouge;
        initPctBleu = pctRouge;
        pctBleu += initPctBleu;
        initPctNoir = pctBleu;
        pctNoir += initPctNoir;
        initPctBlanc = pctNoir;
        pctBlanc += initPctBlanc;
        initPctManque = pctBlanc;
        pctManque = 100;
    
        strJaune = colorJaune + " 0%, " + colorJaune + " " + pctJaune + "%, ";
        strRouge = colorRouge + " " + initPctRouge + "%, " + colorRouge + " " + pctRouge + "%, ";
        strBleu = colorBleu + " " + initPctBleu + "%, " + colorBleu + " " + pctBleu + "%, ";
        strNoir = colorNoir + " " + initPctNoir + "%, " + colorNoir + " " + pctNoir + "%, ";
        strBlanc = colorBlanc + " " + initPctBlanc + "%, " + colorBlanc + " " + pctBlanc + "%, ";
        strManque = colorManque + " " + initPctManque + "%, " + colorManque + " " + pctManque + "% ";
    
        bgColor = strJaune + strRouge + strBleu + strNoir + strBlanc + strManque;
        bgColor = "linear-gradient(to right," + bgColor + ")";
    }
    return bgColor;
}
function getTabFlechesColors(tabVolees) {
    var TabNbColor = {"jaune":0, "rouge":0, "bleu":0, "noir":0, "blanc":0, "manque":0, "nbFlechesTirees":0};
    var valFleche;
    for (i = 0; i < tabVolees.length; i++) {
        for (j = 0; j < 3; j++) {
            valFleche = parseInt(tabVolees[i][j]);
            TabNbColor["nbFlechesTirees"] += 1;
            switch (valFleche) {
                case 10:TabNbColor["jaune"] += 1;
                    break;
                case 9:TabNbColor["jaune"] += 1;
                    break;
                case 8:TabNbColor["rouge"] += 1;
                    break;
                case 7:TabNbColor["rouge"] += 1;
                    break;
                case 6:TabNbColor["bleu"] += 1;
                    break;
                case 5:TabNbColor["bleu"] += 1;
                    break;
                case 4:TabNbColor["noir"] += 1;
                    break;
                case 3:TabNbColor["noir"] += 1;
                    break;
                case 2:TabNbColor["blanc"] += 1;
                    break;
                case 1:TabNbColor["blanc"] += 1;
                    break;
                case 0:TabNbColor["manque"] += 1;
                    break;
            }
        }
    }
    return TabNbColor;
}

function sort(origTab){
    ret = origTab;
    isSorted = false;
    while(!isSorted){
        isSorted = true;
        for(cptSort=0; cptSort<ret.length-1; cptSort++){
            if(parseInt(ret[cptSort]) < parseInt(ret[cptSort+1])){
                tmp = ret[cptSort];
                ret[cptSort] = ret[cptSort+1];
                ret[cptSort+1] = tmp;
                isSorted = false;
            }
        }
    }
    return ret;
}
