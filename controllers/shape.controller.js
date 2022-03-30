import ObserveController from '/controllers/observe.controller.js';
import { SHAPE_CREATE_SHAPE, SHAPE_CREATE_RANDOM_SHAPE } from '/actions.js';
import { ShapeTypes, ShapeSizes} from '/models/shape_type.model.js';
import Shape from '/models/shape.model.js';
import { randomBetween } from '/utils.js';

class ShapeController extends ObserveController
{
    constructor()
    {
        super();
        this.register(SHAPE_CREATE_SHAPE, (data) => this.createShape(data));
        this.register(SHAPE_CREATE_RANDOM_SHAPE, () => this.createRandomShape());
    }

    createShape(data)
    {
        const {width, length} = data;
        const sizes = Object.keys(ShapeSizes);
        const filtered = sizes.filter((size) => {
            return ShapeSizes[size].width <= width && ShapeSizes[size].length <= length;
        });
        const random = filtered[randomBetween(0, filtered.length)];
        return new Shape(random, ShapeSizes[random].width, ShapeSizes[random].length);
    }

    createRandomShape()
    {
        const shapes = Object.keys(ShapeTypes);
        const random = shapes[randomBetween(0, shapes.length)];
        const size = ShapeSizes[random];
        return new Shape(random, size.width, size.height);
    }
}

export default ShapeController
