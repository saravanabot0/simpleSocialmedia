import { React, useState, useEffect } from "react";
import "./App.css";
import Header from "./components/header/header";
import "bootstrap/dist/css/bootstrap.min.css";
import UserPost from "./pages/userPost/userPost";
import Edit from "./pages/edit/edit";
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import Login from "./pages/login/login";
import firebase from 'firebase/compat/app';
import {authentication} from "./firebaseConfig/firebaseConfig"
import { onAuthStateChanged } from "firebase/auth";
import { redirect } from "react-router-dom";
import Loading from "./components/loader/loading";


function App() {
  const [editData, setEditData] = useState("");
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  const [userDetail, setUserDetail] = useState();
  const [switchForm,setSwitchForm] = useState (true);
  const [loader,setLoader] = useState(false);


  useEffect(() => {
    onAuthStateChanged(authentication,(user)=> {
      setUserDetail(user);
      if(user) { 
        return setIsUserSignedIn(true);
      }
  
      setIsUserSignedIn(false);
    })
 },[isUserSignedIn]);

  
    return (
      <div className="App">
        <BrowserRouter>
          <div className={`headerHeight`}>
            <Header loginStatus={isUserSignedIn} userDetails={userDetail} />
          </div>
  
          <div className="postHeight">
            <Routes>
              <Route path="/" element={<UserPost storeData={setEditData} loginStatus={isUserSignedIn} switchingForm={setSwitchForm} settingLoader={setLoader} loader={loader}/>} />
              <Route path="/edit" element={<Edit editStoredData={switchForm && editData} switchForm={switchForm}/>} />
              <Route path="*" element={<p className="p-3">Path not resolved</p>} />
              <Route path="/login" element={<Login getUserDetail={setUserDetail} loginStatus={isUserSignedIn} />} />
            </Routes>
          </div>
        </BrowserRouter>
  
  
        
      </div>
    );
}

export default App;
