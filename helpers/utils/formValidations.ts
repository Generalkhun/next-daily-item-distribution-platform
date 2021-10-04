import { isEmpty } from "lodash"

export const validatePhoneNum = (formValue: string) => {
    if (isEmpty(formValue)) {
        return false
    }
    const phoneRegexp = new RegExp('^0([8|9|6])([0-9]{8}$)')
    return phoneRegexp.test(formValue) && formValue.length === 10
}

