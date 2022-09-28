import React, {useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import { AiOutlineRollback } from 'react-icons/ai'
import https from '../../assets/https'

function SingleXodim() {

    let { id } = useParams();
    const [ xodim, setXodim] = useState({})

    useEffect(()=>{
        https
        .get(`/employees/${id}`)
        .then(res =>{
            setXodim(res.data)
        })
        .catch(err =>{
            console.log(err);
        })
    },[id])

  return (
    <section>
        <div className='filialform_header'>
            <Link to='/xodim' className='clientform_back'>
                <AiOutlineRollback />
                Orqaga
            </Link>
        </div>
        <div className=' single_buyurtma'>
            <h1 className='text_center filial_edit_text'>{xodim?.name}</h1>
            <div className='pdf_margin_top_15'>
                <div className='single_buyurtma_info'>
                    <div className='single_buyurtma_inputs'>
                        <p>Ism:</p>
                        <p>{xodim?.name}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Lavozim:</p>
                        <p>{xodim?.job}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Filial:</p>
                        <p>{xodim?.branch?.name}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Bo'lim:</p>
                        <p>{xodim?.section?.name}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Code:</p>
                        <p>{xodim?.code}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SingleXodim