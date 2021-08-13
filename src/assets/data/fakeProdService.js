const products = [
  {
    id: "1",
    title:
      "Organic Red Kidney Beans, 10 Pounds - Non-GMO, Dry, Raw, Sproutable, Vegan, Kosher, Bulk. 10 Pound",
    image:
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/beans1.jpg?alt=media&token=d25ef6c0-2430-4ffe-960f-f6e911a1190e",
    quantity: 100,
    unit: "kg",
    price: 2.98,
    oldPrice: 3.06,
    discount: 0.15,
    avgRating: 4.2,
    ratings: 1325,
  },
  {
    id: "2",
    title:
      "Organic Onion. ... Onion Yellow Bag Organic, 48 Ounce ... Simply Organic Minced White Onion, Certified Organic ",
    image:
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/onion1.jpg?alt=media&token=80b20a6c-b54d-4d7b-9868-6e5c27e89bb8",
    quantity: 20,
    unit: "pound",
    price: 2.98,
    oldPrice: 3.06,
    discount: 0.15,
    orders: 234,
    avgRating: 4.8,
    ratings: 2989,
  },
  {
    id: "3",
    title: "Apples",
    image:
      "https://karimlandassets183905-dev.s3.us-east-1.amazonaws.com/images/fruits/apple.jpg?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCWV1LXdlc3QtMyJIMEYCIQD016jrL%2FE%2BEhsRDPFl4Vu1Jk5D12mvuLoRhTQPIbY9QgIhAJtHsNxgVoqwYaHtvFl6dQaWMoGDGC8fYZ52rMNQGj2tKv8CCN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMODUwODYzNjA3MDgwIgyKAFpIyhiW0bWz8wkq0wIa7oz65o1aleA7KqLBUQoRuQAosiXVMnAuoqqkYWnrlCxWMuaQ1Ul1iz5CZHmNHjt0wdUxV2ApF%2FnTKCYZmBGnEkhaj59F7YHmm2r5GBtvGMzv2KJEs9rZvvrVvTAAWvNMKg6SN1kZwsKE9g5XThvWwxXgTG4vZorz%2F7LlEeF2IkHVSO%2BkR2%2B71mqP4CZhqqOBACUBXilY4pf9t6qCAZZzRYeMs%2FiYf0%2FznBO3A8ebbshPW2WXDkiFELRJMPE89otiboIinPa1Lce%2BjTAi0FHVwk2h7pT6oAwuScRan74Wae1xabGXLq%2BUXZ8dGfnBa5yBFtQDIsTYbr5It%2Fdi8%2FZAm3f77luXx6YwxoVrDwbqhoy1HCCIhyLUWCXhycVeBPid7zrHlKGb0tZ7X0sB2jC4OTsXV9EyD0dsVdgRGo2dIjGIfUwpN4%2Fm9WWQVbCMjv27RCAwrNHPiAY6sgIsC4Q%2F78rbBjj4fWMSOkssiZjJRkCcJKKLr1TGU5KT5SII3lzcks%2FS6mms6pC17S1V277ydEUOwTiYIP2b5njVH%2BuACZU3vwYFPo0EhRSRYy%2BtQHT67oDcfUrCfqfuI5rQ58Ix9nl8X791ji6cMzRO4B4a6qS3%2BPNAHsGrq8wtiQ1lPJ2N7awJrSEj0ksMoSzioAGFitZbvqMN1BURJCnAT4V3hMtjZ7eoma2noil%2FrpmM7OrbGvBN53Y3pI1KXhvBvIilb9%2B4avLrqOtgD%2BZuozgtGXbEePQ%2FpAk4SU5BuN6G%2Be9QoHgEW7DklDps2s31nma2KoIfb1Xtn5%2FLGmeIUGOna7BDhS%2FOjaHuHPihrCckOyfQKzJQ01qFuQsrlj6ZmXpbE1yGyorkCPmQVFyuVsw%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20210811T214657Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIA4MG3MJUUL3GWPBFG%2F20210811%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=176ff716148441245ac2ca8175cc691fdc84a15efd37fb03b53b6b38d5ae0cb5",
    quantity: 3,
    prices: [
      { wgt: "500g", price: 1.2 },
      { wgt: "1kg", price: 2.4 },
      { wgt: "5kg", price: 5.8 },
    ],
    oldPrice: 2.6,
    orders: 234,
    avgRating: 4.8,
    ratings: 2989,
    featured: true
  },
  {
    id: "4",
    title: "Organic Carrots",
    image:
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/carrot1.jpg?alt=media&token=08f13a10-b46d-4759-9fb4-282f2f1fc518",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/carrot2.jpg?alt=media&token=c0e0cbaa-61a1-4f42-9ffc-b263404df3b7",
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/carrot3.jpg?alt=media&token=d13c33c2-ae5a-4c2d-ac91-4390abfa767a",
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/carrot4.jpg?alt=media&token=7c54220a-07eb-4deb-bfa4-e0a20eb4603a",
    ],
    quantity: 10,
    prices: [
      { wgt: "500g", price: 1.2 },
      { wgt: "1kg", price: 2.4 },
      { wgt: "1 piece (150-200gms)", price: 0.5 },
    ],
    oldPrice: 2.6,
    orders: 1050,
    avgRating: 3.8,
    ratings: 2989,
  },
  {
    id: "5",
    title: "Cherry Tomatos",
    image:
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/zucchini1.jpg?alt=media&token=29f6e495-0b8b-4fb8-9d25-e0b4541e0037",
    quantity: 10,
    prices: [{ wgt: "1kg", price: 0.98 }],
    oldPrice: 1.06,
    discount: 0.15,
    orders: 5000,
    avgRating: 4.8,
    ratings: 2989,
  },
  {
    id: "6",
    title:
      "Cherry Tomato Seeds · Logo. Organic Cherry Tomato, Rainbow Mix · Logo. Organic Cherry Tomato, Chadwick · Logo. Organic Tomato, Sweetie-pack",
    image:
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/cherrytomatos1.jpg?alt=media&token=48b55809-511c-4797-b304-dfc327bc518a",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/cherrytomatos1.jpg?alt=media&token=48b55809-511c-4797-b304-dfc327bc518a",
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/cherrytomatos2.jpg?alt=media&token=358f8448-765f-45d5-920d-b6c3c14ef555",
    ],
    quantity: 0,
    unit: "kg",
    price: 1.98,
    oldPrice: 2.06,
    discount: 0.15,
    orders: 120,
    avgRating: 4.8,
    ratings: 2989,
  },
  {
    id: "7",
    title:
      "Certified organic tomatoes are synthetic pesticide and fertilizer free. While non-organic tomato growers can use synthetic pesticides for pests, organic growers cannot. Eisen, who's inspected organic farms and businesses, said organic growers will use spraying alternatives to control pests and ensure healthy soils.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/tomatos3.jpg?alt=media&token=b71c184c-4901-472a-b8b4-ac57aed43a84",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/tomatos3.jpg?alt=media&token=b71c184c-4901-472a-b8b4-ac57aed43a84",
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/tomatos1.jpg?alt=media&token=fde5f7fd-9722-46cd-a3fa-e5ec75eb8aac",
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/tomatos2.jpg?alt=media&token=8144f23f-2d8d-4403-af09-124f353a3033",
    ],
    quantity: 3,
    unit: "libra",
    price: 1.98,
    oldPrice: 2.0,
    discount: 0.15,
    orders: 200,
    avgRating: 3.8,
    ratings: 2989,
  },
  {
    id: "8",
    title:
      "Homegrown organic lettuce is a delight. You can harvest it whenever you have a craving for a cool, crisp salad, and the combinations of colors .",
    image:
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/lettuce1.jpg?alt=media&token=80334f52-bc50-4d93-95d8-590201697003",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/lettuce1.jpg?alt=media&token=80334f52-bc50-4d93-95d8-590201697003",
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/lettuce2.jpg?alt=media&token=9f6732be-e6e8-46ed-b6a7-dacb6a3020bf",
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/lettuce3.jpg?alt=media&token=b57316f8-a011-400a-a2d9-6132f4ab56ba",
    ],
    quantity: 5,
    unit: "piece",
    price: 2.98,
    oldPrice: 3.0,
    discount: 0.15,
    orders: 1200,
    avgRating: 4.8,
    ratings: 2989,
  },
  {
    id: "9",
    title:
      "Organic potatoes are grown without synthetic fertilizers or pesticides. Organic seed potatoes – mature potato tubers - are planted in well-drained, moist soil where they will get at least six or eight hours of sunshine.",
    image:
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/potatos1.jpg?alt=media&token=e19dc7ec-8afc-4045-b65f-1d3e239736ff",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/potatos1.jpg?alt=media&token=e19dc7ec-8afc-4045-b65f-1d3e239736ff",
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/potatos2.jpg?alt=media&token=b2f15f0f-f668-4c3b-9915-6a02e1661c18",
    ],
    quantity: 0,
    unit: "kg",
    price: 2.98,
    oldPrice: 3.0,
    discount: 0.15,
    orders: 1200,
    avgRating: 4.8,
    ratings: 2989,
  },
  {
    id: "10",
    title:
      "Organic Broccoli. LBP12,000. Organic produce from Ehden. Out of stock. Category: Fruits & Vegetables Tag: Organic. Description; Additional information",
    image:
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/broccoli1.jpg?alt=media&token=be182316-0d5f-4903-99e1-897372fa292e",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/broccoli1.jpg?alt=media&token=be182316-0d5f-4903-99e1-897372fa292e",
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/broccoli2.jpg?alt=media&token=7cbceba8-d18b-4eb8-9a54-b00fb364f51b",
    ],
    quantity: 9,
    unit: "piece",
    price: 2.98,
    oldPrice: 3.0,
    discount: 0.15,
    orders: 1200,
    avgRating: 4.8,
    ratings: 2989,
  },
  {
    id: "11",
    title:
      "Homegrown organic lettuce is a delight. You can harvest it whenever you have a craving for a cool, crisp salad, and the combinations of colors .",
    image:
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/garlic1.jpg?alt=media&token=a07007e4-557e-4e91-9289-24cda1ab39a2",
    images: [
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/garlic1.jpg?alt=media&token=a07007e4-557e-4e91-9289-24cda1ab39a2",
      "https://firebasestorage.googleapis.com/v0/b/karimfarm-53a6c.appspot.com/o/garlic2.jpg?alt=media&token=753f0426-9baa-4577-83b4-c4105bd82264",
    ],
    quantity: 10,
    unit: "piece",
    price: 2.98,
    oldPrice: 3.0,
    discount: 0.15,
    orders: 1200,
    avgRating: 4.8,
    ratings: 2989,
  },
]

export function getProds() {
  return products
}

export function getProd(id) {
  return products.find(p => p.id === id)
}
