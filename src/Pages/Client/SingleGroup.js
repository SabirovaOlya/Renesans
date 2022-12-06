import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom';
import https from '../../assets/https';
import { AiOutlineRollback,AiOutlineEdit,AiOutlineClear} from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
// Alert
import Swal from 'sweetalert2'

function SingleGroup() {

    const [group, setGroup] = useState({})
    let { id } = useParams()
    let navigate = useNavigate();

    // Alert
    function DeleteAlert() {
        Swal.fire({
            title: "Guruh o'chirildi",
            icon: 'success',
            confirmButtonText: 'Ok'
        })
    }

    useEffect(()=>{
        https
        .get(`/groups/${id}`)
        .then(res =>{
            setGroup(res.data);
        })
    },[])

    function DeleteGroup(){
        https
        .delete(`/groups/${id}`)
        .then(res =>{
            if(res.request.status === 200){
                DeleteAlert()
                setTimeout(()=>{
                    navigate('/client', { replace: true })     
                },1000)
            }
        })
        .catch(err =>{
            console.log(err);
        })
    }

  return (
    <section>
        <div className='filialform_header'>
            <Link to='/group' className='clientform_back'>
                <AiOutlineRollback />
                Orqaga
            </Link>
        </div>
        <div className='single_buyurtma'>
            <h1 className='text_center filial_edit_text'>{group?.name}</h1>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>Parol:</p>
                <p>{group?.code}</p>
            </div>
            <div className='single_buyurtma_inputs pdf_margin_top_15'>
                <p>Klientlar:</p>
            </div>
            <div className='group_single_table pdf_margin_top_15'>
                <div className='group_single_table_header'>
                    <p>Ism</p>
                    <p>Telefon raqam</p>
                    <p>Manzil</p>
                </div>
                {
                    group?.clients?.map((item,index)=>{
                        return(
                            <div className='group_single_table_header' key={item?.id}>
                                <p>{index + 1}. {item?.name}</p>
                                <p>{item?.phone}</p>
                                <p>{item?.address}</p>
                                <div className='group_single_table_buttons'>
                                    <button><Link to={`/client/singleClient/${item?.id}`}><span className='white'>Batafsil</span></Link></button>
                                    {/* <button><Link to={`/client/editClient/${item?.id}`}><i className='bx bx-edit-alt'></i></Link></button>
                                    <button><i className='bx bx-trash'></i></button> */}
                                </div>
                            </div>
                        )
                    })
                }
            </div>  
            <div className='pdf_margin_top_40'>
                <div className='submit-buttons'>
                    <Link to={`/client/edit_group/${id}`}>
                        <button className='client_submit reset' type='reset'>
                                Guruhni tahrirlash
                                <AiOutlineEdit/>
                        </button>
                    </Link>
                    <button className='client_submit delete' type='button' onClick={()=>{DeleteGroup()}}>
                        Guruhni o'chirish
                        <BiTrash/>
                    </button>
                </div> 
            </div>
        </div>
    </section>
  )
}

export default SingleGroup