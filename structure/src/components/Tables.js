import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';

function Tables() {
    const dummyData = [
        { id: 1, name: 'aaa', severity: 'high' },
        { id: 2, name: 'bbb', severity: 'very_high' },
        { id: 3, name: 'ab', severity: 'low' },
        { id: 4, name: 'ccc', severity: 'very_low' },
        { id: 5, name: 'ddc', severity: 'middle' }
    ]

    const [errors, setErrors] = useState([]);
    const [errInfo, setErrInfo] = useState([]);
    const [showErr, setShowErr] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [value, setValue] = useState('');
    const [dataSource, setDataSource] = useState(dummyData);
    const [tableFilter, setTableFilter] = useState([]);

    const rowEvents = {
        onClickRow: (e, row) => {
            console.log(row)
        }
    }

    const filterData = (e) => {
        if (e.target.value !== '') {
            setValue(e.target.value);
            const filterTable = dataSource.filter(o => Object.keys(o).some(k => String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())));
            setTableFilter([...filterTable])
        }

        else {
            setValue(e.target.value);
            setDataSource([...dataSource]);
        }
    }

    return (
        <div className="container mt-5">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1"
                    value={value} onChange={filterData} onClickRow={rowEvents} />
            </div>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Severity</th>
                    </tr>
                </thead>
                <tbody>
                    {value.length > 0 ? tableFilter.map((data) => {
                        return (
                            <tr>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.severity}</td>
                            </tr>
                        )


                    })
                        :
                        dataSource.map((data) => {
                            return (
                                <tr>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.severity}</td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default Tables