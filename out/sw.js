self.addEventListener('push', (e) => {
  const data = e.data.json()
  const icon = 'https://cdn.glitch.com/614286c9-b4fc-4303-a6a9-a4cef0601b74%2Flogo.png?v=1605150951230'
  const options = {
    body: data.options.body,
    vibrate: [200, 100, 200],
    icon
  }
  const pushed = {
    title: data.title,
    body: data.options.body
  }
  self.clients.matchAll()
  .then(all => all.forEach(client => client.postMessage(pushed)))
  self.registration.showNotification(
    data.title,
    options
  )
})