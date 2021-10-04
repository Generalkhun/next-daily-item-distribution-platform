import { isEmpty } from "lodash";

export const readImgURL = (imgFile: File) => {
    if (!isEmpty(imgFile)) {
        console.log('readImgURL: imgFile', imgFile);

        //const reader = new FileReader();

        // reader.onload = function (e) {
        //     $('#blah')
        //         .attr('src', e.target.result)
        //         .width(150)
        //         .height(200);
        // };
        //return reader.readAsDataURL(imgFile);

        return URL.createObjectURL(imgFile)
    }

    return ""

}

