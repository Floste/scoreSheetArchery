var nbTemplateToLoad = 0
function loadTemplates(callBackAllTemplatesDownload) {
    nbTemplateToLoad = $("template[w3-include-html]").size();
    $("template[w3-include-html]").each(function(){
        fileUrl = $(this).attr("w3-include-html");
        $.ajax(fileUrl,
          {
            context: $(this),
            success: function(data, textStatus, jqXHR){
              nbTemplateToLoad = nbTemplateToLoad - 1;
              $(this).append(data);
              if(nbTemplateToLoad==0){
                callBackAllTemplatesDownload();
              }
            }
          });
        
    });
}
