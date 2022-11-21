import { React, useEffect, useState, useRef } from "react";
import Card from 'react-bootstrap/Card';
import "./userPost.css";
import { FaEdit, FaTrash, FaPlusCircle } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Loading from "../../components/loader/loading";
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


function UserPost(props) {
  const [userPost, setUserPost] = useState([]);
  const pageTopRef = useRef(null);

  const [offset, setOffset] = useState(1);
  const [totalPage, setTotalPage] = useState(12);

  const paginate = (pageNumber) => {
    setOffset(pageNumber.selected + 1)
    pageTopRef.current.scrollIntoView();
  };

  useEffect(() => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    props.settingLoader(true);
    async function fetchData() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_page=${offset}`
        );
        const json = await response.json();
        console.log(json, "json");
        setUserPost(json);
        props.settingLoader(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
    
  }, [offset]);

  const deletePost = (id) => {
    async function deleteData() {
      try {
        const response = fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
          method: 'DELETE',
        });
        console.log("Delete Successfully");
        alert("Delete Successfully");
      } catch (err) {
        console.log(err);
      }
    }
    deleteData();
  }

  const setFormToEdit = (item) => {
    props.storeData(item);
    props.switchingForm(true);
  }

  return (
    <>
    {props.loader ? <Loading/> : <>
    
    <div className="gridContainer" ref={pageTopRef}>

    {userPost?.map((item,index)=> (
        
        <Card key={item.id}>
      <Card.Header as="h5"> Happy 🤗 to Share 👇 </Card.Header>
      <Card.Body>
        <Card.Title> {item.title} </Card.Title>
        <Card.Text>
          {item.body}
        </Card.Text>
        
        
      </Card.Body>
      <Card.Footer>
      <div>
        {props.loginStatus ? <Link to="/edit">
        <Button variant="info" className="me-2 mb-1 pt-0" onClick={()=> setFormToEdit(item)}> <FaEdit size={18}/> <span className=""> Edit </span> </Button>
        </Link> : <Button variant="info" className="me-2 mb-1 pt-0" onClick={()=> alert("Please Login with your Google Account")}> <FaEdit size={18}/> <span className=""> Edit </span> </Button>}
        <Button variant="danger" className="mb-1 pt-0"  onClick={()=> props.loginStatus ? deletePost(item.id) : alert("Please Login with your Google Account")}> <FaTrash /> <span> Delete </span> </Button>
        </div>
      </Card.Footer>
    </Card>

    ))}

    

    <OverlayTrigger
          key= "top"
          placement= "left"
          overlay={
            <Tooltip id={`tooltip-top`} >
              Create <strong> New Post </strong>
            </Tooltip>
          }
        >
          <div className="creatingPost">
      {props.loginStatus ? <Link to="/edit" onClick={()=> props.switchingForm(false)}>
        <FaPlusCircle/>
      </Link> :
      <FaPlusCircle onClick={()=> alert("Please Login with your Google Account")}/> }
    </div>
        </OverlayTrigger>
         
   
    </div>

    <div className='paginationContainer pb-1'>
    <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        pageCount={totalPage}
        marginPagesDisplayed={0}
        pageRangeDisplayed={3}
        onPageChange={(pageNumber) => paginate(pageNumber)}
        containerClassName="pagination"
        activeClassName="active"
        forcePage={offset - 1}
      />
      </div>

    </>}
    
    </>
  ) 
  
}

export default UserPost;
