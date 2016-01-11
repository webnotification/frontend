var base_url = 'http://127.0.0.1:8000/notification'; 
//var base_url = 'https://api.flashnotifier.com/notification';
var IMAGE_SIZE_THRESHOLD = 50000;

let config = {
        get_groups_url : base_url + '/get_groups',
        save_client_url: base_url + '/save_client',
        generate_group_url : base_url + '/generate_group',
        send_notification_url : base_url + '/send_notification',
        send_permission_url : base_url + '/send_permission_message',
        get_notification_analytics_url : base_url + '/get_notification_analytics',
        get_permission_analytics_url : base_url + '/get_permission_analytics',
        NOTIFICATION_IMAGE_BASE_PATH : "https://s3-ap-southeast-1.amazonaws.com/notificationicons/",
        IMAGE_SIZE_THRESHOLD : IMAGE_SIZE_THRESHOLD,  //in Bytes
        IMAGE_SIZE_MESSAGE : 'File size is bigger than '+IMAGE_SIZE_THRESHOLD+' bytes'
}

export default config;
