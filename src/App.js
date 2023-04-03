import './App.css';
import Navheader from './Components/Navheader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Recipelist from './pages/Recipelist';
import Login from './pages/Login';
import Signup from './pages/Signup';
// import { AuthContextProvider } from './firebase/Auth';
import Signout from './Components/Signout';
import Suggestion from './pages/Suggestion';
import Articles from './pages/Articles';
import PopularRecipe from './pages/PopularRecipe';
import SavedRecipe from './pages/SavedRecipe';
import Settings from './pages/Settings';

function App() {
  return (
    <div className="App">
      {/* <AuthContextProvider> */}
      <Router>
        <Navheader />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path="/recipelist" element={<Recipelist />} />
          <Route exact path='/suggestion' element={<Suggestion />} />
          <Route exact path='/articles' element={<Articles />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/signOut' element={<Signout />} />
          <Route exact path='/popularRecipe' element={<PopularRecipe />} />
          <Route exact path='/savedRecipes' element={<SavedRecipe/>}/>
          <Route exact path='/settings' element={<Settings/>}/>
        </Routes>
      </Router>
      {/* </AuthContextProvider> */}
    </div>
  );
}
export default App;