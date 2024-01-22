import React from "react";

const EditEmployeePage = ({ params }: { params: { id: string } }) => {
  return (
    <>
      <div>EmployeeEditPage {params.id} </div>
    </>
  );
};

export default EditEmployeePage;
