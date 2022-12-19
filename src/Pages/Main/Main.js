import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { Avatar } from '@mui/material';

// Icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { AiOutlineBell, AiFillDatabase, AiFillFileText, AiOutlineFileAdd, AiFillFolderOpen, AiFillFile, AiOutlineBook, AiOutlineUsergroupAdd, AiOutlineAim, AiOutlineCalendar } from 'react-icons/ai'
import { BsBuilding } from 'react-icons/bs'

// API
import https from '../../assets/https';

// Components
import Logo from '../../assets/images/Logo';
import { Tabs } from 'antd';


// Styles
import './Main.css'
// Pages
import Client from '../Client/Client';
import Home from '../Home/Home';
import Login from '../Login/Login'
import Shartnama from '../Shartnoma/Shartnama';
import Addshartnama from '../Shartnoma/Addshartnama';
import SingleShartnama from '../Shartnoma/SingleShartnama';
import Buyurtma from '../Buyurtma/Buyurtma';
import CLientForm from '../Client/CLientForm';
import Group from '../Group/Group';
import GroupForm from '../Client/GroupForm';
import SingleGroup from '../Client/SingleGroup';
import EditGroup from '../Client/EditGroup';
import AddGroupClient from '../Group/AddGroupClient';
import BuyurtmaForm from '../Buyurtma/BuyurtmaForm';
import Taminot from '../Taminot/Taminot';
import TaminotForm from '../Taminot/TaminotForm';
import SingleGold from '../Taminot/SingleGold';
import SingleUchinchi from '../Taminot/SingleUchinchi';
import SingleSugurta from '../Taminot/SingleSugurta';
import SingleBuyurtnama from '../Buyurtma/SingleBuyurtnama';
import SingleAvto from '../Taminot/SingleAvto';
import EditSugurta from '../Taminot/EditSugurta';
import EditUchinchi from '../Taminot/EditUchinchi';
import EditGold from '../Taminot/EditGold';
import EditAvto from '../Taminot/EditAvto';
import KL1 from '../KL1/KL1';
import KL1Form from '../KL1Form/KL1Form';
import SingleKL1 from '../KL1Form/SingleKL1';
import EditKL1 from '../KL1/Edit/EditKL1';
import StepperForm from '../KL1/Stepper';
import Filial from '../Filiallar/Filial';
import AddFilial from '../Filiallar/AddFilial';
import EditFilial from '../Filiallar/EditFilial';
import SingleFilial from '../Filiallar/SingleFilial';
import Xodim from '../Xodim/Xodim';
import EditXodim from '../Xodim/EditXodim';
import AddXodim from '../Xodim/AddXodim';
import SingleXodim from '../Xodim/SingleXodim';
import Section from '../Section/Section';
import EditSection from '../Section/EditSection';
import Mahsulot from '../Mahsulot/Mahsulot';
import EditMahsulot from '../Mahsulot/EditMahsulot';
import Foydalan from '../Foydalan/Foydalan';
import AddFoydalan from '../Foydalan/AddFoydalan';
// pdf
import B1Form from '../../PDF/B1Form';
import AV1Form from '../../PDF/AV1Form';
import B3Form from '../../PDF/B3Form';
import P1Form from '../../PDF/P1Form';
import X1Form from '../../PDF/X1Form';
import G1Form from '../../PDF/G1Form';
import GS1Form from '../../PDF/GS1Form';
import QDForm from '../../PDF/QDForm';
import Namuna from '../../PDF/Namuna';
import Monitoring from '../../PDF/Monitoring';
import AvtoForm from '../../PDF/AvtoForm';
import S1Form from '../../PDF/S1Form';
import KD1Form from '../../PDF/KD1Form';
import TDForm from '../../PDF/TDForm';
import CalendarSet from '../Calendar/CalendarSet';
import SingleUser from '../Foydalan/SingleUser';
import SingleClient from '../Client/SingleClient';
import EditClient from '../Client/EditClient';
import EditShartnama from '../Shartnoma/EditShartnama';
import EditBuyurtma from '../Buyurtma/EditBuyurtma';
import EditUser from '../Foydalan/EditUser';

// Styles
import './Main.css'

const { TabPane } = Tabs;


