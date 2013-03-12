(function () {


	/*
    window.onload = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                alert('it works');
            }, function(error) {
                alert('Error occurred. Error code: ' + error.code);         
            },{timeout:50000});
        }else{
            alert('no geolocation support');
        }
    };
	*/

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
        	var sms2 = navigator.mozSMS;
        	sms2.send("+123455", "hello world");
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
