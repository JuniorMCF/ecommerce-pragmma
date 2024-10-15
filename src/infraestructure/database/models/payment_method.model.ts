import mongoose, { Schema, Document } from 'mongoose';

interface IPaymentMethod extends Document {
  name: string;
  description?: string;
}

const PaymentMethodSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String }
});

export const PaymentMethodModel = mongoose.model<IPaymentMethod>('PaymentMethod', PaymentMethodSchema);
