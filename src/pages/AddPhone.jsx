import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import getError from '../utils/getError';

function AddPhone() {

  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [category, setCategory] = useState('');
  const navigate = useNavigate();
  const {state, dispatch} = useContext(UserContext);
  useEffect(() => {
    if(!state.token) {
      navigate('/login')
    }
  }, []) 
  

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      await axios.post(`/phones`, {
        phoneNumber,
        district,
        category,
        latitude: latitude,
        longitude: longitude
      })
      alert('phone added successfully');
      navigate('/phones');
    }catch(err) {
      alert(getError(err));
    }
    setLoading(false);
  }

  return (
    <div className="mx-3">
      <div className="card m-auto" style={{ maxWidth: "500px" }}>
        <div className="card-header">
          <h2 className="text-center">Add phone</h2>
        </div>
        <div className="card-body">
          <form onSubmit={submit}>
            <div className="mb-3">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="number"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category">category</label>
              <select
                name="category"
                id="category"
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value=""></option>
                <option value="HEAD_QUARTER">head quarter</option>
                <option value="HOSPITAL">hospital</option>
                <option value="POLICE_STATION">police station</option>
              </select>
            </div>
            {(category == "HOSPITAL" || category == "POLICE_STATION") && (
              <>
                <div className="mb-3">
                  <label htmlFor="sector">District</label>
                  <input
                    type="text"
                    className="form-control"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="sector">Latitude</label>
                  <input
                    type="text"
                    className="form-control"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="sector">Longitude</label>
                  <input
                    type="text"
                    className="form-control"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? "Loading..." : "Add phone"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPhone