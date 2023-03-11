import { PixelRatio } from 'react-native'

export const PX = (value)=>{
    let ratio = PixelRatio.get();
    // console.log("get ==>",ratio)
    let size = value / ratio;
    // console.log("size===>",size)
    return PixelRatio.getPixelSizeForLayoutSize(size);
};