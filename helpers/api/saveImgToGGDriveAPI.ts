import axios from "axios"
import { UPLOAD_IMG_SERVICE_URL } from "../../constants"

export const saveImgToGGDrive = async (imgFile: File) => {

    const form = new FormData()
    form.append('file', imgFile)

    const res = await axios({
        method: 'post',
        headers: {
            'content-type': 'multipart/form-data'
        },
        url: UPLOAD_IMG_SERVICE_URL,
        data: form
    })

    const imgURLGGdrive = res.data

    return imgURLGGdrive
}