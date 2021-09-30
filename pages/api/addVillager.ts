// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    name: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    if (req.method === 'POST') {
        // add data to villager sheet
        // await addVillagerToGGSheet()
        // return data
        console.log(req);
        res.status(200).json({ name: 'John Doe' })
    }
}
