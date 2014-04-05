(function () {


    var txtLatitude = document.getElementById("txtLatitude");
    var txtLongitude = document.getElementById("txtLongitude");
    var txtAccuracy = document.getElementById("txtAccuracy");
    var txtAddress = document.getElementById("txtAddress");
    var txtStatus = document.getElementById("txtStatus");

    var myAppID = "jsUVAhQlX3l33gNikHmI";
    var myAppCode = "nWxKggej740Q90VgJDmDOQ";

    var wai = document.getElementById("wai");
    if (wai) {
        wai.onclick = function () {

            get_geolocation();

            return;

            //var txtLatitude = document.getElementById("txtLatitude");
            //var txtLongitude = document.getElementById("txtLongitude");
            //var txtAccuracy = document.getElementById("txtAccuracy");
            //var txtAddress = document.getElementById("txtAddress");
            //var txtStatus = document.getElementById("txtStatus");

            txtLatitude.innerHTML = "LATITUDE: ";
            txtLongitude.innerHTML = "LONGITUDE: ";
            txtAccuracy.innerHTML = "ACCURACY: ";
            txtAddress.innerHTML = "ADDRESS: ";
            txtStatus.innerHTML = "STATUS: Clearing information...";

            //clear the image first
            var output = document.getElementById("out");
            while (output.firstChild) {
                output.removeChild(output.firstChild);
            }
            txtStatus.innerHTML = "STATUS: Getting position...";
            //alert("after");

            /*alert("before");*/


            //maximumAge was 0
            //timeout was 60000 (60 seconds)
            var options = {
                enableHighAccuracy: true,
                timeout: 60000,
                maximumAge: 0
            };
            navigator.geolocation.getCurrentPosition(successGPS, errorGPS, options);



            function successGPS(pos) {
                var current_location = pos.coords;


                //var myAppID = "jsUVAhQlX3l33gNikHmI";
                //var myAppCode = "nWxKggej740Q90VgJDmDOQ";
                var latitude = current_location.latitude;
                var longitude = current_location.longitude;
                var accuracy = current_location.accuracy;

                /*				
                alert('Your current position is:');
                alert('Latitude : ' + current_location.latitude);
                alert('Longitude: ' + current_location.longitude);
                alert('More or less ' + current_location.accuracy + ' meters.');
                */


                //draw map on the same page
                var mainURL = "http://image.maps.cit.api.here.com/mia/1.6/mapview" +
					"?app_id=" + myAppID + "&app_code=" + myAppCode +
					"&c=" + latitude + "," + longitude + "&z=16";
                //var mainURL = "http://image.maps.cit.api.here.com/mia/1.6/mapview" +
				//	"?app_id=jsUVAhQlX3l33gNikHmI" + "&app_code=nWxKggej740Q90VgJDmDOQ" +
				//	"&c=" + latitude + "," + longitude + "&z=16";



                //display in the same page
                /*
                var mapImg = new Image();
                mapImg.src = mainURL;

                output.appendChild(mapImg);
                */



                //display on a new browser
                /*
                var openURL = new MozActivity({
                    name: "view",
                    data: {
                    type: "url", // Possibly text/html in future versions
                    url: mainURL
                    }
                });
                */




                //http://demo.places.nlp.nokia.com/places/v1/discover/explore?at=37.78937%2C-122.38912&size=0&app_id=jsUVAhQlX3l33gNikHmI&app_code=nWxKggej740Q90VgJDmDOQ&accept=application%2Fjson
                var mainURL = "http://demo.places.nlp.nokia.com/places/v1/discover/explore?at=" +
                    latitude + "%2C" + longitude + "&size=0&app_id=" + myAppID + "&app_code=" + myAppCode + "&accept=application%2Fjson"
                //alert(mainURL);
                //display on a new browser
                /*
                var openURL = new MozActivity({
                    name: "view",
                    data: {
                    type: "url", // Possibly text/html in future versions
                    url: mainURL
                    }
                });
                */


                //this is the result of json
                //http://demo.places.nlp.nokia.com/places/v1/discover/explore?at=37.78937%2C-122.38912&app_id=jsUVAhQlX3l33gNikHmI&app_code=nWxKggej740Q90VgJDmDOQ#

                var oReq = new XMLHttpRequest();
                var rtnAddress, strAddress;
                var i, len;
                oReq.open("GET", mainURL, true);
                oReq.responseType = 'json';
                oReq.onreadystatechange = function () {
                    if (oReq.readyState == 4) {
                        var data = oReq.response;
                        txtLatitude.innerHTML = "LATITUDE: " + latitude;
                        txtLongitude.innerHTML = "LONGITUDE: " + longitude;
                        txtAccuracy.innerHTML = "ACCURACY: " + accuracy + " meter(s) or less";
                        rtnAddress = data.search.context.location.address.text;
                        //got to replace the <br/> with a ","
                        strAddress = rtnAddress.replace(/<br?\/?>/g, ", ");
                        var replaceAddress = data.search.context.location.address.text.replace("<br/>", ",", "gi");

                        txtAddress.innerHTML = "ADDRESS: " + strAddress;
                        txtStatus.innerHTML = "STATUS: Acquired position";

                    }
                };
                oReq.send(null);

            };

            function errorGPS(err) {
                if (err.code == 1) {
                    txtStatus.innerHTML = "STATUS: You need to share your location";
                }
                else if (err.code == 2) {
                    txtStatus.innerHTML = "STATUS: Positioning not available";
                }
                else {
                    txtStatus.innerHTML = "STATUS: Positioning timeout";
                }

                return;
            };


        }
    }


    var reset = document.getElementById("reset");
    if (reset) {
        reset.onclick = function () {
            txtLatitude.innerHTML = "LATITUDE: ";
            txtLongitude.innerHTML = "LONGITUDE: ";
            txtAccuracy.innerHTML = "ACCURACY: ";
            txtAddress.innerHTML = "ADDRESS: ";
            txtStatus.innerHTML = "STATUS: ";
        }
    }


    var sms = document.getElementById("sms");
    if (sms) {
        sms.onclick = function () {

            get_geolocation();

            var sms = new MozActivity({
                name: "new", // Possible compose-sms in future versions
                data: {
                    type: "websms/sms",
                    number: "+1234567890",
                    body: "hello how are you"
                }
            });

        }
    }


    var email = document.getElementById("email");
    if (email) {
        email.onclick = function () {
            alert("email");

            var cde = global_var();
            //alert(cde);

            var abc = get_geolocation();
            alert("get_geolocation - " + abc);

        }
    }


    var map = document.getElementById("map");
    if (map) {
        map.onclick = function () {
            get_geolocation();

            alert("map");

        }
    }




    function global_var() {
        return "XX global";
    }




    function get_geolocation() {
        //maximumAge was 0
        //timeout was 60000 (60 seconds)
        var options = {
            enableHighAccuracy: true,
            timeout: 60000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(successGPS, errorGPS, options);
        //var current_location = pos.coords;    //cannot work!!
        
        alert("XX");

        function successGPS(pos) {
            var current_location = pos.coords;


            //var myAppID = "jsUVAhQlX3l33gNikHmI";
            //var myAppCode = "nWxKggej740Q90VgJDmDOQ";
            var latitude = current_location.latitude;
            var longitude = current_location.longitude;
            var accuracy = current_location.accuracy;

            //http://demo.places.nlp.nokia.com/places/v1/discover/explore?at=37.78937%2C-122.38912&size=0&app_id=jsUVAhQlX3l33gNikHmI&app_code=nWxKggej740Q90VgJDmDOQ&accept=application%2Fjson
            var mainURL = "http://demo.places.nlp.nokia.com/places/v1/discover/explore?at=" +
                latitude + "%2C" + longitude + "&size=0&app_id=" + myAppID + "&app_code=" + myAppCode + "&accept=application%2Fjson"

            //this is the result of json
            //http://demo.places.nlp.nokia.com/places/v1/discover/explore?at=37.78937%2C-122.38912&app_id=jsUVAhQlX3l33gNikHmI&app_code=nWxKggej740Q90VgJDmDOQ#

            var oReq = new XMLHttpRequest();
            var rtnAddress = "abc";
            var i, len;
            oReq.open("GET", mainURL, true);
            oReq.responseType = 'json';
            oReq.onreadystatechange = function () {
                if (oReq.readyState == 4) {
                    var data = oReq.response;
                    //alert(data.search.context.location.address.text);
                    txtLatitude.innerHTML = "LATITUDE: " + latitude;
                    txtLongitude.innerHTML = "LONGITUDE: " + longitude;
                    txtAccuracy.innerHTML = "ACCURACY: " + accuracy + " meter(s) or less";
                    //strAddress = rtnAddress.replace(/<br?\/?>/g, ", ");   //this is another way to replace text
                    var replaceAddress = data.search.context.location.address.text.replace("<br/>", ",", "gi");
                    txtAddress.innerHTML = "ADDRESSXX: " + replaceAddress; //data.search.context.location.address.text;
                    txtStatus.innerHTML = "STATUS: Acquired position";

                }
            };
            oReq.send(null);

            return "success";

        };

        function errorGPS(err) {
            if (err.code == 1) {
                txtStatus.innerHTML = "STATUS: You need to share your location";
            }
            else if (err.code == 2) {
                txtStatus.innerHTML = "STATUS: Positioning not available";
            }
            else {
                txtStatus.innerHTML = "STATUS: Positioning timeout";
            }

            return "error";
        };

        var abc = current_location.pos.coords.latitude;
        //alert("loc:" + current_location.pos.coords.latitude);
        return "gps";

    }


})();




