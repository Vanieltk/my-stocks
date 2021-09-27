import {NotificationManager} from 'react-notifications';

 const NotificationAlert = (type, title, subtitle="") => {
  switch (type) {

    case 'info':
      NotificationManager.info('Info message');
      break;

    case 'success':
      NotificationManager.success(subtitle, title);
      break;

    case 'warning':
      NotificationManager.warning(subtitle, title);
      break;
      
    default:
      NotificationManager.error(subtitle, title)
      break;
  }
};

export default NotificationAlert;