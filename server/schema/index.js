const graphql = require('graphql')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Category = require('../models/category')
const Product = require('../models/product')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLFloat,
    GraphQLList,
    GraphQLNonNull
} = graphql

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString }
    })
})

const CategoryType = new GraphQLObjectType({
    name: 'Category',
    fields: () => ({
        id: { type: GraphQLID },
        name: {type: GraphQLString },
        description: {type: GraphQLString },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({ categoryId: parent.id })
            }
        }
    })
})

const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        image: { type: GraphQLString },
        price: { type: GraphQLFloat },
        category: {
            type: CategoryType,
            resolve(parent, args) {
                return Category.findById(parent.categoryId)
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            resolve(parent, args, { user }) {
                if (!user) throw new Error('You are not authenticated.')

                return User.findById(user.id)
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                return User.find({})
            }
        },
        category: {
            type: CategoryType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Category.findById(args.id)
            }
        },
        categories: {
            type: new GraphQLList(CategoryType),
            resolve(parent, args) {
                return Category.find({})
            }
        },
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Product.findById(args.id)
            }
        },
        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({})
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: GraphQLString,
            args: {
                username: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                const user = new User({
                    username: args.username,
                    email: args.email,
                    password: await bcrypt.hash(args.password, 10)
                })
                await user.save()
                return jwt.sign(
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '1y' }
                )
            }
        },
        signin: {
            type: GraphQLString,
            args: {
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) }
            },
            async resolve(parent, args) {
                const user = await User.findOne({ email: args.email })

                if (!user) throw new Error('The credentials are incorrect.')

                const valid = await bcrypt.compare(args.password, user.password)

                if (!valid) throw new Error('The credentials are incorrect.')

                return jwt.sign(
                    { id: user.id, email: user.email },
                    process.env.JWT_SECRET,
                    { expiresIn: '1d' }
                )
            }
        },
        addCategory: {
            type: CategoryType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                const category = new Category({
                    name: args.name,
                    description: args.description
                })
                return category.save()
            }
        },
        addProduct: {
            type: ProductType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                image: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLFloat) },
                categoryId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                const product = new Product({
                    name: args.name,
                    description: args.description,
                    image: args.image,
                    price: args.price,
                    categoryId: args.categoryId
                })
                return product.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
