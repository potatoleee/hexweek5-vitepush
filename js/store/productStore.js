const { defineStore } = Pinia;
import productModalStore from "./productModalStore.js";
const productModal = productModalStore();
const { show } = productModal;
export default defineStore('productStore', {
    state: () => ({
        productListData:[],
        tempProduct:{},
    }),
    actions: {
            getProductList() {
                axios.get(`${api_url}/api/${api_path}/products/all`)
                .then(res => {
                    this.productListData = res.data.products;
                    console.log(this.productListData);
                })
                .catch(error => {
                    alert(error.data.message);
                })
            },
            openProductModal(id) {
                console.log('產品id:',id);
                this.loadingItem = id;
                axios.get(`${api_url}/api/${api_path}/product/${id}`)
                .then(res => {
                  console.log('單一產品列表',res.data.product);
                  this.tempProduct = res.data.product;
                  productModal.show();
                  this.loadingItem = "";//清空loading暫存
                })
                .catch(error => {
                  alert(error.data.message);
                })
              },
    },
  getters: {
    sortProducts: ({ productListData }) => {
      return productListData
    }
  }

})