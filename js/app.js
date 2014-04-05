(function () {


    //window.addEventListener("deviceorientation", handleOrientation, true);

    var txtLatitude = document.getElementById("txtLatitude");
    var txtLongitude = document.getElementById("txtLongitude");
    var txtAccuracy = document.getElementById("txtAccuracy");
    var txtAddress = document.getElementById("txtAddress");
    var txtStatus = document.getElementById("txtStatus");

    var myAppID = "jsUVAhQlX3l33gNikHmI";
    var myAppCode = "nWxKggej740Q90VgJDmDOQ";

    //txtLatitude.innerHTML = "LATITUDE: XXXXXXX";


    var wai = document.getElementById("wai");
    if (wai) {
        wai.onclick = function () {
            //alert("wai");

            //txtLatitude.innerHTML = "LATITUDE: XXXXXXX";

            get_geolocation();

        }
    }


    var sms = document.getElementById("sms");
    if (sms) {
        sms.onclick = function () {

            get_geolocation();

            var prepareSMS = new MozActivity({
                name: "new", // Possible compose-sms in future versions
                data: {
                    type: "websms/sms",
                    number: "",
                    body: "hello how are you"
                }
            });

        }
    }


    var email = document.getElementById("email");
    if (email) {
        email.onclick = function () {
            //alert("email");

            get_geolocation();

            var prepareEmail = new MozActivity({
                name: "new", // Possible compose-mail in future versions
                data: {
                    type: "mail",
                    url: "mailto:?subject=hello%20world&body=body%20is%20here"
                }
            });

            //alert("email after");

        }
    }


    var map = document.getElementById("map");
    if (map) {
        map.onclick = function () {
            //alert("map");

            get_geolocation();

        }
    }





    function handleOrientation(event) {
        var dAbsolute = event.absolute;
        var dAlpha = event.alpha;
        var dBeta = event.beta;
        var dGamma = event.gamma;

        if (dAlpha <= 130) {
            window.navigator.vibrate(100);
            txtLatitude.innerHTML = "LATITUDE: ";
            txtLongitude.innerHTML = "LONGITUDE: ";
            txtAccuracy.innerHTML = "ACCURACY: ";
            txtAddress.innerHTML = "ADDRESS: ";
            txtStatus.innerHTML = "STATUS: ";
            window.navigator.vibrate(0);
        }
    }

    function reset() {
        txtLatitude.innerHTML = "LATITUDE: ";
        txtLongitude.innerHTML = "LONGITUDE: ";
        txtAccuracy.innerHTML = "ACCURACY: ";
        txtAddress.innerHTML = "ADDRESS: ";
        txtStatus.innerHTML = "STATUS: ";
    }



    function get_geolocation() {
        //maximumAge was 0
        //timeout was 60000 (60 seconds)
        txtStatus.innerHTML = "STATUS: Acquiring position...";

        var options = {
            enableHighAccuracy: true,
            timeout: 60000,
            maximumAge: 0
        };
        navigator.geolocation.getCurrentPosition(successGPS, errorGPS, options);
        //var current_location = pos.coords;    //cannot work!!

        function successGPS(pos) {
            var current_location = pos.coords;


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
                    txtAddress.innerHTML = "ADDRESS: " + replaceAddress; //data.search.context.location.address.text;
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

        };

        //var abc = current_location.pos.coords.latitude;
        //alert("loc:" + current_location.pos.coords.latitude);
    }


})();




