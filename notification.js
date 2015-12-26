/*import mongoose from 'mongoose';
// var MongoClient = require('mongodb').MongoClient;
// MongoClient.connect("mongodb://localhost:27017/users", function(err, db) {
//   if(err) { return console.dir(err); };
// var collection = db.collection('register_id');*/
var isPushEnabled = false;
var user_id = readCookie()['user_id']
console.log(readCookie()['user_id']);
var permission_action = 'none';
var permission_id;

window.addEventListener('load', function(){
	if (!readCookie()['user_id']) {
		$.get(
 		"http://localhost:8000/notification/generate_user_id?website=" + window.location.host,
    	function(data) {
    	document.cookie='user_id='+data['user_id'].toString();
    	permission_and_subscribe();
    	});		
	}
	else{
		permission_and_subscribe();
	}
})

function permission_and_subscribe(){
	var pushButton = document.querySelector('.js-push-button');
	pushButton.addEventListener('click', function(){
		var permission_status = false;
		var user_id = readCookie()['user_id'];
		$.get(
 		"http://localhost:8000/notification/ask_permission?user_id="+user_id,
    	function(data) {
    	permission_status = data['ask'];
    	permission_id = data['permission_id'];
		if (isPushEnabled){
			unsubscribe();
		} 
		else if (permission_status){
			console.log('here');
		 	subscribe();
			}
    
    	});	
	});
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/service-worker.js', { mode: "cors" })
		.then(initialiseState);
	} else{
		console.warn('Service workers aren\'t supported in the browser.');
	}
}

function readCookie(){
        c = document.cookie.split('; ');
        cookies = {};

        for(i=c.length-1; i>=0; i--){
           C = c[i].split('=');
           cookies[C[0]] = C[1];
        }

        return cookies;
    }

function initialiseState(){
	if (!('showNotification' in ServiceWorkerRegistration.prototype)){
		console.warn('Notifications aren\'t supported.');
	}else{
		console.log('Notifications are supported');
	}
	if (Notification.permission === 'denied'){
		// $.get(
 	// 	"http://192.168.0.123:8000/notification/send_permission_response?permission_id="
 	// 	+ permission_id+"&user_id="+user_id+"&action=reject",
  //   	function(data){
  //   	document.cookie='user_id='+data['user_id'].toString();
  //   	});		
		console.warn('The user has blocked notifications.');
		return;
	}else{
		console.log('Notifications are not blocked')
	}
	if (!('PushManager' in window)){
		console.warn('Push messaging isn\'t supported');
		return;
	}else{
		console.log('Push messaging is supported');
	}

	navigator.serviceWorker.ready.then(function(ServiceWorkerRegistration){
		sendMessage({user_id: user_id}).then(function(data){
      	console.log('sedningggg', data);
    	});
		ServiceWorkerRegistration.pushManager.getSubscription()
			.then(function(subscription){
				var pushButton = document.querySelector('.js-push-button');
				pushButton.disabled = false;
			if (!subscription){
				return;
			}
			console.log('saving11');
			var sendSubscriptionToServer = function(subscription){

				console.log("--- frontend ---", subscription.endpoint);
				saveUserId(subscription.endpoint);
			}
			sendSubscriptionToServer(subscription);
			pushButton.textContent = 'Disable Push Messages';
			isPushEnabled = true;
			console.log("push is enabled")
			})
			.catch(function(err){
				console.warn('Error during getSubscription()', err);
			});
	});
}

function subscribe(){
	var pushButton = document.querySelector('.js-push-button');
	pushButton.disabled = true;
	navigator.serviceWorker.ready.then(function(ServiceWorkerRegistration){
		ServiceWorkerRegistration.pushManager.subscribe({userVisibleOnly:true})
		.then(function(subscription){
			isPushEnabled = true;
			pushButton.textContent = 'Disable Push Messages';
			pushButton.disabled = false;
			console.log(subscription.endpoint);
			console.log('saving22');
			var sendSubscriptionToServer = function(subscription){
				console.log("--- frontend ---", subscription.endpoint);
				saveUserId(subscription.endpoint, 1);
			}
			return sendSubscriptionToServer(subscription);
		})
		.catch(function(e){
			if (Notification.permission ==='denied'){
				console.warn('permission for Notifications was denied');
				permission_action = 'reject';
				console.log('rejectingg');
				$.ajax({
                type: "POST",
                url: "http://localhost:8000/notification/send_permission_response",
                data:{'permission_id':permission_id, 'action': permission_action, 'user_id': user_id}
            }).done(function() {
                console.log("---Tracking success ---");
                });
				pushButton.disabled = true;
			} else {
				console.error('Unable to subscribe to push.', e);
				pushButton.disabled = false;
				pushButton.textContent = 'Enable Push Messages';
			}
		})
	});
		
}

function saveUserId(end, track){
	track = track || 0;
    $.ajax({
                type: "POST",
                url: "http://localhost:8000/notification/save_push_key",
                data:{'subs':end, 'website': window.location.host, 'user_id': user_id}
            }).done(function() {
         		if (track==0){
         			return ;         		}
            	permission_action = 'accept';
            	console.log('accepting');
            	$.ajax({
                type: "POST",
                url: "http://localhost:8000/notification/send_permission_response",
                data:{'permission_id':permission_id, 'action': permission_action, 'user_id': user_id}
            }).done(function() {
                console.log("--- success ---");
                })
		})
 }

function sendMessage(message) {
  // This wraps the message posting/response in a promise, which will resolve if the response doesn't
  // contain an error, and reject with the error if it does. If you'd prefer, it's possible to call
  // controller.postMessage() and set up the onmessage handler independently of a promise, but this is
  // a convenient wrapper.
  return new Promise(function(resolve, reject) {
    var messageChannel = new MessageChannel();
    messageChannel.port1.onmessage = function(event) {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    // This sends the message data as well as transferring messageChannel.port2 to the service worker.
    // The service worker can then use the transferred port to reply via postMessage(), which
    // will in turn trigger the onmessage handler on messageChannel.port1.
    // See https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage
    navigator.serviceWorker.controller.postMessage(message,
      [messageChannel.port1]);
  });
}

