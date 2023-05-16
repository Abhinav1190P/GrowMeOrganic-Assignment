import {useState} from 'react'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface Department {
  department: string;
  sub_departments: string[];
}

const departmentsData: Department[] = [
  {
    department: "customer_service",
    sub_departments: ["support", "customer_success"],
  },
  {
    department: "design",
    sub_departments: ["graphic_design", "product_design", "web_design"],
  },
];

const DepartmentList = () => {
  const [expandedDepartments, setExpandedDepartments] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<{
    [department: string]: string[];
  }>({});

  const handleDepartmentSelect = (department: string) => {
    if (expandedDepartments.includes(department)) {
      setExpandedDepartments((prevState : string[]) =>
        prevState.filter((dep) => dep !== department)
      );
      setSelectedDepartments((prevState : string[]) =>
        prevState.filter((dep) => dep !== department)
      );
      setSelectedSubDepartments((prevState) => {
        const newState = { ...prevState };
        delete newState[department];
        return newState;
      });
    } else {
      setExpandedDepartments((prevState : string[]) => [...prevState, department]);
      setSelectedDepartments((prevState : string[]) => [...prevState, department]);
      setSelectedSubDepartments((prevState) => ({
        ...prevState,
        [department]: departmentsData.find(
          (data) => data.department === department
        )?.sub_departments || []
      }));
    }
  };

  const handleSubDepartmentSelect = (
    department: string,
    subDepartment: string
  ) => {
    setSelectedSubDepartments((prevState) => {
      const subDepartments = prevState[department] || [];
      const updatedSubDepartments = subDepartments.includes(subDepartment)
        ? subDepartments.filter((subDep) => subDep !== subDepartment)
        : [...subDepartments, subDepartment];
      return {
        ...prevState,
        [department]: updatedSubDepartments,
      };
    });
  };

  const isDepartmentSelected = (department: string) => {
    const subDepartments = departmentsData.find(
      (data) => data.department === department
    )?.sub_departments || [];
    return (
      selectedDepartments.includes(department) &&
      subDepartments.every((subDep) =>
        selectedSubDepartments[department]?.includes(subDep)
      )
    );
  };

  

  return (
    <div>
      <h2>Department List</h2>
      {departmentsData.map((department) => (
        <div key={department.department}>
          <FormControlLabel
            control={
              <Checkbox
                checked={isDepartmentSelected(department.department)}
                indeterminate={
                  selectedDepartments.includes(department.department) &&
                  !isDepartmentSelected(department.department)
                }
                onChange={() =>
                    handleDepartmentSelect(department.department)}
                    />
                  }
                  label={department.department}
                />
                <ul>
                  {department.sub_departments.map((subDepartment) => (
                    <li key={subDepartment}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              selectedSubDepartments[department.department]?.includes(
                                subDepartment
                              ) || false
                            }
                            onChange={() =>
                              handleSubDepartmentSelect(
                                department.department,
                                subDepartment
                              )
                            }
                          />
                        }
                        label={subDepartment}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      };
      
      export default DepartmentList;