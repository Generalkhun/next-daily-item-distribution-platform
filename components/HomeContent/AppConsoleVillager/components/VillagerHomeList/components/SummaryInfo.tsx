import { Typography } from '@material-ui/core'
import React from 'react'

interface Props {
    summaryInfoItemName: string
    summaryInfoTotalHome: number
    summaryInfoTotalPeople:number
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
        <>
        <Typography>{summaryInfoItemName}</Typography>
        <Typography>{`รวมบ้านทั้งหมด: ${summaryInfoTotalHome} บ้าน (${summaryInfoTotalPeople} คน)`}</Typography>
        <Typography>{`รวมบ้านที่ยังไม่ได้รับของ: ${summaryInfoTotalNonRecievedItemHome} บ้าน (${summaryInfoTotalNonRecievedItemPeople} คน)`}</Typography>
        </>
    )
}

export default SummaryInfo
