const products = [
    {
        id: '1',
        title: 'Phone',
        description: 'Fancy phone',
        count: 13,
        price: 100
    },
    {
        id: '2',
        title: 'Car',
        description: 'Very fast car',
        count: 2,
        price: 200
    },
    {
        id: '3',
        title: 'Book',
        description: 'Interesting book',
        count: 50,
        price: 300
    }
];

const responseHeader = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Content-Type": "application/json"
}

exports.handler = async () => {
    return {
        statusCode: 200,
        headers: responseHeader,
        body: JSON.stringify({ products }),
    };
};