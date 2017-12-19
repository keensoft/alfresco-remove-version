package es.keensoft.webscript;

import java.util.HashMap;
import java.util.Map;

import org.alfresco.service.ServiceRegistry;
import org.alfresco.service.cmr.repository.NodeRef;
import org.alfresco.service.cmr.version.Version;
import org.alfresco.service.cmr.version.VersionHistory;
import org.alfresco.service.cmr.version.VersionService;
import org.json.JSONObject;
import org.json.JSONTokener;
import org.springframework.extensions.webscripts.Cache;
import org.springframework.extensions.webscripts.DeclarativeWebScript;
import org.springframework.extensions.webscripts.Status;
import org.springframework.extensions.webscripts.WebScriptException;
import org.springframework.extensions.webscripts.WebScriptRequest;

public class RemoveVersion extends DeclarativeWebScript {
	
	private ServiceRegistry serviceRegistry;

	public void setServiceRegistry(ServiceRegistry serviceRegistry) {
		this.serviceRegistry = serviceRegistry;
	}

	@Override
	protected Map<String, Object> executeImpl(WebScriptRequest req, Status status, Cache cache) {		

		// Reading parameters from URL
		Map<String, String> templateArgs = req.getServiceMatch().getTemplateVars();
		NodeRef nodeRef = new NodeRef(templateArgs.get("store_type"), templateArgs.get("store_id"), templateArgs.get("id"));
		
		// Reading parameters from POST Content
		String versionLabel = "";
		try {
			JSONObject json = new JSONObject(new JSONTokener(req.getContent().getContent()));
			versionLabel = json.getString("label");
		} catch (Exception e) {
			throw new WebScriptException(Status.STATUS_BAD_REQUEST, "Could not read parameter 'label' from request content.", e);
		}
		
		// Removing version by using Alfresco Java API
		VersionService versionService = serviceRegistry.getVersionService();
		VersionHistory history = versionService.getVersionHistory(nodeRef);
	    Version version = history.getVersion(versionLabel);
	    versionService.deleteVersion(nodeRef, version);
		
		// Building model for JSON response template
	    Map<String, Object> model = new HashMap<String, Object>();
		model.put("success", "true");
		return model;
		
	}	

}
