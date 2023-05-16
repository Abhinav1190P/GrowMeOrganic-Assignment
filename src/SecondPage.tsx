
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostsTable from './PostsTable'
import DepartmentList from './DepartmentList';
const SecondPage = () => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const history = useNavigate();

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      setUserDetails(JSON.parse(storedUserDetails));
    } else {
        window.location.href = '/?message=Please enter your details before accessing this page.'
    }
  }, [history]);

  return (
    <div>
      <h2>Second Page</h2>
      {userDetails ? (
        <div>
          <p>Name: {userDetails.name}</p>
          <p>Phone Number: {userDetails.phoneNumber}</p>
          <p>Email: {userDetails.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <PostsTable/>
      <DepartmentList/>
    </div>
  );
};

export default SecondPage;
