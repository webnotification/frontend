var test = 4;

self.addEventListener('push', function(event) {  
  console.log('Received a push message', event);

  $.ajax({
    type: "POST",
      url: "http://localhost:3000/send_client_data",
      data:{'subs':end}
  }).done(function() {
      console.log("--- success ---");

  });

  var title = 'Yay a message.';  
  var body = 'We have received a push message.';  
  var icon = '/images/image.png';  
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(  
    self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  
  );  
});