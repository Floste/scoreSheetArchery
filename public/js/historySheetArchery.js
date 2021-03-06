function initHistorique(){
    $("#containerNav").empty();
    $("#containerMain").empty();
    $("#containerNav").append(($("#templateNav").children().clone()));
    $("#containerMain").append(($("#templateHistorique").children().clone()));

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
    }
    displaySelecteurSeries();
    displaySeries();
    /*
    	Actions boutons
    */
    $("#selecteurSeries").change(function(){
        selNbVolees = $("#selecteurSeries option:selected").attr("data-selNbVolees");
        selNbFlechesParVolees = $("#selecteurSeries option:selected").attr("data-selNbFlechesParVolees");
        selDistance = $("#selecteurSeries option:selected").attr("data-selDistance");
        selBlason = $("#selecteurSeries option:selected").attr("data-selBlason");
        displayConfiguration(selNbVolees,selNbFlechesParVolees,selDistance,selBlason);
    })
}
/*
########################################
# Serie et Volees
########################################
*/
function getDetailSerie(curSerie){
    nbVolees = getNbVolees(curSerie);
    nbFlechesParVolees = getNbFlechesParVolees(curSerie);

    str = "<div class='serieDetails'>";
    str += "<div class='total'>" + serieGetTotal(curSerie) + "</div>";
    str += "<div class='volees'>";
    str += "<div class='serieStats' style='background:" + getStatColors(curSerie.volees) + ";'></div>";
    for (i = 0; i < curSerie.volees.length; i++) {
        str += "<div class='volee'>" +
            "<span class='num_volee'>" + (i + 1) + "</span>";
        tabPoints = sort(curSerie.volees[i]);
        for (j = 0; j < nbFlechesParVolees; j++) {
            valFleche = "";
            valFleche += parseInt(tabPoints[j]);
            
            str += "<span class='fleche val"+valFleche+"'>" + valFleche + "</span>";
        }
        str += "</div>";
    }
    str += "</div>";
    str += "</div>";
    return str;
}
function serieGetDate(aSerie){
    strDate = new String(aSerie.idSerie);
    ret = new Date();
    ret.setFullYear(parseInt(strDate.substr(0,4)));
    ret.setMonth(parseInt(strDate.substr(4,2))-1);
    ret.setDate(strDate.substr(6,2));
    ret.setHours(strDate.substr(8,2));
    ret.setMinutes(strDate.substr(10,2));
    ret.setSeconds(strDate.substr(12,2));
    return ret;
}
function serieGetTotal(aSerie){
    total = 0;
    for (i = 0; i < aSerie.volees.length; i++) {
        for (j=0; j < getNbFlechesParVolees(aSerie); j++){
            total += parseInt(aSerie.volees[i][j]);
        }
    }
    return total;
}

function getNbVolees(curSerie){
    nbVolees = DEFAULT_NB_VOLEES_PAR_SERIE;
    if(curSerie.nbVolees){
        nbVolees = curSerie.nbVolees;
    }
    return nbVolees;    
}
function getNbFlechesParVolees(curSerie){
    nbFlechesParVolees = DEFAULT_NB_FLECHES_PAR_VOLEES;
    if(curSerie.nbFlechesParVolees){
        nbFlechesParVolees = curSerie.nbFlechesParVolees;
    }
    return nbFlechesParVolees;
}
function getDistance(curSerie){
    distance = DEFAULT_DISTANCE;
    if(curSerie.distance){
        distance = curSerie.distance;
    }
    return distance;    
}
function getBlasonId(curSerie){
    blason = DEFAULT_BLASON;
    if(curSerie.blason){
        blason = curSerie.blason;
    }
    return blason;
}
function getBlasonName(curSerie){
    blason = DEFAULT_BLASON;
    if(curSerie.blason){
        blason = curSerie.blason;
    }
    return (getObjBlasonFromId(blason)).name;
}

