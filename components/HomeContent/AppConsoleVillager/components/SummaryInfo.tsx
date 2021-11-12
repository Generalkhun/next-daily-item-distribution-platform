import { Typography } from '@material-ui/core'
import React from 'react'

interface Props {
    summaryInfoItemName: string
    summaryInfoTotalHome: number
    summaryInfoTotalPeople: number
    summaryInfoTotalNonRecievedItemHome: number
    summaryInfoTotalNonRecievedItemPeople: number

}


const SummaryInfo = (props: Props) => {
    const {
        summaryInfoItemName,
        summaryInfoTotalPeople,
        summaryInfoTotalNonRecievedItemHome,
        summaryInfoTotalNonRecievedItemPeople,
        summaryInfoTotalHome
    } = props
    return (
        <div style={{ marginTop: 10 , marginLeft:10}}>
            <Typography style={{ fontSize: 12 }}>{'ยอดสำหรับจัดส่ง'}</Typography>
            <Typography>{summaryInfoItemName}</Typography>
            <Typography style={{ fontSize: 17, color:'gray' }}>{`รวมบ้านในพื้นที่: ${summaryInfoTotalHome} บ้าน (${summaryInfoTotalPeople} คน)`}</Typography>
            <Typography style={{ fontSize: 17, color:'crimson'  }}>{`ยังไม่ได้รับของ: ${summaryInfoTotalNonRecievedItemHome} บ้าน (${summaryInfoTotalNonRecievedItemPeople} คน)`}</Typography>
        </div>
    )
}

export default SummaryInfo
