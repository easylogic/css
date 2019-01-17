import { POSITION_CENTER } from "../../types/ItemTypes";

export default { 
    image: {
        type: 'radial', 
        radialPosition: POSITION_CENTER,
        radialType: 'circle'
    },
    colorsteps: [
        {color: 'white', percent: 0, index: 0},
        {color : 'black', percent:50, index: 100}
    ]
}