import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './NavBar.css';
import { Link, NavLink } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import SvgIcon from '@material-ui/core/SvgIcon';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { searchProductsAction, selectCategoryAction } from '../../redux/actions/types/productActions.js';
import { logout } from '../../redux/actions/types/authActions.js';



function NavBar(props) {
  let initialCategories = { vertodos: false, cervezas: false, conservas: false, merchandising: false, otros: false }
  const [category, setCategory] = useState(initialCategories)
  const currentCategoryState = useSelector(state => state.root.currentCategoryState)
  const user = useSelector(state => state.session.user)

  const isUser = user && user.role;
  const isAdmin = user && user.role && user.role === 'ADMIN';

  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.root.currentPage)
  var sort = 'asc'
  const allProducts = useSelector(state => state.root.allProducts)

  const [state, setState] = useState(currentCategoryState)


    useEffect(()=> {
      dispatch(selectCategoryAction(state))
      dispatch(searchProductsAction(''))
//toca preguntar si ek search tiene estado
    },[state])
  
    const handleCategory = (e) =>{
      e.preventDefault()
      setState(e.target.value)
    }
    function HomeIcon(props) {
        return (
          <SvgIcon {...props}>
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </SvgIcon>
        );
      }
   
  return (
    <header className="navbar">
      <NavLink to='/home' className='nav-personicon'>
        <img className='nb-img' src="https://live.staticflickr.com/65535/51361173217_49de2674c3_m.jpg" alt="Montañez Logo" />
      </NavLink>
      <SearchBar />
      {!props.admin ?
        <nav>
          <ul className='nav-ul'>
            {/* <li className="list-item">
          <select className='nav-selec' name="category" value='' onChange={(e) =>handleCategory(e)}>
            <option id='none' value='Precio'>Categorias:</option>
            {state !== 'vertodos' && <option id='range1'  value='vertodos'>Ver Todas</option>}
            <option id='range2' value='cervezas'>Cervezas</option>
            <option id='range3' value='conservas'>Conservas</option>
            <option id='range3' value='merchandising'>Merchandasing</option>
            <option id='range3' value='otros'>Otros</option>
          </select>
          </li>
          <div>
          { state && <div className='actived'>{`${state !=='vertodos' ? state.toUpperCase() : '  '}`}</div> }
          </div> */}
            <li className="list-item">
              <NavLink to='/home'>
                <input className={`${currentCategoryState === 'vertodos' ? 'Nav-vertodos' : "actived-vertodos"}`} type="button" value="Ver Todos" onClick={() => setState('vertodos')} />
              </NavLink>
              <NavLink to='/home'>
                <input className={`${currentCategoryState === 'cervezas' ? "actived" : 'Nav-button'}`} type="button" value="Cervezas" onClick={() => setState('cervezas')} />
              </NavLink>
              {/* <NavLink to='/home'>
              <input className={`${currentCategoryState === 'conservas' ? "actived" : 'Nav-button'}`} type="button" value="Conservas" onClick={() => setState('conservas')} />
            </NavLink> */}
            <NavLink to='/home'>
              <input className={`${currentCategoryState === 'merchandising' ? "actived" : 'Nav-button'}`} type="button" value="Merchadising" onClick={() => setState('merchandising')} />
            </NavLink>
            <NavLink to='/home'>
              <input className={`${currentCategoryState === 'otros' ? "actived" : 'Nav-button'}`} type="button" value="Otros" onClick={() => setState('otros')} />
            </NavLink>
          </li>
        </ul>
      </nav>
        : null}
      <Link to={isUser ? isAdmin ? '/admin' : '/dashboard' : '/login'}>
        <button className='nav-personicon'>
          <PersonIcon style={{ fontSize: 40 }} />
        </button>
      </Link>
      <Link to="/wishlist">
          <FavoriteIcon className='fav-icon-nav'/>
      </Link>
      <Link to="/cart">
        <button className='nav-personicon'>
          <ShoppingCartIcon style={{ fontSize: 40 }} />
        </button>
      </Link>
      {isUser ? 
        <button className='nav-personicon' onClick={(e) => dispatch(logout())}>
          <ExitToAppIcon style={{ fontSize: 40 }} />
        </button>
      : null}
    </header>
  );
};

export default NavBar;


