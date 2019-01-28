import BaseProperty from "./BaseProperty";
import LayerAngle from "../../shape/LayerAngle";
import PredefinedLayerAngle from "../../shape/PredefinedLayerAngle";

export default class Transform2DControlProperty extends BaseProperty {

    getBody () {
        return `
            <div class="property-item" style="position:relative;height:140px;">
                <PredefinedLayerAngle></PredefinedLayerAngle>
                <LayerAngle></LayerAngle>   
            </div>
        `
    }

    isHideHeader () {return true;}

    components() {
        return {
            LayerAngle,
            PredefinedLayerAngle
        }
    }
}