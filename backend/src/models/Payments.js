const { default: mongoose } = require("mongoose");

const paymentSchema = mongoose.Schema(
  {
    user: {
      type: Object,
    },
    data: {
      type: Array,
      default: [],
    },
    product: {
      type: Array,
      default: [],
    },
  },
  // 스키마를 정의할 때 createdAt과 updatedAt 필드를 추가하여 데이터의 생성 및 마지막 수정시간을 자동으로 추적함
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
