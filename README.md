
Alfresco Remove Versions from Share
================================================

**Background**

This project has been developed as sample for **How to extend (properly) and "old" Alfresco Share feature** talk at [Alfresco DevCon 2018](https://devcon.alfresco.com). If you want to learn how to develop this addon, attend **Alfresco DevCon** or watch the recorded session.

**Description**

Alfresco Share only exposes actions to *revert*, *download* and *view properties* for every action of a node. This addon includes a *delete* action which removes the version from the repository. The action is available at document detail version list and it's only visible for members of group `VERSION_REMOVERS`.

**License**
The plugin is licensed under the [LGPL v3.0](http://www.gnu.org/licenses/lgpl-3.0.html). 

**State**
Current patch release is 1.1.0

**Compatibility** 
The current version has been developed using Alfresco 201707 and Alfresco SDK 3.0.1

It works with Alfresco CE 5.2

***Original Alfresco resources have been overwritten***

Downloading the ready-to-deploy-plugin
--------------------------------------
The binary distribution is made of one JAR file for the repository and one JAR file for Share:

* [repo JAR](https://github.com/keensoft/alfresco-remove-version/releases/download/1.0.0/remove-version-repo-1.0.0.jar)
* [share JAR](https://github.com/keensoft/alfresco-remove-version/releases/download/1.0.0/remove-version-share-1.0.0.jar)

You can install it by copying JAR repo file to `$ALFRESCO_HOME/modules/platform`, JAR share file to `$ALFRESCO_HOME/modules/share` and re-starting Alfresco.

Populate the Group
-------------------

The `VERSION_REMOVERS` group will be created for you automatically. If, for some reason, it does not get created, create a new group with an ID of `GROUP_VERSION_REMOVERS`. You can add individuals and groups to this group. For example, at the very least you will probably want to add ALFRESCO_ADMINISTRATORS to this group.

Building the artifacts
----------------------
You can build the artifacts from source code using maven

```$ mvn clean package```

Contributors
------------

* [Douglas C. R. Paes](https://github.com/douglascrp)
