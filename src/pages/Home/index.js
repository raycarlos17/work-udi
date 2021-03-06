import React from 'react';
import './home.css'
import {Link} from 'react-router-dom';
import Header from '../../components/Header'
import Destaques from '../Destaques';
import Footer from '../../components/footerBreno';
import SearchIcon from '@material-ui/icons/Search';

const Home = (props) => {

    return (
        <React.Fragment>
        <Header>
        <div className='div-search-home'>
                <form>
                    <button className='icon-search'>
                        <SearchIcon style={{ fontSize: 30 }} />
                    </button>
                    <input type='text' placeholder='Search' />
                </form>
            </div>
            <div className='div-login'><Link className='link-login' to='/login' >LOGIN</Link></div>
        </Header>
        <div className='div-imagem'>
            <div className='div-info'>
                <div className='logo-home'><h1>WU</h1></div>
                <div className='info-site'>
                    <p>THE BEST PROFESSIONALS FOR WHATEEVER YOU NEED, YOU CAN FIND HERE...</p>
                    <div className="home-div-button-register" >
                        <button className='button-register'><Link className='link-register-home' to='/register'>REGISTER NOW</Link></button>
                    </div>
                </div>
            </div>
        </div>
        <Destaques/>
        <Footer/>
        </React.Fragment>
    )
}

export default Home;