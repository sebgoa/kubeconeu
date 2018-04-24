'use strict';

var machinebox = machinebox || {};

machinebox.Face = class {
	constructor(options) {
		this.options = options || {};
		this.options.snapshotInterval = this.options.snapshotInterval || 1000;
		this.options.error = this.options.error || function(error) {
			console.warn(error);
		}
		this.possible = true;
		this.canvas = document.createElement('canvas');
		this.video = document.querySelector(this.options.videoSelector);
		if (!this.video) {
			this.possible = false;
			this.options.error('face-verify: must provide a <video> via videoSelector option');
		}
		if (!this.hasGetUserMedia()) {
			this.possible = false;
			this.options.error('face-verify: getUserMedia is not supported in this browser');
		}
	}

	hasGetUserMedia() {
		return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia || navigator.msGetUserMedia);
	}

	getUserMedia() {
		return navigator.getUserMedia || navigator.webkitGetUserMedia || 
			navigator.mozGetUserMedia || navigator.msGetUserMedia;
	}

	start() {
		if (!this.possible) {
			this.options.error('face-verify: cannot start (see previous errors)');
			return;
		}
		var handleError = function(e){
			this.options.error("failed to access webcam", e);
		}.bind(this)
		var mediaOptions = {
			video: {
				mandatory: {
					maxWidth: 400,
					maxHeight: 300,
				}
			}
		}
		if (navigator.getUserMedia) {
			navigator.getUserMedia(mediaOptions, this.onLocalMediaStream.bind(this), handleError);
		} else if (navigator.webkitGetUserMedia) {
			navigator.webkitGetUserMedia(mediaOptions, this.onLocalMediaStream.bind(this), handleError);
		} else if (navigator.mozGetUserMedia) {
			navigator.mozGetUserMedia(mediaOptions, this.onLocalMediaStream.bind(this), handleError);
		} else if (navigator.msGetUserMedia) {
			navigator.msGetUserMedia(mediaOptions, this.onLocalMediaStream.bind(this), handleError);
		}
	}

	onLocalMediaStream(localMediaStream) {
		this.video.src = window.URL.createObjectURL(localMediaStream);
		this.options.onStart()
	}

	getBase64Snapshot() {
		this.canvas.width = this.video.videoWidth;
		this.canvas.height = this.video.videoHeight;
		var ctx = this.canvas.getContext('2d');
		ctx.drawImage(this.video, 0, 0, this.video.videoWidth, this.video.videoHeight);
		var dataURL = this.canvas.toDataURL("image/jpeg")
		return dataURL.slice("data:image/jpeg;base64,".length)
	}
}