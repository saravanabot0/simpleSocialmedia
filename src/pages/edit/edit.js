import {React, useState} from 'react';
import "./edit.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from "react-router-dom";
import { useNavigate   } from "react-router-dom";

function Edit(props) {

  const navigate = useNavigate();

  const [postDetails,setPostDetails] = useState ({
    id: props.editStoredData ? props.editStoredData?.id : "",
    title: props.editStoredData ? props.editStoredData?.title : "",
    body: props.editStoredData ? props.editStoredData?.body : "",
    userId: props.editStoredData ? props.editStoredData?.userId : "",
  });



  const editData = (e) => {
    const { name, value } = e.target;
    setPostDetails({
      ...postDetails,
      [name]: value,
    });
  }

  const updateData = (e) => {
    e.preventDefault()
    async function fetchData() {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postDetails.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            id: postDetails.id,
            title: postDetails.title,
            body: postDetails.body,
            userId: postDetails.userId,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        const json = await response.json();
        console.log(json, "Updated successfully");
        alert("Updated successfully");
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }

  const createUser = (e) => {
    e.preventDefault();
    if ((postDetails.title && postDetails.body) === ""){
      alert("Please Fill All Fields");
      return
    }
    async function newUser() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
          method: 'POST',
          body: JSON.stringify({
            title: postDetails.title,
            body: postDetails.body,
            userId: 1,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
        const json = await response.json();
        console.log(json, "Created successfully");
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }
    newUser();
  }


  return (
    <div className='overAllEditPostContainer'>
        {console.log(props.editStoredData,"props.editStoredData")}
    <h1 className='pb-4 pt-4'> {props.switchForm ? "Edit" : "Create"} Post .... </h1>
    <Form  className='editPostContainer pb-4' onSubmit={(e)=> {props.switchForm ? updateData(e) : createUser(e)}}> 
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label> Title </Form.Label>
        <Form.Control type="text" placeholder="Today Special" defaultValue={props.editStoredData ? postDetails.title : ""} name="title" onChange={(e)=>editData(e)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label> Content </Form.Label>
        <Form.Control as="textarea" rows={5} defaultValue={props.editStoredData ? postDetails.body : ""} name="body" onChange={(e)=>editData(e)}/>
      </Form.Group>
      <Button variant="success" type="submit">
      {props.switchForm ? "Save Changes" : "Create New"} 
      </Button>
      <Link to="/">
        <Button variant="danger" type="submit" className='ms-2'>
            Cancel
        </Button>
      </Link>
     
    </Form>
    
    </div>
  )
}

export default Edit