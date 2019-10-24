import { promisify } from 'util'
import { buildGPX, BaseBuilder, } from 'gpx-builder'

const { Point: GpxPoint } = BaseBuilder.MODELS

export const parseGpx = promisify(window.gpxParse.parseGpx)

export const getPointsFromGpx = async gpxString => {
    const result = await parseGpx(gpxString)

    return result.tracks[0].segments[0].map(point => {
        return {
            lat: point.lat,
            lng: point.lon
        }
    })
}

export const convertGpxPointsToGpxXml = gpxPoints => {
    const gpxData = new BaseBuilder()
    const nGpxPoints = gpxPoints.map(({ lat, lng, lon }) => {
        return new GpxPoint(lat, lng || lon)
    })
    gpxData.setSegmentPoints(nGpxPoints)
    return buildGPX(gpxData.toObject())
}