/*
########################################
# Series
########################################
*/
function displaySeries(){
    var data = JSON.parse(localStorage.getItem("series"));
    var i;
    var listeConfigurations = {};
    data.series = data.series.reverse();
    for(i=0; i<data.series.length; i++){
        curSerie = data.series[i];
        
        curDate = serieGetDate(curSerie);
        curNbVolees = getNbVolees(curSerie);
        curNbFlechesParVolees = getNbFlechesParVolees(curSerie);
        curDistance = getDistance(curSerie);
        curBlason = getBlasonId(curSerie);

        str_disp = "<div class='serieResume' ";
        str_disp += " data-nbVolees = '" + curNbVolees + "' ";
        str_disp += " data-nbFlechesParVolees = '" + curNbFlechesParVolees + "' ";
        str_disp += " data-distance = '" + curDistance + "' ";
        str_disp += " data-blason = '" + curBlason + "' ";
        str_disp += " >";
        str_disp += "<div class='serieStats' style='background:" + getStatColors(curSerie.volees) + ";'></div>";
        str_disp += "<button rel='" + curSerie.idSerie + "' data-toggle='modal' data-target='#details_" + curSerie.idSerie + "'>+</button>";
        str_disp += "<span class='date'>"
                    + curDate.getFullYear() + "-"
                    + pad(curDate.getMonth()+1,2) + "-"
                    + pad(curDate.getDate(),2) + " "
                    + pad(curDate.getHours(),2) + ":"
                    + pad(curDate.getMinutes(),2)
                    + "</span>";
        str_disp += "<span class='total'>" + serieGetTotal(curSerie) + "</span>";
        str_disp += "</div>";
        $("#series").append(str_disp);
        str_details = "<div class='modal ' id='details_" + curSerie.idSerie + "' tabindex='-1' role='dialog'>";
        str_details += "<div class='modal-dialog' role='document'>";
        str_details += "<div class='modal-content'>";
        str_details += "<div class='modal-header'>";
        str_details += "<button type='button' class='close' data-dismiss='modal'><span aria-hidden='true'>&times;</span></button>";
        str_details += "<h4 class='modal-title' id='myModalLabel'>" + serieGetDate(curSerie) + "</h4>";
        str_details += "</div>"
        str_details += "<div class='modal-body'>";
        str_details += getDetailSerie(curSerie);
        str_details += "</div>";
        str_details += "<div class='modal-footer'>"
        str_details += "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>";
        str_details += "</div></div></div></div>";
        $("#displaySerie").append(str_details);
    }
}
function displaySelecteurSeries(){
    var data = JSON.parse(localStorage.getItem("series"));
    var i;
    var listeConfigurations = {};
    for(i=0; i<data.series.length; i++){
        curSerie = data.series[i];
        
        curDate = serieGetDate(curSerie);
        curNbVolees = getNbVolees(curSerie);
        curNbFlechesParVolees = getNbFlechesParVolees(curSerie);
        curDistance = getDistance(curSerie);
        curBlason = getBlasonId(curSerie);
        strKeyConfig = "conf-" + curNbVolees + "-" + curNbFlechesParVolees;
        strKeyConfig += "-" + curDistance + "-" + curBlason;

        if(!listeConfigurations[strKeyConfig]){
            listeConfigurations[strKeyConfig] = {
                "disp": curNbVolees + " vol. " + curNbFlechesParVolees + " fl., blas. " + getObjBlasonFromId(curBlason).name + " à " + curDistance + "m",
                "nbVolees" : curNbVolees,
                "nbFlechesParVolees":curNbFlechesParVolees,
                "distance" : curDistance,
                "blason" : curBlason
            };
        }
    }
    for (var option in listeConfigurations) {
        var curOption = listeConfigurations[option];
        strOption = "<option "
        strOption += " data-selNbVolees='" + curOption.nbVolees + "' ";
        strOption += " data-selNbFlechesParVolees='" + curOption.nbFlechesParVolees + "' ";
        strOption += " data-selDistance='" + curOption.distance + "' ";
        strOption += " data-selBlason='" + curOption.blason + "' ";
        strOption += ">" + curOption.disp + "</options>";
        $("#selecteurSeries").append(strOption);
    }
}
function displayConfiguration(nbVolees,nbFlechesParVolees,distance,blason){
    $(".serieResume").css("display","none");
    selecteurCss = ".serieResume";
    selecteurCss += "[data-nbVolees="+nbVolees+"]";
    selecteurCss += "[data-nbFlechesParVolees="+nbFlechesParVolees+"]";
    selecteurCss += "[data-distance="+distance+"]";
    selecteurCss += "[data-blason="+blason+"]";
    $(selecteurCss).css("display","block");
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

function getSerieInSeries(idSerie){
    var data = JSON.parse(localStorage.getItem("series"));
    for(i=0; i<data.series.length; i++){
        curSerie = data.series[i];
        if(curSerie.idSerie == idSerie){
            return curSerie;
        }
    }
    return undefined;
}

/*
########################################
# Outils
########################################
*/
function getIdDateSerie(){
    tmp_date = new Date();
    return tmp_date.getFullYear() + pad(tmp_date.getUTCMonth()+1,2) + pad(tmp_date.getDate(),2) + pad(tmp_date.getHours(),2) + pad(tmp_date.getMinutes(),2) + pad(tmp_date.getSeconds(),2);
}
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}
