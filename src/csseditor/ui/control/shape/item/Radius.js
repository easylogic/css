import TopLeftRadius from './TopLeftRadius';

export default class Radius extends TopLeftRadius {

    initialize () {
        super.initialize()

        this.radiusKey = 'borderRadius'
    }

    template () {
        return `<button type='button' data-value='radius'></button>`
    }

    isShow () {
        var layer = this.read('selection/current/layer')
        if (!layer) return false; 

        return !!layer.fixedRadius;
    }

}