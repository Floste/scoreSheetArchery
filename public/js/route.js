$(window).on( "hashchange", function(event){
    var hash = location.hash;
    if(hash==""){hash = "#";}
    $("nav ul li").removeClass("active");
    $("nav ul li").has("a[href='"+hash+"']").addClass("active");
    switch (hash) {
        case '#historique':
            initHistorique();
            break;
        case '#exportImport':
            initExportImport();
            break;
        default:
            initFormSaisie();
            break;
    }
});
