import { SUBMIT } from "../../../../util/Event";
import MenuItem from "./MenuItem";
import { EXPORT_GENERATE_CODE, EXPORT_CODEPEN_CODE } from "../../../types/ExportTpyes";

export default class ExportCodePen extends MenuItem {

    template () { 
        return `
            <form class='codepen' action="https://codepen.io/pen/define" method="POST" target="_blank">
                <input type="hidden" name="data" ref="$codepen" value=''>
                <button type="submit">
                    <div class='icon codepen'></div>
                    <div class='titie'>CodePen</div>
                </button>
            </form>     
        `
    }

    [SUBMIT()] () {
        var generateCode = this.read(EXPORT_GENERATE_CODE);
        this.refs.$codepen.val(this.read(EXPORT_CODEPEN_CODE, {
            html: generateCode.html, 
            css: generateCode.css 
        }))

        return false; 
    }


} 