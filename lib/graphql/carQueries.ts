import { gql } from "@apollo/client";

export const GET_CARS = gql`
  query GetCars {
    cars {
      id
      make
      model
      year
      color
      pricePerDay
      available
      imageUrl
      fuelType
      transmission
      seats
      engine
      mileage
      description
      images {
        id
        carId
        imageUrl
        isPrimary
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_AVAILABLE_CARS = gql`
  query GetAvailableCars($startDate: String!, $endDate: String!) {
    availableCars(startDate: $startDate, endDate: $endDate) {
      id
      make
      model
      year
      color
      pricePerDay
      available
      imageUrl
      fuelType
      transmission
      seats
      engine
      mileage
      description
      images {
        id
        carId
        imageUrl
        isPrimary
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_CAR = gql`
  query GetCar($id: Int!) {
    car(id: $id) {
      id
      make
      model
      year
      color
      pricePerDay
      available
      imageUrl
      fuelType
      transmission
      seats
      engine
      mileage
      description
      images {
        id
        carId
        imageUrl
        isPrimary
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

export const CREATE_CAR = gql`
  mutation CreateCar($input: CreateCarInput!) {
    createCar(input: $input) {
      id
      make
      model
      year
      color
      pricePerDay
      available
      imageUrl
      fuelType
      transmission
      seats
      engine
      mileage
      description
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_CAR = gql`
  mutation UpdateCar($id: Int!, $input: UpdateCarInput!) {
    updateCar(id: $id, input: $input) {
      id
      make
      model
      year
      color
      pricePerDay
      available
      imageUrl
      fuelType
      transmission
      seats
      engine
      mileage
      description
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_CAR = gql`
  mutation DeleteCar($id: Int!) {
    deleteCar(id: $id)
  }
`;

export const CREATE_RENTAL = gql`
  mutation CreateRental($input: CreateRentalInput!) {
    createRental(input: $input) {
      id
      startDate
      endDate
      totalPrice
      status
      user {
        id
        name
        email
      }
      car {
        id
        make
        model
        year
        pricePerDay
        imageUrl
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_RENTALS = gql`
  query GetUserRentals {
    rentals {
      id
      startDate
      endDate
      totalPrice
      status
      car {
        id
        make
        model
        year
        pricePerDay
        imageUrl
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER_ACTIVE_RENTALS = gql`
  query GetUserActiveRentals {
    userActiveRentals {
      id
      startDate
      endDate
      totalPrice
      status
      car {
        id
        make
        model
        year
        pricePerDay
        imageUrl
      }
      createdAt
      updatedAt
    }
  }
`;

export const CANCEL_RENTAL = gql`
  mutation CancelRental($id: Int!) {
    cancelRental(id: $id) {
      id
      status
    }
  }
`;

export const ADD_CAR_IMAGE = gql`
  mutation AddCarImage($carId: Int!, $imageUrl: String!, $isPrimary: Boolean) {
    addCarImage(carId: $carId, imageUrl: $imageUrl, isPrimary: $isPrimary) {
      id
      carId
      imageUrl
      isPrimary
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_CAR_IMAGE = gql`
  mutation DeleteCarImage($imageId: Int!) {
    deleteCarImage(imageId: $imageId)
  }
`;

export const SET_PRIMARY_IMAGE = gql`
  mutation SetPrimaryImage($imageId: Int!) {
    setPrimaryImage(imageId: $imageId) {
      id
      carId
      imageUrl
      isPrimary
      createdAt
      updatedAt
    }
  }
`;
