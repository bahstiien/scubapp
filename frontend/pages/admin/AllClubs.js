import React from 'react';
import Header_Dashboard from '../../components/admin/Header_Dashboard';
import ClubsList from '../../components/admin/ClubsDetails';
import DivingCenterList from '../../components/admin/DivingCenterList';

const AllClubs = () => {
  return (
    <div>
      <Header_Dashboard title="Ajout d'un nouveau centre">
        <DivingCenterList />
      </Header_Dashboard>
    </div>
  );
};

export default AllClubs;
