import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@nextui-org/react';
import Pagination from '../../Components/Pagination/Pagination';
import https from '../../assets/https';
import '../../assets/pagination.css'
import Swal from 'sweetalert2';
import '../Client/Client.css'

function Group() {

    const [groups, setGroups] = useState([]);
    const role = window.localStorage.getItem('role')
    // PAGINATION
    const [paginations, setPaginations] = useState([])
    const [currentUrl, setCurrentUrl] = useState('groups')


    function getUrl(newUrl) {
        https
            .get(`/${newUrl}`)
            .then(res => {
                // setPaginations(res.data.meta.links)
                setGroups(res?.data?.data)
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
    function deleteGroup(id) {
        https
            .delete(`/groups/${id}`)
            .then(res => {
                setGroups(groups.filter((item, id) => item.id !== id))
                deleteWarn()
            })
            .catch(err => console.log(err))
    }
    // Alert Modals
    function deleteWarn(){
        Swal.fire({
            title: "Guruh o'chirildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }

  return (
    <section className='client'>
        <div className='client_title'>
            <p>Guruhlar</p>
        </div>
        <div className='client_addition'>
            <div>
                <Link className='client_button gradient-border' to='/group/group_form'><p>Guruh</p> <i className='bx bx-plus-circle'></i></Link>
            </div>
            <Input
                rounded
                bordered
                placeholder="Guruh kodi..."
                color="secondary"
                label=' '
                width='300px'
                className='search-input'
                contentRight={
                    <i className='bx bx-search-alt-2'></i>
                }
            />
        </div>
    
            <div className='mahsulot_table'>
                <div className='mahsulot_table_headers'>
                    <p className='clientheaderTable-title'>Nomi</p>
                    <p className='clientheaderTable-title'>Kod</p>
                </div>
                <div className='mahsulot_table_products'>
                    {
                        groups?.map((item, index) => {
                            return <div className='mahsulot_table_product client_row' key={item?.id}>
                                <p >{/*<span>{index + 1 + (currentPage-1)*10}.</span>*/}{item?.name}</p>
                                <p >{item?.code}</p>
                                <div className='clientuserButtons group_buttons'>
                                    <button><Link to={`/group/single_group/${item?.id}`}><i className='bx bx-user'></i></Link></button>
                                    { role == 'admin' ? (
                                        <>
                                            <button><Link to={`/group/edit_group/${item?.id}`}><i className='bx bx-edit-alt'></i></Link></button>
                                            <button onClick={() => deleteGroup(item?.id)}><i className='bx bx-trash'></i></button>
                                        </>
                                    ) : <></>}   
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        {/* <div className='pagination_block_wrapper'>
            <div className='pagination_block'>
                {
                    paginations?.map((pagination, paginationId) => {
                        return (
                            <button key={paginationId} className={pagination.active ? 'pagiantion_active' : ''} onClick={() => { getUrl(pagination?.url.split('/')[4]) }}>{arrowFunc(pagination.label)}</button>
                        )
                    })
                }
            </div>
        </div> */}
    </section>
  )
}

export default Group