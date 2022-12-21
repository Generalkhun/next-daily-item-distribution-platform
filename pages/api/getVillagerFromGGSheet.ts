// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { get } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next'
import { getAllVillagerDataFromGoogleSheet } from '../../helpers/api/googleSheetApi';

type Data = {
    villagerData: object
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method === 'GET') {
        // add data to villager sheet
        const villagerData = await getAllVillagerDataFromGoogleSheet()
        res.status(200).json({ villagerData })
    }
}
