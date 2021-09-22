import React from 'react'

import { Editor, DrawRectangleMode } from 'react-map-gl-draw';

interface Props {

}

const DrawingLayer = (props: Props) => {
    return (
        <Editor
            clickRadius={12}
            mode={new DrawRectangleMode()}
        />
    )
}

export default DrawingLayer


