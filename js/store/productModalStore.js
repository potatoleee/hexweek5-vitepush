const {defineStore} = Pinia;

export default defineStore('productModalStore', {
    state: () => ({
        tempProduct:{},
        productModal:'',
        qty:1//必須要定義原始值
    }),
    actions: {
        show(){
            this.productModal.show();
        },
        hide(){
            this.productModal.hide();
        },
    },
    getters: {
        modalProduct: ({ tempProduct,}) => {
          return tempProduct
          
        }
    }
})