const {defineStore} = Pinia;

export default defineStore('cartStore',{
    state: () => ({
        cart: [],
        productId:""
    }),
    actions: {
        addToCart(product_id, qty = 1) {
            const data = {
              product_id,
              qty,
            };
            this.loadingItem = product_id;
            axios.post(`${api_url}/api/${api_path}/cart`,{data})//{data:data}同名可以縮寫
              .then(res => {
                alert(res.data.message);
                // this.$refs.productModal.hide();//這邊目前會出錯
                this.getCartList();
                this.loadingItem = "";//清空loading暫存
              })
              .catch(error => {
                alert(error.response.data.message);
              })
          },
          getCartList() {
            axios.get(`${api_url}/api/${api_path}/cart`)
              .then(res => {
                console.log("購物車列表",res.data.data);
                this.cart = res.data.data;
              })
              .catch(error => {
                alert(error.response.data.message);
              })
          },
          deleteCartItem(cartItem) {
            this.loadingItem = cartItem.id;
            axios.delete(`${api_url}/api/${api_path}/cart/${cartItem.id}`)//{data:data}同名可以縮寫
              .then(res => {
                alert(res.data.message);
                this.getCartList();
                this.loadingItem = "";
              })
              .catch(error => {
                alert(error.response.data.message);
              })
          },
          updateCartItem(cartItem) { //購物車的id 產品的id
            const data = {
              product_id:cartItem.product_id,
              qty:cartItem.qty
            };
            this.loadingItem = cartItem.id;
            axios.put(`${api_url}/api/${api_path}/cart/${cartItem.id}`,{data})//{data:data}同名可以縮寫
              .then(res => {
                console.log("更新購物車",res.data);
                this.getCartList();
                this.loadingItem = "";
              })
              .catch(error => {
                alert(error.response.data.message);
              })
          },
          deleteAllCartItem() {
            axios.delete(`${api_url}/api/${api_path}/carts`)
              .then(res => {
                alert(res.data.message);
                this.getCartList();
              })
              .catch(error => {
                alert(error.response.data.message);
              })
          },
    },
    getters: {
        cartList: ({cart}) => {
            return cart
        }
    }
});