import React from 'react'
import styled from 'styled-components'

interface MapMarkerProps {
    text: string
    lat: number
    lng: number
}

const MapMarkerInternal = ({ text, lat, lng }: MapMarkerProps) =>
    <div>{text}</div>

export const MapMarker = styled(MapMarkerInternal)`
    background: red;
    height: '100px';
    width: '100px';
`