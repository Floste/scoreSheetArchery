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
         iosCopyToClipboard(copyText);
    })

    $("#importAction").click(function(){
        var data = JSON.parse($("#dataToImport").val());
        Object.keys(data).forEach(function (k) {
          localStorage.setItem(k, data[k]);
        });
        $("#dataToImport").val("");
    })

    function iosCopyToClipboard(el) {
        var oldContentEditable = el.contentEditable,
            oldReadOnly = el.readOnly,
            range = document.createRange();

        el.contenteditable = true;
        el.readonly = false;
        range.selectNodeContents(el);

        var s = window.getSelection();
        s.removeAllRanges();
        s.addRange(range);

        el.setSelectionRange(0, 999999); // A big number, to cover anything that could be inside the element.

        el.contentEditable = oldContentEditable;
        el.readOnly = oldReadOnly;

        document.execCommand('copy');
    }
}
