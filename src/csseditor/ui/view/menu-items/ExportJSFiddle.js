import { SUBMIT } from "../../../../util/Event";
import MenuItem from "./MenuItem";

export default class ExportJSFiddle extends MenuItem {

    template () { 
        return `
            <form class='jsfiddle' action="http://jsfiddle.net/api/post/library/pure/" method="POST" target="_blank">
                <input type="hidden" name="title" ref="$title" value=''>
                <input type="hidden" name="description" ref="$description" value=''>
                <input type="hidden" name="html" ref="$html" value=''>
                <input type="hidden" name="css" ref="$css" value=''>
                <input type="hidden" name="dtd" value='html 5'>
                <button type="submit">
                    <div class='icon jsfiddle'></div>
                    <div class='titie'>JSFiddle</div>
                </button>                
            </form>     
        `
    }

    [SUBMIT()] () {
        var generateCode = this.read('export/generate/code');

        this.refs.$title.val('CSS Gradient Editor')
        this.refs.$description.val('EasyLogic Studio - https://css.easylogic.studio')
        this.refs.$html.val(generateCode.html)
        this.refs.$css.val(generateCode.css)

        return false; 
    }


} 