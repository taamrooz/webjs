class RouteController
{
    constructor(dispatchController, routes)
    {
        let self = this;
        this.routes = [];
        this.root = document.getElementById('app');
        this.page = null;
        this.param = null;
        this.hash = "";
        this.dispatchController = dispatchController;
        if(!routes)
        {
            self.to('not_found');
            return;
        }
        routes.forEach(function (route) {
            self.register(route['name'], route['location'], route['nav']);
        });
        this.to(this.routes[0].name);
        window.addEventListener('hashchange', function (event) {
            const newHash = window.location.hash.substr(1);
            if(self.hash !== newHash)
            {
                self.to(newHash);
            }
        });
    }

    drawNavigation()
    {
        let html = '<ul>';
        this.routes.forEach(function (route) {
            if(!route.nav) return;
            let readableName = route.name[0].toUpperCase() + route.name.slice(1);
            html += `<li><a href="#${route.name}">${readableName}</a></li>`;
        });
        html += '</ul>';
        document.body.insertAdjacentHTML('afterbegin', html);
    }

    dispatch(dispatchName, dispatchData = {})
    {
        return this.dispatchController.dispatch(dispatchName, dispatchData);
    }
    
    register(name, location, nav)
    {
        this.routes.push({name: name, location: location, nav: nav});
    }

    async to(name)
    {
        this.hash = name;
        let slashIndex = name.indexOf('/');
        if(slashIndex === -1)
        {
            slashIndex = undefined;
        }
        const route = this.routes.find(function(route) {
            return route.name === name.substring(0, slashIndex);
        });
        this.param = name.substring(slashIndex + 1);

        if(this.page !== null)
        {
            this.page.unbindAll();
        }
        
        if(!route)
        {
            this.page = await this.loadView('not_found.page.js');
        } else {
            this.page = await this.loadView(route.location);
        }
        window.location.hash = '#' + name;
        this.root.innerHTML = '';
        this.page.render();
    }

    async loadView(location)
    {
        let res;
        try {
            res = await import(`/views/pages/${location}`);
        } catch (error) {
            console.error(error);
            if(location !== 'not_found.page.js')
            {
                res = this.loadView('not_found.page.js');
            }
        }
        return new res.default(this.root, this);
    }
}

export default RouteController;
