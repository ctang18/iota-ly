var $ = require('jquery');
var Marionette = require('backbone.marionette');

var LoginView = Marionette.ItemView.extend({

  template: '#login-view',

  events: {
    'click .show-register': '_showRegister',
    'click .show-login': '_showLogin',
    'submit .login-form': '_login',
    'submit .register-form': '_register'
  },

  _showRegister: function() {
    this.$el.find('.login-body').fadeOut('fast', function() {
      this.$el.find('.register-body').fadeIn('fast');
    }.bind(this));
  },

  _showLogin: function() {
    this.$el.find('.register-body').fadeOut('fast', function() {
      this.$el.find('.login-body').fadeIn('fast');
    }.bind(this));
  },

  _login: function(e) {
    e.preventDefault();

    var $form = $(e.target);
    var email = $form.find('.email-input').val();
    var password = $form.find('.password-input').val();

    var creds = {
      email: email,
      password: password
    };

    // App.UserSession.login(creds)
    //   .then(function() {

    //   });

    return false;
  },

  _register: function(e) {
    e.preventDefault();

    var $form = $(e.target);
    var email = $form.find('.email-input').val();
    var password = $form.find('.password-input').val();
    var password2 = $form.find('.password2-input').val();

    var creds = {
      email: email,
      password: password,
      password2: password2
    };

    // App.UserSession.register(creds)
    //   .then(function() {

    //   });

    return false;
  }

});

module.exports = LoginView;