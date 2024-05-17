import React, { useEffect, useContext } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GridViewIcon from '@mui/icons-material/GridView';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import { useState } from 'react';
import { MyContext } from '../../../App';

const Nav = (props) => {
    const [navData, setNavData] = useState([]);
    const [isOpenNav, setIsOpenNav] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [openDropdownMenu, setDropdownMenu] = useState(false);
    const [openDropdownMenuIndex, setDropdownMenuIndex] = useState(null);
    const [openMegaMenu, setOpenMegaMenu] = useState(false);

    const context = useContext(MyContext);

    useEffect(() => {
        setNavData(props.data);
    }, []);

    useEffect(() => {
        setIsOpenNav(props.openNav);
    }, [props.openNav]);

    const closeNav = () => {
        props.closeNav();
    };

    const openDropdownFun = (index) => {
        setDropdownMenu(!openDropdownMenu);
        setDropdownMenuIndex(index);
    };

    return (
        <>
            {isOpenNav === true && <div className='navbarOverlay' onClick={props.closeNav}></div>}
            <div className={`nav d-flex align-items-center ${isOpenNav === true && 'click'}`}>
                <div className='container-fluid'>
                    <div className='row position-relative'>
                        <div className='col-sm-8 part2 position-static'>
                            <nav className={isOpenNav === true ? 'open' : ''}>
                                <ul className='list list-inline mb-0'>
                                    <li className='list-inline-item'>
                                        <Button><Link to={'/'} onClick={props.closeNav}>Home</Link></Button>
                                    </li>
                                    {navData.length !== 0 &&
                                        navData.map((item, index) => (
                                            <li className='list-inline-item' key={index}>
                                                <Button onClick={() => openDropdownFun(index)}>
                                                    <a href='#'>{item.cat_name} <KeyboardArrowDownIcon className={`${openDropdownMenu === true && openDropdownMenuIndex === index && 'rotateIcon'}`} /></a>
                                                </Button>
                                                {item.items.length !== 0 && (
                                                    <div className={`dropdown_menu ${openDropdownMenu === true && openDropdownMenuIndex === index && 'open'}`}>
                                                        <ul>
                                                            {item.items.map((item_, index_) => (
                                                                <li key={index_}>
                                                                    <Button onClick={props.closeNav}>
                                                                        <a href='#'>{item_.cat_name}</a>
                                                                    </Button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    <li className='list-inline-item'>
                                        <Button><Link>About</Link></Button>
                                    </li>
                                  
                                    <li className='list-inline-item'>
                                        <Button><Link>Blog</Link></Button>
                                    </li>
                                    <li className='list-inline-item'>
                                        <Button><Link>Contact</Link></Button>
                                    </li>
                                </ul>
                                {windowWidth < 992 && (
                                    <>
                                        {context.isLogin !== "true" && (
                                            <div className='pl-3 pr-3'>
                                                <br />
                                                <Link to={'/signIn'}>
                                                    <Button className="btn btn-g btn-lg w-100" onClick={closeNav}>Sign In</Button>
                                                </Link>
                                            </div>
                                        )}
                                    </>
                                )}
                            </nav>
                        </div>
                        <div className='col-sm-2 part3 d-flex align-items-center'>
                            <div className='phNo d-flex align-items-center ml-auto'>
                                <span><HeadphonesOutlinedIcon /></span>
                                <div className='info ml-3'>
                                    <h3 className='text-g mb-0'>1900 - 888</h3>
                                    <p className='mb-0'>24/7 Support Center</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Nav;
