let selectedDeviceId;
const codeReader = new ZXing.BrowserMultiFormatReader();
console.log('ZXing könyvtár betöltve...');

codeReader.listVideoInputDevices()
    .then((videoInputDevices) => {
        
        const sourceSelectElement = document.getElementById('sourceSelectElement');
        const errorMessageElement = document.getElementById('errorMessageElement');

        if (videoInputDevices.length === 0) {
            
            sourceSelectElement.style.display = 'none';
            errorMessageElement.innerHTML = 'Nem található kamera...';
            errorMessageElement.style.display = 'block';
            
            return;

        } else if (videoInputDevices.length === 1) {
            
            sourceSelectElement.style.display = 'none';

            selectedDeviceId = videoInputDevices[0].deviceId;

            errorMessageElement.innerHTML = selectedDeviceId;
            errorMessageElement.style.display = 'block';
            
        } else if (videoInputDevices.length > 1) {

            sourceSelectElement.style.display = 'block';
            
            videoInputDevices.forEach((element) => {
                const sourceOption = document.createElement('option');
                sourceOption.text = element.label;
                sourceOption.value = element.deviceId;
                sourceSelectElement.appendChild(sourceOption);
            });

            console.log("Van " + videoInputDevices.length + " kamera");
            document.getElementById("log").innerHTML = "Van " + videoInputDevices.length + " kamera";

        };

        //const sourceSelect = document.getElementById('sourceSelect')
        
        
        /*selectedDeviceId = videoInputDevices[0].deviceId
        if (videoInputDevices.length >= 1) {
            videoInputDevices.forEach((element) => {
                const sourceOption = document.createElement('option')
                sourceOption.text = element.label
                sourceOption.value = element.deviceId
                sourceSelect.appendChild(sourceOption)
            })

            sourceSelect.onchange = () => {
                selectedDeviceId = sourceSelect.value;
            };

            const sourceSelectPanel = document.getElementById('sourceSelectPanel')
            sourceSelectPanel.style.display = 'block'
        }*/

        /*document.getElementById('startButton').addEventListener('click', () => {
            codeReader.decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
                if (result) {
                    console.log(result)
                    document.getElementById('result').textContent = result.text
                }
                if (err && !(err instanceof ZXing.NotFoundException)) {
                    console.error(err)
                    document.getElementById('result').textContent = err
                }
            })
            console.log(`Started continous decode from camera with id ${selectedDeviceId}`)
        })

        document.getElementById('resetButton').addEventListener('click', () => {
            codeReader.reset()
            document.getElementById('result').textContent = '';
            console.log('Reset.')
        })*/

    })
    .catch((err) => {
        console.error(err)
        document.getElementById("result").innerHTML = err;
    });


function startScan() {

    console.log("startScan");
    codeReader.decodeOnceFromVideoDevice(undefined, 'video').then((result) => {
        document.getElementById("result").innerHTML = result.text;
    }).catch((err) => {
        console.error(err);
        if (!err.toString().match(/^NotFoundException: Video stream has ended before.*$/)
            && !err.toString().includes('Video stream has ended before')) {
                document.getElementById("result").innerHTML = err;
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