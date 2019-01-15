import { SUBMIT } from "../../../../util/Event";
import MenuItem from "./MenuItem";

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
        var generateCode = this.read('export/generate/code');
        this.refs.$codepen.val(this.read('export/codepen/code', {
            html: generateCode.html, 
            css: generateCode.css 
        }))

        return false; 
    }


} 