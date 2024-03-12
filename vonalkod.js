let selectedDeviceId;
const codeReader = new ZXing.BrowserMultiFormatReader()
console.log('ZXing code reader initialized')

/*const codeReader = new ZXing.BrowserQRCodeReader();
let videoDevice = false;

codeReader.getVideoInputDevices().then((videoInputDevices) => {
    console.log('codeReader');
    if (videoInputDevices.length >= 1) {
        console.log('videoInputDevices.length >= 1');
        videoDevice = true;
        //startScanner();
        document.getElementById("videoWrapper").style.display = "block";
        document.getElementById("videoInputDevices").innerHTML = videoInputDevices.length;
    } else {
        console.log('videoInputDevices.length: ' + videoInputDevices.length);
        document.getElementById("videoInputDevices").innerHTML = videoInputDevices.length;
    }
}).catch((err) => {
    console.error(err)
});*/


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