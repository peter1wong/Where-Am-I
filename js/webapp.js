// Install app
if (navigator.mozApps) {
    var checkIfInstalled = navigator.mozApps.getSelf();
    checkIfInstalled.onsuccess = function () {
        if (checkIfInstalled.result) {
            // Already installed
        }
        else {
            var install = document.querySelector("#install"),
                manifestURL = location.href.substring(0, location.href.lastIndexOf("/")) + "/manifest.webapp";
            /*
                To install a package instead, exchange the above line to this:
                manifestURL = location.href.substring(0, location.href.lastIndexOf("/")) + "/package.webapp";
            */
            install.className = "show-install";
            install.onclick = function () {
                var installApp = navigator.mozApps.install(manifestURL);
                /*
                    To install a package instead, exchange the above line to this:
                    var installApp = navigator.mozApps.installPackage(manifestURL);

                    Make sure the manifestURL variable above has been changed too
                */
                installApp.onsuccess = function(data) {
                    install.style.display = "none";
                };
                installApp.onerror = function() {
                    alert("Install failed\n\n:" + installApp.error.name);
                };
            };
        }
    };
}
else {
    console.log("Open Web Apps not supported");
}


(function () {

    var wai = document.querySelector("#wai");
    if (wai) { 
        wai.onclick = function () {
		    if (!navigator.geolocation){
		        alert('Geolocation is not supported by your browser');
		        return;
		    }
		    navigator.geolocation.getCurrentPosition(function(position) {
		        var latitude = position.coords.latitude;
		        var longitude = position.coords.longitude;
		        var altitude = position.coords.altitude;
		        var heading = position.coords.heading;
		        var accuracy = position.coords.accuracy;
		        document.getElementById("txtLatitudeLongitude").innerHTML = latitude+", "+longitude+", "+altitude+", "+heading+","+accuracy;
		        /*alert(latitude + ', ' + longitude);*/
		  
		        /*var myImage = new Image;
		        myImage.src = "http://maps.googleapis.com/maps/api/staticmap?center="+latitude+","+longitude+"&zoom=10&size=300x300&sensor=false";
		        document.getElementById('out').appendChild(myImage);
		        myImage.align = "";*/
		    },function(error) {
		    	var errorcode = {
		    		1: 'Permission denied',
		    		2: 'Position not available',
		    		3: 'Request timeout'
		    	};
		    	document.getElementById("txtLatitudeLongitude").innerHTML = errorcode[error.code] + "Cannot get position"
		    },{
		    	enableHighAccuracy: true,
		    	timeout: 2000,
		    	maximumAge: 0
		    });
        }
    }


	

    var sendSMS = document.querySelector("#send-sms");
    if (sendSMS) { 
        sendSMS.onclick = function () {
            var sms = new MozActivity({
                name: "new", // Possible compose-sms in future versions
                data: {
                    type: "websms/sms",
                    number: "+7171717171",
					message: "hello"
                }
            });
        }
    }
    

    var sendSMS2 = document.querySelector("#send-sms2");
    if (sendSMS2) {
        sendSMS2.onclick = function () {
        /*	var sms2 = navigator.mozSMS;
        	sms2.send("123455", "hello world");*/
        	
        	
           var sms = new MozActivity({
                name: "new", // Possible compose-sms in future versions
                data: {
                    type: "websms/sms",
                    number: "+222",
					message: "helsuperlo"
                }
            });
        }
	}



    var composeEmail = document.querySelector("#send-email");
    if (composeEmail) { 
        composeEmail.onclick = function () {
            var createEmail = new MozActivity({
                name: "new", // Possibly compose-mail in future versions
                data: {
                    url: "mailto:peter1wong@gmail.com"
                }
            });
        }
    }

    var share = document.querySelector("#share");
    if (share) { 
        share.onclick = function () {
            var sharing = new MozActivity({
                name: "share",
                data: {
                    //type: "url", // Possibly text/html in future versions,
                    number: 1,
                    url: "http://petkatan.blogspot.co.nz"
                }
            });
        }
    }


})(); 





function prompt(window, pref, message, callback) {
    let branch = Components.classes["@mozilla.org/preferences-service;1"]
                           .getService(Components.interfaces.nsIPrefBranch);
 
    if (branch.getPrefType(pref) === branch.PREF_STRING) {
        switch (branch.getCharPref(pref)) {
        case "always":
            return callback(true);
        case "never":
            return callback(false);
        }
    }
 
    let done = false;
 
    function remember(value, result) {
        return function() {
            done = true;
            branch.setCharPref(pref, value);
            callback(result);
        }
    }
 
    let self = window.PopupNotifications.show(
        window.gBrowser.selectedBrowser,
        "geolocation",
        message,
        "geo-notification-icon",
        {
            label: "Share Location",
            accessKey: "S",
            callback: function(notification) {
                done = true;
                callback(true);
            }
        }, [
            {
                label: "Always Share",
                accessKey: "A",
                callback: remember("always", true)
            },
            {
                label: "Never Share",
                accessKey: "N",
                callback: remember("never", false)
            }
        ], {
            eventCallback: function(event) {
                if (event === "dismissed") {
                    if (!done) callback(false);
                    done = true;
                    window.PopupNotifications.remove(self);
                }
            },
            persistWhileVisible: true
        });
}
 
prompt(window,
       "extensions.foo-addon.allowGeolocation",
       "Foo Add-on wants to know your location.",
       function callback(allowed) { alert(allowed); });



