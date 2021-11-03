// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { get } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next'
import { addVillagerDataToGoogleSheet, getAllVillagerDataFromGoogleSheet, getItemCatDataFromGoogleSheet } from '../../helpers/api/googleSheetApi';

type Data = {
    itemCatData: object
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method === 'GET') {
        // get added villager data
        const tobeAddedVillagerData = get(req, 'body')
        // add data to villager sheet
        const itemCatData = await getItemCatDataFromGoogleSheet()
        res.status(200).json({ itemCatData })
    }
}
