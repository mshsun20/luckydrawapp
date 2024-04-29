
let cacheData='cacheVAdm'

this.addEventListener('install', async (e) => {
    const cache = await caches.open(cacheData)
    if (cache) {
        await cache.addAll([
            '/static/js/bundle.js',
            '/favicon.ico',
            '/index.html',
            '/',
            '/admin',
            '/admin/home',
            '/admin/login',
            '/admin/register',
            '/admin/users',
            '/admin/users/add',
            '/admin/users/profile',
            '/admin/accounts',
            '/admin/accounts/add',
            '/admin/contests',
            '/admin/prizes',
            '/admin/tickets',
            '/admin/winners'
        ])
    }
    else {
        console.warn(`Cache Still not Created !!!`)
    }
})

this.addEventListener('fetch', async (e) => {
    if (!navigator.onLine) {
        const resp = await e.respondWith(caches.match(e.request))
        if (resp) {
            return resp
        }
        let reqUrl = e.request.clone()
        fetch(reqUrl)
    }
})
