<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout row wrap align-start justify-center>
          <v-flex xs12 sm8>
            <v-card>
              <v-card-title primary-title>
                <h1>Mobx + Vue demo</h1>
              </v-card-title>
              <v-container
                fluid
                grid-list-md
              >
                <v-layout row wrap>
                  <v-flex xs12 sm4 :key="item.product.name" v-for="item in cartItems">
                    <v-card>
                      <v-img :src="item.product.imgUrl" height="200px"/>
                      <v-card-title primary-title>
                        <div>
                          <h3 class="headline mb-0">{{ item.product.name }}</h3>
                          <div>{{ item.product.price | currency }}</div>
                          <v-text-field v-model.number="item.amount" type="number" label="Amount"/>
                        </div>
                      </v-card-title>
                      <v-card-actions>
                        <v-btn @click="$cart.add(item)">Add to cart</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
              <v-container fluid>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-card>
                      <v-list two-line>
                        <template v-if="$cart.items.length > 0">
                          <v-list-tile :key="item.product.name" v-for="item in $cart.items">
                            <v-list-tile-avatar>
                              <img :src="item.product.imgUrl">
                            </v-list-tile-avatar>
                            <v-list-tile-content>
                              <v-list-tile-title v-text="item.product.name"/>
                              <v-list-tile-sub-title>
                                <v-layout row wrap>
                                  <v-flex xs6>
                                    <v-text-field v-model.number="item.amount" type="number" label="Amount"/>
                                  </v-flex>
                                  <v-flex xs6>
                                    <v-text-field :value="item.total | currency" label="Subtotal" :readonly="true"/>
                                  </v-flex>
                                </v-layout>
                              </v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                              <v-btn icon @click="$cart.remove(item)">
                                <v-icon>delete</v-icon>
                              </v-btn>
                            </v-list-tile-action>
                          </v-list-tile>
                        </template>
                        <template v-else>
                          <v-list-tile>
                            <v-list-tile-content>
                              <v-list-tile-title>No products</v-list-tile-title>
                            </v-list-tile-content>
                          </v-list-tile>
                        </template>
                        <v-list-tile>
                          <v-list-tile-content>
                            <v-list-tile-title>
                              <h3>Total: {{ $cart.total | currency }}</h3>
                            </v-list-tile-title>
                          </v-list-tile-content>
                        </v-list-tile>
                      </v-list>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component, Watch } from 'vue-property-decorator';
  import { Product } from './models/Product';
  import { CartItem } from './models/CartItem';
  import { Observer } from 'mobx-vue';
  import { ProductService } from './services/ProductService';
  import { Cart } from './models/Cart';

  @Observer
  @Component
  export default class App extends Vue {
    get cartItems(): CartItem[] {
      return this.$productService.products.map(x => new CartItem(x, 1));
    }
  }
</script>
