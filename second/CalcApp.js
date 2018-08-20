var data = {};
// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

function data_object(a, b, result, calculate){
    change_button_color();
    data = {
        input_a: a,
        input_b: b,
        result_A_B: result,
        operation: calculate
    }
}

function change_button_color(){
    const button_tags= document.getElementsByTagName("button");
    for (let i = 0; i < button_tags.length; i++) {
        button_tags[i].style.backgroundColor = "white";
    }
}

function call_plus(id) {
    let a = parseFloat(document.getElementById("input_a").value);
    let b = parseFloat(document.getElementById("input_b").value);
    let result = a+b;
    document.getElementById("result_A_B").value = result;
    data_object(a, b, result, id);
    document.getElementById(id).style.backgroundColor = "lightblue";
}

function call_minus(id) {
    let a = parseFloat(document.getElementById("input_a").value);
    let b = parseFloat(document.getElementById("input_b").value);
    let result = a-b;
    document.getElementById("result_A_B").value = result;
    data_object(a, b, result, id);
    document.getElementById(id).style.backgroundColor = "lightblue";
}

function call_multiple(id) {
    let a = parseFloat(document.getElementById("input_a").value);
    let b = parseFloat(document.getElementById("input_b").value);
    let result = a*b;
    document.getElementById("result_A_B").value = result;
    data_object(a, b, result, id);
    document.getElementById(id).style.backgroundColor = "lightblue";
}

function call_division(id) {
    let a = parseFloat(document.getElementById("input_a").value);
    let b = parseFloat(document.getElementById("input_b").value);
    let result = a/b;
    document.getElementById("result_A_B").value = result;
    data_object(a, b, result, id);
    document.getElementById(id).style.backgroundColor = "lightblue";
}

function call_power(id) {
    let a = parseFloat(document.getElementById("input_a").value);
    let b = parseFloat(document.getElementById("input_b").value);
    let result = Math.pow(a, b);
    document.getElementById("result_A_B").value = result;
    data_object(a, b, result, id);
    document.getElementById(id).style.backgroundColor = "lightblue";
}

function save_form() {
    if (document.getElementById("cloud_saving").checked) {
        // Create a storage reference from our storage service
        var storageRef = storage.ref();
        var usersRef = storageRef.child("users/result_CalcApp.json");
        var data_s = JSON.stringify(data);
        usersRef.putString(data_s).then(function(snapshot) {
            console.log('Uploaded a raw string!');
        });
    } else {
        const storage = require('electron-json-storage');
        const dataPath = storage.getDataPath();
        // console.log(dataPath);
        storage.set('result_CalcApp', data, function(error) {
            console.log(error);
        });
    }
}

function load_form() {
    change_button_color();
    if (document.getElementById("cloud_saving").checked) {
        var gsReference = storage.refFromURL('gs://basic-cloud-saving.appspot.com/users/result_CalcApp.json')
        gsReference.getDownloadURL().then(function(url){
            // This can be downloaded directly:
            var XMLHttp = new XMLHttpRequest();
            XMLHttp.onreadystatechange = function() {
                if (XMLHttp.readyState == 4 && XMLHttp.status == 200) {
                    data = JSON.parse(XMLHttp.responseText); // should have your text
                    console.log(data);
                    for (let k in data){
                        if (k === "operation") {
                            document.getElementById(data[k]).style.backgroundColor = "lightblue";
                        }
                        else {
                            document.getElementById(k).value = data[k];
                        }
                    }
                }
            };
            XMLHttp.open("GET", url, true); // true for asynchronous
            XMLHttp.send(null);
        }).catch(function(error) {
            // Handle any errors from Storage
        });
    } else {
        const storage = require('electron-json-storage');
        const dataPath = storage.getDataPath();
        // console.log(dataPath);
        // Read
        storage.get('result_CalcApp', function(error, object) {
            if (error) throw error;
            console.log(object);
            data = object;
            for (let k in object){
                if (k === "operation") {
                    document.getElementById(object[k]).style.backgroundColor = "lightblue";
                }
                else {
                    document.getElementById(k).value = object[k];
                }

            }
        });
    }

}