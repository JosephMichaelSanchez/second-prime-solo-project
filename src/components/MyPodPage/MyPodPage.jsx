import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import PodMember from '../PodMember/PodMember';
import TableRow from '../TableRow/TableRow';


import './MyPodPage.css'

function MyPodPage() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { pod_id } = useParams();
    const user = useSelector(store => store.user);
    const podList = useSelector(store => store.myPodReducer);
    const dateList = useSelector(store => store.podDatesReducer);
    const podInfo = useSelector(store => store.podInfoReducer);

    useEffect(() => {
        dispatch({
            type: 'GET_USER_POD'
        })
        dispatch({
            type: 'GET_POD_INFO'
        })
        dispatch({
            type: 'GET_DATES'
        })
    }, [])



    return (
        <>
            <div className="body">
                <h2>MY POD PAGE</h2>
                <div className="podMemberContainer">
                    {podList.map(member => {
                        return (
                            <PodMember
                                key={member.id}
                                member={member}
                            />
                        )
                    })}

                </div>

                <div className="adminButtons">
                    {user.id == podInfo.admin_id && <button onClick={() => { history.push('/removemember') }}>EDIT POD</button>}
                    {user.id == podInfo.admin_id && <button onClick={() => { history.push('/dateform') }}>ADD DATES</button>}
                </div>

                <div>
                    <table className="dateTable">
                        
                        <tr>
                            <th>DATE</th>
                            <th>HOST</th>
                            <th>ADMIN</th>
                            <th>CANCEL?</th>
                        </tr>
                        
                        {dateList.map(date => {
                            return (
                                <TableRow
                                    key={date.id}
                                    date={date}
                                />
                            )
                        })}



                    </table>


                </div>

            </div>
        </>
    )
}


export default MyPodPage;