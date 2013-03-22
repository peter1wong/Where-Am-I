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

	nokia.Settings.set("appId", "jsUVAhQlX3l33gNikHmI");
	nokia.Settings.set("authenticationToken","nWxKggej740Q90VgJDmDOQ");
    var wai = document.querySelector("#wai");
    if (wai) { 
        wai.onclick = function () {
		    if (!navigator.geolocation){
		        alert('Geolocation is not supported by your browser');
		        return;
		    }
		    navigator.geolocation.getCurrentPosition(function(position) {
		        var latitude1 = position.coords.latitude;
		        var longitude1 = position.coords.longitude;
		        var altitude1 = position.coords.altitude;
		        var heading1 = position.coords.heading;
		        var accuracy1 = position.coords.accuracy;
		        
				nokia.places.search.manager.reverseGeoCode({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					onComplete: processResults
				});
				document.getElementById("txtLatitudeLongitude").innerHTML = latitude1+", "+longitude1+", "+altitude1+", "+heading1+","+accuracy1;
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



	function processResults(data, requestStatus, requestId)  {
		var addressDetails ="";
		if(requestStatus == "ERROR")  {
			alert("Rev Geocoding failure");
		} else if (requestStatus == "OK") {
			var	address = data.location.address;
			if (address.street) {
				addressDetails = addressDetails +" , "+ address.street;						
			}
			if (address.houseNumber) {
				addressDetails = addressDetails +" , "+ address.houseNumber;
			}						
			if (address.city) {
				addressDetails = addressDetails +" , "+ address.city;
			}
			if (address.district) {
				addressDetails = addressDetails +" , "+ address.district;
			}						
			if (address.postalCode) {
				addressDetails = addressDetails +" , "+ address.postalCode;
			}						
			if (address.state) {
				addressDetails = addressDetails +" , "+ address.state ;
			}
			if (address.county) {
				addressDetails = addressDetails +" , "+ address.county;
			}
			if (address.country) {
				addressDetails = addressDetails +" , "+ address.country;
			}
		
			document.getElementById("txtAddress").innerHTML = addressDetails;
		}
	}



})(); 





