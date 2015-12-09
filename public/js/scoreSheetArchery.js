var NB_VOLEES_PAR_SERIE = 2;
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
    for (i = 0; i < data.volees.length; i++) {
        str = "<div class='volee'>" +
            "<span class='num_volee'>" + (i + 1) + "</span>";
        for (j = 0; j < 3; j++) {
            str += "<span class='fleche'>" + parseInt(data.volees[i][j]) + "</span>";
        }
        $("#volees").append(str);
        $("#volees").scrollTop(9999);
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

