function RecordingController () {

  this.flash = new FlashStore();
  this.flash.addChangeHandler(this.changeHandler);

  this.$ = {
    prerecord: 'flipbase-prerecord',
    countdown: 'flipbase-countdown',
    recording: 'flipbase-recording',
    processing: 'flipbase-processing',
    loading: 'flipbase-loading',
    paused: 'flipbase-paused',
    playing: 'flipbase-playing'
  };
}

RecordingController.prototype = {

  _components: {},

  registerComponent: function (name, component) {
    this._components[name] = component;
  },

  changeHandler: function (evt) {
    if (evt.action === 'CHANGE_STATE')
      this.showOnly(evt.state);
  },

  /**
   * Hide all DOM elements, except the DOM query selector
   *
   * @return {[type]} [description]
   */
  showOnly: function (selector) {
    var views = keys(this.$);
    var _this = this;

    each(view, function (view) {
      if (selector !== view)
        _this.$[view].hide();
      if (selector === view)
        _this.$[view].render();
    });
  },

  /**
   * Hide all views
   *
   * @return {[type]} [description]
   */
  hideAll: function () {

  }

};

function Controller () {

  this.webcam = new WebcamModule();
  this.uploader = new UploadModule();

  this.recordingController = new RecordingController(this.webcam);
  this.uploadController = new UploadController(this.uploader);
}

function RecordingController () {

  // Register components, so we can use them in the template
  this.components = {
    recordButton: new DOM.button({}),
    pauseButton: new DOM.button()
  }

  // Register selectors of interfaces, so we can hide/show what we would like
  this.$ = {

  }

}