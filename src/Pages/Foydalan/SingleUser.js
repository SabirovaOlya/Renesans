import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import https from '../../assets/https';
import { AiOutlineRollback } from 'react-icons/ai'


function SingleUser() {
    const [user, setUser] = useState({});
    let { id } = useParams()

    // Get user Data
    useEffect(() => {
        https
            .get(`/users/${id}`)
            .then(res => {
                setUser(res?.data)
                console.log(res?.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    return (
        <section>
            <div className='filialform_header'>
                <Link to='/foydalanuvchi' className='clientform_back'>
                    <AiOutlineRollback />
                    Orqaga
                </Link>
            </div>
            <div className=' single_buyurtma'>
                <h1 className='text_center filial_edit_text'>{user?.name}</h1>
                <div className='pdf_margin_top_15'>
                    <div className='single_buyurtma_info'>
                        <div className='single_buyurtma_inputs'>
                            <p>Email:</p>
                            <p>{user?.email}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Role:</p>
                            <p>{user?.name}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SingleUser