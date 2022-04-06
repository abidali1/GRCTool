const Control = require('../models/control');
const taxConfig = require('../config/tax');

exports.disableControls = controls => {
  let bulkOptions = controls.map(item => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { isActive: false }
      }
    };
  });

  Control.bulkWrite(bulkOptions);
};

// calculate order tax amount
exports.caculateTaxAmount = order => {
  const taxRate = taxConfig.stateTaxRate;

  order.totalTax = 0;
  if (order.controls && order.controls.length > 0) {
    order.controls.map(item => {
      const price = item.purchasePrice || item.control.price;
      const quantity = item.quantity;
      item.totalPrice = price * quantity;
      item.purchasePrice = price;

      if (item.status !== 'Cancelled') {
        if (item.control?.taxable && item.priceWithTax === 0) {
          const taxAmount = price * (taxRate / 100) * 100;
          item.totalTax = parseFloat(Number((taxAmount * quantity).toFixed(2)));

          order.totalTax += item.totalTax;
        } else {
          order.totalTax += item.totalTax;
        }
      }

      item.priceWithTax = parseFloat(
        Number((item.totalPrice + item.totalTax).toFixed(2))
      );
    });
  }

  const hasCancelledItems = order.controls.filter(
    item => item.status === 'Cancelled'
  );

  if (hasCancelledItems.length > 0) {
    order.total = this.caculateOrderTotal(order);
  }

  const currentTotal = this.caculateOrderTotal(order);

  if (currentTotal !== order.total) {
    order.total = this.caculateOrderTotal(order);
  }

  order.totalWithTax = order.total + order.totalTax;
  order.total = parseFloat(Number(order.total.toFixed(2)));
  order.totalTax = parseFloat(
    Number(order.totalTax && order.totalTax.toFixed(2))
  );
  order.totalWithTax = parseFloat(Number(order.totalWithTax.toFixed(2)));
  return order;
};

exports.caculateOrderTotal = order => {
  const total = order.controls
    .filter(item => item.status !== 'Cancelled')
    .reduce((sum, current) => sum + current.totalPrice, 0);

  return total;
};

// calculate order tax amount
exports.caculateItemsSalesTax = items => {
  const taxRate = taxConfig.stateTaxRate;

  const controls = items.map(item => {
    item.priceWithTax = 0;
    item.totalPrice = 0;
    item.totalTax = 0;
    item.purchasePrice = item.price;

    const price = item.purchasePrice;
    const quantity = item.quantity;
    item.totalPrice = parseFloat(Number((price * quantity).toFixed(2)));

    if (item.taxable) {
      const taxAmount = price * (taxRate / 100) * 100;

      item.totalTax = parseFloat(Number((taxAmount * quantity).toFixed(2)));
      item.priceWithTax = parseFloat(
        Number((item.totalPrice + item.totalTax).toFixed(2))
      );
    }

    return item;
  });

  return controls;
};
