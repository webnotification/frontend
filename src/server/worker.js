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
		navigator.serviceWorker.register('/service-worker.js')
		.then(initialiseState);
	} else{
		console.warn('Service workers aren\'t supported in the browser.');
	}
})


function initialiseState(){
	if (!('showNotification' in ServiceWorkerRegistration.prototype)){
		console.warn('Notifications aren\'t supported.');
	}
	if (Notification.permission === 'denied'){
		console.warn('The user has blocked notifications.');
		return;
	}

}

function subscribe(){
	var pushButton = document.querySelector('.js-push-button');
	pushButton.disabled = true;
	navigator.serviceWorker.ready.then(function(ServiceWorkerRegistration){
		ServiceWorkerRegistration.pushManager.subscribe()
		.then(function(subscription){
			isPushEnabled = true;
			pushButton.textContent = 'Disable Push Messages';
			pushButton.disabled = false;
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

self.addEventListener('push', function(event){
	console.log('Received a push message', event);
	var title = 'Yay a message.';
	var body = 'We have received a push message.';
	var icon = '/images/icon-192x192.png'; 
	var tag = 'simple-push-demo-notification-tag';
	event.waitUntil(
		self.registration.showNotification(title, {
			body: body,
			icon: icon,
			tag: tag
		})
		);
});