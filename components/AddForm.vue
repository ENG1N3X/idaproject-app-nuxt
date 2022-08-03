<template>
  <form
    class="form-add"
    autocomplete="off"
    @submit="onSubmit"
    @change="onChangeValidation"
  >
    <div class="input-field">
      <label for="name"
        >Наименование товара <i class="icon-required"></i
      ></label>
      <input
        v-model="form.name"
        class="required"
        type="text"
        name="name"
        placeholder="Введите наименование товара"
      />
      <span class="error" style="display: none"
        >Поле является обязательным</span
      >
    </div>

    <div class="input-field">
      <label for="desc"
        >Описание товара <i style="display: none" class="icon-required"></i
      ></label>
      <textarea
        v-model="form.desc"
        type="text"
        name="desc"
        placeholder="Введите описание товара"
        rows="6"
      >
      </textarea>
      <span class="error" style="display: none"
        >Поле является обязательным</span
      >
    </div>

    <div class="input-field">
      <label for="image"
        >Ссылка на изображение товара <i class="icon-required"></i
      ></label>
      <input
        v-model="form.image"
        class="required"
        type="text"
        name="image"
        placeholder="Введите ссылку"
      />
      <span class="error" style="display: none"
        >Поле является обязательным</span
      >
    </div>

    <div class="input-field">
      <label for="price">Цена товара <i class="icon-required"></i></label>
      <input
        v-model="form.price"
        class="required"
        type="number"
        name="price"
        placeholder="Введите цену"
      />
      <span class="error" style="display: none"
        >Поле является обязательным</span
      >
    </div>

    <button type="submit" class="form-add__button" :disabled="!isFormValid">
      Добавить товар
    </button>
  </form>
</template>

<script>
import { useProductsStore } from '@/store/products'

export default {
  name: 'AddForm',
  data() {
    return {
      // form: {
      //   name: 'Наименование товара',
      //   desc: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
      //   image: 'https://gcdnb.pbrd.co/images/UwPcpl12SYDE.jpg',
      //   price: '17987',
      // },
      form: {
        name: '',
        desc: '',
        image: 'https://gcdnb.pbrd.co/images/UwPcpl12SYDE.jpg',
        price: '',
      },
      isFormValid: false,
      formErrors: [],
    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()

      const isValid = this.isFormValid
      // console.log('Form valid?', isValid)

      if (isValid) {
        const store = useProductsStore()

        store.$patch((state) => {
          state.products.push({
            ...this.form,
            price: String(this.form.price).replace(
              /(\d)(?=(\d{3})+([^\d]|$))/g,
              '$1 '
            ),
            id: new Date().getSeconds(),
          })
        })

        localStorage.setItem('products', JSON.stringify(store.products))
      }
    },

    onChangeValidation(e) {
      const form = e.currentTarget
      const inputs = form.querySelectorAll('input.required')
      this.formErrors = []
      inputs.forEach((input) => {
        if (!input.value.length) {
          this.showInputError(input)
          this.formErrors.push(input)
        } else {
          this.hideInputError(input)
        }
      })

      if (!this.formErrors.length) {
        this.isFormValid = true
      } else {
        this.isFormValid = false
      }
    },
    showInputError(input) {
      input.nextElementSibling.style.display = 'block'
    },
    hideInputError(input) {
      input.nextElementSibling.style.display = 'none'
    },
  },
}
</script>

<style lang="scss" scoped>
.form-add {
  background: #fffefb;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.04),
    0px 6px 10px rgba(0, 0, 0, 0.02);
  border-radius: 4px;
  padding: 24px;

  position: sticky;
  top: 24px;
  left: 0;
}
.form-add__button {
  display: block;
  width: 100%;
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  letter-spacing: -0.02em;
  color: #b4b4b4;
  background: #eeeeee;
  border-radius: 10px;
  border: none;
  padding: 10px 0;
  cursor: pointer;
  margin-top: 24px;

  transition: color 0.3s ease-in-out;
  &:not(&[disabled]) {
    &:hover {
      transition: color 0.3s ease-in-out;
      color: #49485e;
    }
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.8;
  }
}
.input-field {
  position: relative;
  margin-bottom: 16px;
  label {
    display: inline-block;
    position: relative;
    font-size: 13px;
    line-height: 13px;
    letter-spacing: -0.02em;
    color: #49485e;
    margin-bottom: 4px;
    .icon-required {
      display: inline-block;
      width: 4px;
      height: 4px;
      background: #ff8484;
      border-radius: 100%;

      position: absolute;
      top: 1px;
      right: -6px;
    }
  }
  input,
  textarea {
    display: block;
    width: 100%;
    // text-indent: 16px;
    font-size: 12px;
    line-height: 15px;
    color: #49485e;
    background: #fffefb;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    border: none;

    padding: 10px 0 10px 16px;
    &::placeholder {
      color: #b4b4b4;
    }
  }
  textarea {
    max-width: 284px;
    min-height: 110px;
  }
  .error {
    font-size: 10px;
    line-height: 10px;
    letter-spacing: -0.02em;
    color: #ff8484;

    position: absolute;
    left: 0;
    bottom: -16px;
  }
}
</style>
