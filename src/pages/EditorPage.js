import React, { Component } from 'react'
import './EditorPage.scss'
import { getPointsFromGpx, convertGpxPointsToGpxXml } from '../utils/GpxUtils'
import GpxPointList from '../components/GpxPointList'


class EditorPage extends Component {

    state = {
        gpxPoints: []
    }

    constructor(props) {
        super(props)
        this.fileInput = React.createRef()
    }

    loadFile = () => {
        const fileReader = new FileReader()

        fileReader.readAsText(this.fileInput.current.files[0])

        fileReader.onload = async (evt) => {
            const result = await getPointsFromGpx(evt.target.result)
            await this.setState({ gpxPoints: result })
        }

        fileReader.onerror = function (evt) {
            console.log(evt)
            alert(evt)
        }
    }

    download = () => {
        console.log(this.state.gpxPoints)
        const fileContent = convertGpxPointsToGpxXml(this.state.gpxPoints)

        const element = document.createElement("a")
        const file = new Blob([fileContent], { type: 'text/xml' })
        element.href = URL.createObjectURL(file)
        element.download = "GPX.gpx"
        element.click()
    }

    changePointDetail = (updateIndex, update) => {
        const updatedGpxPoints = this.state.gpxPoints.map((point, i) => {
            return (updateIndex === i) ? { ...point, ...update } : point
        })

        this.setState({ gpxPoints: updatedGpxPoints })
    }

    render() {
        return (
            <div className="container mt-2">
                <div className="row mb-2">
                    <div className="col">
                        <div className="custom-file">
                            <input type="file" className="custom-file-input" id="customFile" ref={this.fileInput} onChange={this.loadFile} />
                            <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <button className="btn btn-sm btn-secondary w-100" onClick={this.download}>Download</button>
                    </div>
                </div>

                <div className="row mb-2">
                    <div className="col">
                        <GpxPointList
                            points={this.state.gpxPoints}
                            changePointDetail={this.changePointDetail}
                        />
                    </div>
                </div>
            </div>
        )
    }

}

export default EditorPage