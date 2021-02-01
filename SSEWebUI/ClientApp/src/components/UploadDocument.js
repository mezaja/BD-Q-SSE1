//import React, { useState } from "rea
import axios from 'axios';

import React, { Component } from 'react';

class UploadDocument extends Component {

    state = {

        // Initially, no file is selected 
        selectedFile: null,
        category: ""
    };

    // On file select (from the pop up) 
    onFileChange = event => {

        // Update the state 
        this.setState({ selectedFile: event.target.files[0] });
        this.setState({ category: "" });

    };
    onCategoryChange = event => {

        // Update the state 
        this.setState({ category: event.target.value });

    };



    // On file upload (click the upload button) 
    onFileUpload = () => {

        // Create an object of formData 
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "formFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );

        formData.append(
            "category",
            this.state.category,
        );

        // Details of the uploaded file 
        console.log(this.state.selectedFile);

        // Request made to the backend api 
        // Send formData object 
        axios.post("https://localhost:44381/blob", formData);
        this.setState({ selectedFile: null });
    };

    // File content to be displayed after 
    // file upload is complete 
    fileData = () => {

        if (this.state.selectedFile) {

            return (
                <div>
                    <h2>File Details:</h2>
                    <p>File Name: {this.state.selectedFile.name}</p>
                    <p>File Size: {this.state.selectedFile.size}</p>
                    <p>
                        Last Modified:{" "}
                        {this.state.selectedFile.lastModifiedDate.toDateString()}
                    </p>
                    <p><input type="text" value={this.state.category} onChange={this.onCategoryChange} />
                    </p>
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };

    render() {

        return (
            <div>

                <h3>
                    File Upload using React!
            </h3>
                <div>
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload!
                </button>
                </div>
                {this.fileData()}
            </div>
        );
    }
}

export default UploadDocument; 