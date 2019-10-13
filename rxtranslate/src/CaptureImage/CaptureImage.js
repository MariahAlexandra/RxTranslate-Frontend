import React from 'react';
import Webcam from 'react-webcam';
// import { connect } from 'react-redux';
// import { saveJobImage } from '../actions';

class CaptureImage extends React.Component {
    state = {
        imageData: null,
        image_name: "",
        saveImage: false
    }

    

    setRef = (webcam) => {
        this.webcam = webcam;
    }

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.setState({
            imageData: imageSrc
        })
    };

    onClickRetake = (e) => {
        e.persist();
        this.setState({
            imageData: null
        })
    }

    onClickSave = (e) => {
        e.persist();
        this.setState((previousState) => {
            return {
                saveImage: !previousState.saveImage
            }
        });
    }

    handleChange = (e) => {
        e.persist();
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSaveSubmit = (e) => {
        e.preventDefault();
        // let imageObject = {
        //     image_name: this.state.image_name,
        //     // job_id: this.props.job.id,
        //     image_data: this.state.imageData
        // }

        const formData = new FormData();
        const req = new XMLHttpRequest();
        formData.append("image_data", this.state.imageData);
    
        req.open("POST", "http://localhost:5000/upload");
        req.send(formData);
    }

    saveForm = () => {
        return (
            <div>
                <form onSubmit={this.handleSaveSubmit}>
                    <p>
                        <label>Image name: </label>
                        <input type="text"
                            name="image_name"
                            value={this.state.image_name}
                            onChange={this.handleChange}/>
                        <input type="submit" value="Save" />
                    </p>
                </form>
            </div>
        )
    }

    render() {
        const videoConstraints = {
            width:1280,
            height: 720,
            facingMode: 'user',
        };

        return (
            <div>
                <Webcam
                    audio={false}
                    height={350}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={350}
                    videoConstraints={videoConstraints}
                />
                <div className="button-container"><button onClick={this.capture}>Capture photo</button></div>
                {this.state.imageData ?
                    <div>
                        <p><img src={this.state.imageData} alt=""/></p>
                        <span><button onClick={this.onClickRetake}>Retake?</button></span>
                        <span><button onClick={this.onClickSave}>Save</button></span>
                        {this.state.saveImage ? this.saveForm() : null}
                    </div>
                    : null}
            </div>
        );
    }

}

export default CaptureImage;