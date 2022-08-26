import { Container, FormControlLabel, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EmployeesTable from '../../components/EmployeeTable';
import { Employee } from '../../modals/Employee';
import { markAsReviewed, getAllEmployees } from '../../services/Employees';
import GroupedEmployeesTable from '../../components/GroupedEmployeeTable';

function Employees() {
  const [isLoading, setIsLoading] = useState(true);
  const [updateDisabled, setUpdateDisabled] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showGrouped, setShowGrouped] = useState(false);

  const onMarkAsReviewed = (id: string) => async () => {
    setUpdateDisabled(true);
    await markAsReviewed(id);
    const employees = await getAllEmployees();
    setEmployees((oldEmployees) => employees);
    setUpdateDisabled(false);
  };

  useEffect(() => {
    getAllEmployees().then((result) => {
      setIsLoading(false);
      setEmployees(result);
    });
  }, []);

  return (
    <Container>
      <Container sx={{ textAlign: 'left' }}>
        <FormControlLabel
          value="end"
          control={
            <Switch
              color="primary"
              checked={showGrouped}
              onChange={(event) => setShowGrouped(event.target.checked)}
            />
          }
          label="Group by Company"
          labelPlacement="end"
        />
      </Container>
      {showGrouped && (
        <GroupedEmployeesTable
          employees={employees}
          onMarkAsReviewed={onMarkAsReviewed}
          updateDisabled={updateDisabled}
          isLoading={isLoading}
        />
      )}
      {!showGrouped && (
        <EmployeesTable
          employees={employees}
          onMarkAsReviewed={onMarkAsReviewed}
          updateDisabled={updateDisabled}
          isLoading={isLoading}
        />
      )}
    </Container>
  );
}

export default Employees;
