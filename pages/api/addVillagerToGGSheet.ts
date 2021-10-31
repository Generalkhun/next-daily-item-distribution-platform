// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { get } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next'
import { addVillagerDataToGoogleSheet } from '../../helpers/api/googleSheetApi';

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method === 'POST') {
        // get added villager data
        const tobeAddedVillagerData = get(req, 'body')
        // add data to villager sheet
        await addVillagerDataToGoogleSheet(tobeAddedVillagerData)
        res.status(200).json({ name: 'Added villager to google sheet' })
    }
}
