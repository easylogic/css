import items  from './items/index'
import BaseTab from "../../BaseTab";

export default class LayerTabView extends BaseTab {

    template () {
        return `
        <div class="tab horizontal">
            <div class="tab-header" ref="$header">
                <div class="tab-item selected" data-id="info">Info</div>
                <div class="tab-item" data-id="fill">Fill</div>       
                <div class="tab-item" data-id="text">Text</div>
                <div class="tab-item" data-id="shape">Shape</div>
                <div class="tab-item" data-id="transform">Trans</div>
                <div class="tab-item" data-id="css">CSS</div>
            </div>
            <div class="tab-body" ref="$body">
                <div class="tab-content selected" data-id="info">
                    <Name></Name>            
                    <size></size>                
                    <Rotate></Rotate>        
                    <RadiusFixed></RadiusFixed>
                    <radius></radius>        
                    <opacity></opacity>              
                    <LayerBlend></LayerBlend>        
                    <BackgroundClip></BackgroundClip>                    
                    <LayerColorPickerPanel></LayerColorPickerPanel>
                </div>
                <div class="tab-content" data-id="text">
                    <LayerTextColorPickerPanel></LayerTextColorPickerPanel>                    
                    <Font></Font>                    
                    <Text></Text>                    
                    <BackgroundClip></BackgroundClip>                    
                    <TextShadow></TextShadow>                    
                </div>
                <div class="tab-content" data-id="fill">
                    <FillColorPickerPanel></FillColorPickerPanel>
                    <BoxShadow></BoxShadow>

                    <FilterList></FilterList>                    
                </div>                
                <div class="tab-content" data-id="shape">
                    <ClipPath></ClipPath>   
                    <ClipPathImageResource></ClipPathImageResource>
                </div>
                <div class="tab-content" data-id="transform">
                    <transform></transform>
                    <transform3d></transform3d> 
                </div>               
                <div class="tab-content" data-id="css">
                    <LayerCode></LayerCode>
                </div>               
            </div>
        </div>

        `
    }


    onTabShow () {
        this.emit('LayerTabSelect')
    }

    components () {
        return items 
    }
}