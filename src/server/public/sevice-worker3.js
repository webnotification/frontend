var test = 4;
console.log('test');


fetch('http://localhost:3000/get_message')  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.log('Looks like there was a problem. Status Code: ' +  
          response.status);  
        return;  
      }
      // Examine the text in the response  
      response.json().then(function(data) 
    {
        self.addEventListener('push', function(event) {  
      console.log('Received a push message', event);
      console.log('testing');
      var icon = '/images/image.png';  
      var tag = 'simple-push-demo-notification-tag';
         var title = data['title'];  
        var body = data['message'];
      console.log(title, body, 'yay');
      
      event.waitUntil(function() {
      console.log(title, body, 'yolo');
      self.registration.showNotification(title, {  
      body: body,  
      icon: icon,  
      tag: tag  
    })  
  });
  })
})

})
