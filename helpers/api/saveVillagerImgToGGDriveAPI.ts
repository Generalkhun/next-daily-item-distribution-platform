import axios from "axios"
import { get } from "lodash"

export const saveVillagerImgToGGDrive = async (imgFile: File) => {

    const form = new FormData()
    form.append('file', imgFile)

    const res = await axios({
        method: 'post',
        headers: {
            'content-type': 'multipart/form-data'
        },
        url: 'api/saveVillagerImgToGGDrive',
        data: form
    })

    const imgURLGGdrive = res.data

    return imgURLGGdrive
}