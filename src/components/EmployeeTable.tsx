import * as React from 'react';
import { Employee } from '../modals/Employee';
import {
  Button,
  Checkbox,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

interface IEmployeesTableProps {
  employees: Employee[];
  onMarkAsReviewed: Function;
  updateDisabled: boolean;
  isLoading: boolean;
}

const EmployeesTable: React.FunctionComponent<IEmployeesTableProps> = ({
  employees,
  onMarkAsReviewed,
  updateDisabled,
  isLoading,
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Age</TableCell>
            <TableCell align="right">Company ID</TableCell>
            <TableCell align="right">Reviewed</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        {isLoading && (
          <TableBody>
            <TableRow>
              <TableCell colSpan={6}>
                <Skeleton />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Skeleton />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Skeleton />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Skeleton />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={6}>
                <Skeleton />
              </TableCell>
            </TableRow>
          </TableBody>
        )}
        {!isLoading && (
          <TableBody>
            {employees.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right" component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.age}</TableCell>
                <TableCell align="right">{row.companyId}</TableCell>
                <TableCell align="right">
                  <Checkbox disabled checked={row.reviewed || false} />
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    onClick={onMarkAsReviewed(row.id)}
                    disabled={updateDisabled}
                  >
                    Mark as Reviewed
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default EmployeesTable;
