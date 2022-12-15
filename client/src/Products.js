import React, { Component } from 'react'
import Filters from './Filters'
import ProductTable from './ProductTable'
import ProductForm from './ProductForm'
import axios from 'axios'
// let PRODUCTS = {
//     '1': {productid: 1, category: 'Music', price: '459.99', name: 'Clarinet', instock:true},
//     '2': {productid: 2, category: 'Music', price: '5,000', name: 'Cello',instock:true},
//     '3': {productid: 3, category: 'Music', price: '3,500', name: 'Tuba',instock:true},
//     '4': {productid: 4, category: 'Furniture', price: '799', name: 'Chaise Lounge',instock:true},
//     '5': {productid: 5, category: 'Furniture', price: '1,300', name: 'Dining Table',instock:false},
//     '6': {productid: 6, category: 'Furniture', price: '100', name: 'Bean Bag',instock:true}
// };

class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filterText: '',
            products: ""//PRODUCTS
        }
        this.handleFilter = this.handleFilter.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    handleFilter(filterInput) {
        this.setState(filterInput)
    }

    handleSave(product) {
        if (!product.id) {
            product.id = new Date().getTime()
        }
        console.log(product);
        axios.post('/product/create', product)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
        
        // this.setState((prevState) => {
        //     let products = prevState.products
        //     products[product.id] = product
        //     return { products }
        // })
    }

    handleDestroy(productId) {
        axios.delete("/product/delete/"+Number(productId))
        this.setState((prevState) => {
            let products = prevState.products
            delete products[productId]
            return { products }
        });
    }
    componentDidMount(){
        axios.get("http://localhost:5000/product/get/")
        .then((res)=>{
            this.setState({products:res.data})
        })
        .catch(
            error=>{console.log(error)}
        )
    }
    render () {
        return (
            <div>
                <h1>My Inventory</h1>
                <Filters 
                    onFilter={this.handleFilter}></Filters>
                <ProductTable 
                    products={this.state.products}
                    filterText={this.state.filterText}
                    onDestroy={this.handleDestroy}></ProductTable>
                <ProductForm
                    onSave={this.handleSave}></ProductForm>
            </div>
        )
    }
}

export default Products