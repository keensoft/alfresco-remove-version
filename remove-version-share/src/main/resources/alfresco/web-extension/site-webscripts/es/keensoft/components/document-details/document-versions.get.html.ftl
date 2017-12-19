// Load custom JavaScript after JS section
<@markup id="customVersionRemove-js" target="js" action="after">
   <@script type="text/javascript" src="${url.context}/res/remove-version-share/js/document-versions-remove.js" />
</@>

// Load custom CSS after CSS section
<@markup id="customVersionCss" target="css" action="after">
    <@link rel="stylesheet" type="text/css" href="${url.context}/res/remove-version-share/css/remove-version.css" group="document-details"/>
</@>

// You can also add custom FTL or HTML by using this file 