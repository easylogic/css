import {
    parseParamNumber,
    pack,
    fillColor
} from '../functions'

/*
 * @param {Number} amount   0..360  
 */
export default function hue (amount = 360) {
    amount = parseParamNumber(amount)          
    return pack((pixels, i) => {
        var r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];

        var hsv = Color.RGBtoHSV(r, g, b);

        // 0 ~ 360 
        var h = hsv.h;
        h += Math.abs(amount)
        h = h % 360
        hsv.h = h

        var rgb = Color.HSVtoRGB(hsv);

        rgb.a = pixels[i+3]
        
        fillColor(pixels, i, rgb)

    })
}
