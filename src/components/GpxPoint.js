import React from 'react'

export default ({ index, lat, lng, changePointDetail }) => {
    return (
        <div className="mb-3">
            <input
                type="number"
                className="form-control form-control-sm mb-1"
                placeholder="lat"
                value={lat}
                onChange={(e) => changePointDetail(index, { lat: parseFloat(e.target.value) })}
            />
            <input
                type="number"
                className="form-control form-control-sm"
                placeholder="lat"
                value={lng}
                onChange={(e) => changePointDetail(index, { lng: parseFloat(e.target.value) })}
            />
        </div>
    )
}