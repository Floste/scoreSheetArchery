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

function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function getStatColors(tabVolees){
    bgColor = "";
    tabFlechesTriees = getTabFlechesColors(tabVolees);
    if(tabFlechesTriees["nbFlechesTirees"]>0){
        
        pctJaune = parseInt((tabFlechesTriees["jaune"] * 100) / tabFlechesTriees["nbFlechesTirees"]);
        pctRouge = parseInt((tabFlechesTriees["rouge"] * 100) / tabFlechesTriees["nbFlechesTirees"]);
        pctBleu = parseInt((tabFlechesTriees["bleu"] * 100) / tabFlechesTriees["nbFlechesTirees"]);
        pctNoir = parseInt((tabFlechesTriees["noir"] * 100) / tabFlechesTriees["nbFlechesTirees"]);
        pctBlanc = parseInt((tabFlechesTriees["blanc"] * 100) / tabFlechesTriees["nbFlechesTirees"]);
        
        initPctRouge = pctJaune;
        pctRouge += initPctRouge;
        initPctBleu = pctRouge;
        pctBleu += initPctBleu;
        initPctNoir = pctBleu;
        pctNoir += initPctNoir;
        initPctBlanc = pctNoir;
        pctBlanc = 100;
    
        strJaune = colorJaune + " 0%, " + colorJaune + " " + pctJaune + "%, ";
        strRouge = colorRouge + " " + initPctRouge + "%, " + colorRouge + " " + pctRouge + "%, ";
        strBleu = colorBleu + " " + initPctBleu + "%, " + colorBleu + " " + pctBleu + "%, ";
        strNoir = colorNoir + " " + initPctNoir + "%, " + colorNoir + " " + pctNoir + "%, ";
        strBlanc = colorBlanc + " " + initPctBlanc + "%, " + colorBlanc + " " + pctBlanc + "% ";
    
        bgColor = strJaune + strRouge + strBleu + strNoir + strBlanc;
        bgColor = "linear-gradient(to right," + bgColor + ")";
    }
    return bgColor;
}
function getTabFlechesColors(tabVolees) {
    var TabNbColor = {"jaune":0, "rouge":0, "bleu":0, "noir":0, "blanc":0, "nbFlechesTirees":0};
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
                case 0:TabNbColor["blanc"] += 1;
                    break;
            }
        }
    }
    return TabNbColor;
}
