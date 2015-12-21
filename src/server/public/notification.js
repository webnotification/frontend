/*import mongoose from 'mongoose';
// var MongoClient = require('mongodb').MongoClient;
// MongoClient.connect("mongodb://localhost:27017/users", function(err, db) {
//   if(err) { return console.dir(err); };
// var collection = db.collection('register_id');*/
var isPushEnabled = false;

window.addEventListener('load', function(){
	var pushButton = document.querySelector('.js-push-button');
	pushButton.addEventListener('click', function(){
		if (isPushEnabled){
			unsubscribe();
		} else {
			subscribe();
		}
	});
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('/service-worker2.js')
		.then(initialiseState);
	} else{
		console.warn('Service workers aren\'t supported in the browser.');
	}
})


function initialiseState(){
	if (!('showNotification' in ServiceWorkerRegistration.prototype)){
		console.warn('Notifications aren\'t supported.');
	}else{
		console.log('Notifications are supported');
	}
	if (Notification.permission === 'denied'){
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
		ServiceWorkerRegistration.pushManager.getSubscription()
			.then(function(subscription){
				var pushButton = document.querySelector('.js-push-button');
				pushButton.disabled = false;
			if (!subscription){
				return;
			}
			var sendSubscriptionToServer = function(subscription){

				console.log("--- frontend ---", subscription.endpoint);
				saveUserId(subscription.endpoint, function(){
					console.log('Tracking: user subscribed to notifications');
				});
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
			var sendSubscriptionToServer = function(subscription){

				console.log("--- frontend ---", subscription.endpoint);
				saveUserId(subscription.endpoint);
			}
			return sendSubscriptionToServer(subscription);
		})
		.catch(function(e){
			if (Notification.permission ==='denied'){
				console.warn('permission for Notifications was denied');
				pushButton.disabled = true;
			} else {
				console.error('Unable to subscribe to push.', e);
				pushButton.disabled = false;
				pushButton.textContent = 'Enable Push Messages';
			}
		})
	});
}

function saveUserId(end){

     $.ajax({
         type: "POST",
           url: "http://192.168.0.109:8000/notification/save_push_key",
           data:{'subs':end, 'website': window.location.host}
     }).done(function() {
           console.log("--- success ---");

     });
}

// self.addEventListener('push', function(event){
// 	console.log('Received a push message', event);
// 	var title = 'Yay a message.';
// 	var body = 'We have received a push message.';
// 	var icon = '/images/image.png'; 
// 	var tag = 'simple-push-demo-notification-tag';
// 	event.waitUntil(
// 		self.registration.showNotification(title, {
// 			body: body,
// 			icon: icon,
// 			tag: tag
// 		})
// 		);
// });
