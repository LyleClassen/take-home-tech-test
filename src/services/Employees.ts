import axios from 'axios';

const EMPLOYEE_ENDPOINT =
  'https://627122286a36d4d62c21cf1d.mockapi.io/api/v1/employee';

export const getAllEmployees = async () => {
  const { data } = await axios.get(EMPLOYEE_ENDPOINT);

  return data;
};

export const markAsReviewed = async (id: string) => {
  const { status } = await axios.put(`${EMPLOYEE_ENDPOINT}/${id}`, {
    reviewed: true,
  });
  return status;
};
