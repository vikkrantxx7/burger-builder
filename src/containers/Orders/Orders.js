import React,{ Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }
    
    componentDidMount() {
        axios.get('/orders.json')
            .then(resp => {
                let fetchedOrders = []
                for(let key in resp.data) {
                    fetchedOrders.push({
                        ...resp.data[key],
                        id: key
                    })
                }
                this.setState({
                    orders: fetchedOrders,
                    loading: false
                })
            })
            .catch(error => {
                this.setState({loading: false})
            })
    }

    render() {
        let orders = <Spinner/>
        if(!this.state.loading) {
            orders = this.state.orders.map(order => (
                <Order key={order.id} ingredients={order.ingredients} price={order.price} />
            ))
        }

        return(
            <div>
                {orders}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios)