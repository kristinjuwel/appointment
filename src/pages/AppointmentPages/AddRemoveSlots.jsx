import React from 'react';
import { Link } from 'react-router-dom';
import DoctorNavbar from '../../components/DoctorNavbar';
import DoctorFooter from '../../components/DoctorFooter';
import DoctorCalendar from '../../components/DoctorCalendar';

const AddRemoveSlots = () => {
  return (
    <div>
      <DoctorNavbar />
      <div style={{ display: "flex", margin: "auto", width: "100vw", justifyContent: "center" }}>
        <DoctorCalendar />

        <div style={{ marginLeft: "30px" }}>
          <h1>My Appointments</h1>
          <table>
            <tr>
              <td rowSpan={2} width={200} style={{ border: "1px solid lightgray", backgroundColor: "lightgray", paddingLeft: "10px" }}>11/06/23 MONDAY <br/> 2:00-5:00 PM</td>
              <td><Link to="/addremove"><button style={{ borderRadius: 0, width: "250px" }}>Add Slot/s</button></Link></td>
            </tr>
            <tr><td><button style={{borderRadius: 0, width:"250px", backgroundColor: "grey"}}>Remove Slot/s</button></td></tr>
            <br/>
            {/* if add button is clicked, this should show: */}
            <tr><td><br/>Add Slot <br/> Slot number:  
                  <select name="slot" id="slot">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    </select></td></tr>
          </table>
        </div>

      </div>
      <DoctorFooter />
    </div>
  );
}

export default AddRemoveSlots;
