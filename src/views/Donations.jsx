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

            <Card
                className='enterprise-card'
                type='basic'
                divider={true}
            >
                <span>
                    <h2 className='enterprise-card__title'>Somos una asociación civil</h2>
                    <p className='enterprise-card__description'>¿Tenés una empresa y querés donar?</p>
                </span>
                <Button type='link'
                    href='/#contact-form'
                    icon='mail'
                    className='enterprise-contact__button text-yellow'
                >
                    Contactanos
                </Button>
            </Card>

            <Card
                className='colaborate-card' type='basic'>
                <img src={donationIlustration} alt='Ilustracion de donacion' className='colaborate-card__ilustration' />
                <h2 className='colaborate-card__title'>Colaborá con la causa</h2>
                <p className="colaborate-card__description">Ayudanos mes a mes para que podamos seguir avanzando</p>
                <Button type='link' className='colaborate-card__button' href='https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=2c9380848100905c01812017c99d0dba'>Donación mensual</Button>
            </Card>

            <h1 className="donation-title">
                Donación única
            </h1>
            <Card
                className='donation-card'
                type='basic'
                divider={true}
            >
                <h3 className='donation-card__title'>A través de Mercado Pago</h3>
                <Button target='_blank' type='link' className='donation-card__link' href='https://mpago.la/1CgVs8J' icon='link'>$500</Button>
                <Button target='_blank' type='link' className='donation-card__link' href='https://mpago.la/18EHZ8i' icon='link'>$1000</Button>
                <Button target='_blank' type='link' className='donation-card__link' href='https://mpago.la/1G1eoZc' icon='link'>$2000</Button>
                <Button target='_blank' type='link' className='donation-card__link' href='http://mpago.la/1ydp1Tp' icon='link'>$3000</Button>
            </Card>

            <h1 className="transfer-title">
                Transferencia
            </h1>
            <Card
                className='transfer-card'
                type='basic'
                divider={true}
            >
                <span>
                    <h3 className='transfer-card__title'>Asociación Transistemas</h3>
                    <h4 className='transfer-card__subtitle'>Cuenta corriente - Banco Provincia</h4>
                </span>
                <Button type='link' className='transfer-card__link' href='_blank' icon='copy' copy='Transistemas'>Alias: Transistemas</Button>
                <Button type='link' className='transfer-card__link' href='_blank' icon='copy' copy='0140002101400205400077'>CBU: 0140002101400205400077</Button>
            </Card>

            <h1 className="metrics-title">
                Nuestro impacto
            </h1>
            <Metrics />

            <Footer />
        </div>
    );
}

export default Donations;