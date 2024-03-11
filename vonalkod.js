const codeReader = new ZXing.BrowserQRCodeReader();
let videoDevice = false;

codeReader.getVideoInputDevices().then((videoInputDevices) => {
    console.log('codeReader');
    if (videoInputDevices.length >= 1) {
        console.log('videoInputDevices.length >= 1');
        videoDevice = true;
        /*startScanner();*/
        document.getElementById("videoWrapper").style.display = "block";
        document.getElementById("videoInputDevices").innerHTML = videoInputDevices.length;
    } else {
        console.log('videoInputDevices.length: ' + videoInputDevices.length);
        document.getElementById("videoInputDevices").innerHTML = videoInputDevices.length;
    }
}).catch((err) => {
    console.error(err)
});