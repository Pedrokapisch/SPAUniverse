export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page
  }

  route(event) {
    event = event || window.event
    event.preventDefault()
    window.history.pushState({}, "", event.target.href)
    this.handle()
    
  }

  handle() {
    const { pathname } = window.location
    const route = this.routes[pathname] || this.routes[404]
    
    fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
        switch (pathname) {
          case '/universo':
            document.body.style.backgroundImage = "url('assets/bguniverse.png')";
            break;
          case '/exploracao':
            document.body.style.backgroundImage = "url('assets/bgexploration.png')";
            break;
          case '/':
            document.body.style.backgroundImage = "url('assets/bghome.png')";
        }
    })
  }
}