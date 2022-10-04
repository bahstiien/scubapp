import React from 'react';
import AddCenter from '../../components/admin/addCenter';
import Header_Dashboard from '../../components/admin/Header_Dashboard';

const AddClub = () => {
  return (
    <div>
      <Header_Dashboard title="Ajout d'un nouveau centre">
        <AddCenter />
      </Header_Dashboard>
    </div>
  );
};

export default AddClub;
