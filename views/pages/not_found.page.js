import View from '/views/view.js';
import RouteController from '/controllers/route.controller.js';

class NotFoundPage extends View
{
    constructor(parentElement, routeController)
    {
        super(parentElement);
        this.routeController = routeController;
    }
    render()
    {
        let html = '<h1>Page not found!</h1>';
        this.updateDOM(html);
    }
}

export default NotFoundPage;
