import cartStore from "../store/cartStore.js";
import productModalStore from "../store/productModalStore.js";
const { mapState, mapActions} = Pinia;
export default {
    //當id 變動時，取得遠端資料，並開啟對應modal
    template:`
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
     aria-labelledby="exampleModalLabel" aria-hidden="true" ref="productModal">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="exampleModalLabel">
          <span>{{ modalProduct.title }}</span>
      </h5>
        <button type="button" class="btn-close"
                data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-6">
            <img class="img-fluid" :src="modalProduct.imageUrl" alt="">
      </div>
          <div class="col-sm-6">
            <span class="badge bg-primary rounded-pill">{{  }}</span>
            <p>商品描述：{{ modalProduct.description }}</p>
            <p>商品內容：{{ modalProduct.content }}</p>

            <div class="h5" v-if="modalProduct.price === modalProduct.origin_price" >{{ modalProduct.price }} 元</div>
            <div v-else>
                <del class="h6">原價 {{ modalProduct.origin_price }} 元</del>
                <div class="h5">現在只要 {{ modalProduct.price }} 元</div>
            </div>
            <div>
              <div class="input-group">
                <select class="form-control" v-model="qty">
                    <option :value="i" v-for="i in 20" :key="i" >{{i}}</option>
                </select>
                <button type="button" class="btn btn-primary" @click="addToCart(modalProduct.id, qty)">加入購物車</button>
      </div>
      </div>
      </div>
          <!-- col-sm-6 end -->
      </div>
      </div>
      </div>
      </div>
      </div>
    `,
    data() {
        return {
            productModal:'',
            qty:1//必須要定義原始值
        }
    },
    methods: {
      ...mapActions(cartStore,['addToCart']),
        show(){
            this.productModal.show();
        },
        hide(){
            this.productModal.hide();
        },
    },
    computed: {
      ...mapState(productModalStore, ['modalProduct'])
    },
    mounted() {
        this.productModal = new bootstrap.Modal(this.$refs.productModal);
      },
      
}