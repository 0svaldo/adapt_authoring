define([
  'core/origin',
  'backbone-forms',
  'libraries/spectrum/spectrum'
], function(Origin, BackboneForms, Spectrum) {

  var ScaffoldColorPickerView = Backbone.Form.editors.Base.extend({

    tagName: 'input',

    className: 'scaffold-color-picker',

    events: {
      'change': function() { this.trigger('change', this); },
      'focus': function() { this.trigger('focus', this); },
      'blur': function() { this.trigger('blur', this); }
    },

    render: function() {
      _.defer(this.postRender.bind(this));
      return this;
    },

    postRender: function() {
      this.$el.spectrum({
        color: this.value,
        showInput: true,
        showAlpha: true,
        showInitial: true,
        showInput: true,
        showPalette: true,
        showButtons: true,
        cancelText: "Cancel selection",
        palette: [],
        preferredFormat: "hex3",
        showSelectionPalette: true,
        maxSelectionSize: 21,
        localStorageKey: "adapt-authoring.spectrum.colorpicker"
        localStorageKey: "adapt-authoring.spectrum.colorpicker",
        show: function(color) {
          Origin.contentPane.disableScroll();
        },
        hide: function(color) {
          Origin.contentPane.enableScroll();
        }
      });
    },

    getValue: function() {
      var colour = this.$el.spectrum('get');
      if (colour) return colour.toHexString();
      return '';
    },

    setValue: function(value) {
      this.$el.spectrum('set', value);
    },

    focus: function() {
      if (!this.hasFocus) {
        this.$el.focus();
      }
    },

    blur: function() {
      if (this.hasFocus) {
        this.$el.blur();
      }
    },

    remove: function() {
      this.$el.spectrum('destroy');
      Backbone.Form.editors.Text.prototype.remove.call(this);
    }

  });

  Origin.on('origin:dataReady', function() {
    Origin.scaffold.addCustomField('ColorPicker', ScaffoldColorPickerView);
  });

  return ScaffoldColorPickerView;

});
