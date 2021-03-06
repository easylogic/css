import Size from "./size";
import Position from "./position";
import Radius from "./radius";
import Clip from "./clip";
import Name from "./name";
import ColorSteps from "./ColorSteps";
import ColorStepsInfo from "./ColorStepsInfo";
import ColorPickerPanel from "./ColorPickerPanel";
import Transform from "./transform";
import Transform3d from './transform3d';
import BackgroundSize from "./BackgroundSize";
import PageSize from "./PageSize";
import PageName from "./PageName";
import PageExport from "./PageExport";
import FilterList from "./FilterList";
import ImageResource from "./ImageResource";
import ClipPath from "./ClipPath";
import PageShowGrid from "./PageShowGrid";
import GroupAlign from "./GroupAlign";
import BackgroundBlend from "./BackgroundBlend";
import LayerBlend from "./LayerBlend";
import Rotate from "./rotate";
import RadiusFixed from "./radius-fixed";
import Opacity from "./opacity";
import ClipPathSVG from "./ClipPathSVG";
import ClipPathSide from "./ClipPathSide";
import ClipPathPolygon from "./ClipPathPolygon";
import BoxShadow from "./BoxShadow";
import TextShadow from "./TextShadow";
import FillColorPickerPanel from "./FillColorPickerPanel";
import BackgroundInfo from "./BackgroundInfo";
import Text from "./text";
import LayerCode from "./LayerCode";
import BackgroundCode from "./BackgroundCode";
import Font from "./Font";
import BackgroundClip from "./BackgroundClip";
import LayerTextColorPickerPanel from "./LayerTextColorPickerPanel";
import LayerInfoColorPickerPanel from "./LayerInfoColorPickerPanel";
import LayerBorderColorPickerPanel from "./LayerBorderColorPickerPanel";
import BackdropList from "./BackdropList";
import EmptyArea from "./EmptyArea";
import Page3D from "./Page3D";
import ImageSorting from "./ImageSorting";
import BackgroundImage from "./BackgroundImage";


import RotatePattern from "./pattern/RotatePattern";
import BorderFixed from "./border-fixed";
import BoxSizing from "./BoxSizing";
import BorderWidth from "./BorderWidth";
import BackgroundPosition from "./BackgroundPosition";
import BorderColorFixed from "./BorderColorFixed";


var patterns = {
    RotatePattern
}

export default {
    ...patterns,
    BackgroundPosition,
    LayerBorderColorPickerPanel,
    BorderColorFixed,
    BoxSizing,
    BorderWidth,
    BackgroundImage,
    ImageSorting, 
    Page3D,
    ClipPathSide,
    ClipPathPolygon,
    ClipPathSVG,
    EmptyArea,
    BackdropList,
    LayerInfoColorPickerPanel,
    BackgroundClip,
    Font,
    LayerTextColorPickerPanel,
    BackgroundCode,
    LayerCode,
    Text,
    BackgroundInfo,
    FillColorPickerPanel,
    TextShadow,
    BoxShadow,
    ClipPathSVG,
    Opacity,
    BorderFixed,
    RadiusFixed,
    Rotate,
    LayerBlend,
    GroupAlign,    
    PageShowGrid,
    ClipPath,
    ImageResource,
    BackgroundBlend,    
    FilterList,    
    PageExport,
    PageSize,
    PageName,
    BackgroundSize,
    Transform3d,
    Transform,
    ColorPickerPanel,
    ColorStepsInfo,
    ColorSteps,
    Name,
    Size,
    Position,
    Radius,
    Clip
}