import React, {Component} from 'react'
import Button from '../../../components/UI/Button/Button'
import styles from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()        
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Vikrant Sharma',
                address: {
                    street: 'Vijayapuri Colony, Hyderabad',
                    zipcode: '501301',
                    country: 'India'
                },
                email: 'vikkrant.xx7@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        console.log(order)
        axios.post('orders.json', order)
            .then(Response => {
                this.setState({
                    loading: false
                }, () => {this.props.history.push('/')})
                console.log(Response)
            })
            .catch(error => {
                this.setState({
                    loading: false
                })
                console.error(error)
            });
    }
    
    render() {
        let form = (
            <form>
            <input className={styles.Input} type='text'name='name' placeholder='Your Name'/>
            <input className={styles.Input} type='email'name='email' placeholder='Your Email'/>
            <input className={styles.Input} type='text'name='street' placeholder='Street'/>
            <input className={styles.Input} type='text'name='postal' placeholder='Postal Code'/>
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>
        )
        if(this.state.loading) {
            form = <Spinner />
        }
        return(
            <div className={styles.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        )
    }
}

export default ContactData