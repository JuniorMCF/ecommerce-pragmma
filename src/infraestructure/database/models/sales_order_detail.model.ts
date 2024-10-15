import mongoose, { Schema, Document } from 'mongoose';

interface ISalesOrderDetail extends Document {
  order: string; // Relación con la colección 'sales_orders'
  product: string; // Relación con la colección 'products'
  quantity: number;
  price: number; // Precio del producto en el momento de la compra
}

const SalesOrderDetailSchema: Schema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: 'SalesOrder', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

export const SalesOrderDetailModel = mongoose.model<ISalesOrderDetail>('SalesOrderDetail', SalesOrderDetailSchema);
