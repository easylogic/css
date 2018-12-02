import TopLeftRadius from './TopLeftRadius';

export default class BottomLeftRadius extends TopLeftRadius {

    initialize () {
        super.initialize()

        this.radiusKey = 'borderBottomLeftRadius'
    }

    template () {
        return `<button type='button' data-value='radius bottom left'></button>`
    }

}