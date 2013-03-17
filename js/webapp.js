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
	        if (navigator.geolocation) {
	            navigator.geolocation.getCurrentPosition(function(position) {
	                /*alert('it works')*/
	                var coords = position.coords;
	                alert(position.coords.latitude, position.coords.longitute);
	                /*alert(coords.latitude, coords.longitute, coord.accuracy);*/
	            }, function(error) {
	                alert('Error occurred. Error code: ' + error.code);         
	            },{timeout:50000});
	        }else{
	            alert('no geolocation support');
	        }
 		}
	};        	


	

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
            })        	
        }
	};



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
