import { Button } from '@material-ui/core'
import React from 'react'
export const ExtraNavigationBtn = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            position: 'absolute',
            bottom: '0px',
            right: '0px',
            zIndex: 10,
        }}>
            <div style={{
                backgroundColor: 'lime'
            }}>
                <a href='https://github.com/Generalkhun/next-daily-item-distribution-platform'><Button>Source code</Button></a>
            </div>

            <div style={{
                backgroundColor: '#FF5F1F'
            }}>
                <a href='https://docs.google.com/spreadsheets/d/1WmNFsECJ9YDYGoUrWlUW60hqd-RfqC0bFjhOgta433E/edit#gid=0'><Button>Raw data</Button></a>
            </div>

        </div>

    )
}