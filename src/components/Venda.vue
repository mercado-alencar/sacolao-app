<template>
  <div class="container">
    <form action @submit.prevent="submit">
      <article>
        <h4>Nova Venda</h4>
        <div class="row">
          <div class="column column-50">
            <label for="fieldSacolao">Sacolao</label>
            <ol class="input-sacolao">
              <li>
                <input type="radio" id="sacolao60" value="60" v-model="venda.sacolao" />
                <label for="sacolao60">60</label>
              </li>

              <li>
                <input type="radio" id="sacolao100" value="100" v-model="venda.sacolao" />
                <label for="sacolao100">100</label>
              </li>

              <li>
                <input type="radio" id="sacolao150" value="150" v-model="venda.sacolao" />
                <label for="sacolao150">150</label>
              </li>

              <li>
                <input type="radio" id="sacolao200" value="200" v-model="venda.sacolao" />
                <label for="sacolao200">200</label>
              </li>

              <li>
                <input type="radio" id="sacolao300" value="300" v-model="venda.sacolao" />
                <label for="sacolao300">300</label>
              </li>
              <input type="hidden" name="sacolao" required :value="venda.sacolao" />
            </ol>
          </div>

          <div class="column column-50">
            <label for="fieldCompras">Compras</label>
            <input v-model.lazy="venda.compras" v-money="money" id="fieldCompras" focusable />
          </div>
        </div>
        <div class="row">
          <div class="column column-50">
            <label for="fieldNome">Nome</label>
            <input
              type="text"
              v-model="venda.nome"
              placeholder="Nome"
              id="fieldNome"
              required
              focusable
            />
          </div>
          <div class="column column-50">
            <label for="fieldTelefone">Telefone</label>
            <input
              type="number"
              v-model="venda.telefone"
              placeholder="Telefone"
              id="fieldTelefone"
              focusable
            />
          </div>
        </div>

        <div class="row">
          <div class="column">
            <label for="fieldEndereco">Endereço</label>
            <input
              type="text"
              v-model="venda.endereco"
              placeholder="Endereço"
              id="fieldEndereco"
              focusable
              required
            />
          </div>
        </div>
        <div class="row">
          <div class="column column-50">
            <label for="fieldNumero">Número</label>
            <input
              type="text"
              v-model="venda.numero"
              placeholder="Número"
              id="fieldNumero"
              focusable
            />
          </div>
          <div class="column column-50">
            <label for="fieldBairro">Bairro</label>
            <input
              type="text"
              v-model="venda.bairro"
              placeholder="Bairro"
              id="fieldBairro"
              required
              focusable
            />
          </div>
        </div>
        <div class="row">
          <div class="column">
            <label for="fieldReferencia">Referência</label>
            <input
              type="text"
              v-model="venda.referencia"
              placeholder="Referência"
              id="fieldReferencia"
              focusable
            />
          </div>
        </div>
        <!-- <div class="row">
          <div class="column">
            <input type="checkbox" id="fieldAReceber" v-model="venda.receber" />
            <label for="fieldAReceber">A Receber</label>
          </div>
          <div class="column">
            <input
              type="checkbox"
              id="fieldLevarTroco"
              v-model="venda.levarTroco"
              :disabled="!venda.receber || venda.cartao"
            />
            <label for="fieldLevarTroco">Levar Troco</label>
          </div>
          <div class="column" v-if="!venda.levarTroco">
            <input
              type="checkbox"
              id="fieldPagamentoCartao"
              v-model="venda.cartao"
              :disabled="!venda.receber || venda.levarTroco"
            />
            <label for="fieldPagamentoCartao">Cartão</label>
          </div>
          <div class="column" v-if="venda.levarTroco">
            <input
              v-money="money"
              v-model.lazy="venda.trocoPara"
              placeholder="Troco Para"
              id="fieldTroco"
              required
            />
          </div>
        </div>-->

        <div class="row">
          <div class="column">
            <input
              type="radio"
              id="fieldReceber"
              name="pagamento"
              v-model.lazy="venda.pagamento"
              value="receber"
            />
            <label for="fieldReceber">Dinheiro</label>
            <div v-if="venda.receber">
              <label for="fieldTroco">Troco Para</label>
              <input
                v-money="money"
                v-model.lazy="venda.trocoPara"
                placeholder="Troco Para"
                id="fieldTroco"
                required
                v-on:change="setTroco"
              />
            </div>
          </div>

          <div class="column">
            <input
              type="radio"
              id="fieldPagamentoCartao"
              name="pagamento"
              v-model.lazy="venda.pagamento"
              value="cartao"
            />
            <label for="fieldPagamentoCartao">Cartão</label>
          </div>

          <div class="column">
            <input
              type="radio"
              id="fieldPago"
              name="pagamento"
              v-model.lazy="venda.pagamento"
              value="pago"
            />
            <label for="fieldPago">Pago</label>
          </div>
        </div>

        <div class="row">
          <div class="column">
            <label for="fieldObs">OBS</label>
            <textarea v-model="venda.obs" placeholder="OBS" id="fieldObs" focusable />
          </div>
        </div>

        <div class="row">
          <div class="column column-50">
            <label for="fieldData">Data</label>
            <input type="date" v-model="venda.data" placeholder="Data" id="fieldData" focusable />
          </div>
          <div class="column column-50">
            <label for="fieldHora">Hora</label>
            <input type="time" v-model="venda.hora" placeholder="Hora" id="fieldHora" focusable />
          </div>
        </div>
      </article>

      <div class="column form-footer">
        <button class="button button-lg">Imprimir</button>
        <button class="button" type="button" v-on:click="salvar()">Salvar Somente</button>
        <button type="button" class="button" v-on:click="novo()">Novo</button>
      </div>
    </form>
  </div>
