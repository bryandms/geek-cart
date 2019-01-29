import { gql } from 'apollo-boost'

/* Queries */

const user = gql `
  {
    user {
      id
      username
      email
    }
  }
`

const users = gql `
  {
    users {
      id
      username
      email
    }
  }
`

const category = gql `
  query($id: ID!) {
    category(id: $id) {
      id
      name
      description
      products {
        id
        name
      }
    }
  }
`

const categories = gql `
  {
    categories {
      id
      name
      description
    }
  }
`
const product = gql `
  query($id: ID!) {
    product(id: $id) {
      id
      name
      description
      image
      price
      category {
        id
        name
      }
    }
  }
`

const products = gql `
  {
    products {
      id
      name
      description
      image
      price
      category {
        id
        name
      }
    }
  }
`

/* Mutations */

const signup = gql `
  mutation($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password)
  }
`

const signin = gql `
  mutation($email: String!, $password: String!) {
    signin(email: $email, password: $password)
  }
`

const addCategory = gql `
  mutation($name: String!, $description: String!) {
    addCategory(name: $name, description: $description) {
      id
      name
      description
    }
  }
`

const addProduct = gql `
  mutation($name: String!, $description: String!, $image: String!, $price: Float!, $categoryId: ID!) {
    addProduct(name: $name, description: $description, image: $image, price: $price, categoryId: $categoryId) {
      id
      name
      description
      image
      price
      category {
        id
        name
      }
    }
  }
`
export {
  user,
  users,
  category,
  categories,
  product,
  products,
  signup,
  signin,
  addCategory,
  addProduct
}
