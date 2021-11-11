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
        <div style={{marginTop:10}}>
            <Typography style={{ fontSize: 20 }}>{'ยอดรวม ' + summaryInfoItemName}</Typography>
            <Typography style={{ fontSize: 15 }}>{`รวมบ้านทั้งหมด: ${summaryInfoTotalHome} บ้าน (${summaryInfoTotalPeople} คน)`}</Typography>
            <Typography style={{ fontSize: 15 }}>{`ที่ยังไม่ได้รับของ: ${summaryInfoTotalNonRecievedItemHome} บ้าน (${summaryInfoTotalNonRecievedItemPeople} คน)`}</Typography>
        </div>
    )
}

export default SummaryInfo
