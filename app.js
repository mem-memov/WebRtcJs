var webRtcJs = new WebRtcJs();

var localMediaElement = document.getElementById("localVideo");
var remoteMediaElement = document.getElementById("remoteVideo");

var localMedia = webRtcJs.addMedia({
    type: "local",
    element: localMediaElement,
    key: "localVideo"
});

console.log(localMedia);

a = localMedia.start();

console.log(a);