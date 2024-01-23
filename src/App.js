import logo from './logo.svg';
import './App.css';
import Home from './component/HomePage';
import Dashboard from './component/Dashboard';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Profile from './component/Profile';
import Recommendation from './component/Recommendation';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import Login from './component/Login';
import SignUp from './component/SignUp';
import UserProfile from './component/UserProfile';
import UserProfile2 from './component/UserProfile2';
// import { store, persistor } from './redux/store';

function App() {
  return (
    <div className="App PlayfairDisplay-Regular">
       {/* <Provider store={store}> */}
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <Router>
      <Routes>
      <Route path="/home" element={<Home/>}/>
      <Route path="/" element={<Login/>}/>
      <Route path="/userprofile" element={<UserProfile/>}/>
      <Route path="/userprofile2" element={<UserProfile2/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/recommendation" element={<Recommendation/>}/>
      </Routes>
      </Router>
    {/* </PersistGate> */}
    {/* </Provider> */}
    </div>
  );
}

export default App;
