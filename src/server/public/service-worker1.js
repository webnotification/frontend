self.addEventListener('push', function(event) {  
  console.log('Received a push message', event);
  console.log('testing');

  var data = 'YOLO';
  var title = 'YOLO';
  var body = 'YOLO';
  var icon = '/images/image.png';  
  var tag = 'simple-push-demo-notification-tag';
  console.log('about to do it');   

  if ((event.waitUntil)){
    console.log('it exists');
  } else{
    console.log('It doesnt exists!');
  }

  event.waitUntil(function() {
        console.log('You are saved!!');
        self.registration.showNotification(title, {  
            body: body,  
            icon: icon,  
            tag: tag  
        })
      });
  }); 