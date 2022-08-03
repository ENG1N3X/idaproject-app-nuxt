import { defineStore } from 'pinia'

export const useProductsStore = defineStore('products', {
  state: () => {
    return {
      products: [
        {
          id: 1,
          image: 'https://gcdnb.pbrd.co/images/UwPcpl12SYDE.jpg?o=1',
          name: 'BНаименование товара',
          desc: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
          price: '12 000',
        },
        // {
        //   id: 2,
        //   image: 'https://gcdnb.pbrd.co/images/UwPcpl12SYDE.jpg?o=1',
        //   name: 'DНаименование товара',
        //   desc: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
        //   price: '13 000',
        // },
        // {
        //   id: 3,
        //   image: 'https://gcdnb.pbrd.co/images/UwPcpl12SYDE.jpg?o=1',
        //   name: 'AНаименование товара',
        //   desc: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
        //   price: '11 000',
        // },
        // {
        //   id: 4,
        //   image: 'https://gcdnb.pbrd.co/images/UwPcpl12SYDE.jpg?o=1',
        //   name: 'CНаименование товара',
        //   desc: 'Довольно-таки интересное описание товара в несколько строк. Довольно-таки интересное описание товара в несколько строк',
        //   price: '10 000',
        // },
      ],
    }
  },
})