function Main() {
    let token = window.localStorage.getItem('token')
    let name = window.localStorage.getItem('name')
    let role = JSON.parse(window.localStorage.getItem('role'))

    let path = (window.location.pathname).split('/')

    const [filialProps, setFilialProps] = useState([])
    const [xodimProps, setXodimProps] = useState([])
    const [bolimProps, setBolimProps] = useState([])

    const [tabDefaultKey, setTabDefaultKey] = useState()
    let sidebars = [
        { to: '/', icon: <HomeOutlinedIcon />, span: 'Statistika', keys: 1, visible:"visible"},
        { to: '/client', icon: <PersonOutlineOutlinedIcon />, span: 'Klientlar', keys: 2, visible: role.includes('admin') || role.includes("director") || role.includes("user") ? "visible" : "hidden" },
        { to: '/group', icon: <AiOutlineUsergroupAdd />, span: 'Guruhlar', keys: 3, visible: role.includes('admin') || role.includes("director") || role.includes("user") ? "visible" : "hidden" },
        { to: '/buyurtma', icon: <AiFillFileText />, span: 'Buyurtma', keys: 4, visible: role.includes('admin') || role.includes("director") || role.includes("monitoring") || role.includes("user") ? "visible" : "hidden" },
        { to: '/taminot', icon: <AiFillFolderOpen />, span: "Ta'minot", keys: 5, visible: role.includes('admin') || role.includes("director") || role.includes("monitoring") || role.includes("user") ? "visible" : "hidden" },
        { to: '/shartnama', icon: <AiFillFile />, span: 'Shartnoma', keys: 6, visible: role.includes('admin') || role.includes("director") || role.includes("user") ? "visible" : "hidden" },
        { to: '/kl1', icon: <AiOutlineBook />, span: 'KL1', keys: 7, visible: role.includes('admin') || role.includes("director") || role.includes("monitoring") ? "visible" : "hidden" },
        { to: '/filials', icon: <BsBuilding />, span: 'Filiallar', keys: 8, visible: role.includes('admin') ? "visible" : "hidden" },
        { to: '/xodim', icon: <AiOutlineUsergroupAdd />, span: 'Xodimlar', keys: 9, visible: role.includes('admin') ? "visible" : "hidden" },
        { to: '/mahsulot', icon: <AiOutlineFileAdd />, span: 'Mahsulotlar', keys: 10, visible: role.includes('admin') ? "visible" : "hidden" },
        { to: '/section', icon: <AiFillDatabase />, span: "Bo'limlar", keys: 11, visible: role.includes('admin') ? "visible" : "hidden" },
        { to: '/foydalanuvchi', icon: <AiOutlineUsergroupAdd />, span: 'Foydalanuvchilar', keys: 12, visible: role.includes('admin') ? "visible" : "hidden" },
        { to: '/calendar', icon: <AiOutlineCalendar />, span: 'Calendar', keys: 13, visible: role.includes('admin') ? "visible" : "hidden" }
    ]
    const [sideBar, setSideBar] = useState(sidebars);

    const [headerDropDown, setHeaderDropDown] = useState(false);
    const catalogRef = useRef(null)
    // header DropDown Hendle Script
    // Component Props Data

    useEffect(() => {

        document.addEventListener('mousedown', hendleOutSide);

        return () => {
            document.removeEventListener('mousedown', hendleOutSide)
        };
        https
        .get('/all/branches')
        .then(res => console.log(res))
    }, [])


    const onChange = (key) => {
        setTabDefaultKey(key)
    };

    const hendleOutSide = (e) => {
        const { current: wrap } = catalogRef;
        if (wrap && !wrap.contains(e.target)) {
            setHeaderDropDown(false)
        }
    }

    function RemoteData(){
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('name');
        window.localStorage.removeItem('role');
        window.localStorage.removeItem('user_id');
        window.location.reload(false);
    }

    if (token) {
        return (
            <section className='main'>
                <BrowserRouter>
                    <nav className='main_nav'>
                        <Link to='/'><Logo width={175} /></Link>
                        <Tabs activeKey={sideBar?.find(x => x.to === `/${path[1]}` )?.keys?.toString()} onChange={onChange} className="nav-list">
                            {
                                sideBar?.map((item, index) => {
                                    return (
                                        <TabPane
                                            tab={
                                                <Link to={item?.to} className={`nav-item ${item?.visible}`}>
                                                    <div className='nav-item_icon'>
                                                        {item?.icon}
                                                    </div>
                                                    <span>{item?.span}</span>
                                                </Link>}
                                            key={item?.keys} />
                                    )
                                })
                            }
                        </Tabs>
                    </nav>

                    <main>
                        <header>
                            <AiOutlineBell className='email' />
                            <div className='header_last'>
                                <div className='header_info'>
                                    <h2>{name}</h2>
                                    <p>{role.join(',')}</p>
                                </div>
                                <Avatar
                                    onClick={() => { setHeaderDropDown(!headerDropDown) }}
                                    className='header_avatar'
                                    alt="John Doe"
                                    sx={{ width: 50, height: 50 }}
                                    src='https://pixinvent.com/demo/vuexy-react-admin-dashboard-template/demo-1/static/media/avatar-s-11.1d46cc62.jpg' />
                                <ul className={headerDropDown ? 'header_dropdown header_dropdown_active' : 'header_dropdown'} ref={catalogRef}>
                                    <div className='header_dropdown_item' onClick={() => { RemoteData() }}>
                                        <Link to='/' onClick={() => { setHeaderDropDown(false) }} >
                                            <div className='header_dropdown_icon' >
                                                <PowerSettingsNewOutlinedIcon
                                                />
                                            </div>
                                            <p>Log Out</p>
                                        </Link>
                                    </div>
                                </ul>
                            </div>
                        </header>
                        <div className='content'>
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/client' element={<Client />} />
                                {/* <Route path='/login' element={<Login />} /> */}
                                <Route path='/client/single_form' element={<CLientForm />} />
                                <Route path='/client/singleClient/:id' element={<SingleClient />} />
                                <Route path='/client/editCLient/:id' element={<EditClient />} />
                                <Route path='/group' element={<Group />} />
                                <Route path='/group/group_form' element={<GroupForm />} />
                                <Route path='/group/add_client_group' element={<AddGroupClient />} />
                                <Route path='/group/single_group/:id' element={<SingleGroup />} />
                                <Route path='/group/edit_group/:id' element={<EditGroup />} />
                                <Route path='/shartnama' element={<Shartnama />} />
                                <Route path='/shartnama/addshartnama' element={<Addshartnama />} />
                                <Route path='/shartnama/singleshartnama/:id' element={<SingleShartnama />} />
                                <Route path='/shartnama/editshartnama/:id' element={<EditShartnama />} />
                                <Route path='/buyurtma' element={<Buyurtma />} />
                                <Route path='/buyurtma/form' element={<BuyurtmaForm />} />
                                <Route path='/buyurtma/singleBuyurtma/:id' element={<SingleBuyurtnama />} />
                                <Route path='/buyurtma/editBuyurtma/:id' element={<EditBuyurtma />} />
                                {/* pdf */}
                                <Route path='/buyurtma/singleBuyurtma/b1' element={<B1Form />} />
                                <Route path='/buyurtma/singleBuyurtma/av1' element={<AV1Form />} />
                                <Route path='/buyurtma/singleBuyurtma/b3' element={<B3Form />} />
                                <Route path='/buyurtma/singleBuyurtma/p1' element={<P1Form />} />
                                <Route path='/buyurtma/singleBuyurtma/x1' element={<X1Form />} />
                                <Route path='/buyurtma/singleBuyurtma/g1' element={<G1Form />} />
                                <Route path='/buyurtma/singleBuyurtma/gs1' element={<GS1Form />} />
                                <Route path='/buyurtma/singleBuyurtma/qd' element={<QDForm />} />
                                <Route path='/buyurtma/singleBuyurtma/namuna' element={<Namuna />} />
                                <Route path='/buyurtma/singleBuyurtma/monitoring' element={<Monitoring />} />
                                <Route path='/buyurtma/singleBuyurtma/avto' element={<AvtoForm />} />
                                <Route path='/buyurtma/singleBuyurtma/s1' element={<S1Form />} />
                                <Route path='/buyurtma/singleBuyurtma/kd1' element={<KD1Form />} />
                                <Route path='/buyurtma/singleBuyurtma/td' element={<TDForm />} />
                                {/* pdf */}
                                <Route path='/taminot' element={<Taminot />} />
                                <Route path='/taminot/form' element={<TaminotForm />} />
                                <Route path='/taminot/singlegold/:id' element={<SingleGold />} />
                                <Route path='/taminot/singleuchinchi/:id' element={<SingleUchinchi />} />
                                <Route path='/taminot/singlesugurta/:id' element={<SingleSugurta/>} />
                                <Route path='/taminot/singleavto/:id' element={<SingleAvto/>} />
                                <Route path='/taminot/editsugurta/:id' element={<EditSugurta/>} />
                                <Route path='/taminot/edituchinchi/:id' element={<EditUchinchi/>} />
                                <Route path='/taminot/editgold/:id' element={<EditGold/>} />
                                <Route path='/taminot/editavto/:id' element={<EditAvto/>} />
                                <Route path ='/kl1' element={<KL1Form/>} />
                                <Route path='/kl1/addkl1/*' element={<StepperForm />} />
                                <Route path='/kl1/editkl1/:id' element={<EditKL1 />} />
                                <Route path='/kl1/singlekl1/:id' element={<SingleKL1/>} />
                                <Route path='/filials' element={<Filial />} />
                                <Route path='/filials/addfilial' element={<AddFilial />} />
                                <Route path='/filials/editfilial/:id' element={<EditFilial />} />
                                <Route path='/filials/singlefilial/:id' element={<SingleFilial />} />
                                <Route path='/xodim' element={<Xodim />} />
                                <Route path='/xodim/addxodim' element={<AddXodim />} />
                                <Route path='/xodim/editxodim/:id' element={<EditXodim />} />
                                <Route path='/xodim/singlexodim/:id' element={<SingleXodim />} />
                                <Route path='/mahsulot' element={<Mahsulot />} />
                                <Route path='/mahsulot/editmahsulot/:id' element={<EditMahsulot />} />
                                <Route path='/section' element={<Section />} />
                                <Route path='/section/editsection/:id' element={<EditSection />} />
                                <Route path='/section' element={<Section />} />
                                <Route path='/foydalanuvchi' element={<Foydalan />} />
                                <Route path='/foydalanuvchi/addfoydalanuvchi' element={<AddFoydalan />} />
                                <Route path='/foydalanuvchi/singlefoydalanuvchi/:id' element={<SingleUser />} />
                                <Route path='/foydalanuvchi/editfoydalanuvchi/:id' element={<EditUser />} />
                                <Route path='/calendar' element={<CalendarSet />} />
                            </Routes>
                        </div>
                    </main>
                </BrowserRouter>
            </section>
        )
    } else {
        return (
            <Login />
        )
    }
}

export default Main