/**
 *
 * FrameworkDetails
 *
 */
import React from 'react';
import { Row, Col, Table } from 'reactstrap';
import { framework } from 'passport';

const FrameworkDetails = props => {
    const { framework, domains, user } = props;
    //    const domains=props.framework.domains;
    return (
        <div className='order-details'>
            <h1>{framework.name}</h1>
            <Row className='flex-row'>

                {framework.domains.map((domain) =>
                    <Table striped bordered hover>
                        <Table striped bordered hover responsive="lg" >
                            <tr>
                                <td><h3>{domain.domainNo}</h3></td>
                                <td>{domain.domainName}</td>
                            </tr>
                            <tr>
                                <td><h3>Domain Description:</h3></td>
                                <td>{domain.domainDescription}</td>
                            </tr>
                        </Table>
                        <tr>
                         <th>Control Number</th>
                            <th>SubControl Number </th>
                            <th>Control Description</th>
                        </tr>

                        {domain.controls.map((control) =>
                            <>
                                <tr>
                                    <td> {control.mainControl}</td>
                                    <td> - </td>
                                    <td>{control.controlDescription}</td>
                                </tr>

                                {control.subControls.map((subcontrol) =>
                                    <>
                                        <tr>
                                            <td>-</td>
                                            <td> {subcontrol.subControlNo}</td>
                                            <td>{subcontrol.subControlDescription}</td>
                                        </tr>

                                    </>
                                )}
                            </>
                        )}
                    </Table>
                )}
            </Row>
        </div>
    );
};

export default FrameworkDetails;
 