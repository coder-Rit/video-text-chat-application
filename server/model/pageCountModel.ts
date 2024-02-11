
import mongoose, { Document, Schema } from 'mongoose';
 
interface countObject {
    count:number
}
interface CounterDoc extends countObject, Document { }

const counterSchema = new Schema<CounterDoc>({
  count: {
    type: "number",
  },
});


const counterModel = mongoose.model<CounterDoc>('count', counterSchema);

export { countObject, counterModel, CounterDoc };

