// Use your own JavaScript space
if (typeof keensoft == "undefined" || !keensoft)
{
   var keensoft = {};
}
keensoft.DocumentVersions = keensoft.DocumentVersions || {};

// Alfresco aliases
var $html = Alfresco.util.encodeHTML,
    $userProfileLink = Alfresco.util.userProfileLink,
    $userAvatar = Alfresco.Share.userAvatar;

(function() {

   // Custom object declaration
   keensoft.DocumentVersions.prototype=
   {
	   
       // Overwrite method from parent object "Alfresco.DocumentVersions" to include Remove action
	   getDocumentVersionMarkup: function DocumentVersions_getDocumentVersionMarkup(doc)
       {
    	   
	    	   var downloadURL = Alfresco.constants.PROXY_URI + 'api/node/content/' + doc.nodeRef.replace(":/", "") + '/' + doc.name + '?a=true',
	    	       html = '';
	
	    	   html += '<div class="version-panel-left">'
	    		   html += '   <span class="document-version">' + $html(doc.label) + '</span>';
	    	   html += '</div>';
	    	   html += '<div class="version-panel-right">';
	    	   html += '   <h3 class="thin dark" style="width:' + (Dom.getViewportWidth() * 0.25) + 'px;">' + $html(doc.name) +  '</h3>';
	    	   html += '   <span class="actions">';
	    	   if (this.options.allowNewVersionUpload)
	    	   {
	    		   html += '   <a href="#" name=".onRevertVersionClick" rel="' + doc.label + '" class="' + this.id + ' revert" title="' + this.msg("label.revert") + '">&nbsp;</a>';
	    	   }
	    	   html += '      <a href="' + downloadURL + '" target="_blank" class="download" title="' + this.msg("label.download") + '">&nbsp;</a>';
	    	   html += '      <a href="#" name=".onViewHistoricPropertiesClick" rel="' + doc.nodeRef + '" class="' + this.id + ' historicProperties" title="' + this.msg("label.historicProperties") + '">&nbsp;</a>';
	    	   
	    	   // Add new icon to remove a version passing "label" parameter to "onRemoveClick" function 
	    	   html += '      <a href="#" target="_blank" name=".onRemoveClick" rel="' + doc.label + '" class="' + this.id + ' remove" title="' + this.msg("label.delete") + '">&nbsp;</a>';
	    	   
	    	   html += '   </span>';
	    	   html += '   <div class="clear"></div>';
	    	   html += '   <div class="version-details">';
	    	   html += '      <div class="version-details-left">'
	    	   html += $userAvatar(doc.creator.userName, 32);
	    	   html += '      </div>';
	    	   html += '      <div class="version-details-right">';
	    	   html += $userProfileLink(doc.creator.userName, doc.creator.firstName + ' ' + doc.creator.lastName, 'class="theme-color-1"') + ' ';
	    	   html += Alfresco.util.relativeTime(Alfresco.util.fromISO8601(doc.createdDateISO)) + '<br />';
	    	   html += ((doc.description || "").length > 0) ? $html(doc.description, true) : '<span class="faded">(' + this.msg("label.noComment") + ')</span>';
	    	   html += '      </div>';
	    	   html += '   </div>';
	    	   html += '</div>';
	
	    	   html += '<div class="clear"></div>';
	    	   return html;
        
	   },
	   
	   // Call Alfresco repo to invoke DELETE Web Script for version removal
	   onRemoveClick: function DocumentVersions_onRemoveClick(label)
	   {
		   
		   // Use nodeRef from parent object Alfresco.DocumentVersions
		   var nodeRef = this.options.nodeRef;
		   
		   // Web Script invocations are always asynchronous
		   Alfresco.util.Ajax.request(
		   {
			   // Using POST instead of DELETE due to parameters including "." (e.g label = 1.0)
			   method: Alfresco.util.Ajax.POST,
			   url:  Alfresco.constants.PROXY_URI + 'api/node/version/' + nodeRef.replace(":/", ""),
			   // Using POST because of Alfresco is intercepting "." in the URLs
			   dataObj:
			   {
				   label: label
			   },
			   requestContentType: Alfresco.util.Ajax.JSON,
			   successCallback:
			   {
				   fn: function onRequestSuccess(response)
				   {
					   // No response JSON is required, included following line just as a sample
					   var json = Alfresco.util.parseJSON(response.serverResponse.responseText);
					   Alfresco.util.PopupManager.displayMessage(
					   {
						   text: this.msg("message.removeComplete")
					   })
				   },
				   scope: this	            	
			   },
			   failureCallback:
			   {
				   fn: function onRequestFailure()
			       {
					   Alfresco.util.PopupManager.displayMessage(
					   {
					       text: this.msg("message.removeFailed")
					   })
			       },
			       scope: this	            	
			   }
		   });
			 
		   // Fixing the UI after invocation
		   YAHOO.Bubbling.fire("previewChangedEvent");
		   YAHOO.Bubbling.fire("metadataRefresh", {});
		   
	   }
            	   
   };
   
})();

// Extending original Alfresco.DocumentVersions object
(function () {
    YAHOO.lang.augmentProto(Alfresco.DocumentVersions, keensoft.DocumentVersions, true);
})();