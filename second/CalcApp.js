var data = {};

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
        alert("Cloud!!!");
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
        alert("Cloud!!!");
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