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
            setXodim(res?.data)
        })
        .catch(err =>{
            console.log(err);
        })
    },[id])

    let positions = [
        {
            value:'chief_treasurer',
            label:"Bosh g'aznachi"
        },
        {
            value:'head_of_credit',
            label:"Bosh kreditor"
        },
        {
            value:'chief_accountant',
            label:"Bosh buxgalter"
        },
        {
            value:'head_of_branch',
            label:"Boshqaruvchi"
        },
        {
            value:null,
            label:"Hechkim"
        }
    ]

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
                    {
                        xodim?.position ? 
                            <div className='single_buyurtma_inputs'>
                                <p>Kommisiya:</p>
                                <p>{positions?.find(x => x.value == xodim?.position).label}</p>
                            </div> :
                        <></>

                    }
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
                    <h4>Rasim</h4>
                    <div className='photo_images'>
                        {
                            xodim?.photo?.map((item,index)=>{
                                return(
                                    <div className='image_container_user photo_size' key={index}>
                                        <img className='photo_show_user' src={`https://ioi-tech.uz/${item?.photo}`}></img>
                                        {/* <button type='button' onClick={()=>{ImageDelete(index)}}><AiFillCloseSquare className='icon_no'/></button> */}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default SingleXodim