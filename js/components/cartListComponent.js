import cartStore from "../store/cartStore.js";
const { mapState, mapActions} = Pinia;
export default {
    template:` 
    <div class="text-end">
    <button class="btn btn-outline-danger" type="button" @click="deleteAllCartItem()">清空購物車</button>
  </div>
    <table class="table align-middle">
    <thead>
      <tr>
        <th>品項</th>
        <th class="text-center">單價</th>
        <th class="text-center">數量</th>
        <th class="text-center">小計</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cart.carts">
        <tr v-for="cartItem in cart.carts" :key="cartItem.id">
      
          <td class="d-flex align-items-center gap-2">
           <div alt="" style="width:100px ; height: 100px; background-size: cover; background-position: center" :style="{backgroundImage: 'url(' + cartItem.product.imageUrl + ')'}">
           </div>
           <div>
             <p class="mb-0">
               {{ cartItem.product.title }}
             </p>
             <p class="mb-0">
               NT$ {{ cartItem.product.price}}
             </p>
           </div>
          </td>
          <td class="text-center">
           NT$ {{ cartItem.product.price}}
         </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <select name="" id="" class="form-control" v-model="cartItem.qty" @change="updateCartItem(cartItem)" 
                :disabled="cartItem.id === loadingItem">
                 <option :value="i" v-for="i in 25" :key="i + 123" >{{i}}</option>
                </select>
              </div>
            </div>
          </td>
          <td class="text-center">
           NT$ {{ cartItem.total }}
         </td>
         
          <td class="text-end">
           <button type="button" class="btn" @click="deleteCartItem(cartItem)"
           :disabled="cartItem.id === loadingItem">
             <i v-if="cartItem.id === loadingItem" class="fas fa-spinner fa-pulse"></i>
             x
           </button>
         </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="4" class="text-end">總計</td>
        <td class="text-end">NT$ {{ cart.total }}</td>
      </tr>
      <tr>
        <td colspan="4" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">NT$ {{ cart.final_total }}</td>
      </tr>
    </tfoot>
  </table>`,
  methods: {
    ...mapActions(cartStore,['getCartList', 'deleteCartItem', 'updateCartItem', 'deleteAllCartItem'])
  },
  computed: {
    ...mapState(cartStore,['cart'])
  },
  mounted() {
    this.getCartList();
  },
}