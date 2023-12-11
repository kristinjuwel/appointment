import React from 'react';

const ClinicCard = ({ clinic, onEdit, onDelete }) => {
  return (
    <div className="doctor-card" style={{maxHeight: "200px"}}>
      <div className="doctor-info">
          <div className="dinfo" style={{height: "140px"}}>
          <h2 style={{lineHeight: 1}}>{clinic.name}</h2>
          <br />
          <p style={{margin: 0}}>Address: {clinic.address}</p>
          <p style={{margin: 0}}>Doctor: {clinic.doctor}</p> 
          </div>
          <div style={{marginBottom: 0}}>
            <button style={{marginTop: "5px", padding: 5, borderRadius: 0, width: "120px", marginRight: "10px"}} className="clinic-button" onClick={() => onEdit(clinic)}>Edit</button>
            <button style={{marginTop: "5px", padding: 5, borderRadius: 0, width: "120px", bottom: 0}} className="cancel" onClick={() => onDelete(clinic)}>Delete</button>
          </div>
        </div>
    </div>
  );
};

export default ClinicCard;