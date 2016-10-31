var NB_VOLEES_PAR_SERIE = 10;
var NB_FLECHES_PAR_VOLEES = 3;

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
    createZoneScores(getNbFlechesParVoleesCurrentSerie());
    $("#saisie .pts").click(function () {
        for (i = 1; i <= getNbFlechesParVoleesCurrentSerie(); i++) {
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

    var data = JSON.parse(localStorage.getItem("volees"));
    if(data.volees){
        if (data.volees.length >= getNbVoleesCurrentSerie()) {
            $("#saisie").removeClass("enabled");
            $("#saisie").addClass("disabled");
            $("#saveSerie").removeClass("disabled");
            $("#saveSerie").addClass("enabled");
        }else{
            $("#saisie").addClass("enabled");
            $("#saisie").removeClass("disabled");
            $("#saveSerie").addClass("disabled");
            $("#saveSerie").removeClass("enabled");
        }
    }
    
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
    nbVolees = $("#chpNbVolees").val();
    nbFlechesParVolees = $("#chpNbFlechesParVolees").val();

    localStorage.setItem("volees", '{"volees":[]}');
    $("#saisie").removeClass("disabled");
    clearSaisie();
    updateTotal();
    updateVolees();
    var data = JSON.parse(localStorage.getItem("volees"));
    data.idSerie = getIdDateSerie();
    data.nbVolees = nbVolees;
    data.nbFlechesParVolees = nbFlechesParVolees;
    localStorage.setItem("volees", JSON.stringify(data));
    $("#saisie").removeClass("disabled");
    $("#saisie").addClass("enabled");
    $("#saveSerie").removeClass("enabled");
    $("#saveSerie").addClass("disabled");
    createZoneScores(getNbFlechesParVoleesCurrentSerie());
}

function createZoneScores(nbFleches){
    strZoneScores = "";
    for (j = 1; j <= nbFleches; j++) {
        strZoneScores += "<input type='text' name='fleche_"+j+"' value'' class='scoreFleche' />";
    }
    $("#zoneScores").html(strZoneScores);
}

function clearSaisie() {
    for (i = 1; i <= getNbFlechesParVoleesCurrentSerie(); i++) {
        $("#saisie_volee input[name=fleche_" + i + "]").val("");
    }
}

function updateTotal() {
    var data = JSON.parse(localStorage.getItem("volees"));
    total = 0;
    for (i = 0; i < data.volees.length; i++) {
        for (j=0; j < getNbFlechesParVoleesCurrentSerie(); j++){
            total += parseInt(data.volees[i][j]);
        }
    }
    $("#total").html(total);
}

function updateVolees() {
    $("#volees").html("");
    var data = JSON.parse(localStorage.getItem("volees"));
    var valFleche;
    for (i = 0; i < data.volees.length; i++) {
        str = "<div class='volee'>" +
            "<span class='num_volee'>" + (i + 1) + "</span>";
        tabPoints = sort(data.volees[i]);
        for (j = 0; j < getNbFlechesParVoleesCurrentSerie(); j++) {
            valFleche = "";
            valFleche += parseInt(tabPoints[j]);
            str += "<span class='fleche val"+valFleche+"'>" + valFleche + "</span>";
        }
        $("#volees").append(str);
        $("#volees").scrollTop(9999);
    }
    updateStatColors(data.volees);
    //Controle, si on est à getNbVoleesCurrentSerie volées, on desactive la saisie
    //La série est finie, on propose de l'enregistrer
    if (data.volees.length >= getNbVoleesCurrentSerie()) {
        $("#saisie").removeClass("enabled");
        $("#saisie").addClass("disabled");
        $("#saveSerie").removeClass("disabled");
        $("#saveSerie").addClass("enabled");
    }
}

function updateStatColors(tabVolees){
    bgColor = getStatColors(tabVolees);
        
    $("#statColors").css("background-image",bgColor);
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
    dataVolees = new Array()
    for (j = 1; j <= getNbFlechesParVoleesCurrentSerie(); j++) {
        valFleche = $("#saisie_volee input[name=fleche_"+ j +"]").val();
        dataVolees.push(valFleche);
    }
    dataVolees = sort(dataVolees);
    data.volees.push(dataVolees);
    localStorage.setItem("volees", JSON.stringify(data));
    clearSaisie();
    updateTotal();
    updateVolees();
}

function getNbFlechesParVoleesCurrentSerie(){
    var data = JSON.parse(localStorage.getItem("volees"));
    return data.nbFlechesParVolees;
}

function getNbVoleesCurrentSerie(){
    var data = JSON.parse(localStorage.getItem("volees"));
    return data.nbVolees;
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

