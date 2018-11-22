import BaseCSSEditor from '../BaseCSSEditor';
import PageListView from '../ui/view/PageListView';
import FeatureControl from '../ui/control/FeatureControl';
import GradientView from '../ui/view/GradientView';

import LayerListView from '../ui/view/LayerListView';
import ImageListView from '../ui/view/ImageListView'
import SubFeatureControl from '../ui/control/SubFeatureControl';
import PropertyView from '../ui/control/panel/PropertyView';
import ExportView from '../ui/window/ExportWindow';
import Timeline from '../ui/control/Timeline';
import DropView from '../ui/control/DropView';
import VerticalColorStep from '../ui/control/VerticalColorStep';
import Animation from '../../util/animation/Animation';
import GradientSampleView from '../ui/window/GradientSampleWindow';
import LayerSampleView from '../ui/window/LayerSampleWindow';
import PageSampleView from '../ui/window/PageSampleWindow';
import ClipPathImageList from '../ui/control/panel/ClipPathImageList';


const screenModes = ['expertor', 'beginner']

export default class CSSEditor extends BaseCSSEditor {


    afterRender() {
        this.refs.$layoutMain.removeClass('beginner-mode')
        this.refs.$layoutMain.removeClass('expertor-mode')
        this.refs.$layoutMain.addClass(this.read('/storage/get', 'layout') + '-mode')

        setTimeout(() => {
            this.emit('changeEditor');
        }, 100)

    }

    template () {
        return `

            <div class="layout-main" ref="$layoutMain">
                <div class="layout-header">
                    <h1 class="header-title">EASYLOGIC</h1>
                    <div class="page-tab-menu">
                        <PageListView></PageListView>
                    </div>
                </div>
                <div class="layout-top">
                    <PropertyView></PropertyView>
                </div>
                <div class="layout-left">      
                    <LayerListView></LayerListView>
                    <ImageListView></ImageListView>
                </div>
                <div class="layout-body">
                    <VerticalColorStep></VerticalColorStep>
                    <GradientView></GradientView>                      
                </div>                
                <div class="layout-right">
                    <FeatureControl></FeatureControl>
                    <ClipPathImageList></ClipPathImageList>
                </div>
                <div class="layout-footer">
                    <Timeline></Timeline>
                </div>
                <ExportView></ExportView>
                <DropView></DropView>
                <GradientSampleView></GradientSampleView>
                <LayerSampleView></LayerSampleView>
                <PageSampleView></PageSampleView>
            </div>
        `
    }

    components() {     
        return { 
            ClipPathImageList,
            GradientSampleView,
            VerticalColorStep, 
            DropView,
            ExportView,
            PropertyView,
            GradientView, 
            PageListView,
            FeatureControl, 
            LayerListView, 
            SubFeatureControl, 
            ImageListView,
            Timeline,
            LayerSampleView,
            PageSampleView
        }
    } 

    '@changeEditor' () {
        /*
        this.read('/item/current/layer', (layer) => {
            var self = this; 
            var obj = layer.style
            var aniObject = Animation.createTimeline([{
                duration: 1000, 
                obj,
                timing: 'ease-out-sine',
                iteration: 3, 
                direction: 'alternate',
                keyframes : {
                    '0%': {
                        'x': '0px',
                        'background-color': 'rgba(255, 255, 255, 0.5)',
                    },
                    '100%': {
                        'x': '250px',
                        'background-color': 'rgba(255, 0, 255, 1)'
                    }
                } 

            }], {
                callback() {
                    self.run('/item/set', layer);
                    self.emit('animationEditor')
                }
            });

            aniObject.start();
    
        })
        */

    }

    loadStart (isAdd) {
        this.dispatch('/storage/load', (isLoaded) => {
            if (!isLoaded && isAdd) { 
                this.dispatch('/item/add/page', true)
            } else {
                this.dispatch('/item/load');
            }
        });
    }

    toggleTimeline () {
        this.$el.toggleClass('show-timeline')
    } 

    '@updateLayout' (layout) {
        screenModes.filter(key => key != layout).forEach(key => {
            this.refs.$layoutMain.removeClass(`${key}-mode`)
        })

        this.refs.$layoutMain.addClass(`${layout}-mode`)
    }
}