var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BG2BHl3ODHCGPtfi0qgG4yVVm22dPXLzwG1yRkV_tjMsvzMNKm4EaiWaS-Dk5fJbPPdtJNoqk19nuxhBGb4t3Ag",
   "privateKey": "Ttd5K9Iblki-48JYlapDKNBYrTBGxyR96fnF56MEfPM"
};
 
 
webPush.setVapidDetails(
   'http://127.0.0.1:8948/',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/e27DFg6_5XY:APA91bHu6_NZpoo-HQTAoNk2imxePpY7l1qTb-a1guPz3C_glQhr09-oCqo62UPQC_J4Y2TOlM8FBxyUGxXhkozjt_M2xnRdvU9w6eJXVW1OUmJ28t4zzm_FeysTLNjCvhjNqjLSDRtw",
   "keys": {
       "p256dh": "BJYwo/O7BmifC3kOr10xGVEfMsnaGWL0E/vzr2ePUnEZgaDhqJQ5YSHaAvP0HoD2/XWyWQdA45r/QQAPASNgk1w=",
       "auth": "JhLHj8NKcU6+9hquKXkyEA=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi Firebase!';
 
var options = {
   gcmAPIKey: '990218520335',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);