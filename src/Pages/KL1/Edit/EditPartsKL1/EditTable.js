import React from 'react'
// Components
import { Textarea, Radio } from '@nextui-org/react'


function EditTable() {
    return (
        <>
            <div className='kl1_table'>
                <div className='kl1_table_dark-bg'>Hulq atvori</div>
                <div className='kl1_table_dark-bg'>Shaxsiy sifatida baholanishi</div>
                <div className='kl1_table_dark-bg'>Moliaviy malumotlar va savodxonlik</div>
                <div className='kl1_table_double kl1_table_noPadding'>
                    <p>сухбат</p>
                    <div className='kl1_table_inputs'>
                        <input placeholder='ижобий' type='text'/>
                    </div>
                </div>
                <div className='kl1_table_double kl1_table_noPadding'>
                    <p>учрашув</p>
                    <div className='kl1_table_inputs'>
                        <input placeholder='ижобий' type='text'/>
                    </div>
                </div>
                <div className='kl1_table_inputs'>
                    <input placeholder='ижобий' type='text'/>
                </div>
                <div className='kl1_table_double kl1_table_noPadding'>
                    <p>oylik tolov</p>
                    <p>OT/OD</p>
                </div>
                <div className='kl1_table_double kl1_table_dark-bg kl1_table_noPadding'>
                    <p>SD/OT</p>
                    <p>OHX</p>
                </div>
                <div className='kl1_table_dark-bg'>Natija</div>
                <div className='kl1_table_double kl1_table_dark-bg kl1_table_noPadding'>
                    <p className='kl1_table_yellow-bg'>5 985 205,42</p>
                    <p className='kl1_table_red-bg'>62,04%</p>
                </div>
                <div className='kl1_table_double kl1_table_noPadding'>
                    <p className='kl1_table_yellow-bg'>161,18%</p>
                    <p className='kl1_table_yellow-bg'>7 153 000,00</p>
                </div>
                <div className='kl1_table_yellow-bg'> {`<= 50% и >= 120%`}</div>
                <div className='kl1_table_dark-bg'>Shaxsiy kapital miqdori</div>
                <div className='kl1_table_dark-bg'>Shaxsiy kapital/kreditlar</div>
                <div className='kl1_table_dark-bg'>Natija</div>
                <div className='kl1_table_inputs'>
                    <input placeholder='25 000 000,00' type='number'/>
                </div>
                <div className='kl1_table_yellow-bg'>125%</div>
                <div className='kl1_table_yellow-bg'>50</div>
                <div className='kl1_table_dark-bg'>Daromad manbai</div>
                <div className='kl1_table_dark-bg'>Faoliyat barqarorligi</div>
                <div className='kl1_table_dark-bg'>Kutilayotgan rivojlanish</div>
                <div className='kl1_table_inputs kl1_table_input_padding'>
                    <input placeholder='баркарор' type='text'/>
                </div>
                <div className='kl1_table_inputs kl1_table_input_padding'>
                    <input placeholder='баркарор' type='text'/>
                </div>
                <div className='kl1_table_inputs kl1_table_input_padding'>
                    <input placeholder='ижобий' type='text'/>
                </div>
                <div className='kl1_table_dark-bg'>Taminot turi</div>
                <div className='kl1_table_dark-bg'>Taminot qiymati</div>
                <div className='kl1_table_dark-bg'>Kreditni qoplash koeffitsenti</div>
                <div>tilla buyumlar garovi</div>
                <div>20 000 000,00</div>
                <div className='kl1_table_yellow-bg'>100%</div>
            </div>
            <Textarea
                width='100%'
                bordered
                rounded
                color="secondary"
                className='kl1_input'
                placeholder='Ajratiladigan kreditga mijoz qoshimcha 150 litr LukOil moylarini, shuningdek, moy alishtirish jarayonida zaruriy bolgan avto ehtiyot qismlar savdosini ham yolga qoymoqchi. Birlamchi hisob kitoblar buyurtmachi daromadi qoshimcha 1 500 000 somga oshishini korsatmoqda.'
                label='Ajratilgan kreditning buyurtmachi uchun tasirini baholash'
            />
            <Textarea
                width='100%'
                bordered
                rounded
                color="secondary"
                className='kl1_input'
                placeholder='дохода клиента достаточно для получения кредита'
                label='Monitoring boyicha masul xodimning yakuniy xulosasi'
            />
            <div className='kl1_accepting'>
                <p>Taqdim etilgan va toplangan malumotlar hamda kredit byurosidan olingan kredit tarixiga asoslanib men tomonimdan otkazilgan organish va tahlillar asosida ushbu buyurtma boyicha quiydagi yakuniy xulosamni kredit komissiyasida korib chiqish uchun taqdim etaman</p>
                <Radio.Group label=' ' defaultValue={true} size='sm' className='kl1_accepting_radio'>
                    <div className='kl1_accept margin_bottom'><Radio color='success' className='radio_end' value={true}>Kredit ajratish</Radio></div>
                    <div className='kl1_accept'><Radio color='error' className='radio_end' value={false}>Rad etish</Radio></div>
                </Radio.Group>
            </div>
        </>
    )
}

export default EditTable