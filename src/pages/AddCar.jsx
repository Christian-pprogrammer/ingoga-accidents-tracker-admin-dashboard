import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import getError from '../utils/getError';

function AddCar() {

  const [loading, setLoading] = useState(false);
  const [chassisNumber, setChassisNumber] = useState("");
  const [plate, setPlate] = useState('');
  const [ownerTelephone, setOwnerTelephone] = useState('');
  const [ownerNames, setOwnerNames] = useState('');
  const [insuranceName, setInsuranceName] = useState('');
  const [insurancePhone, setInsurancePhone] = useState('');
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
      await axios.post(`/cars`, {
        chassisNumber,
        ownerNames,
        ownerTelephone,
        plate,
        insuranceName,
        insurancePhone
      })
      alert('car added successfully');
      navigate('/cars');
    }catch(err) {
      alert(getError(err));
    }
    setLoading(false);
  }

  return (
    <div className="mx-3">
      <div className="card m-auto" style={{ maxWidth: "500px" }}>
        <div className="card-header">
          <h2 className="text-center">Add car</h2>
        </div>
        <div className="card-body">
          <form onSubmit={submit}>
            <div className="mb-3">
              <label htmlFor="plate">Chassis number</label>
              <input
                type="text"
                className="form-control"
                value={chassisNumber}
                onChange={(e) => setChassisNumber(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="plate">Plate</label>
              <input
                type="text"
                className="form-control"
                value={plate}
                onChange={(e) => setPlate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ownerNames">owner names</label>
              <input
                type="text"
                className="form-control"
                value={ownerNames}
                onChange={(e) => setOwnerNames(e.target.value)}
                required
            />
            </div>
            <div className="mb-3">
              <label htmlFor="ownerTelephone">owner telephone</label>
              <input
                type="number"
                className="form-control"
                value={ownerTelephone}
                onChange={(e) => setOwnerTelephone(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="ownerTelephone">Insurance name</label>
              <input
                type="text"
                className="form-control"
                value={insuranceName}
                onChange={(e) => setInsuranceName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="ownerTelephone">Insurance phone</label>
              <input
                type="number"
                className="form-control"
                value={insurancePhone}
                onChange={(e) => setInsurancePhone(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? "Loading..." : "Add Car"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddCar