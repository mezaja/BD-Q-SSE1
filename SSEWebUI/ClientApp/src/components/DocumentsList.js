import React, { Component } from 'react';

export class DocumentsList extends Component {
    //static displayName = Documentslist.name;
    static displayName = "Documents List";

    constructor(props) {
        super(props);
        this.state = { files: [], loading: true };
    }

    componentDidMount() {
        fetch("https://localhost:44381/Files").then(res => res.json(),).then(
            result => {
                this.setState({ files: result });
            }
        )
        console.log(this.files);
    }

    static renderForecastsTable(files) {
        return (
            <table className='table table-striped' aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Size</th>
                        <th>Last Reviewed</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.files.map(files =>
                        <tr key={files.id}>
                            <td>{files.name}</td>
                            <td>{files.size}</td>
                            <td>{files.lastReviewed}</td>
                            <td>{files.category}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        //let contents = this.state.loading
        //  ? <p><em>Loading...</em></p>
        //  : FetchData.renderForecastsTable(this.state.files);

        return (
            <div>
                <h1 id="tableLabel" >Documents List</h1>
                <p>Documents, Upload and Download.</p>
                <table className='table table-striped' aria-labelledby="tableLabel">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Size</th>
                            <th>Last Reviewed</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.files.map(files =>
                            <tr key={files.id}>
                                <td><a href={files.uri}>{files.name}</a></td>
                                <td>{files.size}</td>
                                <td>{files.lastReviewed}</td>
                                <td>{files.category}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    }

    async populateWeatherData() {
        const response = await fetch('files');
        const data = await response.json();
        this.setState({ forecasts: data, loading: false });
    }
}
