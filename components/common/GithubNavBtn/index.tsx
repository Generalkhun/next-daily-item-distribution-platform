import { Button } from '@material-ui/core'
import React from 'react'
export const GithubNavBtn = () => {
    return (
        <div style={{
            position: 'absolute',
            bottom: '0px',
            right: '0px',
            zIndex:10,
            backgroundColor: 'lime'
        }}>
            <a href='https://github.com/Generalkhun/next-daily-item-distribution-platform'><Button>Source code</Button></a>
        </div>

    )
}