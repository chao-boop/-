function dwimeX() {
    this.url = "http://localhost:9090/jrpc/";
    this.CallApiVoid = function(apiName) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", this.url, false);
        var params = {};
        var data = {"method":apiName, "params":params};
        try {
            xhr.send(JSON.stringify(data));
        } catch(e) {
        	alert(e);
        	alert("Please check if \"ChromePlugin.exe\" is started normally!");
            return null;
        }
        if (xhr.readyState==4 && xhr.status==200) {
            var json = JSON.parse(xhr.responseText);
            return json["result"];
        }
        return null;
    };
    
    
    this.IMEGetPath = function() { return this.CallApiVoid("IMEGetPath"); };
    this.IMEStartup = function() { return this.CallApiVoid("IMEStartup"); };
    this.IMEShow = function() 	{ return this.CallApiVoid("IMEShow"); };
    this.IMEClose = function() 	{ return this.CallApiVoid("IMEClose"); };
    this.IMEShowing = function() { return this.CallApiVoid("IMEShowing"); };
    this.IMERunning = function() { return this.CallApiVoid("IMERunning"); };
    this.IMEConfig = function() 	{ return this.CallApiVoid("IMEConfig"); };
    this.IMETermination = function() { return this.CallApiVoid("IMETermination"); };
    this.IMEReloadSkin = function() { return this.CallApiVoid("IMEReloadSkin"); };
    this.IMEReloadConf = function() { return this.CallApiVoid("IMEReloadConf"); };

    this.IMEGetWidth = function() { return this.CallApiVoid("IMEGetWidth"); };
    this.IMEGetHeight = function() { return this.CallApiVoid("IMEGetHeight"); };
    this.IMEGetTop = function() { return this.CallApiVoid("IMEGetTop"); };
    this.IMEGetLeft = function() { return this.CallApiVoid("IMEGetLeft"); };
    
    this.CallApiParam = function(apiName,params) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", this.url, false);
        //var params = {"skin": "gary"};
        var data = {"method":apiName, "params":params};
        try {
            xhr.send(JSON.stringify(data));
        } catch(e) {
            return null;
        }
        if (xhr.readyState==4 && xhr.status==200) {
            var json = JSON.parse(xhr.responseText);
            return json["result"];
        }
        return null;
    };
    
	this.IMESetMode = function(mode)		{ return this.CallApiParam("IMESetMode",	{"mode":mode}); };
	this.IMESetKBType = function(kbType)	{ return this.CallApiParam("IMESetKBType", 	{"type":kbType}); };
	this.IMESetSkin = function(skin)		{ return this.CallApiParam("IMESetSkin", 	{"skin":skin}); };
	this.IMESetSize = function(w, h)		{ return this.CallApiParam("IMESetSize",	{"w":parseInt(w), "h":parseInt(h)}); };
	this.IMESetPos = function(x, y)			{ return this.CallApiParam("IMESetPos",		{"x":parseInt(x), "y":parseInt(y)}); };
	this.IMEConfSet = function(s, k, v)			{ return this.CallApiParam("IMEConfSet",	{"s":s, "k":k, "v":v}); };
	this.IMESkinSet = function(skin, s, k, v)	{ return this.CallApiParam("IMESkinSet", {"skin":skin, "s":s, "k":k, "v":v}); };
	this.IMESetBtnVisible = function(vb, ids)	{ return this.CallApiParam("IMESetBtnVisible", {"visible":vb, "ids": ids}); };
	this.IMESetCapslock = function(lock)		{ return this.CallApiParam("IMESetCapslock", {"lock":lock}); };
	this.IMESetPlaceholder = function(txt)		{ return this.CallApiParam("IMESetPlaceholder",	{"txt":txt}); };
}


var dwimeX = new dwimeX();