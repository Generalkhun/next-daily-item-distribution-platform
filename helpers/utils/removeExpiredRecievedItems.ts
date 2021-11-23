
export const removeExpiredRecievedItems = (itemRecieved: string, itemRecievedExpiryDate: string): string[] => {

    console.log('removeExpiredRecievedItems:itemRecieved', itemRecieved);
    console.log('removeExpiredRecievedItems:itemRecievedExpiryDate', itemRecievedExpiryDate);

    // get the arrays
    const itemRecievedArray = itemRecieved.split(',')
    const itemRecievedExpiryDateArray = itemRecievedExpiryDate.split(',')

    // get today's date
    const todayDate = new Date()
    // remove expired recieved item 
    let nonExpiredRecievedItems: Array<string> = []
    for (let i = 0; i < itemRecievedArray.length; i++) {
        console.log('itemRecievedExpiryDateArray[i]',itemRecievedExpiryDateArray[i]);
        console.log('new Date(itemRecievedExpiryDateArray[i]) < todayDate',new Date(itemRecievedExpiryDateArray[i]) < todayDate);
        
        if (new Date(itemRecievedExpiryDateArray[i]) < todayDate) {
            continue
        }
        nonExpiredRecievedItems = [...nonExpiredRecievedItems, itemRecievedArray[i]]
    }
    console.log('removeExpiredRecievedItems: nonExpiredRecievedItems', nonExpiredRecievedItems);

    return nonExpiredRecievedItems
}