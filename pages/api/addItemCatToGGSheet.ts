// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { get } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next'
import { addItemCatDataToGoogleSheet } from '../../helpers/api/googleSheetApi';

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method === 'POST') {
        // get added item cat data
        const tobeAddedItemCatData = get(req, 'body')
        // add data to villager sheet
        await addItemCatDataToGoogleSheet(tobeAddedItemCatData)
        res.status(200).json({ name: 'Added item cat to google sheet' })
    }
}
