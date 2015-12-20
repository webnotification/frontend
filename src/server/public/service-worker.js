var test = 4;

self.addEventListener('push', function(event) {  
  console.log('Received a push message', event);

  // $.ajax({
  //   type: "POST",
  //     url: "http://localhost:3000/send_client_data",
  //     data:{'subs':end}
  // }).done(function() {
  //     console.log("--- success ---");

  // });

  var title = 'Fake... message';  
  var body = 'We have received a push message.';  
  var icon = '/images/image.png';  
  var tag = 'simple-push-demo-notification-tag';

  event.waitUntil(  
    self.registration.showNotification('Fake ...message', {  
      body: 'Fake message',  
      icon: icon,  
      tag: tag  
    })  
  );  
});

self.addEventListener('notificationclick', function(event){
      console.log('On notificaiton click:', event.notificaiton.tag);
      event.notificaiton.close();

      event.waitUntil(
          clients.matchAll({
            type: "window"
          })
          .then(function(clientList){
            for (var i = 0; i < clientList.length; i++){
              var client = clientList[i];
              if (client.url == '/' && 'focus' in client)
                return client.focus();
            }
            if (clients.openWindow){
                return clients.openWindow('/')''
            }
          })
        );
});