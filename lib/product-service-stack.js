const { Stack, Duration } = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const apigateway = require('aws-cdk-lib/aws-apigateway');
// const sqs = require('aws-cdk-lib/aws-sqs');

class ProductServiceStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const getProductsList = new lambda.Function(this, 'GetProductsListFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'getProductsList.handler',
    });

    const getProductById = new lambda.Function(this, 'GetProductByIdFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'getProductById.handler',
    });

    const productsApi = new apigateway.LambdaRestApi(this, 'ProductsApi', {
      handler: getProductsList,
      proxy: false,
    });

    const getProductsListResource = productsApi.root.addResource('products');
    getProductsListResource.addMethod('GET');

    const getProductByIdResource = getProductsListResource.addResource('{id}');
    getProductByIdResource.addMethod('GET', new apigateway.LambdaIntegration(getProductById))
  }
}

module.exports = { ProductServiceStack }
