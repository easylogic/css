import UIElement from "../../../../colorpicker/UIElement";

export default class TimelineTopToolbar extends UIElement {
    
    template() {
        return `
            <div class='timeline-top-toolbar'>
                <div class='time-input' ref="$timeInputView"></div>
                <div class='time-play' ref="$timePlay">
                    <button type="button">&lt;&lt;</button>
                    <button type="button">&gt;</button>
                    <button type="button">&gt;&gt;</button>
                    <select>
                        <option>1x</option>
                        <option>2x</option>
                        <option>3x</option>
                        <option>4x</option>
                        <option>5x</option>
                    </select>
                </div>
            </div>
        `
    }

}