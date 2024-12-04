const orders=require('../data/orders')

const statusQueue={
    queue:[],
    addOrder(order){
        this.queue.push(order)
    },
    processQueue(){
        this.queue.forEach(order=>{
            if(order.status=='Preparing')
            {
                order.status='Out for Delivery'
            }
            else
            if(order.status=='Out for Delivery')
            {
                order.status='Delivered'
                this.queue=this.queue.filter(o=>o.id!==order.id)
            }
        })
    }
}

module.exports=statusQueue;