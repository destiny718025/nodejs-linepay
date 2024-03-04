const orders = [
    {
        amount: 1000,
        currency: 'TWD',
        packages: [
            {
                id: 'test01',
                amount: 1000,
                products: [
                    {
                        name: '測試',
                        quantity: 1,
                        price: 1000
                    }
                ]
            }
        ]
    },
    {
        amount: 2000,
        currency: 'TWD',
        packages: [
            {
                id: 'test02',
                amount: 2000,
                products: [
                    {
                        name: '測試',
                        quantity: 2,
                        price: 1000
                    }
                ]
            }
        ]
    }
];

module.exports = orders;