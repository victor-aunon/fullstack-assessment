import { model, Schema } from "mongoose";

const CurrencySchema = new Schema(
  {
    code: {
      type: String,
      required: true
    },
    toCurrencyCode: {
      type: String,
      required: true,
      default: "EUR"
    },
    hasSubscription: {
      type: Boolean,
      required: true
    },
    ask: {
      type: Number,
      default: 0.0
    },
    bid: {
      type: Number,
      default: 0.0
    },
    spread: {
      type: Number,
      default: 0.0
    },
    spreadPipes: {
      type: Number,
      default: 0.0
    },
    exchangeRate: {
      type: Number,
      required: true,
      default: 0.0
    },
    dailyHistory: [
      {
        date: {
          type: String,
          required: true,
          default: new Date().toISOString().slice(0, 10)
        },
        open: {
          type: Number,
          required: true,
          default: 0.0
        },
        close: {
          type: Number,
          required: true,
          default: 0.0
        },
        high: {
          type: Number,
          required: true,
          default: 0.0
        },
        low: {
          type: Number,
          required: true,
          default: 0.0
        }
      }
    ]
  },
  {
    timestamps: true,
  }
);

export default model("Currency", CurrencySchema);
