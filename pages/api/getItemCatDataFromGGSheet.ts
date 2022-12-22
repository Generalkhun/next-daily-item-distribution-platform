// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getItemCatDataFromGoogleSheet } from '../../helpers/api/googleSheetApi';

type Data = {
    itemCatData: object
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method === 'GET') {
        // add data to villager sheet
        const itemCatData = await getItemCatDataFromGoogleSheet()
        res.status(200).json({ itemCatData })
    }
}
