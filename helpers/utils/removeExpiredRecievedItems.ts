
export const removeExpiredRecievedItems = (itemRecieved: string, itemRecievedExpiryDate: string):string[] => {

    // get the arrays
    const itemRecievedArray = itemRecieved.split(',')
    const itemRecievedExpiryDateArray = itemRecievedExpiryDate.split(',')

    // get today's date
    const todayDate = new Date()
    // remove expired recieved item 
    let nonExpiredRecievedItems: Array<string> = []
    for (let i = 0; i < itemRecievedArray.length; i++) {
        if (new Date(itemRecievedExpiryDateArray[i]) < todayDate) {
            continue
        }
        nonExpiredRecievedItems = [...nonExpiredRecievedItems, itemRecievedArray[i]]
    }
    return nonExpiredRecievedItems
}