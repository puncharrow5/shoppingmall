const producttypes = [
  {
    _id: 1,
    name: "Effect Pedals",
  },
  {
    _id: 2,
    name: "Plugins",
  },
  {
    _id: 3,
    name: "Eurorack Modules",
  },
  {
    _id: 4,
    name: "Cables",
  },
  {
    _id: 5,
    name: "Power Supplies",
  },
  {
    _id: 6,
    name: "Apparel & Merch",
  },
];

const price = [
  {
    _id: 0,
    name: "",
    array: [],
  },
  {
    _id: 1,
    name: "0 ~ 20만원",
    array: [0, 200000],
  },
  {
    _id: 2,
    name: "20만원 ~ 40만원",
    array: [200000, 400000],
  },
  {
    _id: 3,
    name: "40만원 ~ 60만원",
    array: [400000, 600000],
  },
  {
    _id: 4,
    name: "60 ~ 80만원",
    array: [600000, 800000],
  },
  {
    _id: 5,
    name: "80 ~ 100만원",
    array: [800000, 1000000],
  },
];

export { producttypes, price };
