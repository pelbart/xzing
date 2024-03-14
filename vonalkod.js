let selectedDeviceId;
const codeReader = new ZXing.BrowserMultiFormatReader();
const errorMessageElement = document.getElementById('errorMessageElement');
console.log('ZXing könyvtár betöltve...');

//Az eszközök listázáva előtt előbb meg kellene próbálni
//engedélyt kérni a kamerához.

codeReader.listVideoInputDevices()
    .then((videoInputDevices) => {
        
        const sourceSelectElement = document.getElementById('sourceSelectElement');
        
        if (videoInputDevices.length === 0) {
            
            //Az eszköz nem rendelkezik kamerával,
            //ezért hibaüzenetet kell adni.
            
            sourceSelectElement.style.display = 'none';
            errorMessageElement.innerHTML = 'Nem található kamera...';
            errorMessageElement.style.display = 'block';
            
            return;

        } else if (videoInputDevices.length === 1) {
            
            sourceSelectElement.style.display = 'none';           
            
        } else if (videoInputDevices.length > 1) {

            //Az eszköz egynél több kamerával rendelkezik,
            //ezért a kamerákat egy listába töltöm,
            //ahonnan a felhasználó választhat.

            sourceSelectElement.style.display = 'block';
            
            videoInputDevices.forEach((element) => {
                const sourceOption = document.createElement('option');
                sourceOption.text = element.label;
                sourceOption.value = element.deviceId;
                sourceSelectElement.appendChild(sourceOption);
            });

            sourceSelectElement.onchange = () => {
                selectedDeviceId = sourceSelectElement.value;
                console.log(selectedDeviceId);
            };

        };

    })
    .catch((err) => {
        console.error(err);
        errorMessageElement.innerHTML = err;
        errorMessageElement.style.display = 'block';
    });

function  refreshList() {

    console.log("refreshList");

    codeReader.listVideoInputDevices()
    .then((videoInputDevices) => {
        
        const sourceSelectElement = document.getElementById('sourceSelectElement');
        
        if (videoInputDevices.length === 0) {
            
            //Az eszköz nem rendelkezik kamerával,
            //ezért hibaüzenetet kell adni.
            
            sourceSelectElement.style.display = 'none';
            errorMessageElement.innerHTML = 'Nem található kamera...';
            errorMessageElement.style.display = 'block';
            
            return;

        } else if (videoInputDevices.length === 1) {
            
            sourceSelectElement.style.display = 'none';           
            
        } else if (videoInputDevices.length > 1) {

            //Az eszköz egynél több kamerával rendelkezik,
            //ezért a kamerákat egy listába töltöm,
            //ahonnan a felhasználó választhat.

            sourceSelectElement.style.display = 'block';
            
            videoInputDevices.forEach((element) => {
                const sourceOption = document.createElement('option');
                sourceOption.text = element.label;
                sourceOption.value = element.deviceId;
                sourceSelectElement.appendChild(sourceOption);
            });

            sourceSelectElement.onchange = () => {
                selectedDeviceId = sourceSelectElement.value;
                console.log(selectedDeviceId);
            };

        };

    })
    .catch((err) => {
        console.error(err);
        errorMessageElement.innerHTML = err;
        errorMessageElement.style.display = 'block';
    });
};

function startScan() {

    console.log("startScan");
    codeReader.decodeOnceFromVideoDevice(undefined, 'video').then((result) => {
        document.getElementById("result").innerHTML = result.text;
    }).catch((err) => {
        console.error(err);
        if (!err.toString().match(/^NotFoundException: Video stream has ended before.*$/)
            && !err.toString().includes('Video stream has ended before')) {
                errorMessageElement.innerHTML = err;
                errorMessageElement.style.display = 'block';
        }
    });
    
    /*if (videoDevice) {
        codeReader.decodeOnceFromVideoDevice(undefined, 'video').then((result) => {
            document.getElementById("result").innerHTML = result.text;
        }).catch((err) => {
            console.error(err);
            if (!err.toString().match(/^NotFoundException: Video stream has ended before.*$/)
                && !err.toString().includes('Video stream has ended before')) {
                    document.getElementById("result").innerHTML = err;
            }
        })
    }*/

}

function resetScan() {

    codeReader.reset()
    document.getElementById('result').innerHTML = '';
    console.log("resetScan");   

}