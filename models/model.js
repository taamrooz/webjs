class Model
{
    constructor()
    {
        if(this.constructor === Model)
        {
            throw new Error('Abstract class!');
        }
        this.id = crypto.randomUUID()
    }
}

export default Model;
