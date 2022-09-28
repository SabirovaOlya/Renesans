
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import https from '../../assets/https';
import { AiOutlineRollback } from 'react-icons/ai'



function SingleShartnama() {

    const [shartnama, setShartnama] = useState({});
    let { id } = useParams()

    useEffect(() => {
        https
            .get(`/contracts/${id}`)
            .then(res => {
                setShartnama(res.data.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])
    function returnTypes(data) {
        if (data === "card") {
            return "Plastik karta / Hisobraqam"
        } else if (data === "cash") {
            return "Naqd pul ko'rinishida"
        } else if (data == 1) {
            return "Bir qil miqdor(Annuitet)"
        } else if (data == 2) {
            return "Kamayib boruvshi(differensial)"
        }
    }
    function bankInputAppearence(data) {
        if (data === "card") {
            return (
                <>
                    <div className='single_buyurtma_inputs'>
                        <p>SSKS / Hisobraqam:</p>
                        <p>{shartnama?.ssks}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Bank nomi:</p>
                        <p>{shartnama?.bank_name}</p>
                    </div>
                    <div className='single_buyurtma_inputs'>
                        <p>Bank MFOsi:</p>
                        <p>{shartnama?.bank_code}</p>
                    </div>
                </>
            )
        } else {
            return <></>
        }
    }

    return (
        <section>
            <div className='filialform_header'>
                <Link to='/shartnama' className='clientform_back'>
                    <AiOutlineRollback />
                    Orqaga
                </Link>
            </div>
            <div className=' single_buyurtma'>
                <h1 className='text_center filial_edit_text'>{shartnama?.order?.client?.name}</h1>
                <div className='pdf_margin_top_15'>
                    <div className='single_buyurtma_info'>
                        <div className='single_buyurtma_inputs'>
                            <p>Kredit ajratish tartibi:</p>
                            <p>{returnTypes(shartnama.type_credit)}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Kredit ajratish tartibi:</p>
                            <p>{shartnama?.order?.id}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Buyurtma Code:</p>
                            <p>{shartnama?.order?.id}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Ustama foiz stavkasi, yillik:</p>
                            <p>{shartnama?.percent_year}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Penya, kunlik:</p>
                            <p>{shartnama?.daily_fine}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Oylik komission yig'im, %da:</p>
                            <p>{shartnama?.monthly_commission}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>So'ndirish tartibi:</p>
                            <p>{returnTypes(shartnama.type_repayment)}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Mikroqarz berish sanasi:</p>
                            <p>{shartnama?.credit_issue_date}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Birinchi tolov sonasi:</p>
                            <p>{shartnama?.first_repayment_date}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Shartnoma sanasi:</p>
                            <p>{shartnama?.contract_issue_date}</p>
                        </div>
                        <div className='single_buyurtma_inputs'>
                            <p>Shartnoma raqami:</p>
                            <p>{shartnama?.contract_num}</p>
                        </div>
                        {
                            bankInputAppearence(shartnama.type_credit)
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
export default SingleShartnama