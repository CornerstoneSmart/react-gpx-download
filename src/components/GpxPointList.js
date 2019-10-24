import React from 'react'
import GpxPoint from './GpxPoint'

export default ({ points, changePointDetail }) => {
    return (
        <div>
            {points.map((point, index) => (
                <GpxPoint
                    key={index}
                    index={index}
                    lat={point.lat}
                    lng={point.lng}
                    changePointDetail={changePointDetail}
                />
            ))}
        </div>
    )
}