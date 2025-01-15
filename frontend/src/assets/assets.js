// Import images (adjust the paths as necessary)
import BlueSurfBoard from "./BlueSurfBoard.png";
import BucketHat from "./BucketHat.png";
import LyocellShirt from "./LyocellShirt.png";
import PurpleSurfBoard from "./PurpleSurfBoard.png";
import RedSurfBoard from "./RedSurfBoard.png";
import ResortShirt from "./ResortShirt.png";
import Sandles from "./Sandles.png";
import StrawHat from "./StrawHat.png";
import SunGlasses from "./SunGlasses.png";
import SwimTrunks from "./SwimTrunks.png";
import Logo from "./SunnyShoresLogo.png";

export const assets = {
  BlueSurfBoard,
  BucketHat,
  LyocellShirt,
  PurpleSurfBoard,
  RedSurfBoard,
  ResortShirt,
  Sandles,
  StrawHat,
  SwimTrunks,
  SunGlasses,
  Logo,
};

export const products = [
  {
    _id: "1",
    name: "Blue Surf Board",
    description:
      "A lightweight, durable surfboard perfect for beginners and pros alike.",
    price: 249.99,
    image: [BlueSurfBoard],
    category: "Surf",
    subCategory: "BRD",
    reviews: [
      {
        reviewer: "John Doe",
        comment: "Amazing board for beginners!",
        rating: 5,
      },
      {
        reviewer: "Alice Smith",
        comment: "Very sturdy and reliable.",
        rating: 4,
      },
    ],
  },
  {
    _id: "2",
    name: "Bucket Hat",
    description:
      "A classic bucket hat to protect you from the sun on all your adventures.",
    price: 19.99,
    image: [BucketHat],
    category: "Accessories",
    subCategory: "ACS",
    reviews: [
      { reviewer: "Jane Doe", comment: "Stylish and practical!", rating: 5 },
    ],
  },
  {
    _id: "3",
    name: "Lyocell Shirt",
    description:
      "A breathable, eco-friendly shirt made from natural lyocell fibers.",
    price: 39.99,
    image: [LyocellShirt],
    category: "Shirts",
    subCategory: "SHR",
    reviews: [
      {
        reviewer: "Mike Johnson",
        comment: "Feels great and fits well.",
        rating: 5,
      },
      { reviewer: "Sarah Lee", comment: "Perfect for hot weather.", rating: 4 },
    ],
  },
  {
    _id: "4",
    name: "Purple Surf Board",
    description:
      "An eye-catching purple surfboard built to handle bigger waves.",
    price: 259.99,
    image: [PurpleSurfBoard],
    category: "Surf",
    subCategory: "BRD",
    reviews: [
      {
        reviewer: "Eve Adams",
        comment: "Handles waves like a dream.",
        rating: 5,
      },
    ],
  },
  {
    _id: "5",
    name: "Red Surf Board",
    description: "A sleek red board designed for speed and maneuverability.",
    price: 269.99,
    image: [RedSurfBoard],
    category: "Surf",
    subCategory: "BRD",
    reviews: [
      { reviewer: "Tom Clark", comment: "Fast and responsive!", rating: 5 },
      {
        reviewer: "Lucy Brown",
        comment: "Great for experienced surfers.",
        rating: 4,
      },
    ],
  },
  {
    _id: "6",
    name: "Resort Shirt",
    description:
      "A vibrant button-down shirt for those laid-back vacation vibes.",
    price: 44.99,
    image: [ResortShirt],
    category: "Shirts",
    subCategory: "SHR",
    reviews: [
      {
        reviewer: "Emily Taylor",
        comment: "Comfortable and stylish.",
        rating: 5,
      },
      { reviewer: "Nick White", comment: "Perfect for vacations!", rating: 5 },
    ],
  },
  {
    _id: "7",
    name: "Sandals",
    description:
      "Comfortable sandals that are perfect for the beach or poolside.",
    price: 29.99,
    image: [Sandles],
    category: "Footwear",
    subCategory: "FET",
    reviews: [
      { reviewer: "Sam Green", comment: "Super comfy and durable.", rating: 5 },
      { reviewer: "Anna Black", comment: "Great for long walks.", rating: 4 },
    ],
  },
  {
    _id: "8",
    name: "Straw Hat",
    description: "A trendy straw hat to shield your face from the sun.",
    price: 24.99,
    image: [StrawHat],
    category: "Accessories",
    subCategory: "ACS",
    reviews: [{ reviewer: "Grace Hall", comment: "Looks amazing!", rating: 5 }],
  },
  {
    _id: "9",
    name: "Sunglasses",
    description:
      "Polarized sunglasses for a clearer view and added eye protection.",
    price: 34.99,
    image: [SunGlasses],
    category: "Accessories",
    subCategory: "ACS",
    reviews: [
      {
        reviewer: "Chris Parker",
        comment: "Clear vision and stylish design.",
        rating: 5,
      },
      {
        reviewer: "Dana White",
        comment: "Very comfortable to wear.",
        rating: 4,
      },
    ],
  },
  {
    _id: "10",
    name: "Swim Trunks",
    description:
      "Quick-drying swim trunks with a comfortable elastic waistband.",
    price: 49.99,
    image: [SwimTrunks],
    category: "Swimwear",
    subCategory: "SWM",
    reviews: [
      {
        reviewer: "Alex Rivers",
        comment: "Fits perfectly and dries fast.",
        rating: 5,
      },
      {
        reviewer: "Sophie Carter",
        comment: "Great for swimming and lounging.",
        rating: 4,
      },
      {
        reviewer: "Ryan Scott",
        comment: "Amazing quality for the price.",
        rating: 5,
      },
    ],
  },
];
