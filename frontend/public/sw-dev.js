// Development Service Worker for RxMind
console.log('🔧 Service Worker: Installing...');

// Install event
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Install event');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('🔧 Service Worker: Activate event');
  event.waitUntil(self.clients.claim());
});

// Push event - when notification arrives
self.addEventListener('push', (event) => {
  console.log('🔔 Service Worker: Push event received');
  
  if (event.data) {
    try {
      const data = event.data.json();
      console.log('📋 Push data:', data);
      
      const tagId = data.notificationId ? `medication-reminder-${data.notificationId}` : 'medication-reminder-generic';
      const options = {
        body: data.body || 'Time to take your medicine!',
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        tag: tagId,
        renotify: true,
        silent: false,
        vibrate: [200, 100, 200],
        requireInteraction: true,
        actions: [
          {
            action: 'view',
            title: 'View Alarm',
            icon: '/icon-192x192.png'
          }
        ],
        data: {
          ...data,
          timestamp: Date.now()
        }
      };
      
      event.waitUntil((async () => {
        try {
          await self.registration.showNotification(data.title || 'Medication Reminder', options);
          const list = await self.registration.getNotifications({ includeTriggered: true });
          console.log('✅ Notification displayed. Active notifications:', list.length);
        } catch (err) {
          console.error('❌ showNotification failed:', err);
        }
      })());
      
    } catch (error) {
      console.error('❌ Error parsing push data:', error);
      
      const options = {
        body: 'Time to take your medicine!',
        icon: '/icon-192x192.png',
        badge: '/icon-192x192.png',
        requireInteraction: true,
        renotify: true,
        silent: false,
        vibrate: [200, 100, 200],
        actions: [
          {
            action: 'view',
            title: 'View Alarm',
            icon: '/icon-192x192.png'
          }
        ],
        data: { url: '/alarms', timestamp: Date.now() }
      };
      
      event.waitUntil((async () => {
        try {
          await self.registration.showNotification('Medication Reminder', options);
          const list = await self.registration.getNotifications({ includeTriggered: true });
          console.log('✅ Fallback notification displayed. Active notifications:', list.length);
        } catch (err) {
          console.error('❌ Fallback showNotification failed:', err);
        }
      })());
    }
  } else {
    const options = {
      body: 'Time to take your medicine!',
      icon: '/icon-192x192.png',
      badge: '/icon-192x192.png',
      tag: 'medication-reminder',
      renotify: true,
      silent: false,
      vibrate: [200, 100, 200],
      requireInteraction: true,
      actions: [
        {
          action: 'view',
          title: 'View Alarm',
          icon: '/icon-192x192.png'
        }
      ],
      data: { url: '/alarms', timestamp: Date.now() }
    };
    event.waitUntil((async () => {
      try {
        await self.registration.showNotification('Medication Reminder', options);
        const list = await self.registration.getNotifications({ includeTriggered: true });
        console.log('✅ Generic notification displayed. Active notifications:', list.length);
      } catch (err) {
        console.error('❌ Generic showNotification failed:', err);
      }
    })());
  }
});

// Function to stop alarm sound (kept in case page wants to signal SW)
function stopAlarmSound() {
  if (self.alarmSource) {
    self.alarmSource.stop();
    self.alarmSource = null;
    console.log('⏹️ Service Worker: Alarm sound stopped');
  }
}

// Notification click event
self.addEventListener('notificationclick', (event) => {
  console.log('🖱️ Service Worker: Notification clicked');
  console.log('📋 Action:', event.action);
  console.log('📋 Notification data:', event.notification.data);

  event.notification.close();

  const targetPath = (event.notification?.data && event.notification.data.url) || '/alarms';
  const notificationId = event.notification?.data?.notificationId;

  event.waitUntil((async () => {
    try {
      const urlObj = new URL(targetPath, self.location.origin);
      urlObj.searchParams.set('fromNotification', '1');
      urlObj.searchParams.set('ts', String(Date.now()));
      if (notificationId) {
        urlObj.searchParams.set('nid', String(notificationId));
      }
      const targetUrl = urlObj.toString();

      const windowClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      console.log('🔍 Found clients:', windowClients.length);

      for (const client of windowClients) {
        try {
          await client.focus();
          if ('navigate' in client) {
            await client.navigate(targetUrl);
          }
          // 🚨 Tell the page to play the alarm
          client.postMessage({ type: 'PLAY_ALARM', payload: event.notification.data });
          return;
        } catch (e) {
          console.warn('⚠️ Failed to focus/navigate existing client:', e);
        }
      }

      console.log('🆕 No existing windows found, opening new alarms page...');
      const newClient = await self.clients.openWindow(targetUrl);
      try { newClient && newClient.postMessage({ type: 'PLAY_ALARM', payload: event.notification.data }); } catch {}
    } catch (error) {
      console.error('❌ Error handling notification click:', error);
      await self.clients.openWindow('/alarms');
    }
  })());
});

// Notification close event
self.addEventListener('notificationclose', (event) => {
  console.log('❌ Service Worker: Notification closed');
});

// Push subscription change event
self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('🔄 Service Worker: Push subscription changed');
});

// Background sync event
self.addEventListener('sync', (event) => {
  console.log('🔄 Service Worker: Background sync event:', event.tag);
});

// Message event for communication with main thread
self.addEventListener('message', (event) => {
  console.log('💬 Service Worker: Message received:', event.data);
  
  if (event.data && event.data.type === 'STOP_ALARM') {
    stopAlarmSound();
    event.ports[0].postMessage({ success: true });
  }
});
