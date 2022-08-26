import * as React from 'react';
import { Employee } from '../modals/Employee';
import {
  Box,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { groupBy } from 'lodash';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import EmployeesTable from './EmployeeTable';

interface IEmployeesTableProps {
  employees: Employee[];
  onMarkAsReviewed: Function;
  updateDisabled: boolean;
  isLoading: boolean;
}

interface IGroupedEmployeesRowProps {
  employees: Employee[];
  onMarkAsReviewed: Function;
  updateDisabled: boolean;
  isLoading: boolean;
}

const GroupedEmployeesTable: React.FunctionComponent<IEmployeesTableProps> = ({
  employees,
  onMarkAsReviewed,
  updateDisabled,
  isLoading,
}) => {
  const groupedEmployees = groupBy(employees, 'companyId');
  console.log(groupedEmployees);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Company ID</TableCell>
            <TableCell align="right">#</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(groupedEmployees).map((key) => (
            <GroupedEmployeesRow
              key={key}
              companyId={key}
              employees={groupedEmployees[key]}
              onMarkAsReviewed={onMarkAsReviewed}
              updateDisabled={updateDisabled}
              isLoading={isLoading}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

interface IGroupedEmployeesRowProps {
  companyId: string;
  employees: Employee[];
  onMarkAsReviewed: Function;
  updateDisabled: boolean;
  isLoading: boolean;
}

const GroupedEmployeesRow: React.FunctionComponent<
  IGroupedEmployeesRowProps
> = ({ companyId, employees, onMarkAsReviewed, updateDisabled, isLoading }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow sx={{ borderBottom: 'unset' }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {companyId}
        </TableCell>
        <TableCell align="right">{employees.length}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <EmployeesTable
                employees={employees}
                onMarkAsReviewed={onMarkAsReviewed}
                updateDisabled={updateDisabled}
                isLoading={isLoading}
              />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default GroupedEmployeesTable;
