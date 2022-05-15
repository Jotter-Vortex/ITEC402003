import React from "react";
import axios from 'axios';
import DbContext from "./DbContext";

class getDB extends React.Component {    
    state = {
        posts: []
    };

    componentDidMount = () => {
        this.getReport();
    };

    getReport = () => {
        axios.get('http://localhost:8080/api')
            .then((response) => {
                const data = response.data;
                this.setState({ posts: data })
                console.log('data recieved');
            })

            .catch(() => {
                alert('Error detected');
            })
    }

    render() {
        console.log("in getDB")
        return (
            <DbContext.Provider value="hihihi">
            </DbContext.Provider>
        );
    }

    /*
    displayGetReport = (posts) => {
        var i = 0;
        if (!posts.length) {
            return null;
        }

        return posts.map((posts, index) => {
            if (posts.Severity == 'Medium') {
                i++;
                console.log(i)

            }
        });
    }
    */
}

const reportDb = new getDB();

export default reportDb

