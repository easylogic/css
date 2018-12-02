import TopLeftRadius from "./TopLeftRadius";

export default class TopRightRadius extends TopLeftRadius {

    initialize () {
        super.initialize()

        this.radiusKey = 'borderTopRightRadius'
    }

    template () {
        return `<button type='button' data-value='radius top right'></button>`
    }


    setRadiusPosition (x, y, width, height, layer) {
        var radius = layer[this.radiusKey] || '0px'
        this.$el.css('right', radius)
    } 

    getRealRadius (radius, dx) {
        var minX = 0;
        var maxX = this.layerWidth; 

        return Math.max(Math.min(maxX, radius - dx), minX)
    }    

}