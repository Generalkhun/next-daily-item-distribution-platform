// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { get } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next'
import { addVillagerDataToGoogleSheet, getAllVillagerDataFromGoogleSheet } from '../../helpers/api/googleSheetApi';

type Data = {
    villagerData: object
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method === 'GET') {
        // get added villager data
        const tobeAddedVillagerData = get(req, 'body')
        // add data to villager sheet
        const villagerData = await getAllVillagerDataFromGoogleSheet()
        res.status(200).json({ villagerData })
    }
}
