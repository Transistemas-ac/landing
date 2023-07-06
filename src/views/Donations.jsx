import Button from '../components/Button';
import Card from '../components/Card'

import donationIlustration from '../assets/svg/donation_ilustration.svg'
import Metrics from '../components/Metrics';
import Footer from '../components/Footer';

function Donations() {
    return (
        <div className='donations'>
            <h1 className='donations__title'>Donaciones</h1>
            <p className='donations__description'>
                El amor es nuestra fuerza e impulso para luchar de forma colaborativa por la justicia social. Con tu aporte Transistemas puede seguir existiendo, brindando cursos y capacitaciones de forma gratuita a nuestra comunidad.
            </p>

            <Card className='enterprise-contact'
                divider={true}
            >
                <span>
                    <h1 className='enterprise-contact__title'>Somos una asociación civil</h1>
                    <p className='enterprise-contact__description'>¿Tenés una empresa y querés donar?</p>
                </span>
                <Button type='link'
                    href='/#contact-form'
                    icon='mail'
                    className='enterprise-contact__button text-yellow'
                >
                    Contactanos
                </Button>
            </Card>

            <Card className='colaborate'>
                {/* <span>
                    
                </span> */}
                <img src={donationIlustration} alt='Ilustracion de donacion' className='colaborate__ilustration' />
                <h1 className='colaborate__title'>Colaborá con la causa</h1>
                <p className="colaborate__description">Ayudanos mes a mes para que podamos seguir avanzando</p>
                <Button type='link' className='colaborate__button' href='https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848100905c01812017c99d0dba'>Donación mensual</Button>
            </Card>


            <div className="donation">
                <h1 className="donation__title">Donación única</h1>
                <Card className='donation__inner-container'
                    divider={true}
                >
                    <h3 className='donation__subtitle'>A través de Mercado Pago</h3>
                    <Button target='_blank' type='link' className='donation__button' href='https://mpago.la/1CgVs8J' icon='link'>$500</Button>
                    <Button target='_blank' type='link' className='donation__button' href='https://mpago.la/18EHZ8i' icon='link'>$1000</Button>
                    <Button target='_blank' type='link' className='donation__button' href='https://mpago.la/1G1eoZc' icon='link'>$2000</Button>
                    <Button target='_blank' type='link' className='donation__button' href='http://mpago.la/1ydp1Tp' icon='link'>$3000</Button>
                </Card>
            </div>

            <div className="transfer">
                <h1 className="transfer__title">Transferencia</h1>
                <Card className='transfer__inner-container'
                    divider={true}
                >
                    <span>
                        <h3 className='transfer__subtitle'>Asociación Transistemas</h3>
                        <h4 className='transfer__type'>Cuenta corriente - Banco Provincia</h4>
                    </span>
                    <Button type='link' className='transfer__button' href='_blank' icon='copy' copy='Transistemas'>Alias: Transistemas</Button>
                    <Button type='link' className='transfer__button' href='_blank' icon='copy' copy='0140002101400205400077'>CBU: 0140002101400205400077</Button>
                </Card>
            </div>

            <div className="metrics-container">
                <h1 className="metrics-container__title">Nuestro impacto</h1>
                <Metrics />
            </div>

            <Footer/>
        </div>

    );
}

export default Donations;