// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require cloudinary/jquery.cloudinary
//= require underscore
//= require_tree .


function sign(params) {
  return new Promise(function(resolve, reject) {
    var paramsToSign = _.omit(params, 'file');

    $.get('/signature', paramsToSign, function(signature) {
      console.log(signature);
      resolve(signature);  
    });
  });
}

$(document).ready(function() {
  $('#file').change(function(e) {
    var photo = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      
      var params = {
        'colors' : true,
        'file': photo
      };

      sign(params).then(function(signature) {
        _.extend(params, signature);

        var form = new FormData();
        _.each(params, function(value, key) {
          form.append(key, value);
        });

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.cloudinary.com/v1_1/renshao/image/upload', true);
        xhr.onload = function(e) {
          console.log(xhr.response);
        };
        xhr.onerror = function(e) {
          console.log(e);
        };
        xhr.send(form);        
      });


    };
    reader.readAsBinaryString(photo);
  });
});