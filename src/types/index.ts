export type ProductType = {
  name: string;
  price: string;
  url: string;
};

export type ProductDetailsType = {
  title: string;
  price: string;
  description: string;
  variations: ProductDetailsVariation[];
  imageURL: string;
};

export type ProductDetailsVariation = {
  labelName: string;
  selectOptions: {
    optionName: string;
    optionValue: string;
  }[];
};
