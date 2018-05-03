function initExportImport(){
    $("#containerNav").empty();
    $("#containerMain").empty();
    $("#containerNav").append(($("#templateNav").children().clone()));
    $("#containerMain").append(($("#templateExportImport").children().clone()));

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

//    $("#dataLocal").val(JSON.stringify(JSON.stringify(localStorage)));

    $("#dataLocal").val(JSON.stringify(localStorage));

    /*
    	Actions boutons
    */
    $("#exportAction").click(function(){
         var copyText = document.getElementById("dataLocal");
         copyText.select();
         document.execCommand("Copy");
    })

    $("#importAction").click(function(){
        var data = JSON.parse($("#dataToImport").val());
        Object.keys(data).forEach(function (k) {
          localStorage.setItem(k, data[k]);
        });
        $("#dataToImport").val("");
    })
}
