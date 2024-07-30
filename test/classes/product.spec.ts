import { Product } from '../../src/app/classes/product';

describe('Product Class', () => {
  it('should create an instance', () => {
    const product = new Product('abc123','abc123','abc123','','','');
    expect(product).toBeTruthy();
  });
});