export interface employeeProps {
  name: string;
  role: string;
  color: string;
  id: number;
}

export interface employeeList {
  employeeList: employeeProps[] | undefined;
}
