import React from 'react';
import '../styles.css'
import ProfileSidebox from "./SideBox/ProfileSidebox/SideboxJobSeeker";
import ApplicationsChart from "./MidBox/ApplicationsChart";
import ApplicationsTable from "./MidBox/ApplicationsTable";
import ApplicationsGrid from "./MidBox/ApplicationsGrid";


function ProfileJobSeeker() {

  return (
      <>
          {/*<ProfileSidebox/>*/}
          <div className="profile-mid">
              <ApplicationsGrid/>
              {/*<ApplicationsChart/>*/}
              <ApplicationsTable/>
          </div>

      </>
  );
}

export default ProfileJobSeeker;