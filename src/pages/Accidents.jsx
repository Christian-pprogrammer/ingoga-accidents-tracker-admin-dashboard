import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import getError from '../utils/getError';

function Accidents() {
  const [accidents, setAccidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  if(!state.token) {
    navigate('/login');
  }
  useEffect(()=> {
    fetchAccidents();
  }, [])
  const deleteAccident = async (id) => {
    try{
      if(window.confirm('Are you sure?')) {
        const res = await axios.delete(`/accidents/${id}`)
        alert(res.data.message);
        setAccidents(()=>accidents.filter((accident)=>accident._id !== id))
      };
    }catch(err) {
      alert(getError(err));
    }
  }
  const fetchAccidents = async () => {
    setLoading(true);
    try{
      const res = await axios.get('/accidents');
      setAccidents(res.data.accidents.reverse());
      console.log(res.data.accidents)
    }catch(err) {
      alert(getError(err))
    }
    setLoading(false);
  }
  const addAccident = () => {
    navigate('/accidents/new-accident')
  }
  return (
    <div>
      <div className="car-title my-4">
        <h2>All accidents</h2>
        <button className="btn btn-primary" onClick={addAccident}>
          Add accident
        </button>
      </div>
      <div style={{ overflow: "auto" }}>
        <table className="table table-bordered" style={{ textAlign: "center" }}>
          <thead>
            <tr>
              <th scope="col">Location</th>
              <th scope="col">district</th>
              <th scope="col">time</th>
              <th scope="col">speed</th>
              <th scope="col">plate</th>
              <th scope="col">image/video</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={7}>Loading accidents...</td>
              </tr>
            )}
            {!loading && accidents.length === 0 && (
              <tr>
                <td colSpan={7}>No accidents available</td>
              </tr>
            )}
            {accidents.map((accident) => (
              <tr key={accident._id}>
                <td style={{ verticalAlign: "middle" }}>
                  <a
                    href={`https://maps.google.com/?q=${accident.latitude},${accident.longitude}`}
                    target="_blank"
                  >
                    {accident.latitude}, {accident.longitude}
                  </a>
                </td>

                <td style={{ verticalAlign: "middle" }}>{accident.district}</td>>
                <td style={{ verticalAlign: "middle" }}>{accident.time}</td>
                <td style={{ verticalAlign: "middle" }}>{accident.speed}</td>
                <td style={{ verticalAlign: "middle" }}>{accident.plate}</td>
                <td style={{ verticalAlign: "middle" }}>
                  <a href={accident.image} target="_blank">
                    View image/video
                  </a>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteAccident(accident._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Accidents