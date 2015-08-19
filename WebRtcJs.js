WebRtcJs = function(options) {
    
    
    var webRtcJs = {};
    
    webRtcJs.init = function(options) {
        
        var browserFactory = new webRtcJs.browser.Factory();
        webRtcJs.browser = browserFactory.make();
        webRtcJs.media = {};
        
        return {
            addMedia: webRtcJs.addMedia,
            hasMedia: webRtcJs.hasMedia,
            getMedia: webRtcJs.getMedia,
            removeMedia: webRtcJs.removeMedia
        };
        
    }
    
    webRtcJs.addMedia = function(options) {

        options.browser = webRtcJs.browser;

        var media;
        switch (options.type) {
            case "local":
                media = new webRtcJs.LocalMedia(options);
                break;
            case "remote":
                media = new webRtcJs.RemoteMedia(options);
                break;
            default:
                throw new webRtcJs.Exception("Unknown media type");
        }
        
        webRtcJs.media[options.key] = media;
        
        return media;
        
    }
    
    webRtcJs.hasMedia = function(key) {
        
        return !!webRtcJs.media[key];
        
    }
    
    webRtcJs.getMedia = function(key) {
        
        if (!webRtcJs.hasMedia(key)) {
            throw new webRtcJs.Exception("Unknown media key", {
                key: key
            });
        }
        
        return webRtcJs.media[key];
        
    }
    
    webRtcJs.removeMedia = function(key) {
        
        if (webRtcJs.hasMedia(key)) {
            delete(webRtcJs.media[key]);
        }
        
    }
    
    webRtcJs.LocalMedia = function(options) {
        
        this.options = options;

    }
    
    webRtcJs.LocalMedia.prototype.start = function() {
        
        var constraints = {
            video: true,
            audio: false
        };
        
        if (this.options.constraints) {
            constraints = this.options.constraints;
        }

        this.options.browser.getUserMedia(
            constraints, 
            this.onUserMediaSuccess,
            this.onUserMediaError
        );
        
    }
    
    webRtcJs.LocalMedia.prototype.onUserMediaSuccess = function(stream) {
        this.options.element.src = this.browser.getUserMediaUrl(stream);
        this.options.element.play();
        
    }
    
    webRtcJs.LocalMedia.prototype.onUserMediaError = function(error) {
        throw new webRtcJs.Exception("User media streams are not available.", {
            error: error
        });
        
    }
    
    webRtcJs.RemoteMedia = function() {
        

        
    }
    
    webRtcJs.RemoteMedia.prototype.start = function() {
        
    }
    
    webRtcJs.Exception = function(message, data) {

        if (typeof message === "undefined") {
            message = "An exception of the WebRtcJs module has been raised.";
        }

        if (typeof data === "undefined") {
            data = {};
        }

        console.log(message);
        console.log(data);

        return {
            message: message,
            data: data
        };

    };
    
    webRtcJs.browser = {};
    
    webRtcJs.browser.Factory = function() {
        
    }
    
    webRtcJs.browser.Factory.prototype.make = function() {
        
        if (navigator.getUserMedia) {
            return new webRtcJs.browser.Default();
        }
        
        //if (navigator.getUserMedia) {
        //    return new webRtcJs.browser.Opera();
        //}
        
        //if (navigator.msGetUserMedia) {
        //    return new webRtcJs.browser.InternetExplorer();
        //}
        
        if (navigator.webkitGetUserMedia) {
            return new webRtcJs.browser.Chrome();
        }
        
        if (navigator.mozGetUserMedia) {
            return new webRtcJs.browser.FireFox();
        }
        
        throw new webRtcJs.Exception("Your browser doesn't support WebRTC.");
        
    }
    
    webRtcJs.browser.Default = function() {
        
    }
    
    webRtcJs.browser.Opera = function() {
        
    }
    
    webRtcJs.browser.InternetExplorer = function() {
        
    }
    
    webRtcJs.browser.Chrome = function() {
        
    }
    
    webRtcJs.browser.Chrome.prototype.getUserMedia = function(constraints, successCallback, errorCallback) {
        navigator.webkitGetUserMedia(constraints, successCallback, errorCallback);
    }

    webRtcJs.browser.Chrome.prototype.getUserMediaUrl = function(stream) {
        return navigator.window.URL.createObjectURL(stream);
    }

    
    webRtcJs.browser.FireFox = function() {
        
    }
    
    webRtcJs.browser.FireFox.prototype.getUserMedia = function(constraints, successCallback, errorCallback) {
        navigator.mozGetUserMedia(constraints, successCallback, errorCallback);
    }
    
    webRtcJs.browser.FireFox.prototype.getUserMediaUrl = function(stream) {
        return stream;
    }

    return webRtcJs.init(options);

}