</template>

<script>
import { $venda } from "@/services/Resources";
import { VMoney } from "v-money";
import { defined, isUndefined , clearMoney} from "@/utils/Util";
import print from "@/utils/Printer";

export default {
  name: "Venda",
  directives: { money: VMoney },
  data() {
    return {
      venda: {},
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false,
      },
    };
  },
  mounted() {
    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });
    const focusable = Array.from(document.querySelectorAll("[focusable]"));
    focusable.forEach((item, index) => {
      item.addEventListener("keypress", (e) => {
        if (e.which == 13) {
          e.preventDefault();
          if (focusable.length > index + 1) {
            focusable[index + 1].focus();
          }
        }
      });
    });
  },
  methods: {
    submit: function () {
      if (
        isUndefined(this.venda.sacolao) ||
        isUndefined(this.venda.pagamento)
      ) {
        return;
      }
      $venda
        .save(this.venda)
        .then((res) => {
           print(this.venda);
        })
        .catch((err) => console.error(err));
    },
    imprimir: function () {
      print(this.venda);
    },
    novo: function () {
      this.venda = {};
    },
    updatePagamento(selected) {
      this.venda.pago = false;
      this.venda.receber = false;
      this.venda.cartao = false;
      this.venda[selected] = true;
      console.log(selected, JSON.stringify(this.venda));
    },
    setTroco() {
      console.log(clearMoney(this.venda.trocoPara));
    },
  },
  computed: {
    pagamento() {
      return this.venda.pagamento;
    },
  },
  watch: {
    pagamento() {
      this.updatePagamento(this.venda.pagamento);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
  text-align: left;
}
tfoot td {
  text-align: right;
}

td:first-child,
th:first-child {
  max-width: 50px !important;
}

td button {
  padding: 0px 5px !important;
  margin: 0;
}
.restart-button {
  float: left;
}

.winner {
  display: inline-block;
}
input[type="date"] {
  webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: 0.1rem solid #d1d1d1;
  border-radius: 0.4rem;
  box-shadow: none;
  box-sizing: inherit;
  height: 3.8rem;
  padding: 0.6rem 1rem;
  width: 100%;
}

.full-width {
  clear: both;
}

.quarter-width,
.three-quarter-width,
.half-width,
.three-quarter-width {
  padding: 0px 5px;
  float: left;
}

.three-quarter-width {
  width: 75%;
}
.quarter-width {
  width: 25%;
}
.half-width {
  width: 50%;
}
ol.input-sacolao {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  align-content: center;
  justify-content: space-around;
}

ol.input-sacolao li input,
input[type="radio"] {
  position: absolute;
  opacity: 0;
}
ol.input-sacolao li label,
input[type="radio"] + label {
  border-radius: 4px;
  border: 2px solid #1834c8;
  padding: 15px;
  cursor: pointer;
}

input[type="radio"]:disabled + label {
  border: 2px solid #606c76;
  cursor: not-allowed;
  opacity: 0.7;
}

ol.input-sacolao li input:checked + label,
input[type="radio"]:checked + label {
  background: #1834c8;
  color: white;
}
/* .form-footer {
  position: fixed;
  width: 200px;
  height: 100vh;
  display: block;
  right: 10px;
  top: 50px;
}
.form-footer button {
  font-size: 20px;
  text-align: right;
  padding: 30px ;
  height: auto;
} */
.form-footer button {
  margin: 5px;
  font-size: 16px;
}
</style>
