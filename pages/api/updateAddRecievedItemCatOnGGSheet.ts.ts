// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { get } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next'
import {  updateRecieveItemStatusOnGoogleSheet } from '../../helpers/api/googleSheetApi';

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method === 'PUT') {
        // get added villager data
        const recievedItemOnPersonObj = get(req, 'body')
        // add data to villager sheet
        await updateRecieveItemStatusOnGoogleSheet(recievedItemOnPersonObj)
        res.status(200).json({ name: 'adjust item cat recieved on google sheet' })
    }
}
