var NB_VOLEES_PAR_SERIE = 10;
$().ready(function(){
    /*
    Load step
    */
    if (typeof (Storage) == "undefined") {
        //WebStorage not supported.
        alert("WebStorage not supported");
    } else {
        if (localStorage.getItem("series") === undefined || !isValidStorageSeries()) {
            newSeries();
        }
        if (localStorage.getItem("volees") === undefined || !isValidStorageVolees()) {
            newSerie();
        } else {
            updateTotal();
            updateVolees();
        }
        clearSaisie();
    }
    
    /*
    	Actions boutons
    */
    $("#saisie .pts").click(function () {
        for (i = 1; i <= 3; i++) {
            cur_elt = $("#saisie_volee input[name=fleche_" + i + "]");
            if ($(cur_elt).val()=="") {
                $(cur_elt).val($(this).html());
                break;
            }
        }
    });
    $("#clearButton").click(function () {
        clearSaisie();
    });
    $("#NewSerieButton").click(function () {
        newSerie();
    });
    $("#okVoleeButton").click(function () {
        storeVolees();
    });
    $("#SaveSerieButton").click(function () {
        storeSerie();
        newSerie();
    });
    
});
/*
	Fonctions outils
*/
/*
########################################
# Serie et Volees
########################################
*/
function newSerie() {
    localStorage.setItem("volees", '{"volees":[]}');
    $("#saisie").removeClass("disabled");
    clearSaisie();
    updateTotal();
    updateVolees();
    var data = JSON.parse(localStorage.getItem("volees"));
    data.idSerie = getIdDateSerie();
    localStorage.setItem("volees", JSON.stringify(data));
    $("#saisie").removeClass("disabled");
    $("#saisie").addClass("enabled");
    $("#saveSerie").removeClass("enabled");
    $("#saveSerie").addClass("disabled");
}

function clearSaisie() {
    for (i = 1; i <= 3; i++) {
        $("#saisie_volee input[name=fleche_" + i + "]").val("");
    }
}

function updateTotal() {
    var data = JSON.parse(localStorage.getItem("volees"));
    total = 0;
    for (i = 0; i < data.volees.length; i++) {
        total += parseInt(data.volees[i][0]);
        total += parseInt(data.volees[i][1]);
        total += parseInt(data.volees[i][2]);
    }
    $("#total").html(total);
}

function updateVolees() {
    $("#volees").html("");
    var data = JSON.parse(localStorage.getItem("volees"));
    var TabNbColor = {"jaune":0, "rouge":0, "bleu":0, "noir":0, "blanc":0, "nbFlechesTirees":0};
    var valFleche;
    for (i = 0; i < data.volees.length; i++) {
        str = "<div class='volee'>" +
            "<span class='num_volee'>" + (i + 1) + "</span>";
        for (j = 0; j < 3; j++) {
            valFleche = "";
            valFleche += parseInt(data.volees[i][j]);
            
            TabNbColor["nbFlechesTirees"] += 1;
            switch (valFleche) {
                case '10':TabNbColor["jaune"] += 1;
                    break;
                case '9':TabNbColor["jaune"] += 1;
                    break;
                case '8':TabNbColor["rouge"] += 1;
                    break;
                case '7':TabNbColor["rouge"] += 1;
                    break;
                case '6':TabNbColor["bleu"] += 1;
                    break;
                case '5':TabNbColor["bleu"] += 1;
                    break;
                case '4':TabNbColor["noir"] += 1;
                    break;
                case '3':TabNbColor["noir"] += 1;
                    break;
                case '2':TabNbColor["blanc"] += 1;
                    break;
                case '1':TabNbColor["blanc"] += 1;
                    break;
                case '0':TabNbColor["blanc"] += 1;
                    break;
            }
            
            str += "<span class='fleche val"+valFleche+"'>" + valFleche + "</span>";
        }
        $("#volees").append(str);
        $("#volees").scrollTop(9999);
        updateStatColors(TabNbColor);
    }
    //Controle, si on est à NB_VOLEES_PAR_SERIE volées, on desactive la saisie
    //La série est finie, on propose de l'enregistrer
    if (data.volees.length >= NB_VOLEES_PAR_SERIE) {
        $("#saisie").removeClass("enabled");
        $("#saisie").addClass("disabled");
        $("#saveSerie").removeClass("disabled");
        $("#saveSerie").addClass("enabled");
    }
}

function updateStatColors(tabFlechesTriees){
    if(tabFlechesTriees["nbFlechesTirees"]>0){
        var colorJaune = "#FBD400";
        var colorRouge = "#D91919";
        var colorBleu = "#009ECE";
        var colorNoir = "#000000";
        var colorBlanc = "#ffffff";
        
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
    
        $("#statColors").css("background-image",bgColor);
    }
}

function isValidStorageVolees(){
    try{
        var data = JSON.parse(localStorage.getItem("volees"));
    }catch(err){
        return false;
    }
    if(data){
		if(data.volees){
        	return true;
        }
    }
	return false;
}

function storeVolees(){
    var data = JSON.parse(localStorage.getItem("volees"));
    data.volees.push(new Array(
    0 + $("#saisie_volee input[name=fleche_1]").val(),
    0 + $("#saisie_volee input[name=fleche_2]").val(),
    0 + $("#saisie_volee input[name=fleche_3]").val()));
    localStorage.setItem("volees", JSON.stringify(data));
    clearSaisie();
    updateTotal();
    updateVolees();
}

function getIdDateSerie(){
    tmp_date = new Date();
    return tmp_date.getFullYear() + pad(tmp_date.getUTCMonth()+1,2) + pad(tmp_date.getDate(),2) + pad(tmp_date.getHours(),2) + pad(tmp_date.getMinutes(),2) + pad(tmp_date.getSeconds(),2);
}

/*
########################################
# Series
########################################
*/
function newSeries() {
    localStorage.setItem("series", '{"series":[]}');
}
function isValidStorageSeries(){
    try{
        var data = JSON.parse(localStorage.getItem("series"));
    }catch(err){
        return false;
    }
    if(data){
		if(data.series){
        	return true;
        }
    }
	return false;
}
function storeSerie(){
    var volees = JSON.parse(localStorage.getItem("volees"));
    var data = JSON.parse(localStorage.getItem("series"));
    data.series.push(volees);
    localStorage.setItem("series", JSON.stringify(data));
}

