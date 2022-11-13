import React, { useEffect, useState, useRef } from 'react';
import './Client.css'
import { Link } from 'react-router-dom';
import { Input } from '@nextui-org/react';
import Pagination from '../../Components/Pagination/Pagination';
import https from '../../assets/https';
import '../../assets/pagination.css'
import Swal from 'sweetalert2';


function Client() {

    const [clients, setClients] = useState([]);

    // PAGINATION
    const [paginations, setPaginations] = useState([])
    const [currentUrl, setCurrentUrl] = useState('clients')


    function getUrl(newUrl) {
        https
            .get(`/${newUrl}`)
            .then(res => {
                setPaginations(res.data.meta.links)
                setClients(res.data.data)
                // setLoading(false)
            })
    }

    // Arrow putting Function
    function arrowFunc(label) {
        if (label === 'Next &raquo;') {
            return '>'
        } else if (label === '&laquo; Previous') {
            return '<'
        } else {
            return label
        }
    }

    useEffect(() => {
        getUrl(currentUrl)
    }, []);

    // Delete CLient
    function deleteClient(clientIndex) {
        https
            .delete(`/clients/${clientIndex}`)
            .then(res => {
                setClients(clients.filter((client, clientId) => client.id !== clientIndex))
                deleteWarn()
            })
            .catch(err => console.log(err))
    }
    // Alert Modals
    function deleteWarn(){
        Swal.fire({
            title: "Klient o'chirildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }

    return (
        <div className='client'>
            <div className='client_title'>
                <p>Klientlar</p>
            </div>
            <div className='client_addition'>
                <div>
                    <Link className='client_button gradient-border' to='/client/single_form'><p>Klient</p> <i className='bx bx-plus-circle'></i></Link>
                    <Link className='client_button gradient-border' to='/client/group_form'><p>Guruh</p> <i className='bx bx-plus-circle'></i></Link>
                </div>
                <Input
                    rounded
                    bordered
                    placeholder="Foydalanuvchi paroli..."
                    color="secondary"
                    label=' '
                    width='300px'
                    className='search-input'
                    contentRight={
                        <i className='bx bx-search-alt-2'></i>
                    }
                />
            </div>
            <div className='clientTablePart'>
                <div className='clientTable'>
                    <div className='clienttableHeader'>
                        <p className='clientheaderTable-title'>Ism</p>
                        <p className='clientheaderTable-title'>Parol</p>
                        <p className='clientheaderTable-title'>PinFl</p>
                        <p className='clientheaderTable-title'>Shahar</p>
                    </div>
                    <ul className='clienttableInfo'>
                        {
                            clients.map((item, index) => {
                                return <li className='client_row' key={item.id}>
                                    <p className='clientliName li'>{/*<span>{index + 1 + (currentPage-1)*10}.</span>*/}{item.name}</p>
                                    <p className='li'>{item.code}</p>
                                    <p className='li'>{item.pinfl}</p>
                                    <p className='li'>{item.city}</p>
                                    <div className='clientuserButtons'>
                                        <button><Link to={`/client/singleClient/${item?.id}`}><i className='bx bx-user'></i></Link></button>
                                        <button><Link to={`/client/editClient/${item?.id}`}><i className='bx bx-edit-alt'></i></Link></button>
                                        <button onClick={() => deleteClient(item.id)}><i className='bx bx-trash'></i></button>
                                    </div>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
            <div className='pagination_block_wrapper'>
                <div className='pagination_block'>
                    {
                        paginations?.map((pagination, paginationId) => {
                            return (
                                <button key={paginationId} className={pagination.active ? 'pagiantion_active' : ''} onClick={() => { getUrl(pagination?.url.split('/')[4]) }}>{arrowFunc(pagination.label)}</button>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Client