$.ajaxPrefilter(function(settings, _, jqXHR) {
  jqXHR.setRequestHeader('X-Parse-Application-ID', 'app-id');
  jqXHR.setRequestHeader('X-Parse-REST-API-Key', 'apikey');
});