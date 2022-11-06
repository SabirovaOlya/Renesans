import React, { useState, useEffect } from 'react'
import { AiOutlineRollback } from 'react-icons/ai'
import { Checkbox, Radio, Textarea } from '@nextui-org/react'
import { useParams, Link } from 'react-router-dom';
import https from '../../assets/https';

import './Buyurtma.css'

function SingleBuyurtnama() {
    const [order, setOrder] = useState({});
    let { id } = useParams()

    useEffect(() => {
        https
            .get(`/orders/${id}`)
            .then(res => {
                setOrder(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    function returnStatus(status){
        if(status){
            return(
                <Radio.Group
                    label=' '
                    value={status == 'pending' ? true : false}
                    size='sm'
                    orientation='vertical'
                    className='kl1_accepting_radio buyurtma_radio'
                >
                    <div className='kl1_accept'><Radio color='success' className='radio_end' value={true}>Tasdiqlash</Radio></div>
                    <div className='kl1_accept margin_left'><Radio color='error' className='radio_end' value={false}>Rad etish</Radio></div>
                </Radio.Group>
            )
        }else{
            return(<></>)
        }
    }
    function returnReason(data){
        if (data?.status === "denied") {
            return (
                <div className='buyurtma_textarea'>
                    <Textarea
                        width='100%'
                        bordered
                        rounded
                        color="secondary"
                        className='kl1_input'
                        placeholder='Rad Etilgan Sabab'
                        label='Sabab'
                        readOnly
                        value = {data?.reason}
                    />
                </div>
            )
        }
    }

    function CheckboxFun(){
        if(order){
            return(
                <div className='shart-check'>
                    <Checkbox
                        value="Kredit Qo'mitasi qorariga asosan"
                        size='sm'
                        className='margin_bottom'
                        color="secondary"
                        isReadOnly
                        isSelected={order?.sign_committee}
                    >
                        Kredit Qo'mitasi qorariga asosan
                    </Checkbox>
                </div>
            )
        }else{
            return(<></>)
        }
    }

    return (
        <>
            <div className='buyurtma_topPart'>
                <Link to='/buyurtma' className='clientform_back'>
                    <AiOutlineRollback />
                    Orqaga
                </Link>
                <div className='buyurtma_buttons'>
                    <Link to='/buyurtma/singleBuyurtma/b1'>B1</Link>
                    <Link to='/buyurtma/singleBuyurtma/av1'>Av1</Link>
                    <Link to='/buyurtma/singleBuyurtma/b3'>B3</Link>
                    <Link to='/buyurtma/singleBuyurtma/p1'>P1</Link>
                    <Link to='/buyurtma/singleBuyurtma/x1'>X1</Link>
                    <Link to='/buyurtma/singleBuyurtma/s1'>S1</Link>
                    <Link to='/buyurtma/singleBuyurtma/g1'>G1</Link>
                    <Link to='/buyurtma/singleBuyurtma/gs1'>GS1</Link>
                    <Link to='/buyurtma/singleBuyurtma/kd1'>KD1</Link>
                    <Link to='/buyurtma/singleBuyurtma/qd'>QD</Link>
                    <Link to='/buyurtma/singleBuyurtma/td'>TD</Link>
                    <Link to='/buyurtma/singleBuyurtma/namuna'>N1</Link>
                    <Link to='/buyurtma/singleBuyurtma/monitoring'>M</Link>
                    <Link to='/buyurtma/singleBuyurtma/avto'>A</Link>
                </div>
            </div>

            <section className='single_buyurtma'>
                <div className='single_buyurtma_info'>
                    <p className='single_buyurtma_title'>{order?.client?.name}</p>
                    {
                        CheckboxFun()
                    }
                    <div className='single_buyurtma_inputs'>
                        <p>Code:</p>
                        <p>{order?.code}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Buyurtma sanasi:</p>
                        <p>{order?.order_date}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>So'ralayotgan qarz miqdor:</p>
                        <p>{order?.sum?.toLocaleString()} som</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>So'ralayotgan muddat:</p>
                        <p>{order?.time} oy</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Mahsulotlar:</p>
                        <p>{order.product ? order?.product?.name : 'Mahsulot yoq'}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Maqsadi:</p>
                        <p>{order?.aim}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Oylik o'rtacha daromad:</p>
                        <p>{order?.salary?.toLocaleString()} som</p>
                    </div>
                    <Radio.Group label=' ' defaultValue={order?.status}  size='sm' className='kl1_accepting_radio buyurtma_radio'>
                            {returnStatus(order?.status)}
                        </Radio.Group>
                    {returnReason(order)}
                </div>
            </section>
        </>
    )
}

export default SingleBuyurtnama